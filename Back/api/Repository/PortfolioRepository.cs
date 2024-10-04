using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class PortfolioRepository : IPortfolioRepository
    {
        private readonly ApplicationDBContext _context;
        public PortfolioRepository(ApplicationDBContext context)
        {
            _context=context;
        }

        public async Task<Portfolio> CreateAsynsk(Portfolio portfolio)
        {
            await _context.Portfolios.AddAsync(portfolio);
            await _context.SaveChangesAsync();
            return portfolio;
        }

        public async Task<Portfolio> DeletePortfolio(AppUser appUser, string symbol)
        {
            var portfolioModel=await _context.Portfolios.FirstOrDefaultAsync(x=>x.AppUserId==appUser.Id&&x.Stock.Name.ToLower()==symbol.ToLower());

            if(portfolioModel==null)
            {
                return null;
            }
            _context.Portfolios.Remove(portfolioModel);
            await _context.SaveChangesAsync();
            return portfolioModel;
        }

        public async Task<List<Stock>> GetUserPortfolio(AppUser user)
        {
            return await _context.Portfolios.Where(x=>x.AppUserId==user.Id)
            .Select(stock=>new Stock
            {
                Id=stock.StockId,
                Name=stock.Stock.Name,
                Description=stock.Stock.Description,
                Category=stock.Stock.Category,
                Photo=stock.Stock.Photo
            }).ToListAsync();
        }
        public async Task<List<Stock>> GetAllPortfolio()
        {
            return await _context.Portfolios
            .Select(stock=>new Stock
            {
                Id=stock.StockId,
                Name=stock.Stock.Name,
                Description=stock.Stock.Description,
                Category=stock.Stock.Category,
                Photo=stock.Stock.Photo,
            }).ToListAsync();
        }
    }
}