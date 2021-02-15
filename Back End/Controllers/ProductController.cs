using OnlineShopProject.Repositories;
using QuickStoreAPI.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace QuickStoreAPI.Controllers
{
    [RoutePrefix("api/products")]
    public class ProductController : ApiController
    {
        ProductRepository pRepo = new ProductRepository();
        [Route("")]
        public IHttpActionResult Get()
        {
            return Ok(pRepo.GetAll());
        }
        [Route("{id}", Name = "GetProductById")]
        public IHttpActionResult Get(int id)
        {
            return Ok(pRepo.Get(id));
        }
        [Route("")]
        public IHttpActionResult Post(Product p)
        {
                p.CreatedDate = DateTime.Now;
                pRepo.Insert(p);
                string url = Url.Link("GetProductById", new { id = p.ProductId });
                return Created(url, p);
            
        }
        [Route("{id}")]
        public IHttpActionResult Put([FromUri] int id, [FromBody] Product p)
        {
            
            p.ModifiedDate = DateTime.Now;
           // pRepo.Insert(p);
           // string url = Url.Link("GetProductById", new { id = p.ProductId });
            p.ProductId = id;
            pRepo.Update(p);
            return Ok(p);
            //}
        }
        [Route("{id}")]
        public IHttpActionResult Delete(int id)
        {
            pRepo.Delete(id);
            return StatusCode(HttpStatusCode.NoContent);
        }

        [Route("search")]
        public IHttpActionResult search(Product p)
        {
            string pro = p.ProductName;
            var product = pRepo.GetByName(pro);
            string url = Url.Link("GetProductById", new { id = p.ProductId });
            return Created(url, product);
        }

    }
}
