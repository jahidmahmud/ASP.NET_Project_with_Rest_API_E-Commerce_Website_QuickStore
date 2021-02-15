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
    [RoutePrefix("api/shippings")]
    public class ShippingController : ApiController
    {
        ShippingRepository sRepo = new ShippingRepository();
        [Route(""), BasicAuthentication]
        public IHttpActionResult Get()
        {
            return Ok(sRepo.GetAll());
        }
        [Route("{id}", Name = "GetShippingById")]
        public IHttpActionResult Get(int id)
        {
            return Ok(sRepo.GetShippingDetails(id));
        }
        [Route("")]
        public IHttpActionResult Post(ShippingDetails u)
        {
            u.PaymentDate = DateTime.Now;
            sRepo.Insert(u);
            string url = Url.Link("GetShippingById", new { id = u.ShippingDetailId });
            return Created(url, u);
        }
    }
}
