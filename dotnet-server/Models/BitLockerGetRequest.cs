using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace os_server.Models
{
    public class BitLockerGetRequest
    {
        [FromQuery(Name = "type")]
        public string Type { get; set; }

        [FromQuery(Name = "input")]
        public string Input { get; set; }
    }
}
