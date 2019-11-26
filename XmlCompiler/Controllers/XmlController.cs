using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using XmlCompiler.Infrastructure;

namespace XmlCompiler.Controllers
{
	[Produces("application/xml")]
	[ApiController]
	public class XmlController : Controller
	{
		private readonly IXmlItemRepository _xmlItemRepository;

		public XmlController(IXmlItemRepository xmlItemRepository)
		{
			_xmlItemRepository = xmlItemRepository;
		}

		[HttpPost]
		[Route("create-search")]
		public IActionResult PostSearch([FromBody] JObject jsonText)
		{
			 _xmlItemRepository.CreateNewXml(jsonText, "Searches");
			return Ok();
		}


		[HttpPost]
		[Route("create-entity")]
		public IActionResult PostEntity([FromBody] JObject jsonText)
		{
			_xmlItemRepository.CreateNewXml(jsonText, "Entities");
			return Ok();
		}

		[Produces("application/json")]
		[HttpGet]
		[Route("getSearches")]
		public IActionResult GetSearches()
		{
			return Ok(_xmlItemRepository.XmlItems("Searches"));
		}

		[Produces("application/json")]
		[HttpGet]
		[Route("getEntities")]
		public IActionResult GetEntities()
		{
			return Ok(_xmlItemRepository.XmlItems("Entities"));
		}

		[HttpDelete]
		[Route("searches")]
		public IActionResult DeleteSearch([FromQuery(Name = "element")] string element)
		{
			_xmlItemRepository.DeleteXml(element, "Searches");
			return Ok();
		}

		[HttpDelete]
		[Route("entities")]
		public IActionResult DeleteEntity([FromQuery(Name = "element")] string element)
		{
			_xmlItemRepository.DeleteXml(element, "Entities");
			return Ok();
		}
	}
}
