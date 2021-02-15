using QuickStoreAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineShopProject.Repositories
{
    public class ShippingRepository : Repository<ShippingDetails>
    {
        QuickStoreDB context = new QuickStoreDB();

        public List<ShippingDetails> GetShippingDetails(int id)
        {
            return this.context.ShippingDetails.Where(x => x.Uid == id).ToList();
        }
    }
}