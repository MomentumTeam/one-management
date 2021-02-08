using Microsoft.AspNetCore.Builder;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace os_server.Middleware
{
    public static class IApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseImpersonation(this IApplicationBuilder app, params object[] args)
        {
            return app.UseMiddleware<RunImpersonatedMiddleware>(args);
        }
    
    }
}
