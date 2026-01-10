import { iProductState } from "@/redux/admin/product/productRedux";
import { IProductClassification } from "./interface";

const createOption = () => {
  return {
    id: `${Date.now()}`,
    name: "",
    edit: true,
  };
};
const createClassificationFormSaveToHandle = (
  data: IProductClassification[]
) => {
  let productClassification = [
    ...data.map((v) => {
      return { ...v, options: [...v.options, createOption()] };
    }),
  ];
  return productClassification;
};
const createClassificationFormHandleToSave = (
  data: IProductClassification[]
) => {
  let tmpClassifications = [
    ...data.map((v) => {
      return {
        ...v,
        edit: false,
        options: v.options
          .filter((_, ii) => {
            return ii != v.options.length - 1;
          })
          .map((option) => {
            return {
              ...option,
              edit: false,
            };
          }),
      };
    }),
  ];
  return tmpClassifications;
};

const validateData = (d: iProductState) => {
  if (d.productVariants.length == 0) {
    return {
      err: true,
      mess: `chưa có sản phẩm `,
    };
  }

  for (let i = 0; i < d.productVariants.length; i++) {
    const element = d.productVariants[i];
    if (d.imageurls[element.image]?.url.length <= 0) {
      return {
        err: true,
        mess: `sản phẩm số ${i + 1} chưa có ảnh `,
      };
    }
  }
  if (d.nameProduct.length <= 0) {
    return {
      err: true,
      mess: `sản chưa có tên`,
    };
  }

  return {
    err: false,
  };
};

export {
  createOption,
  createClassificationFormSaveToHandle,
  createClassificationFormHandleToSave,
  validateData,
};
