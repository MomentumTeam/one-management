using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;

namespace os_server.Controllers
{
	[EnableCors("CorsPolicy")]
	[Authorize]
	public class WebControllerBase : ControllerBase
	{
	}
}
