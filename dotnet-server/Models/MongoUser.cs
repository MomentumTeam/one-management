using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace os_server.Models
{
    public class MongoUser
    {
        public string Id { get; set; }
        public string[] History { get; set; }
        public string[] Favorites { get; set; }

        public MongoUser()
        {

        }

        public MongoUser(string id)
        {
            this.Id = id;
            this.Favorites = new string[0];
            this.History = new string[0];
        }
    }
}
