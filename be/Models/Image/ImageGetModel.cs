using be.Entity;

namespace be.Models;


public class ImageGetModel
{
    public required string ImageFiles { get; set; }

    public static ImageGetModel ConvertEntityToModel(ImageEntity imageEntity)
    {
        return new ImageGetModel
        {
            ImageFiles = imageEntity.ImagePath
        };
    }

}