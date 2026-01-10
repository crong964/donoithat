const errorResponse = (error: any): { message: string } => {
  return {
    message: error?.response?.data?.message || "Không thức hiện dc",
  };
};

export { errorResponse };
