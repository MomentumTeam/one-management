using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace os_server.Models
{
    public class MongoFaqObj
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Question { get; set; }
        public string Answer { get; set; }

        public MongoFaqObj()
        {

        }

    }
}
