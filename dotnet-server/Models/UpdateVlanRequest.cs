using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace os_server.Models
{
    public class UpdateVlanRequest
    {
        public string MacAddress { get; set; }
        public string Location { get; set; }
        public string Vlan { get; set; }

    }
}
