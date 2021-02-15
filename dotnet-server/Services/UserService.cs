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
        public static bool MongoIsUp = true;

        public UserService(IUsersDatabaseSettings settings)
        {
            try
            {
                var client = new MongoClient(settings.ConnectionString);
                client.ListDatabaseNames();
                var database = client.GetDatabase(settings.DatabaseName);

                _users = database.GetCollection<MongoUser>(settings.UsersCollectionName);
            }
            catch(Exception)
            {
                MongoIsUp = false;
            }

        }

        public MongoUser Get(string id){
            try{
                MongoUser ret = _users.Find<MongoUser>(user => user.Id.Equals(id)).FirstOrDefault();
                return ret;
            }
            catch(Exception ex){
                throw;
            }
        }


        public MongoUser Create(MongoUser userToCreate)
        {
            try
            {
                _users.ReplaceOne((user) => user.Id == userToCreate.Id, userToCreate, new ReplaceOptions { IsUpsert = true });
                return userToCreate;
            }
            catch(Exception e)
            {
                throw;
            }

        }

        public void Update(string id, MongoUser userIn)
        {
            try
            {
                _users.ReplaceOne(user => user.Id == id, userIn);
            }
            catch(Exception e)
            {
                throw;
            }
        }
            

    }
}
