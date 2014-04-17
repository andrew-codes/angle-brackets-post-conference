using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Zza.Data;

namespace VSlice.ApiControllers
{
    public class CustomersController : ApiController
    {
        ZzaDbContext _Context = new ZzaDbContext();
        // GET api/<controller>
        public IEnumerable<Customer> Get()
        {
            return _Context.Customers;
        }

        // GET api/<controller>/FA4CABDC-A7E9-427D-8F38-CCBEEFB8515C
        public Customer Get(Guid id)
        {
            return _Context.Customers.FirstOrDefault(c => c.Id == id);
        }

        // POST api/<controller>
        public void Post([FromBody]Customer cust)
        {
            _Context.Customers.Add(cust);
            _Context.SaveChanges();
        }

        // PUT api/<controller>/FA4CABDC-A7E9-427D-8F38-CCBEEFB8515C
        public void Put(Guid id, [FromBody]Customer cust)
        {
            cust.Id = id;
            _Context.Customers.Attach(cust);
            _Context.Entry(cust).State = System.Data.Entity.EntityState.Modified;
            _Context.SaveChanges();
        }

        // DELETE api/<controller>/FA4CABDC-A7E9-427D-8F38-CCBEEFB8515C
        public void Delete(Guid id)
        {
            var cust = _Context.Customers.FirstOrDefault(c => c.Id == id);
            if (cust != null) _Context.Customers.Remove(cust);
            _Context.SaveChanges();
        }
    }
}