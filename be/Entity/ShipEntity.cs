namespace be.Entity
{
	public class ShipEntity
	{
		public required OrderEntity OrderEntity { get; set; }
		public int Fee { get; set; }
		public required string Status { get; set; }

		public required int ServiceTypeId { get; set; }
		public required int PaymentTypeId { get; set; }
		public required string RequiredNote { get; set; }
		public required string TotalFee { get; set; }
	}
}