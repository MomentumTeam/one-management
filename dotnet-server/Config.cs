using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace os_server
{
    public class Config
    {
        public static string CORS_ORIGINS;
        public static string GATE_API;

        static Config()
        {
            IConfiguration configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json", true, true)
            .Build();
            CORS_ORIGINS = "CorsOrigins";
            GATE_API = configuration.GetValue<string>("GateApi");
        }
    }


}
