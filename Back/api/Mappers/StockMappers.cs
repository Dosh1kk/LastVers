using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Stock;
using api.Models;

namespace api.Mappers
{
    public static class StockMappers
    {
        public static StockDto ToStockDto(this Stock stockModel)
        {
            return new StockDto
            {
                Id=stockModel.Id,
                Name=stockModel.Name,
                Description=stockModel.Description,
                Category=stockModel.Category,
                Photo=stockModel.Photo,
            };
        }
    
        public static Stock ToStockFromCreateDTO(this CreateStockRequestDto stockDto)
        {
            return new Stock
            {
                Name=stockDto.Name,
                Description=stockDto.Description,
                Category=stockDto.Category,
                Photo=stockDto.Photo,
            };
        }
        public static Stock ToStockFromFMP(this FMPStock fmpStock)
        {
            return new Stock
            {
                Name=fmpStock.name,
                Description=fmpStock.description,
                Category=fmpStock.category,
                Photo=fmpStock.photo,
            };
        }
    }
}