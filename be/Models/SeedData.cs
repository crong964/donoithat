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
        using var context = new DatabaseContext(
                serviceProvider.GetRequiredService<
                        DbContextOptions<DatabaseContext>>());

        if (context.Account.Any())
        {
            return;
        }
        var account = new AccountEntity
        {
            Account = "admin",
            Password = "admin",
        };
        context.Account.Add(account);
        context.User.Add(new UserEntity
        {
            UserId = "admin",
            AccountEntity = account,
            FullName = "Chủ quán",
            Role = "admin",
            PhoneNumber = ""
        });
        context.SaveChanges();
    }
}