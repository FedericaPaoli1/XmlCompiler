using Newtonsoft.Json.Linq;

namespace XmlCompiler.Infrastructure
{
	public interface IXmlItemRepository
	{
		JArray XmlItems(string dir);
		void CreateNewXml(JObject jsonText, string dir);
		void DeleteXml(string element, string dir);
	}

}
