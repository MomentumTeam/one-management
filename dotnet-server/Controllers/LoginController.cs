using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace os_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : WebControllerBase
    {
        // GET: api/<LoginController>
        [HttpGet]
        public RedirectResult Get()
        {
            return Redirect("http://localhost:3000");
        }
    }
}
