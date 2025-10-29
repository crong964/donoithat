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

            if (context.User.Any())
            {
                return;
            }
            context.User.AddRange(
                new UserEntity
                {
                    Account = "admin",
                    FullName = "Admin",
                    Password = "admin",
                    PhoneNumber = "123456789",
                }
            );
            context.SaveChanges();
        }
    }
}