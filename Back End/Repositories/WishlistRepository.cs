using QuickStoreAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineShopProject.Repositories
{
    public class WishlistRepository : Repository<Wishlist>
    {
        QuickStoreDB Context = new QuickStoreDB();
        public void Remove(int id)
        {
            var x = this.Context.Wishlist.Where(e => e.pid == id).ToList();
            Context.Wishlist.RemoveRange(x);
            Context.SaveChanges();

        }
        public bool check(int uid,int pid)
        {
            var w = Context.Wishlist.Where(e => e.uid == uid && e.pid == pid).ToList();
            if(w.Count()>0)
            {
                return true;
            }
            else
            {
                return false;
            }

        }
    }
}