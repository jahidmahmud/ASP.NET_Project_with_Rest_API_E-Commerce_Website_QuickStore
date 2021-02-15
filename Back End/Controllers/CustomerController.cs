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
    [RoutePrefix("api/customers")]
    public class CustomerController : ApiController
    {
        NewslettetRepository nRepo = new NewslettetRepository();
        [Route("")]
        public IHttpActionResult Post(Newsletter u)
        {
            nRepo.Insert(u);
            string url = Url.Link("GetCategoryById", new { id = u.NId });
            return Created(url, u);
        }

        [HttpPost]
        [Route("contact")]
        public IHttpActionResult contact(Contact u)
        {
            ContactRepository cRepo = new ContactRepository();
            cRepo.Insert(u);
            string url = Url.Link("GetCategoryById", new { id = u.Cid });
            return Created(url, u);
        }
    }
}
