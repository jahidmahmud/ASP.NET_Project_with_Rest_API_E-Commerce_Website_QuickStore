using OnlineShopProject.Repositories;
using QuickStoreAPI.Attributes;
using QuickStoreAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace QuickStoreAPI.Controllers
{
    [RoutePrefix("api/categories")]

    public class CategoryController : ApiController
    {
        CategoryRepository cRepo = new CategoryRepository();
        [Route("")]
        public IHttpActionResult Get()
        {

            return Ok(cRepo.GetAll());
        }
        [Route("{id}", Name = "GetCategoryById")]
        public IHttpActionResult Get(int id)
        {
            return Ok(cRepo.Get(id));
        }
        [Route("")]
        public IHttpActionResult Post(Category u)
        {
            cRepo.Insert(u);
            string url = Url.Link("GetCategoryById", new { id = u.CategoryId });
            return Created(url,u);
        }
        [Route("{id}")]
        public IHttpActionResult Put([FromUri] int id, [FromBody] Category p)
        {
            p.CategoryId = id;
            cRepo.Update(p);
            return Ok(p);
        }

        [Route("{id}")]
        public IHttpActionResult Delete(int id)
        {
            cRepo.Delete(id);
            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}
