using System;
using os_server.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace os_server.Services
{
    public class FaqService
    {
        private readonly IMongoCollection<MongoFaqObj> _questions;
        public static bool MongoIsUp = true;

        public FaqService(IFaqDatabaseSettings settings)
        {
            try
            {
                var client = new MongoClient(settings.ConnectionString);
                client.ListDatabaseNames();
                var database = client.GetDatabase(settings.DatabaseName);

                _questions = database.GetCollection<MongoFaqObj>(settings.FaqCollectionName);

            }
            catch (Exception)
            {
                MongoIsUp = false;
            }

        }

        public List<MongoFaqObj> Get()
        {
     
            Task<List<MongoFaqObj>> t = Task<List<MongoFaqObj>>.Run(async () =>
            {
                try
                {
                    List<MongoFaqObj> questions = _questions.Find(faq => true).ToList();
                    return questions;
                }
                catch (Exception)
                {
                    return new List<MongoFaqObj>();
                }
            });
            t.Wait();
            List<MongoFaqObj> ret = t.Result;
            return ret;
        }

        public MongoFaqObj Create(MongoFaqObj faq)
        {
            try
            {
                _questions.InsertOne(faq);
            }
            catch(Exception)
            {

            }
            
            return faq;
        }

       public void Remove(string id) {
            try
            {
                _questions.DeleteOne(faq => faq.Id.Equals(id));
            }
            catch(Exception e)
            {
               
            }

        }

    }
}
