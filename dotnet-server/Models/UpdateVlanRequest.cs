using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace os_server.Models
{
    public class ChangeVlan
    {
        public string mac { get; set; }
        public string location { get; set; }

        public string vlan { get; set; }
    }
}
