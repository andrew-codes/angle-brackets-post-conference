using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Breeze.WebApi;
using Breeze.WebApi.EF;
using Newtonsoft.Json.Linq;
using ValidationDemo.Models;

namespace ValidationDemo.Controllers
{
    [BreezeController]
    public class ValDemoController : ApiController
    {
        EFContextProvider<ValDemoDbContext> _ContextProvider = 
            new EFContextProvider<ValDemoDbContext>();

        public ValDemoController()
        {
            _ContextProvider.BeforeSaveEntityDelegate = BeforeSaveEntity;
        }
        [HttpGet]
        public string Metadata()
        {
            return _ContextProvider.Metadata();
        }

        [HttpGet]
        public IQueryable<User> Users()
        {
            return _ContextProvider.Context.Users;
        }

        [HttpPost]
        public SaveResult SaveChanges(JObject bundle)
        {
            return _ContextProvider.SaveChanges(bundle);
        }

        private bool BeforeSaveEntity(EntityInfo entityInfo)
        {
            User user = entityInfo.Entity as User;
            if (user != null)
            {
                // rules for User
                if (!user.CreditCard.StartsWith("5"))
                {
                    throw new EntityErrorsException(new List<EntityError> { 
                        new EntityError 
                        { 
                            EntityTypeName = user.GetType().ToString(),
                            ErrorMessage = "We only accept Mastercard",
                            PropertyName = "CreditCard",
                            ErrorName = "CreditCardValidationError",
                            KeyValues = new object[] { user.Id }
                        }
                    });
                }
            }
            return true;
        }
    }
}
