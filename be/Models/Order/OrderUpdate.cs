using System.ComponentModel;
using System.Text.Json.Serialization;
using be.Entity;

namespace be.Models;

public class OrderUpdate
{
    
    public string OrderId { get; set; } = Guid.NewGuid().ToString();
    public OrderStatus Status { get; set; }

   
}