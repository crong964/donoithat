namespace be.Service;


public class ProductService : IProductService
{
    public ProductService()
    {

    }

    public int GetProduct()
    {
        return 1;
    }
}


public interface IProductService
{
    public int GetProduct();
}