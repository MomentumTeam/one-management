using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Threading;
using os_server.Models;
using os_server.Services;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace os_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VlanController : ControllerBase
    {
        // PUT api/<VlanController>/5
        [HttpPost]
        public IActionResult Post([FromBody] ChangeVlan request)
        {
            try
            {
                ReturnDto ret = ApplicationService.ChangeVlan(request);
                if (ret.log == null)
                {
                    ret.log = "";
                }
                Thread.Sleep(2000);

                return Ok(ret);
            }
            catch(Exception e)
            {
                return StatusCode(500, new ReturnDto(false, e.Message));
            }

         }

        [HttpGet("locationOptions")]
        public IActionResult Get()
        {
            try
            {
                string[] locationOptions = ApplicationService.GetLocationOptions();

                return Ok(locationOptions);
            }
            catch(Exception e)
            {
                return StatusCode(500, e.Message);
            }

            //return new string[] { "location1", "location2", "location3", "location4" };     
        }
    }
}
