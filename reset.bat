rmdir /s /q .\be\Migrations\
del .\be\DatabaseContext.db
cd be

dotnet ef migrations add InitialCreate
dotnet ef database update