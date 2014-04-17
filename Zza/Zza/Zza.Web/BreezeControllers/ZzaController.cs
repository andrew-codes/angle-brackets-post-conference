using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using Zza.Data;
using Breeze.WebApi2;
using Breeze.ContextProvider.EF6;
using Breeze.ContextProvider;

namespace Zza.Web
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
        public IQueryable<OrderItemOption> OrderItemOptions()
        {
            return _ContextProvider.Context.OrderItemOptions;
        }

        [HttpGet]
        public IQueryable<OrderStatus> OrderStatuses()
        {
            return _ContextProvider.Context.OrderStatuses;
        }

        [HttpGet]
        public IQueryable<ProductOption> ProductOptions()
        {
            return _ContextProvider.Context.ProductOptions;
        }

        [HttpGet]
        public IQueryable<ProductSize> ProductSizes()
        {
            return _ContextProvider.Context.ProductSizes;
        }

        [HttpPost]
        public SaveResult SaveChanges(JObject saveBundle)
        {
            return _ContextProvider.SaveChanges(saveBundle);
        }

    }
}
