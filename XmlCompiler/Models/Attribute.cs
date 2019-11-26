using Newtonsoft.Json;
using System;

namespace XmlCompiler.Models
{
	[Serializable]
	public class Attribute
	{
		[JsonProperty("key")]
		public string Key { get; set; }
		[JsonProperty("value")]
		public string Value { get; set; }

		public Attribute() { }

		public Attribute(string key, string value)
		{
			this.Key = key;
			this.Value = value;
		}
	}
}
