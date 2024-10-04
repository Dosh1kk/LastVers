using System;
using api.Data;
using api.Interfaces;
using api.Models;
using api.Repository;
using api.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
builder.Services.AddControllers();
// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSwaggerGen(option =>
{
    option.SwaggerDoc("v1", new OpenApiInfo { Title = "Demo API", Version = "v1" });
    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });
    option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});

builder.Services.AddControllers().AddNewtonsoftJson(options=>{
    options.SerializerSettings.ReferenceLoopHandling=Newtonsoft.Json.ReferenceLoopHandling.Ignore;
});

builder.Services.AddDbContext<ApplicationDBContext>(options=>{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddIdentity<AppUser,IdentityRole>(options=>{
    options.Password.RequireDigit=true;
    options.Password.RequireLowercase=true;
    options.Password.RequireUppercase=true;
    options.Password.RequireNonAlphanumeric=true;
    options.Password.RequiredLength=8;

})
.AddEntityFrameworkStores<ApplicationDBContext>();

builder.Services.AddAuthentication(options=>{
    options.DefaultAuthenticateScheme=
    options.DefaultChallengeScheme=
    options.DefaultForbidScheme=
    options.DefaultScheme=
    options.DefaultSignInScheme=
    options.DefaultSignOutScheme=JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options=>{
#pragma warning disable CS8604 // Possible null reference argument.
    options.TokenValidationParameters=new TokenValidationParameters {
        ValidateIssuer=true,
        ValidIssuer=builder.Configuration["JWt:Issuer"],
        ValidateAudience=true,
        ValidAudience=builder.Configuration["JWT:Audience"],
        ValidateIssuerSigningKey=true,
        IssuerSigningKey=new SymmetricSecurityKey(
            System.Text.Encoding.UTF8.GetBytes(builder.Configuration["JWT:SigningKey"])
        )
        
    };
#pragma warning restore CS8604 // Possible null reference argument.
});

builder.Services.AddScoped<IStockRepository,StockRepository>();
builder.Services.AddScoped<ICommentRepository,CommentRepository>();
builder .Services.AddScoped<ITokenService,TokenService>();
builder .Services.AddScoped<IPortfolioRepository,PortfolioRepository>();
builder .Services.AddScoped<IFPMService,FMPService>();
builder.Services.AddHttpClient<IFPMService,FMPService>();


// "userName": "string1",
//   "email": "user1@example.com",
//   "token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQGV4YW1wbGUuY29tIiwiZ2l2ZW5fbmFtZSI6InN0cmluZzEiLCJuYmYiOjE3Mjc3OTc5NjQsImV4cCI6MTcyODQwMjc2NCwiaWF0IjoxNzI3Nzk3OTY0LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUyNDYiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUyNDYifQ.tqPew2aMOIWHe-4rrmh29wF9gyuxK8tkvNsR-1xsX9KzLsQaInmFCJHA1rSnD8gMBiT_WdfJRft-ye-86XbVKw"
// }  "password": "String111!"


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(x=>x
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowCredentials()
    //.WithOrigins("https://localhost:44351"))
    .SetIsOriginAllowed(origin=>true));

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
