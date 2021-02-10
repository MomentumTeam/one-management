using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using os_server.Models;

namespace os_server.Services
{
    public class ApplicationService
    {
        public static HttpClient client;

        static ApplicationService(){
            client = new HttpClient();        
        }

        public static UserOptionList[] SearchUsers(string userPrefix)
        {
            Task<string> t = Task<string>.Run(async () =>
            {
                try
                {
                    var response = await client.GetAsync(Config.GATE_API + "/api/options/" + userPrefix);
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
            UserOptionList[] userOptionListArray = JsonConvert.DeserializeObject<UserOptionList[]>(ret);
            return userOptionListArray;
        }


        public static UserStatus GetUserStatus(string samAccountName)
        {
            Task<string> t = Task<string>.Run(async () =>
            {
                try
                {
                    var response = await client.GetAsync(Config.GATE_API + "/api/Gate/userStatus/" + samAccountName);
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
            UserStatus userStatus = JsonConvert.DeserializeObject<UserStatus>(ret);
            return userStatus;
        }



        public static bool ChangeVlan(ChangeVlan changeVlanRequest)
        {
            try
            {
                var content = new StringContent(JsonConvert.SerializeObject(changeVlanRequest), Encoding.UTF8, "application/json");
                string address = Config.GATE_API + "/api/Gate/vlan";
                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, address);
                request.Content = content;
                var requestTask = Task.Run(() => client.SendAsync(request));
                requestTask.Wait();
                var response = requestTask.Result;
                //string[] locations = JsonConvert.DeserializeObject<string[]>(contentString);
                //return locations;

                return true;
            }
            catch(Exception e)
            {
                return false;
            }



        }

        public static string[] GetLocationOptions() {
            try
            {
                string address = Config.GATE_API + "/api/Gate/location";
                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, address);
                var requestTask = Task.Run(() => client.SendAsync(request));
                requestTask.Wait();
                var response = requestTask.Result;
                var readTask = Task.Run(() => response.Content.ReadAsStringAsync());
                readTask.Wait();
                string contentString = readTask.Result;
                string[] locations = JsonConvert.DeserializeObject<string[]>(contentString);
                return locations;

            }
            catch (Exception e)
            {
                return null;
            }
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
