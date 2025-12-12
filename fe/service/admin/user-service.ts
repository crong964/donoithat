import { iGetUserAdmin, iUserInAdmin } from "@/components/user/interface";
import { api } from "@/util/fetch";

export const getUserAdmin = async ({
  page,
  query,
}: iGetUserAdmin): Promise<{
  data: iUserInAdmin[];
  totalPage: number;
  page: number;
  query: string;
}> => {
  try {
    let data = await api.get(`/admin/user?query=${query}&page=${page}`);
    return data.data;
  } catch (error) {
    return { data: [], page: 0, query: "", totalPage: 0 };
  }
};
