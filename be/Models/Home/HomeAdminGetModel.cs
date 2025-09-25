using be.Entity;

namespace be.Models;

public class HomeAdminGetModel
{
    public required int TotalProduct { set; get; }
    public required int TotalOrder { set; get; }
    public required int TotalUser { set; get; }
    public required OrderStatus[] Status { set; get; }

}