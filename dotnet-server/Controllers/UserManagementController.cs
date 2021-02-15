using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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
        public IActionResult GetUserStatus([FromQuery] string samAccountName)
        {
            try
            {
                UserStatus userStatus = ApplicationService.GetUserStatus(samAccountName);

                return Ok(userStatus);
            }
            catch (Exception e)
            {
                return StatusCode(500,e.Message);
            }

        }

        [HttpGet("resetPassword")]
        public ReturnDto ResetPassword([FromQuery] string userId)
        {
            try
            {
                ReturnDto ret = ApplicationService.ResetPassword(userId);
                return ret;
            }
            catch(Exception e)
            {
                return new ReturnDto(false, e.Message);
            }

        }

        [HttpPut("unlock")]
        public ReturnDto Unlock([FromBody] UnlockRequest request)
        {
            try
            {
                ReturnDto result = ApplicationService.Unlock(request.UserId);

                return result;
            }
            catch(Exception e)
            {
                return new ReturnDto(false, e.Message);
            }

        }


        [HttpGet("search")]
        public UserOptionList[] GetSearch([FromQuery] string userPrefix)
        {
            try
            {
                UserOptionList[] usersList = ApplicationService.SearchUsers(userPrefix);
                return usersList;
            }
            catch (Exception)
            {
                return new UserOptionList[] { };
            }

        }

        [HttpGet("searchGroup")]
        public GroupOptionList[] GetGroup([FromQuery] string groupPrefix)
        {
            try
            {
                GroupOptionList[] gropusList = ApplicationService.SearchGroups(groupPrefix);
                return gropusList;
            }
            catch (Exception)
            {
                return new GroupOptionList[] { };
            }

        }

        [HttpPut("addGroup")]
        public ReturnDto AddGroup([FromBody] String group)
        {
            try
            {
                ReturnDto result = ApplicationService.AddGroup(group);

                return result;
            }
            catch (Exception e)
            {
                return new ReturnDto(false, e.Message);
            }

        }
    }
}
