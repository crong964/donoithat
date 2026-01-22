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
        var role = new RoleEntiry
        {
            Permission = "",
            RoleName = "super admin",
            RoleId = "superadmin"
        };
        var roleUser = new RoleEntiry
        {
            Permission = "",
            RoleName = "người dùng",
            RoleId = "user"
        };

        var account = new AccountEntity
        {
            Account = "admin",
            Password = "admin",
        };

        context.Account.Add(account);
        context.Role.AddRange([role, roleUser]);

        context.User.Add(new UserEntity
        {
            UserId = "admin",
            AccountEntity = account,
            FullName = "Chủ quán",
            RoleEntiry = role,
            PhoneNumber = ""
        });
        context.SaveChanges();
    }
}