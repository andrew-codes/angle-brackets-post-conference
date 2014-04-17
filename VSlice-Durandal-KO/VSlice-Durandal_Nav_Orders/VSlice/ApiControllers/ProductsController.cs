using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Zza.Data;

namespace VSlice.ApiControllers
{
    public class ProductsController : ApiController
    {
        ZzaDbContext _Context = new ZzaDbContext();
        public IEnumerable<Product> Get()
        {
            return _Context.Products;
        }
    }
}
