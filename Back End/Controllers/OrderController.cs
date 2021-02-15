using OnlineShopProject.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace QuickStoreAPI.Controllers
{
    [RoutePrefix("api/orders")]
    public class OrderController : ApiController
    {
        ShippingRepository sRepo = new ShippingRepository();
        [Route("")]
        public IHttpActionResult Get()
        {
            return Ok(sRepo.GetAll());
        }
    }
}
