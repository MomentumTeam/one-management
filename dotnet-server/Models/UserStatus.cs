using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace os_server.Models
{
    public class UserStatus
    {
        public string name { get; set; }
        public string passwordStatus { get; set; }
        public string locked { get; set; }
        public string sAMAccountName { get; set; }
        public string userPrincipalName { get; set; }
        public string dispalyName { get; set; }
        public string givenName { get; set; }
        public string surName { get; set; }
        public string mail { get; set; }
        public string ex1 { get; set; }
        public string ex2 { get; set; }
        public string[] groups { get; set; }

        public UserStatus()
        {

        }


    }
}
