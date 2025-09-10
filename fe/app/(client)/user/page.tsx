import UserInfor from "@/components/client/user/userinfor"
import { getUserInfor, logoutUser } from "@/service/userService"
import Form from "next/form"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function UserPage() {
    const infor = await getUserInfor()
    if (infor == undefined) {
        redirect("/")
    }
    return (
        <UserInfor {...infor}>

        </UserInfor>
    )
}