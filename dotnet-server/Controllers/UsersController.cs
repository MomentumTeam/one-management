using os_server.Models;
using os_server.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;

namespace os_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("CorsPolicy")]
    public class UsersController : ControllerBase
    {
        private readonly UserService _userService;

        public UsersController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public ActionResult<UserResponse> Get()
        {
            string userId = HttpContext.User.Identity.Name;
          
            MongoUser mongoUser = _userService.Get(userId);

            if (mongoUser == null)
            {
                mongoUser = new MongoUser(userId);
                _userService.Create(mongoUser);
            }

            User user = new User();
            user.UserId = userId;
            UserResponse response = new UserResponse();
            response.InitFields(mongoUser, user);

            return response;
        }

        [HttpPut]
        public ActionResult<UserResponse> Update([FromBody] MongoUser userIn)
        {
            string userId = HttpContext.User.Identity.Name;
            var mongoUser = _userService.Get(userId);

            if (mongoUser == null)
            {
                mongoUser = new MongoUser(userId);
                _userService.Create(mongoUser);
            }

            userIn.Id = userId;
            if(userIn.Favorites == null)
            {
                userIn.Favorites = mongoUser.Favorites;
            }
            if (userIn.History == null)
            {
                userIn.History = mongoUser.History;
            }

            _userService.Update(userId, userIn);
            User user = new User();
            user.UserId = userId;
            UserResponse response = new UserResponse();
            response.InitFields(mongoUser, user);


            return response ;
        }
    }
}