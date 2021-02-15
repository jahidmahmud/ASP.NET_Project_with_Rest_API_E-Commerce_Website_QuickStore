using QuickStoreAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineShopProject.Repositories
{
    public class ProductRepository : Repository<Product>
    {
        QuickStoreDB Context = new QuickStoreDB();
        public List<Product> GetTopProducts(int top)
        {
            return this.GetAll().OrderByDescending(x => x.Price).Take(top).ToList();
        }

        //search
        public List<Product> GetByName(string name)
        {
            List<Product> pro = Context.Product.ToList().Where(e => e.ProductName.StartsWith(name) 
             || e.ProductName.Contains(name) || e.ProductName.Equals(name) ||
            e.ProductName.ToLower().StartsWith(name) || e.ProductName.ToLower().Contains(name) || e.ProductName.ToLower().Equals(name)).ToList();
            return pro;
        }
    }
}