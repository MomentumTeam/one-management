using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace os_server.Models
{
    public class PasswordGetResponse
    {
        public string Password { get; set; }

        public PasswordGetResponse(string password)
        {
            this.Password = password;
        }
    }
}
