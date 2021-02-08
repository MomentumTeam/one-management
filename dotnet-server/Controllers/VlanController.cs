using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using os_server.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace os_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VlanController : ControllerBase
    {
        // PUT api/<VlanController>/5
        [HttpPut]
        public IActionResult Put([FromBody] UpdateVlanRequest request)
        {
                return NoContent();
         }
    }
}
