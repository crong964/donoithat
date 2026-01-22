export const _permissions = [
  {
    name: "Trang chủ",
    permission: ["home.view", "", "", ""],
  },
  {
    name: "Đăng sản phẩm",
    permission: [
      "product.view",
      "product.add",
      "product.update",
      "product.delete",
    ],
  },
  {
    name: "Loại sản phẩm",
    permission: [
      "category.view",
      "category.add",
      "category.update",
      "category.delete",
    ],
  },
  {
    name: "Nhãn hàng",
    permission: ["brand.view", "brand.add", "brand.update", "brand.delete"],
  },
  {
    name: "Nhà cung cấp",
    permission: [
      "suplier.view",
      "suplier.add",
      "suplier.update",
      "suplier.delete",
    ],
  },
  {
    name: "Đơn hàng",
    permission: ["order.view", "", "order.update", "order.delete"],
  },
  {
    name: "Người mua",
    permission: ["user.view", "user.add", "user.update", "user.delete"],
  },
  {
    name: "Nhân viên",
    permission: [
      "employee.view",
      "employee.add",
      "employee.update",
      "employee.delete",
    ],
  },
  {
    name: "Sản phẩm tồn kho",
    permission: [
      "inventory.view",
      "inventory.add",
      "inventory.update",
      "inventory.delete",
    ],
  },
  {
    name: "Hóa đơn nhập hàng",
    permission: ["import.view", "import.add", "import.update", "import.delete"],
  },
  {
    name: "Theo dõi sản phẩm nhập",
    permission: [
      "follower.inventory.view",
      "follower.inventory.add",
      "follower.inventory.update",
      "follower.inventory.delete",
    ],
  },
  {
    name: "Phân quyền",
    permission: [
      "permission.view",
      "permission.add",
      "permission.update",
      "permission.delete",
    ],
  },
];
