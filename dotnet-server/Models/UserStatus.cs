using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace os_server.Models
{
    public class UserStatus
    {
        public string Name { get; set; }
        public string PasswordStatus { get; set; }
        public string Locked { get; set; }
        public string sAMAccountName { get; set; }
        public string userPrincipalName { get; set; }
        public string displayName { get; set; }
        public string GivenName { get; set; }
        public string surName { get; set; }
        public string Mail { get; set; }
        public string EX1 { get; set; }
        public string EX2 { get; set; }
    }
}
