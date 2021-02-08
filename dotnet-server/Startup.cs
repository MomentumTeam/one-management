using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Server.IISIntegration;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using os_server.Models;
using os_server.Services;
using os_server.Middleware;
using System.IO;

namespace os_server
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // requires using Microsoft.Extensions.Options
            services.Configure<UsersDatabaseSettings>(
                Configuration.GetSection(nameof(UsersDatabaseSettings)));

            services.AddSingleton<IUsersDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<UsersDatabaseSettings>>().Value);

            services.AddCors(opt =>
                {
                    opt.AddPolicy("CorsPolicy", builder => builder
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .WithOrigins(Configuration.GetSection(Config.CORS_ORIGINS).Get<string[]>())
                  .SetIsOriginAllowed((host) => true)
                  .AllowCredentials()); ;});

            services.AddSingleton<UserService>();

            services.AddControllers();
            services.AddAuthentication(IISDefaults.AuthenticationScheme);

            services.AddMvc(option => option.EnableEndpointRouting = false);
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "client";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseImpersonation();
            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("CorsPolicy");

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseMvc();
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = Path.Join(env.ContentRootPath, "client");

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
