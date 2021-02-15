using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace os_server.Models
{
    public class ReturnDto
{
    public string log { get; set; }
    public bool status { get; set; }

        public ReturnDto()
        {

        }
        public ReturnDto(bool status, string log)
        {
            this.status = status;
            this.log = log;
        }
}
}
