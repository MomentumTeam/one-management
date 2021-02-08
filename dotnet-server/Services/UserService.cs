using System;
using os_server.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace os_server.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _users;

        public UserService(IUsersDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _users = database.GetCollection<User>(settings.UsersCollectionName);
        }

        public User Get(string id) =>
            _users.Find<User>(user => user.Id.Equals(id)).FirstOrDefault();

        public User Create(User userToCreate)
        {
            _users.ReplaceOne((user) => user.Id == userToCreate.Id, userToCreate, new ReplaceOptions { IsUpsert = true});
            return userToCreate;
        }

        public void Update(string id, User userIn) =>
            _users.ReplaceOne(user => user.Id == id, userIn);

    }
}
