const errorResponse = (error: any): { message: string } => {
  return {
    message: error?.response?.data?.message || "Có lỗi hệ thống",
  };
};

export { errorResponse };
