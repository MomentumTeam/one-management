using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace os_server.Models
{
    public class LapsGetRequest
    {
        [FromQuery(Name = "computerName")]
        public string ComputerName { get; set; }
    }
}
