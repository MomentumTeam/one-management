using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
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
            Task<UserOptionList[]> t = Task<UserOptionList[]>.Run(async () =>
            {
                try
                {
                    var response = await client.GetAsync(Config.GATE_API + "/api/options/" + userPrefix);
                    string content = await response.Content.ReadAsStringAsync();
                    if(response.StatusCode != HttpStatusCode.OK)
                    {
                        return new UserOptionList[] { };
                    }

                    UserOptionList[] array = JsonConvert.DeserializeObject<UserOptionList[]>(content);
                    return array;
                }
                catch (Exception)
                {
                    return new UserOptionList[] { };
                }
            });
            try
            {
                t.Wait();
                UserOptionList[] ret = t.Result;
                return ret;
            }
            catch(Exception e)
            {
                throw;
            }
        }

        public static ReturnDto ResetPassword(string user)
        {
            Task<ReturnDto> t = Task<ReturnDto>.Run(async () =>
            {
                try
                {
                    var response = await client.PutAsync(Config.GATE_API + "/api/Gate/password/" + user, null);
                    string content = await response.Content.ReadAsStringAsync();
                    ReturnDto ret = JsonConvert.DeserializeObject<ReturnDto>(content);
                    return ret;
                }
                catch (Exception e)
                {
                    return new ReturnDto(false, e.Message);
                }
            });
            try
            {
                t.Wait();
                ReturnDto ret = t.Result;
                return ret;
            }
            catch (Exception e)
            {
                return new ReturnDto(false, e.Message);
            }

        }


        public static UserStatus GetUserStatus(string samAccountName)
        {
            Task<UserStatus> t = Task<UserStatus>.Run(async () =>
            {
                try
                {
                    var response = await client.GetAsync(Config.GATE_API + "/api/Gate/userStatus/" + samAccountName);
                    string content = await response.Content.ReadAsStringAsync();
                    if(response.StatusCode != HttpStatusCode.OK)
                    {
                        throw new Exception(content);
                    }
                    UserStatus ret = JsonConvert.DeserializeObject<UserStatus>(content);
                    return ret;
                }
                catch (Exception e)
                {
                    throw;
                }
            });
            try
            {
                t.Wait();
                UserStatus ret = t.Result;
                return ret;
            }
            catch(Exception e)
            {
                throw;
            }

        }


        public static ReturnDto Unlock(string userId)
        {
            Task<ReturnDto> t = Task<ReturnDto>.Run(async () =>
            {
                try
                {
                    var response = await client.PutAsync(Config.GATE_API + "/api/Gate/unlock/" + userId, null);
                    string content = await response.Content.ReadAsStringAsync();
                    if(response.StatusCode != HttpStatusCode.OK)
                    {
                        return new ReturnDto(false, content);
                    }
                    ReturnDto returnDto = JsonConvert.DeserializeObject<ReturnDto>(content);
                    return returnDto;
                }
                catch (Exception e)
                {
                    return new ReturnDto(false, e.Message);
                }
            });
            t.Wait();
            ReturnDto ret = t.Result;
            return ret;
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

        public static ReturnDto GetBitLockerPassword(string type, string input)
        {
            Task<ReturnDto> t = Task<ReturnDto>.Run(async () =>
            {
                try
                {
                    var response = await client.GetAsync(Config.GATE_API+ "/api/Gate/Bitlocker/" + input);
                    string content = await response.Content.ReadAsStringAsync();
                    ReturnDto returnDto = JsonConvert.DeserializeObject<ReturnDto>(content);
                    return returnDto;
                }
                catch (Exception e)
                {
                    return new ReturnDto(false, e.Message);
                }
            });
            t.Wait();
            ReturnDto ret = t.Result;
            return ret;
        }

        public static ReturnDto GetLapsPassword(string computerName)
        {
            Task<ReturnDto> t = Task<ReturnDto>.Run(async () =>
            {
                try
                {
                    var response = await client.GetAsync(Config.GATE_API + "/api/Gate/laps/" + computerName);
                    string content = await response.Content.ReadAsStringAsync();
                    ReturnDto returnDto = JsonConvert.DeserializeObject<ReturnDto>(content);
                    return returnDto;
                }
                catch (Exception e)
                {
                    return new ReturnDto(false, e.Message);
                }
            });
            t.Wait();
            ReturnDto ret = t.Result;
            return ret;
        }
    }

    }
