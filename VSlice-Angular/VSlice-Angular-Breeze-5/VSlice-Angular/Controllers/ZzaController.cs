using Breeze.ContextProvider;
using Breeze.ContextProvider.EF6;
using Breeze.WebApi2;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Zza.Data;

namespace VSlice_Angular.Controllers
{
    [BreezeController]
    public class ZzaController : ApiController
    {
        EFContextProvider<ZzaDbContext> _ContextProvider = new EFContextProvider<ZzaDbContext>();
        [HttpGet]
        public IQueryable<Customer> Customers()
        {
            return _ContextProvider.Context.Customers;
        }

        [HttpGet]
        public IQueryable<Product> Products()
        {
            return _ContextProvider.Context.Products;
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

        [HttpGet]
        public string Metadata()
        {
            return _ContextProvider.Metadata();
        }

        [HttpPost]
        public SaveResult SaveChanges(JObject bundle)
        {
            return _ContextProvider.SaveChanges(bundle);
        }

        [HttpPost]
        public SaveResult SaveOrder(JObject saveBundle)
        {
            return _ContextProvider.SaveChanges(saveBundle);
        }

    }
}
