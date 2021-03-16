using System;
using System.Collections.Generic;
using System.IO;
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
        public static WebClient client;

        static ApplicationService()
        {
            client = new WebClient { UseDefaultCredentials = true };
        }

        public static UserOptionList[] SearchUsers(string userPrefix)
        {
            Task<UserOptionList[]> t = Task<UserOptionList[]>.Run(async () =>
            {
                try
                {
                        var responseContent = await client.DownloadStringTaskAsync(Config.GATE_API + "/api/options/" + userPrefix);
                        UserOptionList[] userArray = JsonConvert.DeserializeObject<UserOptionList[]>(responseContent);
                        
                    
                    return userArray;
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
                        var responseContent = await client.DownloadStringTaskAsync(Config.GATE_API + "/api/options/group/" + groupPrefix);
                        GroupOptionList[] array = JsonConvert.DeserializeObject<GroupOptionList[]>(responseContent);
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
                    client.Headers[HttpRequestHeader.ContentType] = "application/json";
                    var responseContent = await client.UploadStringTaskAsync(Config.GATE_API + "/api/Gate/group", "PATCH", content);
                    ReturnDto retObj = JsonConvert.DeserializeObject<ReturnDto>(responseContent);
                    return retObj;
                }
                catch (WebException webex)
                {
                    string content;
                    HttpWebResponse webResp = (HttpWebResponse)webex.Response;
                    using (var reader = new StreamReader(webResp.GetResponseStream(), Encoding.UTF8))
                    {
                        content = reader.ReadToEnd();
                    }
                    if (webResp.StatusCode == HttpStatusCode.BadRequest)
                    {
                        return new ReturnDto(false, content);
                    }
                    else
                    {
                        return new ReturnDto(false, webex.Message);
                    }
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
                    string content = JsonConvert.SerializeObject(groupChange);
                    client.Headers[HttpRequestHeader.ContentType] = "application/json";
                    var responseContent = await client.UploadStringTaskAsync(Config.GATE_API + "/api/Gate/group", "DELETE", content);
                    ReturnDto retObj = JsonConvert.DeserializeObject<ReturnDto>(responseContent);
                    return retObj;
                }
                catch (WebException webex)
                {
                    string content;
                    HttpWebResponse webResp = (HttpWebResponse)webex.Response;
                    using (var reader = new StreamReader(webResp.GetResponseStream(), Encoding.UTF8))
                    {
                        content = reader.ReadToEnd();
                    }
                    if (webResp.StatusCode == HttpStatusCode.BadRequest)
                    {
                        return new ReturnDto(false, content);
                    }
                    else
                    {
                        return new ReturnDto(false, webex.Message);
                    }
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
                    var responseContent = await client.UploadStringTaskAsync(Config.GATE_API + "/api/Gate/password/" + user, "PUT", user);
                    ReturnDto ret = JsonConvert.DeserializeObject<ReturnDto>(responseContent);
                    return ret;
                }
                catch (WebException webex)
                {

                    string content;
                    HttpWebResponse webResp = (HttpWebResponse)webex.Response;
                    using (var reader = new StreamReader(webResp.GetResponseStream(), Encoding.UTF8))
                    {
                        content = reader.ReadToEnd();
                    }
                    if (webResp.StatusCode == HttpStatusCode.BadRequest)
                    {
                        return new ReturnDto(false, content);
                    }
                    else
                    {
                        return new ReturnDto(false, webex.Message);
                    }
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
                    var responseContent = await client.DownloadStringTaskAsync(Config.GATE_API + "/api/Gate/userStatus/" + samAccountName);
                    UserStatus ret = JsonConvert.DeserializeObject<UserStatus>(responseContent);
                    return ret;
                }
                catch (WebException webex)
                {
                    string content;
                    HttpWebResponse webResp = (HttpWebResponse)webex.Response;
                    using (var reader = new StreamReader(webResp.GetResponseStream(), Encoding.UTF8))
                    {
                        content = reader.ReadToEnd();
                    }
                    if (webResp.StatusCode != HttpStatusCode.OK)
                    {
                        throw new Exception(content);
                    }
                    else
                    {
                        throw;
                    }
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
                    var responseContent = await client.UploadStringTaskAsync(Config.GATE_API + "/api/Gate/unlock/" + userId, "PUT", userId);
                    ReturnDto ret = JsonConvert.DeserializeObject<ReturnDto>(responseContent);
                    return ret;
                }
                catch (WebException webex)
                {
                    string content;
                    HttpWebResponse webResp = (HttpWebResponse)webex.Response;
                    using (var reader = new StreamReader(webResp.GetResponseStream(), Encoding.UTF8))
                    {
                        content = reader.ReadToEnd();
                    }
                    if (webResp.StatusCode == HttpStatusCode.BadRequest)
                    {
                        return new ReturnDto(false, content);
                    }
                    else
                    {
                        return new ReturnDto(false, webex.Message);
                    }
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

        public static ReturnDto changeDisplayName(DisplayName displayNameRequest)
        {
            Task<ReturnDto> t = Task<ReturnDto>.Run(async () =>
            {
                string displayName = JsonConvert.SerializeObject(displayNameRequest);
                try
                {
                    var responseContent = await client.UploadStringTaskAsync(Config.GATE_API + "/api/Gate/displayName", "PUT", displayName);
                    ReturnDto ret = JsonConvert.DeserializeObject<ReturnDto>(responseContent);
                    return ret;
                }
                catch (WebException webex)
                {
                    string content;
                    HttpWebResponse webResp = (HttpWebResponse)webex.Response;
                    using (var reader = new StreamReader(webResp.GetResponseStream(), Encoding.UTF8))
                    {
                        content = reader.ReadToEnd();
                    }
                    if (webResp.StatusCode == HttpStatusCode.BadRequest)
                    {
                        return new ReturnDto(false, content);
                    }
                    else
                    {
                        return new ReturnDto(false, webex.Message);
                    }
                }
            });
            try
            {
                t.Wait();
                ReturnDto res = t.Result;
                return res;
            }
            catch (Exception e)
            {
                return new ReturnDto(false, e.Message);
            }
        }



        public static ReturnDto AddMac(string macAddress)
        {
            Task<ReturnDto> t = Task<ReturnDto>.Run(async () =>
            {
                try
                {
                    var responseContent = await client.UploadStringTaskAsync(Config.GATE_API + "/api/Gate/mac/"+ macAddress, "POST");
                    ReturnDto ret = JsonConvert.DeserializeObject<ReturnDto>(responseContent);
                    return ret;
                }
                catch (WebException webex)
                {
                    string content;
                    HttpWebResponse webResp = (HttpWebResponse)webex.Response;
                    using (var reader = new StreamReader(webResp.GetResponseStream(), Encoding.UTF8))
                    {
                        content = reader.ReadToEnd();
                    }
                    if (webResp.StatusCode == HttpStatusCode.BadRequest)
                    {
                        return new ReturnDto(false, content);
                    }
                    else
                    {
                        return new ReturnDto(false, webex.Message);
                    }
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
                string changeVlan = JsonConvert.SerializeObject(changeVlanRequest);
                try
                {
                    client.Headers[HttpRequestHeader.ContentType] = "application/json";
                    var responseContent = await client.UploadStringTaskAsync(Config.GATE_API + "/api/Gate/vlan", "POST", changeVlan);
                    ReturnDto ret = JsonConvert.DeserializeObject<ReturnDto>(responseContent);
                    return ret;
                }
                catch (WebException webex)
                {
                    string content;
                    HttpWebResponse webResp = (HttpWebResponse)webex.Response;
                    using (var reader = new StreamReader(webResp.GetResponseStream(), Encoding.UTF8))
                    {
                        content = reader.ReadToEnd();
                    }
                    if (webResp.StatusCode == HttpStatusCode.BadRequest)
                    {
                        return new ReturnDto(false, content);
                    }
                    else
                    {
                        return new ReturnDto(false, webex.Message);
                    }
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
                    var responseContent = await client.DownloadStringTaskAsync(Config.GATE_API + "/api/Gate/location/");
                    string[] locations = JsonConvert.DeserializeObject<string[]>(responseContent);
                    return locations;
                }
                catch (WebException webex)
                {
                    string content;
                    HttpWebResponse webResp = (HttpWebResponse)webex.Response;
                    using (var reader = new StreamReader(webResp.GetResponseStream(), Encoding.UTF8))
                    {
                        content = reader.ReadToEnd();
                    }
                    if (webResp.StatusCode == HttpStatusCode.BadRequest)
                    {
                        return new string[0];
                    }
                    else
                    {
                        return new string[0];
                    }
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
                return new string[0];
            }

        }

        public static ReturnDto GetBitLockerPassword(string type, string input)
        {
            Task<ReturnDto> t = Task<ReturnDto>.Run(async () =>
            {
                try
                {
                    var responseContent = await client.DownloadStringTaskAsync(Config.GATE_API + "/api/Gate/Bitlocker/" + input);
                    ReturnDto ret = JsonConvert.DeserializeObject<ReturnDto>(responseContent);
                    return ret;
                }
                catch (WebException webex)
                {
                    string content;
                    HttpWebResponse webResp = (HttpWebResponse)webex.Response;
                    using (var reader = new StreamReader(webResp.GetResponseStream(), Encoding.UTF8))
                    {
                        content = reader.ReadToEnd();
                    }
                    if (webResp.StatusCode == HttpStatusCode.BadRequest)
                    {
                        return new ReturnDto(false, content);
                    }
                    else
                    {
                        return new ReturnDto(false, webex.Message);
                    }
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

        public static ReturnDto GetLapsPassword(string computerName)
        {
            Task<ReturnDto> t = Task<ReturnDto>.Run(async () =>
            {
                try
                {
                    var responseContent = await client.DownloadStringTaskAsync(Config.GATE_API + "/api/Gate/laps/" + computerName);
                    ReturnDto ret = JsonConvert.DeserializeObject<ReturnDto>(responseContent);
                    return ret;
                }
                catch (WebException webex)
                {
                    string content;
                    HttpWebResponse webResp = (HttpWebResponse)webex.Response;
                    using (var reader = new StreamReader(webResp.GetResponseStream(), Encoding.UTF8))
                    {
                        content = reader.ReadToEnd();
                    }
                    if (webResp.StatusCode == HttpStatusCode.BadRequest)
                    {
                        return new ReturnDto(false, content);
                    }
                    else
                    {
                        return new ReturnDto(false, webex.Message);
                    }
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
    }

}