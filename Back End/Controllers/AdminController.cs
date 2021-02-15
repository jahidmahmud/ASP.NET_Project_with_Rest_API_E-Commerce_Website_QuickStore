using OnlineShopProject.Repositories;
using QuickStoreAPI.Attributes;
using QuickStoreAPI.Models;
using QuickStoreAPI.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web.Http;

namespace QuickStoreAPI.Controllers
{
     [RoutePrefix("api/admins")]
    //[RoutePrefix("api/admins")]
    public class AdminController : ApiController
    {
        ShippingRepository sRepo = new ShippingRepository();
        UserRepository uRepo = new UserRepository();
        BlogRepository bRepo = new BlogRepository();
        HitsRepository hRepo = new HitsRepository();
        [HttpGet]
        [Route("blog"), BasicAuthentication]
        public IHttpActionResult blog()
        {
            return Ok(bRepo.GetAll());
        }

        //Send News
        NewslettetRepository nRpo = new NewslettetRepository();
        [HttpPost]
        [Route("news"), BasicAuthentication]
        public IHttpActionResult news(Newsletter msg)
        {
            var emailList = nRpo.getAllSubscriber();
            for (int h = 0; h < emailList.Length; h++)
            {
                var address = emailList[h];
                var fromEmail = new MailAddress("quickstoreshop.bd@gmail.com", "QuickStore");
                var toEmail = new MailAddress(address);
                var fromEmailPassword = "Quick3@store"; // Replace with actual password
                string subject = "Hello subscriber! New Product Added";

                string body = msg.NEmail;
                var smtp = new SmtpClient
                {
                    Host = "smtp.gmail.com",
                    Port = 587,
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(fromEmail.Address, fromEmailPassword)
                };

                using (var message = new MailMessage(fromEmail, toEmail)
                {
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = true
                })
                smtp.Send(message); 
            }
            return Ok();
        }

        [HttpGet]
        [Route("TotalOrders"), BasicAuthentication]
        public IHttpActionResult TotalOrders()
        {
            return Ok(sRepo.GetAll());
        }
        [HttpGet]
        [Route("TotalUsers"), BasicAuthentication]
        public IHttpActionResult TotalUsers()
        {
            return Ok(uRepo.GetAll());
        }

        [HttpGet]
        [Route("totalHitsGet"), BasicAuthentication]
        public IHttpActionResult totalHitsGet()
        {
            return Ok(hRepo.GetAll());
        }

        [HttpPut]
        [Route("totalHitsUpdate")]
        public IHttpActionResult totalHitsUpdate([FromBody] WebsiteHits wh)
        {
            var count = hRepo.Get(1);
            count.HitsCount = count.HitsCount+1;
            hRepo.Update(count);
            return Ok(count);
        }

        [HttpGet]
        [Route("message")]
        public IHttpActionResult message()
        {
            ContactRepository cRepo = new ContactRepository();
            return Ok(cRepo.GetAll());
        }

        [HttpPost]
        [Route("reply")]
        public IHttpActionResult reply(Contact c)
        {
                var address = c.Cemail;
                var fromEmail = new MailAddress("quickstoreshop.bd@gmail.com", "QuickStore");
                var toEmail = new MailAddress(address);
                var fromEmailPassword = "Quick3@store"; // Replace with actual password
                string subject = "Reply from QuickStore";

                string body = c.Cmessage;
                var smtp = new SmtpClient
                {
                    Host = "smtp.gmail.com",
                    Port = 587,
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(fromEmail.Address, fromEmailPassword)
                };

                using (var message = new MailMessage(fromEmail, toEmail)
                {
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = true
                })
                smtp.Send(message);
            
            return Ok();
        }

        }
}
