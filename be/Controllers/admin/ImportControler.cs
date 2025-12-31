using System.Threading.Tasks;
using be.Entity;
using be.Models;
using be.Service;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace be.Controllers;

[ApiController]
[Route("api/admin/import")]
public class ImportControler(DatabaseContext context, IUserService userService, ILogger<ImportControler> logger) : ControllerBase
{
	readonly private DatabaseContext _context = context;
	readonly private ILogger<ImportControler> _logger = logger;
	readonly private IUserService _userService = userService;
	[HttpGet]
	public async Task<ActionResult> GetAll()
	{

		var query = from import in _context.ImportEntity
								join suplier in _context.Suplier on
								import.SuplierEntity equals suplier into tempSupliers
								from tempSuplier in tempSupliers.DefaultIfEmpty()


								select new
								{
									import.ImportId,
									import.ReceivedDate,
									import.TotalMoney,
									import.PurchaseInvoiceId,
									tempSuplier.SuplierId,
									tempSuplier.SuplierName
								};

		var ls = await query.ToArrayAsync();

		return Ok(ls);
	}
	[HttpPost]
	public async Task<ActionResult> Create(ImportAddAdminModel importAddAdminModel)
	{

		var transaction = await _context.Database.BeginTransactionAsync();

		var suplier = await _context.Suplier
		.Where(x => x.Id == importAddAdminModel.SuplierId)
		.FirstOrDefaultAsync();

		if (suplier == null)
		{
			return BadRequest(new
			{
				message = "Không có nhà cung cấp này"
			});
		}
		var userId = _userService.GetUserId(HttpContext);
		if (userId == null)
		{
			return BadRequest(new
			{
				message = "Chưa đăng nhập"
			});
		}
		_logger.LogInformation(userId);
		var user = await _context.User.Where(x => x.UserId.Equals(userId)).FirstOrDefaultAsync();
		if (user == null)
		{
			return BadRequest(new
			{
				message = "không có người này"
			});
		}
		try
		{
			var importEntity = new ImportEntity
			{
				ReceivedDate = importAddAdminModel.ReceivedDate,
				SuplierEntity = suplier,
				TotalMoney = 0,
				UserEntity = user,
				PurchaseInvoiceId = importAddAdminModel.PurchaseInvoiceId
			};
			List<ImportDetailEntity> importDetails = [];
			long importTotlePrice = 0;
			foreach (var importProduct in importAddAdminModel.ImportVariantProducts)
			{
				var importProductQuality = importProduct.Quality;
				var productVariant = await _context
				.ProductVariant
				.Include(x => x.ProductEntity)
				.Where(x => x.ProductVariantId.Equals(importProduct.ProductVariantId))
				.FirstOrDefaultAsync();
				if (productVariant == null)
				{
					continue;
				}
				var provide = await _context.Provide.
				Where(x => x.ProductVariantEntity == productVariant && x.SuplierEntity == suplier)
				.FirstOrDefaultAsync();

				if (provide != null)
				{
					provide.ReceiedQuality += importProductQuality;
				}

				if (productVariant.ProductEntity != null)
				{
					productVariant.ProductEntity.Quality += importProductQuality;
				}

				productVariant.Quality += importProductQuality;
				if (productVariant.ImportPrice < importProduct.ImportPrice)
				{
					productVariant.ImportPrice = importProduct.ImportPrice;
				}

				var importDetail = new ImportDetailEntity
				{
					ImportEntity = importEntity,
					ProductVariantEntity = productVariant,
					Price = importProduct.ImportPrice,
					Quality = importProductQuality
				};

				importTotlePrice += importProduct.ImportPrice * importProductQuality;
				importDetails.Add(importDetail);

			}
			importEntity.TotalMoney = importTotlePrice;

			if (importDetails.Count <= 0)
			{
				await transaction.RollbackAsync();

				return BadRequest(new { message = "Không có sản phẩm" });
			}

			await _context.ImportEntity.AddAsync(importEntity);
			await _context.ImportDetailEntity.AddRangeAsync(importDetails);

			await _context.SaveChangesAsync();
			await transaction.CommitAsync();
		}
		catch (System.Exception)
		{
			await transaction.RollbackAsync();
			return BadRequest(new { message = "Có lỗi khi thêm" });
		}

		return Ok();
	}


	[HttpGet("detail")]
	public async Task<ActionResult> Detail(string importId)
	{
		if (importId == null)
		{
			return BadRequest(new { message = "Chưa có id" });
		}

		var queryImport = from tempImport in _context.ImportEntity

											join user in _context.User on
											tempImport.UserEntity equals user into tempUsers
											from tempUser in tempUsers.DefaultIfEmpty()

											join suplier in _context.Suplier on
											tempImport.SuplierEntity equals suplier into tempSupliers
											from tempsuplier in tempSupliers.DefaultIfEmpty()

											where tempImport.ImportId == importId
											select new
											{
												tempImport,
												tempUser,
												tempsuplier
											};

		var import = await queryImport.FirstOrDefaultAsync();
		if (import == null)
		{
			return BadRequest(new { message = "không có hóa đơn này" });
		}
		var productVariantModal = await _context
		.ImportDetailEntity
		.Include(x => x.ProductVariantEntity)
		.Where(x => x.ImportEntity.ImportId == importId)
		.Select(x => ProductImportDetailAdminModel.Convert(x))
		.ToArrayAsync();
		var importModel = ImportDetailGetAdmin.Convert(import.tempImport, import.tempUser, import.tempsuplier);


		return Ok(
			new { import = importModel, ls = productVariantModal }
		);
	}

}
