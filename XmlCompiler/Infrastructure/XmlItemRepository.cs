using System.Collections.Generic;
using System.Xml;
using XmlCompiler.Models;
using System;
using Attribute = XmlCompiler.Models.Attribute;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
namespace XmlCompiler.Infrastructure
{
	public class XmlItemRepository : IXmlItemRepository
	{

		public JArray XmlItems(string dir)
		{
			
			string[] files = Directory.GetFiles(Environment.CurrentDirectory + @"\XmlFiles\" + dir + "\\", "*.xml", SearchOption.TopDirectoryOnly);
			 string json = "[";
			for (int i = 0; i < files.Length; i++)
			{
				if (i > 0)
					json = json + ",";

				XmlDocument doc = new XmlDocument();

				doc.Load((Environment.CurrentDirectory + @"\XmlFiles\" + dir + "\\" + Path.GetFileNameWithoutExtension(files[i]) + ".xml").Trim());
				string result = "";
				string json1 = JsonConvert.SerializeXmlNode(doc);

				result = firstJsonFormatting(json1);

				json1 = JsonConvert.SerializeXmlNode(doc);
				if (json1.Contains("\":{\"fields\""))
				{
					result += "], \"fields\" : ";

				}

				else
				{
					result = secondJsonFormatting(result, json1);
				}

				if (json1.Contains("null"))
				{
					result = jsonWithoutFieldsFormatting(result, json1);
				}

				else
				{
					result = jsonFieldsFormatting(doc, result);
				}
				json += result;
				json = json.Replace("}}", "}]}");
			}
			json = json + "]";
			JArray arr = JArray.Parse(json);
			return arr;
		}

		private static string jsonFieldsFormatting(XmlDocument doc, string result)
		{
			string json1 = JsonConvert.SerializeXmlNode(doc);
			if (json1.Contains('['))
				json1 = json1.Substring(json1.IndexOf("["));
			else
				json1 = json1.Substring(json1.IndexOf("\"@IsMandatory\"") - 1);
			json1 = "[{\"options\":" + json1;
			json1 = json1.Replace("\"options\":{", "\"options\":[").Replace("\"options\":[{", "\"options\":[").Replace("\"@IsMandatory\":", "").Replace("\"@IsVisible\":", "").Replace("\"@IsReadOnly\":", "").Replace("\"False\",\"@Name\"", "\"False\"], \"name\"").Replace("\"True\",\"@Name\"", "\"True\"], \"name\"").Replace("\"False\",\"@GroupId\"", "\"False\"], \"groupId\"").Replace("\"True\",\"@GroupId\"", "\"True\"], \"groupId\"").Replace("\"@GroupId\"", "\"groupId\"").Replace("\"@Name\"", "\"name\"").Replace("},{", "}, {\"options\":[");
			json1 = json1.Remove(json1.LastIndexOf("}") - 1);
			result += json1.Replace("@", "");
			return result;
		}

		private static string jsonWithoutFieldsFormatting(string result, string json1)
		{
			if (json1.Contains("]"))
			{
				json1 = json1.Substring(json1.IndexOf("]") + 1);
				result += "[" + json1;
				result = result.Replace(", \"value\": null", "]");
				result = result.Remove(result.LastIndexOf("]") + 2);
				result = result.Replace("@", "");
			}
			else
			{
				result = result.Replace(", \"fields\" : ", ", \"fields\": []}");
			}
			return result;
		}

		private static string secondJsonFormatting(string result, string json1)
		{
			json1 = json1.Replace(",", "},");
			json1 = json1.Substring(json1.IndexOf("@") - 1).Replace("\"@", "{\"key: \"").Replace(":", ", \"value\": ").Replace("key, \"value\":", "key\":").Replace(",\"fields\"", "}]");
			result = result + json1;
			result = result.Remove((result.IndexOf("]") + 1));
			result = result.Replace("}]", "], \"fields\" : ");
			return result;
		}

		private static string firstJsonFormatting(string json1)
		{
			string result;
			int k = json1.IndexOf("{\"");
			json1 = json1.Remove(k, 1);
			k = json1.IndexOf("\"");
			json1 = json1.Remove(k, 1);
			k = json1.IndexOf(":");
			json1 = json1.Remove(k);
			result = "{ \"element\" : \"" + json1 + ", \"attributes\" : [";
			return result;
		}

		public void CreateNewXml(JObject json, string dir)
		{
			XmlItem item = json.ToObject<XmlItem>(new JsonSerializer());
			string dirPath = Environment.CurrentDirectory + @"\XmlFiles\" + dir + "\\";
			string path = Path.Combine(dirPath, item.Element + ".xml").Trim();
			FileStream file = fileCreation(path);
			XmlDocument doc = formatXml(item, path);
			file.Close();
		}

		private static XmlDocument formatXml(XmlItem item, string path)
		{
			XmlDocument doc = new XmlDocument();
			XmlElement root = doc.CreateElement(item.Element);
			doc.AppendChild(root);

			fillAttributes(doc, item.Attributes, root);

			XmlNode fields = newNode(doc, "fields", root);
			fillFields(doc, item.Fields, fields);

			doc.Save(path);
			return doc;
		}

		public void DeleteXml(string element, string dir)
		{
			File.Delete((Environment.CurrentDirectory + @"\XmlFiles\" + dir + "\\" + element + ".xml").Trim());
		}

		private static FileStream fileCreation(string path)
		{
			FileStream file = System.IO.File.Create(path);
			file.Close();
			return file;
		}

		private static XmlNode newNode(XmlDocument doc, string name, XmlNode nodeToAppendChild)
		{
			XmlNode newElement = doc.CreateNode("element", name.Trim(), "");
			nodeToAppendChild.AppendChild(newElement);
			return newElement;
		}

		private static XmlAttribute newAttribute(XmlDocument doc, string name, string value, XmlNode nodeToAppendAttribute)
		{
			XmlAttribute newAttribute = doc.CreateAttribute(name.Trim());
			newAttribute.Value = value.Trim();
			nodeToAppendAttribute.Attributes.Append(newAttribute);
			return newAttribute;

		}

		private static void fillAttributes(XmlDocument doc, List<Attribute> attributes, XmlNode node)
		{
			foreach (Attribute attribute in attributes)
			{
				if (isValueCorrect(attribute.Value))
				{
					XmlAttribute newAttr = newAttribute(doc, attribute.Key, attribute.Value, node);
				}
			}
		}

		private static void fillFields(XmlDocument doc, List<Field> fields, XmlNode node)
		{
			foreach (Field field in fields)
			{
				XmlNode newField = newNode(doc, "field", node);
				XmlAttribute newAttributeIsMandatory = newAttribute(doc, "IsMandatory", field.Options[2].ToString(), newField);
				XmlAttribute newAttributeIsVisible = newAttribute(doc, "IsVisible", field.Options[1].ToString(), newField);
				XmlAttribute newAttributeIsReadOnly = newAttribute(doc, "IsReadOnly", field.Options[0].ToString(), newField);

				if (isValueCorrect(field.GroupId)) {
					XmlAttribute newAttributeGroupId = newAttribute(doc, "GroupId", field.GroupId, newField);
				}
				if (isValueCorrect(field.Name)) {
					XmlAttribute newAttributeName = newAttribute(doc, "Name", field.Name, newField);
				}
			}
		}

		private static Boolean isValueCorrect(string value)
		{
			if (value == null || value.Trim() == "")
			{
				return false;
			}
			return true;
		}
	}
}




