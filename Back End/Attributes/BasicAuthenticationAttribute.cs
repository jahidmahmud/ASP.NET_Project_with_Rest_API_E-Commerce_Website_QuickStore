using OnlineShopProject.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Principal;
using System.Text;
using System.Threading;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace QuickStoreAPI.Attributes
{
    public class BasicAuthenticationAttribute: AuthorizationFilterAttribute
    {
        UserRepository urepo = new UserRepository();
        public override void OnAuthorization(HttpActionContext actionContext)
        {
            base.OnAuthorization(actionContext);
            if(actionContext.Request.Headers.Authorization == null)
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
            }
            else
            {
                //amFoaWRAZ21haWwuY29tOjEyMzQ1
                string authenticationToken = actionContext.Request.Headers.Authorization.Parameter;
                string decodedAuthenticationToken = Encoding.UTF8.GetString(Convert.FromBase64String(authenticationToken));
                string[] usernamePasswordArray = decodedAuthenticationToken.Split(':');
                string uname = usernamePasswordArray[0];
                string pass = usernamePasswordArray[1];
                if(urepo.returnValid(uname, pass))
                {
                    Thread.CurrentPrincipal = new GenericPrincipal(new GenericIdentity(uname), null);
                }
                else
                {
                    actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
                }
            }
        }
    }
}