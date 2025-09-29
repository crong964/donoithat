using System.ComponentModel;
using System.Text.Json.Serialization;
using be.Entity;

namespace be.Models;

public class OrderUpdate
{
    
    public required string OrderId { get; set; } 
    public OrderStatus Status { get; set; }

   
}