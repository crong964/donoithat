interface ApiErrorItem {
  field: string;
  message: string;
}

interface ApiErrorResponse {
  success: boolean;
  message: string;
  errors: ApiErrorItem[];
}

const errorResponse = (error: any): ApiErrorResponse => {
  return error?.response?.data;
};

export { errorResponse };
