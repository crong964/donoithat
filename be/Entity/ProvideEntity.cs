using System.Text.Json.Serialization;

namespace be.Entity;

[JsonConverter(typeof(JsonStringEnumConverter<PayStatus>))]
public enum ProvideStatus
{
    [JsonStringEnumMemberName("Còn cung cấp")]
    Yes,

     [JsonStringEnumMemberName("Không cung cấp")]
    No
}
public class ProvideEntity
{
    public required SuplierEntity SuplierEntity { set; get; }
    public required ProductVariantEntity ProductVariantEntity { get; set; }
   public ProvideStatus Pay { get; set; } = ProvideStatus.Yes;
}