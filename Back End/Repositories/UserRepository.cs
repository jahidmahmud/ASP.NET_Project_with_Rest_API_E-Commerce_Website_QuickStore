using QuickStoreAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineShopProject.Repositories
{
    public class UserRepository : Repository<Users>
    {
        QuickStoreDB context = new QuickStoreDB();
        //check user exist or not
        public bool returnValue(Users u)
        {
            return this.context.Users.Any(x => x.UEmail == u.UEmail && x.UPassword == u.UPassword);
        }

        public bool returnValid(string email, string password)
        {
            return this.context.Users.Any(x => x.UEmail == email && x.UPassword == password);
        }

        //check user role
        public string[] GetUserRole(string email)
        {
            var result = (from user in context.Users
                        where user.UEmail == email
                        select user.UserRole).ToArray();
            return result;
        }


        public List<Users> GetBySingleUser(string email, String password)
        {
            var data = context.Users.Where(x => x.UEmail.Equals(email) && x.UPassword.Equals(password)).ToList();
            return data;
        }

        public string CheckEmail(string email)
        {
            var getUser = (from s in context.Users where s.UEmail == email select s).FirstOrDefault().ToString();
            return getUser;
        }
    }
}