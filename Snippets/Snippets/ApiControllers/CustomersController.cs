using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Zza.Data;

namespace Snippets.ApiControllers
{
    public class CustomersController : ApiController
    {
        ZzaDbContext _Context = new ZzaDbContext();

        public CustomersController()
        {
            _Context.Configuration.LazyLoadingEnabled = false;
        }

        // GET /api/Customers
        public IEnumerable<Customer> GetCustomers()
        {
            return _Context.Customers.ToArray();
        }

        // GET /api/Customers/0A63A429-0A24-4C4C-9FF0-56E2DA6F8DC0
        public Customer GetCustomer(Guid id)
        {
            Customer customer = _Context.Customers.FirstOrDefault(c => c.Id == id);
            if (customer == null)
                throw new HttpResponseException(HttpStatusCode.NotFound);
            return customer;
        }

        // POST /api/Customers
        public HttpResponseMessage PostCustomer(Customer customer)
        {
            if (customer == null || customer.Id == Guid.Empty)
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            var matchingCustomerId = _Context.Customers.Where(c => c.Id == customer.Id).Select(c => c.Id).FirstOrDefault();
            if (matchingCustomerId != Guid.Empty)
                throw new HttpResponseException(HttpStatusCode.Forbidden);

            _Context.Customers.Add(customer);
            _Context.SaveChanges();
            var response = Request.CreateResponse<Customer>(HttpStatusCode.Created, customer);
            response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = customer.Id }));
            return response;

        }

        // PUT /api/Customer/ALFKI
        public Customer PutCustomer(Guid id, Customer customer)
        {
            var matchingCustomer = _Context.Customers.FirstOrDefault(c => c.Id == id);
            if (matchingCustomer == null)
                throw new HttpResponseException(HttpStatusCode.NotFound);
            SetChangedProperties(matchingCustomer, customer);
            _Context.SaveChanges();
            return matchingCustomer;
        }

        // DELETE /api/northwind/ALFKI
        public void DeleteCustomer(Guid id)
        {
            var matchingCustomer = _Context.Customers.FirstOrDefault(c => c.Id == id);
            if (matchingCustomer == null)
                throw new HttpResponseException(HttpStatusCode.NotFound);

            _Context.Customers.Remove(matchingCustomer);
            _Context.SaveChanges();
        }


        static void SetChangedProperties(object target, object source)
        {
            if (target.GetType() != source.GetType()) throw new ArgumentException("Unmatching types");
            var props = target.GetType().GetProperties();
            foreach (var prop in props)
            {
                object valTarget = prop.GetValue(target, null);
                object valSource = prop.GetValue(source, null);
                if (valTarget != null && !valTarget.Equals(valSource)) prop.SetValue(target, valSource, null);
                else prop.SetValue(target, valSource, null);
            }
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
            _Context.Dispose();
        }
    }
}
