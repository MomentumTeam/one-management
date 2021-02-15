using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using os_server.Models;
using os_server.Services;

namespace os_server.Controllers
{
    [Route("api/[controller]")]
[ApiController]
public class AllowListController : ControllerBase
{

        [HttpPost]
        public IActionResult Post([FromBody] AddMacRequest request)
        {
            try
            {
                ReturnDto ret = ApplicationService.AddMac(request.macAddress);

                return Ok(ret);
            }
            catch (Exception e)
            {
                return StatusCode(500, new ReturnDto(false, e.Message));
            }

        }

    }
}
