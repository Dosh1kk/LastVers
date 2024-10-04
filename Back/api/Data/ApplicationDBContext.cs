using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace api.Data
{
    public class ApplicationDBContext:IdentityDbContext<AppUser>
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions): base(dbContextOptions)
        {
            
        }
        public DbSet<Stock> Stocks {get;set;}
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Portfolio> Portfolios { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Portfolio>(x=>x.HasKey(z=>new {z.AppUserId,z.StockId}));

            builder.Entity<Portfolio>()
            .HasOne(y=>y.AppUser)
            .WithMany(c=>c.Portfolios)
            .HasForeignKey(v=>v.AppUserId);

            builder.Entity<Portfolio>()
            .HasOne(y=>y.Stock)
            .WithMany(c=>c.Portfolios)
            .HasForeignKey(v=>v.StockId);


            List<IdentityRole> roles = new List<IdentityRole>{
                new IdentityRole
                {
                    Name="Admin",
                    NormalizedName="ADMIN"
                },
                new IdentityRole
                {
                    Name="User",
                    NormalizedName="USER"
                },

            };
            builder.Entity<IdentityRole>().HasData(roles);

        }

    }
}