using CheesecakeWebsite.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CheesecakeWebsite.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheesecakeController : ControllerBase
    {
        private readonly string _connection;

        public CheesecakeController(IConfiguration configuration)
        {
            _connection = configuration.GetConnectionString("ConStr");
        }


        [HttpPost("add")]
        public void Add(Order order)
        {
            var repo = new CheesecakeRepo(_connection);
            repo.AddOrder(order);
        }
    }
}
