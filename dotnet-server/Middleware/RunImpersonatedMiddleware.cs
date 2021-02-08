using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;

namespace os_server.Middleware
{
    public class RunImpersonatedMiddleware
    {
        private RequestDelegate _next;
        private ILogger<RunImpersonatedMiddleware> _logger;

        public RunImpersonatedMiddleware(ILogger<RunImpersonatedMiddleware> logger, RequestDelegate next)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                if(!context.User.Identity.IsAuthenticated)
                {
                    context.Response.StatusCode = 401;
                }
                else
                {
                    await WindowsIdentity.RunImpersonated(((WindowsIdentity)context.User.Identity).AccessToken, async () =>
                    {
                        await _next(context);
                    });                    
                }                
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Error");
            }
        }

    }
}
