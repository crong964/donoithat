import UserInfor from "@/components/client/user/userinfor";
import { getUserInfor } from "@/service/user-service";

import { redirect } from "next/navigation";

export default async function UserPage() {
  const infor = await getUserInfor();
  if (infor == undefined) {
    redirect("/");
  }
  return <UserInfor {...infor} />;
}
