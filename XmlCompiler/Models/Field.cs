using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace XmlCompiler.Models
{
	[Serializable]
	public class Field
	{
		[JsonProperty("name")]
		public string Name { get; set; }
		[JsonProperty("groupId")]
		public string GroupId { get; set; }
		[JsonProperty("options")]
		public List<bool> Options { get; set; }


		public Field() { }

		public Field(string name, string groupId, List<bool> options)
		{
			this.Name = name;
			this.GroupId = groupId;
			this.Options = options;

		}
	}
}
