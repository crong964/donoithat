import AddressAdd from "@/components/address/address-add"
import AddressRow from "@/components/address/address-row"
import { Button } from "@/components/ui/button"
import { getAllAddresses } from "@/service/address-service"

export default async function AddressPage() {
    const ls = await getAllAddresses()
    return (
        <>
            <div className="p-3.75">
                <AddressAdd />
            </div>
            <div className="p-3">
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="text-left">
                                Nhãn địa chỉ
                            </th>
                            <th className="text-left">
                                Địa chỉ
                            </th>
                            <th className="text-left">
                                Hành động
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ls.map((v) => {
                                return (
                                    <AddressRow {...v} key={v.addressId} />
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>

    )
}