using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using os_server.Models;
using os_server.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace os_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LapsController : ControllerBase
    {
        // GET: api/<BitLockerController>
        [HttpGet]
        public ReturnDto Get([FromQuery] LapsGetRequest request)
        {
            try
            {
                ReturnDto returnDto = ApplicationService.GetLapsPassword(request.ComputerName);
                return returnDto;
            }
            catch (Exception e)
            {
                return new ReturnDto(false, e.Message);
            }
        }
    }
}
