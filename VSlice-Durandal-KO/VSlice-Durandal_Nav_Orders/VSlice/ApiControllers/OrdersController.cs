using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Zza.Data;

namespace VSlice.ApiControllers
{
    public class OrdersController : ApiController
    {
        ZzaDbContext _Context = new ZzaDbContext();
        public Order Post(Order order)
        {
            _Context.Orders.Add(order);
            _Context.SaveChanges();
            return order;
        }
    }
}
