using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Zza.Data;

namespace VSlice.ApiControllers
{
    public class OrderItemsController : ApiController
    {
        ZzaDbContext _Context = new ZzaDbContext();
        public OrderItem Post(OrderItem item)
        {
            _Context.OrderItems.Add(item);
            _Context.SaveChanges();
            return item;
        }
    }
}
