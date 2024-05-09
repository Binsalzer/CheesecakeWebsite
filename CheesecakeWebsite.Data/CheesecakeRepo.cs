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

        public List<Order> GetAll()
        {
            using var context = new CheesecakeWebsiteDataContext(_connection);
            return context.Orders.ToList();
        }

        public Order GetOrderById(int id)
        {
            using var context = new CheesecakeWebsiteDataContext(_connection);
            return context.Orders.FirstOrDefault(o => o.Id == id);
        }
    }
}
