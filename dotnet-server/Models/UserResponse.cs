using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace os_server.Models
{
    public class UserResponse
    {
        public User UserObj { get; set; }
        public string[] Favorites { get; set; }
        public string[] History { get; set; }

        public UserResponse()
        {
            this.UserObj = new User();
            this.UserObj.UserId = "Unknown";
            this.Favorites = new string[] { };
            this.History = new string[] { };
        }

        public void InitFields(MongoUser mongoUser, User user)
        {
            this.UserObj = user;
            this.Favorites = mongoUser.Favorites;
            this.History = mongoUser.History;

        }
    }
}
