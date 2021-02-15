using OnlineShopProject.Repositories;
using QuickStoreAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace QuickStoreAPI.Controllers
{
    [RoutePrefix("api/sliders")]
    public class SliderController : ApiController
    {
        SliderRepository SR = new SliderRepository();
        Slider2Repository SR2 = new Slider2Repository();

        [Route("")]
        public IHttpActionResult Get()
        {
            return Ok(SR.GetAll());
        }
        [Route("{id}", Name = "GetSliderById")]
        public IHttpActionResult Get(int id)
        {
            return Ok(SR.Get(id));
        }
        [Route("")]
        public IHttpActionResult Post(SlideImage sd, HttpPostedFileBase file)
        {
            string pic = null;
            if (file != null)
            {
                pic = System.IO.Path.GetFileName(file.FileName);
                string path = System.IO.Path.Combine(HttpContext.Current.Server.MapPath("~/I_SliderImg/"), pic);
                // file is uploaded
                file.SaveAs(path);
            }
            sd.SlideImage1 = pic;
            SR.Update(sd);
            return Ok(sd);
        }

        [HttpGet]
        [Route("Slider2")]
        public IHttpActionResult Slider2()
        {
            return Ok(SR2.GetAll());
        }

        [HttpGet]
        [Route("Slider2/{id}", Name = "GetSlider2ById")]
        public IHttpActionResult Slider2(int id)
        {
            return Ok(SR.Get(id));
        }

        [HttpPost]
        [Route("Slider2")]
        public IHttpActionResult Slider2(SlideImage2 sd2, HttpPostedFileBase file)
        {
            string pic = null;
            if (file != null)
            {
                pic = System.IO.Path.GetFileName(file.FileName);
                string path = System.IO.Path.Combine(HttpContext.Current.Server.MapPath("~/I_SliderImg/"), pic);
                // file is uploaded
                file.SaveAs(path);
            }
            sd2.SlideImage = pic;
            SR2.Update(sd2);
            return Ok(sd2);
        }

    }
}
