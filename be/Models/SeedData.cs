using be.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

using System;
using System.Linq;

namespace be.Models;

public static class SeedData
{
    public static void Initialize(IServiceProvider serviceProvider)
    {
        using (var context = new DatabaseContext(
            serviceProvider.GetRequiredService<
                DbContextOptions<DatabaseContext>>()))
        {

            if (context.Account.Any())
            {
                return;
            }
            context.Account.AddRange(
                new AccountEntity
                {
                    Account = "admin",
                    Password = "admin",
                }
            );
            context.SaveChanges();
        }
    }
}