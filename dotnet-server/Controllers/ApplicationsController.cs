using Microsoft.AspNetCore.Mvc;
using os_server.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace os_server.Controllers
{
    [Route("api")]
    [ApiController]
    public class ApplicationsController : ControllerBase
    {
        // GET: api/<ApplicationsController>
        [HttpGet]
        [Route("locationOptions")]
        public IEnumerable<string> Get()
        {
            return new string[] { "location1", "location2", "location3", "location4" };
        }

    }
}
