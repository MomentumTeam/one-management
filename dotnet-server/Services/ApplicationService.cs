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

        static ApplicationService()
        {
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
                    if (response.StatusCode != HttpStatusCode.OK)
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
            catch (Exception e)
            {
                throw;
            }
        }

        public static GroupOptionList[] SearchGroups(string groupPrefix)
        {
            Task<GroupOptionList[]> t = Task<GroupOptionList[]>.Run(async () =>
            {
                try
                {
                    var response = await client.GetAsync(Config.GATE_API + "/api/options/group/" + groupPrefix);
                    string content = await response.Content.ReadAsStringAsync();
                    if (response.StatusCode != HttpStatusCode.OK)
                    {
                        return new GroupOptionList[] { };
                    }

                    GroupOptionList[] array = JsonConvert.DeserializeObject<GroupOptionList[]>(content);
                    return array;
                }
                catch (Exception)
                {
                    return new GroupOptionList[] { };
                }
            });
            try
            {
                t.Wait();
                GroupOptionList[] ret = t.Result;
                return ret;
            }
            catch (Exception e)
            {
                throw;
            }
        }

        public static ReturnDto AddGroup(GroupChange groupChange)
        {
            Task<ReturnDto> t = Task<ReturnDto>.Run(async () =>
            {
                try
                {
                    string content = JsonConvert.SerializeObject(groupChange);
                    HttpContent httpContent = new StringContent(content, UnicodeEncoding.UTF8, "application/json");
                    var response = await client.PatchAsync(Config.GATE_API + "/api/Gate/group" , httpContent);
                    string res = await response.Content.ReadAsStringAsync();
                    ReturnDto ret = JsonConvert.DeserializeObject<ReturnDto>(res);
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

        public static ReturnDto RemoveGroup(GroupChange groupChange)
        {
            Task<ReturnDto> t = Task<ReturnDto>.Run(async () =>
            {
                try
                {
                    var request = new HttpRequestMessage(HttpMethod.Delete, Config.GATE_API + "/api/Gate/group");
                    request.Content = new StringContent(JsonConvert.SerializeObject(groupChange), Encoding.UTF8, "application/json");
                    var response = await client.SendAsync(request);

                    //var response = await client.DeleteAsync(Config.GATE_API + "/api/Gate/group", httpContent);
                    string res = await response.Content.ReadAsStringAsync();
                    ReturnDto ret = JsonConvert.DeserializeObject<ReturnDto>(res);
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
                    if (response.StatusCode != HttpStatusCode.OK)
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
            catch (Exception e)
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
                    if (response.StatusCode != HttpStatusCode.OK)
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

        public static ReturnDto changeDisplayName(DisplayName displayNameRequest)
        {
            Task<ReturnDto> t = Task<ReturnDto>.Run(async () =>
            {
                try
                {
                    string content = JsonConvert.SerializeObject(displayNameRequest);
                    HttpContent httpContent = new StringContent(content, UnicodeEncoding.UTF8, "application/json");
                    var response = await client.PutAsync(Config.GATE_API + "/api/Gate/displayName/", httpContent);
                    string responseContent = await response.Content.ReadAsStringAsync();
                    if (response.StatusCode != HttpStatusCode.OK)
                    {
                        return new ReturnDto(false, content);
                    }
                    ReturnDto returnDto = JsonConvert.DeserializeObject<ReturnDto>(responseContent);
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



        public static ReturnDto AddMac(string macAddress)
        {
            Task<ReturnDto> t = Task<ReturnDto>.Run(async () =>
            {
                try
                {
                    var response = await client.PostAsync(Config.GATE_API + "/api/Gate/mac/" + macAddress, null);
                    string content = await response.Content.ReadAsStringAsync();
                    if (response.StatusCode != HttpStatusCode.OK)
                    {
                        throw new Exception("Status " + response.StatusCode + ": " + content);
                    }
                    ReturnDto returnDto = JsonConvert.DeserializeObject<ReturnDto>(content);
                    return returnDto;
                }
                catch (Exception e)
                {
                    throw;
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
                throw;
            }


        }



        public static ReturnDto ChangeVlan(ChangeVlan changeVlanRequest)
        {
            Task<ReturnDto> t = Task<ReturnDto>.Run(async () =>
            {
                try
                {
                    string content = JsonConvert.SerializeObject(changeVlanRequest);
                    HttpContent httpContent = new StringContent(content, UnicodeEncoding.UTF8, "application/json");
                    var response = await client.PostAsync(Config.GATE_API + "/api/Gate/vlan", httpContent);
                    string responseContent = await response.Content.ReadAsStringAsync();
                    if (response.StatusCode != HttpStatusCode.OK)
                    {
                        throw new Exception("Status " + response.StatusCode + ": " + content);
                    }
                    ReturnDto returnDto = JsonConvert.DeserializeObject<ReturnDto>(responseContent);
                    return returnDto;
                }
                catch (Exception e)
                {
                    throw;
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
                throw;
            }


        }

        public static string[] GetLocationOptions()
        {
            Task<string[]> t = Task<string[]>.Run(async () =>
            {
                try
                {
                    var response = await client.GetAsync(Config.GATE_API + "/api/Gate/location/");
                    string content = await response.Content.ReadAsStringAsync();
                    if (response.StatusCode != HttpStatusCode.OK)
                    {
                        throw new Exception("Status " + response.StatusCode + ": " + content);
                    }
                    string[] locations = JsonConvert.DeserializeObject<string[]>(content);
                    return locations;
                }
                catch (Exception e)
                {
                    throw;
                }
            });
            try
            {
                t.Wait();
                string[] ret = t.Result;
                return ret;
            }
            catch (Exception e)
            {
                throw;
            }

        }

        public static ReturnDto GetBitLockerPassword(string type, string input)
        {
            Task<ReturnDto> t = Task<ReturnDto>.Run(async () =>
            {
                try
                {
                    var response = await client.GetAsync(Config.GATE_API + "/api/Gate/Bitlocker/" + input);
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