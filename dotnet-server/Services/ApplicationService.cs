using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace os_server.Services
{
    public class ApplicationService
    {
        public static HttpClient client;

        static ApplicationService(){
            client = new HttpClient();        
        }

        public static string GetBitLockerPassword(string keyId)
        {
            Task<string> t = Task<string>.Run(async () =>
            {
                try
                {
                    var response = await client.GetAsync(Config.GATE_API+ "/api/Gate/Bitlocker/" + keyId);
                    string content = await response.Content.ReadAsStringAsync();
                    return content;
                }
                catch (Exception e)
                {
                    return e.Message;
                }
            });
            t.Wait();
           string ret = t.Result;
            return ret;
        }

        public static string GetLapsPassword(string computerName)
        {
            Task<string> t = Task<string>.Run(async () =>
            {
                try
                {
                    var response = await client.GetAsync(Config.GATE_API + "/api/Gate/laps/" + computerName);
                    string content = await response.Content.ReadAsStringAsync();
                    return content;
                }
                catch (Exception e)
                {
                    return e.Message;
                }
            });
            t.Wait();
            string ret = t.Result;
            return ret;
        }
    }

    }
