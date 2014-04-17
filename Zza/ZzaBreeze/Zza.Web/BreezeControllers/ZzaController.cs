using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Breeze.WebApi;
using Newtonsoft.Json.Linq;
using Zza.Data;

namespace Zza.Web.BreezeControllers
{
    [BreezeController]
    public class ZzaController : ApiController
    {
        EFContextProvider<ZzaDbContext> _ContextProvider = new EFContextProvider<ZzaDbContext>();

        [HttpGet]
        public string Metadata()
        {
            return _ContextProvider.Metadata();
        }

        [HttpGet]
        public IQueryable<Product> Products()
        {
            return _ContextProvider.Context.Products;
        }

        [HttpGet]
        public IQueryable<Customer> Customers()
        {
            return _ContextProvider.Context.Customers;
        }

        [HttpGet]
        public IQueryable<Order> Orders()
        {
            return _ContextProvider.Context.Orders;
        }

        [HttpGet]
        public IQueryable<OrderItem> OrderItems()
        {
            return _ContextProvider.Context.OrderItems;
        }

        [HttpGet]
        public object Lookups()
        {
            var orderStatuses = _ContextProvider.Context.OrderStatuses.ToList();
            var productOptions = _ContextProvider.Context.ProductOptions.ToList();
            var productSizes = _ContextProvider.Context.ProductSizes.ToList();
            return new { orderStatuses, productOptions, productSizes };
        }

        [HttpPost]
        public SaveResult SaveChanges(JObject saveBundle)
        {
            return _ContextProvider.SaveChanges(saveBundle);
        }

        [HttpPost]
        public SaveResult SaveOrder(JObject saveBundle)
        {
            return _ContextProvider.SaveChanges(saveBundle);
        }
    }
}
