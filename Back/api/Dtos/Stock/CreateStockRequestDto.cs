using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Stock
{
    public class CreateStockRequestDto
    {
        [Required]

        [MaxLength(20, ErrorMessage ="Name cannot be over 20 characters")]
        public string Name {  get; set;  }=string.Empty;
        [Required]
        [MinLength(10, ErrorMessage ="Description cannot be over 10 characters")]
        public string Description { get; set; }=string.Empty;
        
        [Required]
        [MaxLength(20, ErrorMessage ="Category cannot be over 10 characters")]
        public string Category { get; set; }=string.Empty;
        [Required]
        public string Photo { get; set; }=string.Empty;
    }
}