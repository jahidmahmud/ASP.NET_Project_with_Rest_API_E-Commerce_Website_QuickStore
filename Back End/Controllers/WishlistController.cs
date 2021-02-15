using OnlineShopProject.Repositories;
using QuickStoreAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace QuickStoreAPI.Controllers
{
    [RoutePrefix("api/wishlists")]
    public class WishlistController : ApiController
    {
        WishlistRepository wrepo = new WishlistRepository();
        [Route("")]
        public IHttpActionResult Get()
        {
            return Ok(wrepo.GetAll());
        }
        [Route("{id}", Name = "GetWishById")]
        public IHttpActionResult Get(int id)
        {
            return Ok(wrepo.Get(id));
        }
        [Route("product/{id}")]
        public IHttpActionResult GetProductByUserId(int id)
        {
            ProductRepository prepo = new ProductRepository();
            QuickStoreDB context = new QuickStoreDB();
            List<Product> p = new List<Product>();
            var pro = context.Wishlist.Where(x => x.uid == id);
            foreach (var item in pro)
            {
                var x = prepo.Get(item.pid);
                p.Add(x);
            }
            return Ok(p);
        }
        [Route("")]
        public IHttpActionResult Post(Wishlist u)
        {
            int uid = u.uid;
            int pid = u.pid;
            bool x= wrepo.check(uid,pid);
            if(x==true)
            {
                string url1 = Url.Link("GetWishById", new { id = u.wid });
                return Created(url1, u);
            }
            else
            {
                wrepo.Insert(u);
                string url = Url.Link("GetWishById", new { id = u.wid });
                return Created(url, u);
            }
        }
        [HttpPost]
        [Route("removefromwishlist")]
        public IHttpActionResult removefromwishlist(Wishlist w)
        {
            QuickStoreDB context = new QuickStoreDB();
            var p = context.Wishlist.Where(x => x.uid == w.uid && x.pid == w.pid).ToList();
            foreach(var item in p)
            {
                wrepo.Delete(item.wid);
            }
            return Ok();
        }
    }
}
