using System.ComponentModel;
using System.Text.Json.Serialization;
using be.Entity;

namespace be.Models;

public class OrderPay
{

    public string OrderId { get; set; } = Guid.NewGuid().ToString();
    public PayStatus Pay { get; set; }
}