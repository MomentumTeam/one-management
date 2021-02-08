using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace os_server.Models
{
    public class User
    {
        public string Id { get; set; }
        public string[] History { get; set; }
        public string[] Favorites { get; set; }
    }
}
