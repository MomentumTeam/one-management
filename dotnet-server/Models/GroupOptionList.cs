using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace os_server.Models
{
    public class GroupOptionList
{
    public string name { get; set; }
    public string samAcountName { get; set; }
    public string optionToDisplay { get; set; }

    public GroupOptionList()
    {

    }
    public GroupOptionList(string name, string samAcountName, string optionToDisplay)
    {
        this.name = name;
        this.samAcountName = samAcountName;
        this.optionToDisplay = optionToDisplay;
    }
}
}
