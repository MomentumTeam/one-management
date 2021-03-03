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
using Microsoft.Extensions.FileProviders;

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


            services.Configure<FaqDatabaseSettings>(
               Configuration.GetSection(nameof(FaqDatabaseSettings)));

            services.AddSingleton<IFaqDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<FaqDatabaseSettings>>().Value);

            services.AddCors(opt => 
            {
                opt.AddPolicy("CorsPolicy", builder => builder
                .AllowAnyMethod()
                .WithOrigins(Configuration.GetSection(Config.CORS_ORIGINS).Get<string[]>())
                .SetIsOriginAllowed((host) => true)
                .AllowCredentials()); 
            });
            
            services.AddSingleton<FaqService>();
            services.AddSingleton<UserService>();
            services.AddControllers();
            services.AddAuthentication(IISDefaults.AuthenticationScheme);

            services.AddMvc(option => option.EnableEndpointRouting = false);
            services.AddSpaStaticFiles(configuration =>
            {
                //for publish
                //configuration.RootPath = "client/build";

                //for dev
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
            //app.UseImpersonation();
            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("CorsPolicy");
            //app.UseAuthentication();

            //app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(env.ContentRootPath, "ClientConfig")),
                RequestPath = "/clientConfig"
            });
            app.UseSpaStaticFiles();
            app.UseMvc();
            app.UseSpa(spa =>
            {
                //for publish
                //spa.Options.SourcePath = Path.Join(env.ContentRootPath, "client/build");

                //for dev
                spa.Options.SourcePath = Path.Join(env.ContentRootPath, "client");
                spa.UseReactDevelopmentServer(npmScript: "start");
            });
        }
    }
}
