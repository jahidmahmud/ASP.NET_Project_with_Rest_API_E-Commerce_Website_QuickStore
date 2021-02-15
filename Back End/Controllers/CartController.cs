using OnlineShopProject.Repositories;
using QuickStoreAPI.Attributes;
using QuickStoreAPI.Models;
using QuickStoreAPI.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace QuickStoreAPI.Controllers
{
    [RoutePrefix("api/carts")]
    public class CartController : ApiController
    {
        CartRepository cr = new CartRepository();
        [Route("", Name = "getAll")]
        public IHttpActionResult Get()
        {
            var c = cr.GetAll();
            foreach (var item in c)
            {
                string urll = Url.Link("getAll", new { id = "" });
                string url = Url.Link("GetCartById", new { id = item.CartId });
                string url1 = Url.Link("CartPost", new { id = "" });
                string url2 = Url.Link("DeletePost", new { id = item.CartId });
                string url3 = Url.Link("UpdateCart", new { id = "" });
                string url4 = Url.Link("Addcart", new { id = "" });
                string url5 = Url.Link("removeCart", new { id = "" });
                item.Links.Add(new Link() { Url = urll, Method = "GET", Relation = "self" });
                item.Links.Add(new Link() { Url = url, Method = "GET", Relation = "GetCartById" });
                item.Links.Add(new Link() { Url = url1, Method = "POST", Relation = "CartPost" });
                item.Links.Add(new Link() { Url = url2, Method = "DELETE", Relation = "DeleteCart" });
                item.Links.Add(new Link() { Url = url3, Method = "POST", Relation = "UpdateCart" });
                item.Links.Add(new Link() { Url = url4, Method = "POST", Relation = "AddCart" });
                item.Links.Add(new Link() { Url = url5, Method = "POST", Relation = "MinusCart" });
            }
            return Ok(cr.GetAll());
        }
        [Route("{id}", Name = "GetCartById")]
        public IHttpActionResult Get(int id)
        {
            var c = cr.Get(id);

            string urll = Url.Link("getAll", new { id = "" });
            string url = Url.Link("GetCartById", new { id = c.CartId });
            string url1 = Url.Link("CartPost", new { id = "" });
            string url2 = Url.Link("DeletePost", new { id = c.CartId });
            string url3 = Url.Link("UpdateCart", new { id = "" });
            string url4 = Url.Link("Addcart", new { id = "" });
            string url5 = Url.Link("removeCart", new { id = "" });
            c.Links.Add(new Link() { Url = urll, Method = "GET", Relation = "self" });
            c.Links.Add(new Link() { Url = url, Method = "GET", Relation = "GetCartById" });
            c.Links.Add(new Link() { Url = url1, Method = "POST", Relation = "CartPost" });
            c.Links.Add(new Link() { Url = url2, Method = "DELETE", Relation = "DeleteCart" });
            c.Links.Add(new Link() { Url = url3, Method = "POST", Relation = "UpdateCart" });
            c.Links.Add(new Link() { Url = url4, Method = "POST", Relation = "AddCart" });
            c.Links.Add(new Link() { Url = url5, Method = "POST", Relation = "MinusCart" });
            return Ok(cr.Get(id));
        }
        [Route("", Name = "CartPost"),BasicAuthentication]
        public IHttpActionResult Post(Cart c)
        {
            //int q = 0;
            QuickStoreDB Context = new QuickStoreDB();
            bool p = cr.Contains(Convert.ToInt32(c.ProductId),Convert.ToInt32( c.UserId));
            int pid = Convert.ToInt32(c.ProductId);
            int uid = Convert.ToInt32(c.UserId);
            if (p == true)
            {
                var cr = Context.Cart.Where(x => x.ProductId == pid && x.UserId == uid);
                Cart cart=new Cart();
                foreach (var x in cr)
                {
                    cart.CartId = x.CartId;
                    cart.ProductId = x.ProductId;
                    cart.UserId = x.UserId;
                    cart.ProductName = x.ProductName;
                    cart.Quantity = (x.Quantity+1);
                    cart.Price = x.Price;
                    string urll = Url.Link("getAll", new { id = "" });
                    string url12 = Url.Link("GetCartById", new { id = x.CartId });
                    string url1 = Url.Link("CartPost", new { id = "" });
                    string url2 = Url.Link("DeletePost", new { id = x.CartId });
                    string url3 = Url.Link("UpdateCart", new { id = "" });
                    string url4 = Url.Link("Addcart", new { id = "" });
                    string url5 = Url.Link("removeCart", new { id = "" });
                    cart.Links.Add(new Link() { Url = urll, Method = "GET", Relation = "self" });
                    cart.Links.Add(new Link() { Url = url12, Method = "GET", Relation = "GetCartById" });
                    cart.Links.Add(new Link() { Url = url1, Method = "POST", Relation = "CartPost" });
                    cart.Links.Add(new Link() { Url = url2, Method = "DELETE", Relation = "DeleteCart" });
                    cart.Links.Add(new Link() { Url = url3, Method = "POST", Relation = "UpdateCart" });
                    cart.Links.Add(new Link() { Url = url4, Method = "POST", Relation = "AddCart" });
                    cart.Links.Add(new Link() { Url = url5, Method = "POST", Relation = "MinusCart" });
                }
                foreach (var x in cr)
                {
                    CartRepository cartRepo = new CartRepository();
                    cartRepo.Delete(x.CartId);
                    cartRepo.Insert(cart);
                }
                string url = Url.Link("GetCartById", new { id = cart.CartId });
                return Created(url, cart);
            }
            else
            {
                ProductRepository prepo = new ProductRepository();
                Product pro = new Product();
                int id = Convert.ToInt32(c.ProductId);
                pro = prepo.Get(id);
                c.ProductName = pro.ProductName;
                c.Quantity = 1;
                c.Price = Convert.ToInt32(pro.Price);
                cr.Insert(c);
                string url = Url.Link("GetCartById", new { id = c.CartId });
                return Created(url, c);
            }
        }
        [Route("{id}", Name = "DeletePost")]
        public IHttpActionResult Delete(int id)
        {
            cr.Delete(id);
            return StatusCode(HttpStatusCode.NoContent);
        }
        [HttpPost]
        [Route("update", Name = "UpdateCart")]
        public IHttpActionResult Update(Cart c)
        {
            //int q = 0;
            int id = c.CartId;
            int quan = Convert.ToInt32(c.Quantity);
            QuickStoreDB Context = new QuickStoreDB();
            var cr = Context.Cart.Where(x => x.CartId == id);
            Cart cart = new Cart();
            foreach (var x in cr)
            {
                cart.CartId = x.CartId;
                cart.ProductId = x.ProductId;
                cart.UserId = x.UserId;
                cart.ProductName = x.ProductName;
                cart.Quantity = quan;
                cart.Price = x.Price;
                string urll = Url.Link("getAll", new { id = "" });
                string url12 = Url.Link("GetCartById", new { id = x.CartId });
                string url1 = Url.Link("CartPost", new { id = "" });
                string url2 = Url.Link("DeletePost", new { id = x.CartId });
                string url3 = Url.Link("UpdateCart", new { id = "" });
                string url4 = Url.Link("Addcart", new { id = "" });
                string url5 = Url.Link("removeCart", new { id = "" });
                cart.Links.Add(new Link() { Url = urll, Method = "GET", Relation = "self" });
                cart.Links.Add(new Link() { Url = url12, Method = "GET", Relation = "GetCartById" });
                cart.Links.Add(new Link() { Url = url1, Method = "POST", Relation = "CartPost" });
                cart.Links.Add(new Link() { Url = url2, Method = "DELETE", Relation = "DeleteCart" });
                cart.Links.Add(new Link() { Url = url3, Method = "POST", Relation = "UpdateCart" });
                cart.Links.Add(new Link() { Url = url4, Method = "POST", Relation = "AddCart" });
                cart.Links.Add(new Link() { Url = url5, Method = "POST", Relation = "MinusCart" });
            }
            foreach (var x in cr)
            {
                CartRepository cartRepo = new CartRepository();
                cartRepo.Delete(x.CartId);
                cartRepo.Insert(cart);
            }
            string url = Url.Link("GetCartById", new { id = cart.CartId });
            return Created(url, cart);
        }

        [HttpPost]
        [Route("add", Name = "Addcart")]
        public IHttpActionResult Add(Cart c)
        {
            //int q = 0;
            int id = c.CartId;
            QuickStoreDB Context = new QuickStoreDB();
            var cr = Context.Cart.Where(x => x.CartId == id);
            Cart cart = new Cart();
            foreach (var x in cr)
            {
                cart.CartId = x.CartId;
                cart.ProductId = x.ProductId;
                cart.UserId = x.UserId;
                cart.ProductName = x.ProductName;
                cart.Quantity = (x.Quantity + 1);
                cart.Price = x.Price;
                string urll = Url.Link("getAll", new { id = "" });
                string url12 = Url.Link("GetCartById", new { id = x.CartId });
                string url1 = Url.Link("CartPost", new { id = "" });
                string url2 = Url.Link("DeletePost", new { id = x.CartId });
                string url3 = Url.Link("UpdateCart", new { id = "" });
                string url4 = Url.Link("Addcart", new { id = "" });
                string url5 = Url.Link("removeCart", new { id = "" });
                cart.Links.Add(new Link() { Url = urll, Method = "GET", Relation = "self" });
                cart.Links.Add(new Link() { Url = url12, Method = "GET", Relation = "GetCartById" });
                cart.Links.Add(new Link() { Url = url1, Method = "POST", Relation = "CartPost" });
                cart.Links.Add(new Link() { Url = url2, Method = "DELETE", Relation = "DeleteCart" });
                cart.Links.Add(new Link() { Url = url3, Method = "POST", Relation = "UpdateCart" });
                cart.Links.Add(new Link() { Url = url4, Method = "POST", Relation = "AddCart" });
                cart.Links.Add(new Link() { Url = url5, Method = "POST", Relation = "MinusCart" });
            }
            foreach (var x in cr)
            {
                CartRepository cartRepo = new CartRepository();
                cartRepo.Delete(x.CartId);
                cartRepo.Insert(cart);
            }
            string url = Url.Link("GetCartById", new { id = cart.CartId });
            return Created(url, cart);
        }

        [HttpPost]
        [Route("remove", Name = "removeCart")]
        public IHttpActionResult Remove(Cart crrt)
        {
            //int q = 1;
            QuickStoreDB Context = new QuickStoreDB();
            int id = crrt.CartId;
            var crr = Context.Cart.Where(x => x.CartId == id);
            Cart cart = new Cart();
            foreach (var s in crr)
            {
                if(s.Quantity > 1)
                {
                    cart.CartId = s.CartId;
                    cart.ProductId = s.ProductId;
                    cart.UserId = s.UserId;
                    cart.ProductName = s.ProductName;
                    cart.Quantity = s.Quantity - 1;
                    cart.Price = s.Price;
                }
                else
                {
                    cart.CartId = s.CartId;
                    cart.ProductId = s.ProductId;
                    cart.UserId = s.UserId;
                    cart.ProductName = s.ProductName;
                    cart.Quantity = 1;
                    cart.Price = s.Price;
                }
                string urll = Url.Link("getAll", new { id = "" });
                string url12 = Url.Link("GetCartById", new { id = s.CartId });
                string url1 = Url.Link("CartPost", new { id = "" });
                string url2 = Url.Link("DeletePost", new { id = s.CartId });
                string url3 = Url.Link("UpdateCart", new { id = "" });
                string url4 = Url.Link("Addcart", new { id = "" });
                string url5 = Url.Link("removeCart", new { id = "" });
                cart.Links.Add(new Link() { Url = urll, Method = "GET", Relation = "self" });
                cart.Links.Add(new Link() { Url = url12, Method = "GET", Relation = "GetCartById" });
                cart.Links.Add(new Link() { Url = url1, Method = "POST", Relation = "CartPost" });
                cart.Links.Add(new Link() { Url = url2, Method = "DELETE", Relation = "DeleteCart" });
                cart.Links.Add(new Link() { Url = url3, Method = "POST", Relation = "UpdateCart" });
                cart.Links.Add(new Link() { Url = url4, Method = "POST", Relation = "AddCart" });
                cart.Links.Add(new Link() { Url = url5, Method = "POST", Relation = "MinusCart" });

            }
            CartRepository cartRepo = new CartRepository();
            cartRepo.Delete(id);
            cartRepo.Insert(cart);
            string url = Url.Link("GetCartById", new { id = cart.CartId });
            return Created(url, cart);
        }

        [HttpDelete]
        [Route("CartDelete/{id}")]
        public IHttpActionResult CartDelete(int id)
        {
            var result = cr.GetAllByID(id);
            foreach(var item in result)
            {
                cr.Delete(item.CartId);
            }
            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}
