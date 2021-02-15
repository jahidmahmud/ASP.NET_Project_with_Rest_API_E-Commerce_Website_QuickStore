using QuickStoreAPI.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace OnlineShopProject.Repositories
{
    public class Repository<T> : IRepository<T> where T : class
    {
        QuickStoreDB context = new QuickStoreDB();
        public void Delete(int id)
        {
            this.context.Set<T>().Remove(Get(id));
            this.context.SaveChanges();
        }

        public T Get(int id)
        {
            return this.context.Set<T>().Find(id);
        }

        public T GetByEmail(string email)
        {
            return this.context.Set<T>().Find(email);
        }

        public List<T> GetAll()
        {
            return this.context.Set<T>().ToList();
        }
        

        public void Insert(T entity)
        {
            this.context.Set<T>().Add(entity);
            this.context.SaveChanges();
        }

        public void Update(T entity)
        {
            this.context.Entry(entity).State = EntityState.Modified;
            this.context.SaveChanges();
        }

        
    }
}