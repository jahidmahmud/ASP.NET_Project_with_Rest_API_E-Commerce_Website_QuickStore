using OnlineShopProject.Repositories;
using QuickStoreAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuickStoreAPI.Repositories
{
    public class CartRepository:Repository<Cart>
    {
        QuickStoreDB Context = new QuickStoreDB();
        public bool Contains(int pid,int uid)
        {

            var c= Context.Cart.Where(x => x.ProductId == pid && x.UserId == uid).ToList();
            if (c.Count() > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public List<Cart> GetAllByID(int id)
        {
            return Context.Cart.Where(x => x.UserId == id).ToList();
        }
    }
}