using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Extensions;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.IdentityModel.Tokens;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace api.Controllers
{
    [Route("api/portfolio")]
    [ApiController]
    public class PortfolioController: ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IStockRepository _stockRepo;
        private readonly IPortfolioRepository _portfolioRepo;
        private readonly IFPMService _fmpService;
        public PortfolioController(UserManager<AppUser> userManager, IStockRepository stockRepo,
        IPortfolioRepository portfolioRepo, IFPMService fmpService)
        {
            _userManager=userManager;
            _stockRepo=stockRepo;
            _portfolioRepo=portfolioRepo;
            _fmpService=fmpService;
        }
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserPortfolio()
        {
            var username=User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            var userPortfolio =await _portfolioRepo.GetAllPortfolio();
            return Ok(userPortfolio);
        }
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddPortfolio(string symbol)
        {
            var username=User.GetUsername();
            var appUser=await _userManager.FindByNameAsync(username);
            var stock = await _stockRepo.GetBySymbolAsync(symbol);
            

            

            // if(stock==null)
            // {
            //     stock=await _fmpService.FindStockBySymbolAsync(symbol);
            //     if (stock==null)
            //     {
            //         return BadRequest("This stock does not exist");
            //     }
            //     else {
            //         await _stockRepo.CreateAsync(stock);
            //     }
            // }

            if (stock==null)
                return BadRequest("Stock not Found");

            var userPortfolio= await _portfolioRepo.GetUserPortfolio(appUser);

            if(userPortfolio.Any(e=>e.Name.ToLower()==symbol.ToLower()))
                return BadRequest("Cannot add some stock to portfolio");

            var portfolioModel = new Portfolio{
                StockId=stock.Id,
                AppUserId=appUser.Id
            };

            await _portfolioRepo.CreateAsynsk(portfolioModel);

            if (portfolioModel==null)
            {
                return StatusCode(500,"Could not create");
            }
            else 
            {
                return Created();
            }
        }
        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeletePortfolio (string symbol)
        {
            var username=User.GetUsername();
            var appUser=await _userManager.FindByNameAsync(username);

            var userPortfolio=await _portfolioRepo.GetUserPortfolio(appUser);

            var filterStock=userPortfolio.Where(x=>x.Name.ToLower()==symbol.ToLower());

            if (filterStock.Count()==1)
            {
                await _portfolioRepo.DeletePortfolio(appUser,symbol);

            }else{
                return BadRequest("Stock not in ur portfolio");
            }
            return Ok();
        }
    }
}