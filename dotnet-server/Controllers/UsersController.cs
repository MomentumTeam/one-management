using os_server.Models;
using os_server.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;
using System;

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

            UserResponse response;
            if (HttpContext.User == null || HttpContext.User.Identity == null || HttpContext.User.Identity.Name == null)
            {
                response = new UserResponse();
                return response;
            }
            string userId = HttpContext.User.Identity.Name;
            if (!UserService.MongoIsUp)
            {
                response = new UserResponse();
                response.UserObj.UserId = userId;
                return response;
            }
            try
            {
                MongoUser mongoUser = _userService.Get(userId);

                if (mongoUser == null)
                {
                    mongoUser = new MongoUser(userId);
                    _userService.Create(mongoUser);
                }

                User user = new User();
                user.UserId = userId;
                response = new UserResponse();
                response.InitFields(mongoUser, user);

                return response;
            }
            catch (Exception)
            {
                response = new UserResponse();
                response.UserObj.UserId = userId;
                return response;
            }
        }

        [HttpPut]
        public ActionResult<UserResponse> Update([FromBody] MongoUser userIn)
        {
            UserResponse response;
            if (HttpContext.User == null || HttpContext.User.Identity == null || HttpContext.User.Identity.Name == null)
            {
                response = new UserResponse();
                return response;
            }

            string userId = HttpContext.User.Identity.Name;
            if (!UserService.MongoIsUp)
            {
                response = new UserResponse();
                response.UserObj.UserId = userId;
                return response;
            }
            try
            {
                var mongoUser = _userService.Get(userId);

                if (mongoUser == null)
                {
                    mongoUser = new MongoUser(userId);
                    _userService.Create(mongoUser);
                }

                userIn.Id = userId;
                if (userIn.Favorites == null)
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
                response = new UserResponse();
                response.InitFields(mongoUser, user);
                return response;
            }
            catch (Exception)
            {
                response = new UserResponse();
                return response;
            }
        }
    }
}