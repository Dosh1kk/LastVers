using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    [Table("Stocks")]
    public class Stock
    {
        public int Id { get; set; }
        public string Name {  get; set;  }=string.Empty;
        public string Description { get; set; }=string.Empty;
        public string Category { get; set; }=string.Empty;
        public string Photo {get;set;}=string.Empty;
        public List<Comment> Comments { get; set; }=new List<Comment>();

        public List<Portfolio> Portfolios{get;set;}=new List<Portfolio>();

    }
}