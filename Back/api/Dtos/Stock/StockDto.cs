using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Comment;

namespace api.Dtos.Stock
{
    public class StockDto
    {
        public int Id { get; set; }
        public string Name {  get; set;  }=string.Empty;
        public string Description { get; set; }=string.Empty;
        public string Category { get; set; }=string.Empty;
        public string Photo { get; set; }=string.Empty;

    }
}