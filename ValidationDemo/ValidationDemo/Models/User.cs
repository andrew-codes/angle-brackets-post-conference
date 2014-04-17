using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.RegularExpressions;

namespace ValidationDemo.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        //[RegularExpression("^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$",ErrorMessage="The User Key must be a GUID")]
        public Guid UserKey { get; set; }
        [StringLength(50)]
        public string Name { get; set; }
        [DataType(DataType.Date)]
        public DateTime Created { get; set; }
        [Phone]
        public string Phone { get; set; }
        [EmailAddress]
        [CustomValidation(typeof(UserValidationRules),"ValidateEmail")]
        public string Email { get; set; }
        [CreditCard]
        public string CreditCard { get; set; }
        [Url]
        public string WebSite { get; set; }
        [DataType(DataType.Currency)]
        public float Score { get; set; }
    }

    public static class UserValidationRules
    {
        public static ValidationResult ValidateEmail(string value, ValidationContext context)
        {
            if (!value.EndsWith("solliance.net"))
            {
                return new ValidationResult("Only solliance.net emails can be used");
            }
            return ValidationResult.Success;

        }
    }
}