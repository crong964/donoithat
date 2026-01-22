import ProtectAction from "@/components/permission/protect-action";
import UserHearderLayout from "@/components/route/admin/user/user-hearder-layout";
import Pagination from "@/components/ui-custom/pagination";
import { getUserAdmin } from "@/service/admin/user-service";

export default async function UserPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const page = parseInt((await searchParams)["page"] || "1");
  const query = (await searchParams)["query"] || "";
  const res = await getUserAdmin({ page: page, query: query });

  const users = res.data;
  const totalPage = res.totalPage;

  return (
    <ProtectAction permission="user.view">
      <UserHearderLayout />
      <section className="relative mt-7">
        <div className="min-h-100 my-6 overflow-x-auto bg-white">
          <table className="table-fixed lg:table-auto w-full ">
            <thead className=" ">
              <tr className="max-h-20">
                <th className="text-center pb-2 w-50">Tên người dùng</th>
                <th className="text-center pb-2 w-100">Email</th>
                <th className=" pb-2 w-50">Số điện thoại</th>
                <th className=" pb-2 w-50">Đặt hàng</th>
                <th className=" pb-2 w-50 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr
                    id={user.userId}
                    className="hover:bg-a cursor-pointer h-20"
                  >
                    <td className="text-center p-2 w-50">{user.fullName}</td>
                    <td className="text-center p-2 w-100">{user.account}</td>
                    <td className="text-center p-2">{user.phoneNumber}</td>
                    <td className="text-center p-2">{user.countOrder}</td>
                    <td className="text-right   p-2 ">Thao tác</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Pagination
          page={page}
          total={totalPage}
          url={`/admin/user?query=${query}`}
        />
      </section>
    </ProtectAction>
  );
}
