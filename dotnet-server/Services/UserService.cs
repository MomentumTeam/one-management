using System;
using os_server.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace os_server.Services
{
    public class UserService
    {
        private readonly IMongoCollection<MongoUser> _users;

        public UserService(IUsersDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _users = database.GetCollection<MongoUser>(settings.UsersCollectionName);
        }

        public MongoUser Get(string id) =>
            _users.Find<MongoUser>(user => user.Id.Equals(id)).FirstOrDefault();

        public MongoUser Create(MongoUser userToCreate)
        {
            _users.ReplaceOne((user) => user.Id == userToCreate.Id, userToCreate, new ReplaceOptions { IsUpsert = true});
            return userToCreate;
        }

        public void Update(string id, MongoUser userIn) =>
            _users.ReplaceOne(user => user.Id == id, userIn);

    }
}
