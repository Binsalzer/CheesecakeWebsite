using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CheesecakeWebsite.Data
{
    public class CheesecakeRepo
    {
        private readonly string _connection;

        public CheesecakeRepo(string connection)
        {
            _connection = connection;
        }

        public void AddOrder(Order Order)
        {
            using var context = new CheesecakeWebsiteDataContext(_connection);
            context.Orders.Add(Order);
            context.SaveChanges();
        }
    }
}
