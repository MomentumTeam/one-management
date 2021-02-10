using Microsoft.AspNetCore.Mvc;
using os_server.Models;
using os_server.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace os_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserManagementController : ControllerBase
    {
        // GET: api/<UserManagementController>
        //    [HttpGet]
        //    public IEnumerable<string> Get()
        //    {
        //        return new string[] { "value1", "value2" };
        //    }

        [HttpGet("userStatus")]
        public UserStatus GetUserStatus([FromQuery] string samAccountName)
        {
            UserStatus userStatus = ApplicationService.GetUserStatus(samAccountName);
            return userStatus;
        }

        [HttpGet("search")]
        public UserOptionList[] GetSearch([FromQuery] string userPrefix)
        {
            UserOptionList[] usersList = ApplicationService.SearchUsers(userPrefix);
            return usersList;
        }
    }
}
