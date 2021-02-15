using OnlineShopProject.Repositories;
using QuickStoreAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Security;

namespace QuickStoreAPI.Controllers
{
    [RoutePrefix("api/users")]
    public class AccountController : ApiController
    {
        UserRepository usrepo = new UserRepository();
        [Route("")]
        public IHttpActionResult Get()
        {
            return Ok(usrepo.GetAll());
        }
        [Route("{id}", Name = "GetUserById")]
        public IHttpActionResult Get(int id)
        {
            return Ok(usrepo.Get(id));
        }
        [Route("")]
        public IHttpActionResult Post(Users u)
        {
            u.CreatedOn = DateTime.Now;
            usrepo.Insert(u);
            string url = Url.Link("GetUserById", new { id = u.Uid });
            return Created(url, u);
        }

        [HttpPost]
        [Route("login")]
        public IHttpActionResult login(Users u)
        {
            Users user = new Users();
            user.UEmail = u.UEmail;
            user.UPassword = u.UPassword;
            //var cUser = uRepo.GetByEmail(email);
            bool isValid = usrepo.returnValue(user);
            if (isValid)
            {
                FormsAuthentication.SetAuthCookie(u.UEmail, false);

                var cUser = usrepo.GetBySingleUser(u.UEmail, u.UPassword);
                //Session["Users"] = cUser;

                if (cUser.Count() > 0)
                {
                    return Ok(cUser);
                }
                else
                {
                    return StatusCode(HttpStatusCode.NoContent);
                }
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
        }
    }
}