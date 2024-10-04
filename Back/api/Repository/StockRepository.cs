using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Stock;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class StockRepository : IStockRepository
    {
        private readonly ApplicationDBContext _context;
        public StockRepository(ApplicationDBContext context)
        {
            _context=context;
        }

        public async Task<Stock> CreateAsync(Stock stockModel)
        {
            await  _context.Stocks.AddAsync(stockModel);
            await _context.SaveChangesAsync();
            return stockModel;
        }

        public async Task<Stock> DeleteAsync(int id)
        {
            var stockModel=await _context.Stocks.FirstOrDefaultAsync(x=>x.Id==id);

            if(stockModel==null)
            {
                return null;
            }
            _context.Stocks.Remove(stockModel);
            await _context.SaveChangesAsync();
            return stockModel;
        }

        public async Task<List<Stock>> GetAllAsync(QueryObject query)
        {
            var stocks= _context.Stocks.Include(x=>x.Comments).ThenInclude(z=>z.AppUser).AsQueryable();
            if (!string.IsNullOrWhiteSpace(query.Description))
            {
                stocks=stocks.Where(x=>x.Description.Contains(query.Description));
            }
            if (!string.IsNullOrWhiteSpace(query.Name))
            {
                stocks=stocks.Where(x=>x.Name.Contains(query.Name));

            }

            if(!string.IsNullOrWhiteSpace(query.SortBy))
            {
                if(query.SortBy.Equals("Symbol", StringComparison.OrdinalIgnoreCase))
                {
                    stocks=query.IsDescending?stocks.OrderByDescending(x=>x.Name):stocks.OrderBy(x=>x.Name);
                }
            }

            var skipNumber=(query.PageNumber-1)*query.PAgeSize;

            return await stocks.Skip(skipNumber).Take(query.PAgeSize).ToListAsync();
        }

        public async Task<Stock?> GetByIDAsync(int id)
        {
            return await _context.Stocks.Include(x=>x.Comments).FirstOrDefaultAsync(i=>i.Id==id);
        }

        public async Task<Stock?> GetBySymbolAsync(string symbol)
        {
            return await _context.Stocks.FirstOrDefaultAsync(x=>x.Name==symbol);
        }

        public Task<bool> StockExists(int id)
        {
            return _context.Stocks.AnyAsync(x=>x.Id==id);
        }

        public async Task<Stock> UpdateAsync(int id, UpdateStockRequestDto stockDto)
        {
            var existingStock=await _context.Stocks.FirstOrDefaultAsync(x=>x.Id==id);
            if(existingStock==null)
            {
                return null;
            }
            existingStock.Name=stockDto.Name;
            existingStock.Description=stockDto.Description;
            existingStock.Category=stockDto.Category;
            existingStock.Photo=stockDto.Photo;
            
            await _context.SaveChangesAsync();

            return existingStock;
        }
    }
}