using QuickStoreAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineShopProject.Repositories
{
    public class SortingRepository : Repository<Product>
    {
        QuickStoreDB context = new QuickStoreDB();
        public List<Product> GetSorting(int id)
        {
            /*var products = Enumerable.Empty<Product>();
            var data = from p in products
                       orderby p.Sorting.SId == id descending
                       select p;
            return data.ToList();*/
            /*List<Product> product = new List<Product>();
            var result = product.Where(a => a.CategoryId == id); 
            //return this.GetAll().OrderByDescending(p => p.Sorting.SId == id).ToList();*/
            //return result.ToList();

            var productlist = context.Product
                             .OrderByDescending(x => x.ProductId)
                             .Where(x => x.SId == id);

            return productlist.ToList();
        }
    } 
}