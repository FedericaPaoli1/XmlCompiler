using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace XmlCompiler.Models
{
	[Serializable]
	public class XmlItem
	{
		[JsonProperty("element")]
		public string Element { get; set;  }
		[JsonProperty("attributes")]
		public List<Attribute> Attributes { get; set; }
		[JsonProperty("fields")]
		public List<Field> Fields { get; set; }

		public XmlItem() { }

		public XmlItem(string element, List<Attribute> attributes, List<Field> fields)
		{
			this.Element = element;
			this.Attributes = attributes;
			this.Fields = fields;
		}
	}
}
