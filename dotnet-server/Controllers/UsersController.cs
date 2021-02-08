using os_server.Models;
using os_server.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace os_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserService _userService;

        public UsersController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{id}", Name = "GetUser")]
        public ActionResult<User> Get(string id)
        {
            var user = _userService.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPost]
        public ActionResult<User> Create(User user)
        {
            _userService.Create(user);

            return CreatedAtRoute("GetUser", new { id = user.Id.ToString() }, user);
        }

        [HttpPut("{id}")]
        public IActionResult Update(string id, User userIn)
        {
            var user = _userService.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            userIn.Id = id;
            if(userIn.Favorites == null)
            {
                userIn.Favorites = user.Favorites;
            }
            if (userIn.History == null)
            {
                userIn.History = user.History;
            }

            _userService.Update(id, userIn);

            return NoContent();
        }
    }
}