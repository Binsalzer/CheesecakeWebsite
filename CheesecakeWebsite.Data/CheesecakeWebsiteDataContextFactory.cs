using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CheesecakeWebsite.Data;

public class CheesecakeWebsiteDataContextFactory : IDesignTimeDbContextFactory<CheesecakeWebsiteDataContext>
{
    public CheesecakeWebsiteDataContext CreateDbContext(string[] args)
    {
        var config = new ConfigurationBuilder()
           .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), 
           $"..{Path.DirectorySeparatorChar}CheesecakeWebsite.Web"))
           .AddJsonFile("appsettings.json")
           .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true).Build();

        return new CheesecakeWebsiteDataContext(config.GetConnectionString("ConStr"));
    }
}