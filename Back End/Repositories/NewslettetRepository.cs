using QuickStoreAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineShopProject.Repositories
{
    public class NewslettetRepository : Repository<Newsletter>
    {
        QuickStoreDB context = new QuickStoreDB();

        public string[] getAllSubscriber()
        {
           // var result = (from subscriber in context.Newsletter
           //               where subscriber.UEmail = GetAll
            //              select user.UserRole).ToArray();
            return context.Newsletter.Select(x => x.NEmail).OrderBy(x => x).ToArray();
        }
    }
}