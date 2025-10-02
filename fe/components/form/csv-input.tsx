'use client'
import { Plug2 } from "lucide-react"
import { memo } from "react"
import { Button } from "@/components/ui/button"
import { iSuplier } from "../suplier/interface"

function CsvInput() {
    const onChange = async (v: React.ChangeEvent<HTMLInputElement>) => {
        const files = v.target.files
        if (files == null) {
            return
        }
        const file = files[0]
        let s = await file.text()
        let data = s.split("\n")
        console.log(data[0].split(",")[2].trim());
        let dataTmp: iSuplier[] = []
        data.forEach((v) => {
            let vs = v.split(",")
            console.log(vs);
            
            dataTmp.push({
                id: "",
                suplierAddress: "",
                suplierEmail: vs[2].trim(),
                suplierId: vs[0].trim(),
                suplierName: vs[0],
                suplierPhoneNumber: vs[1]
            })
        })
        console.log(dataTmp);
        
    }
    return (
        <>
            <label htmlFor="csvinput">
                <div className="bg-f text-sm leading-5  inline-block rounded-sm hover:bg-red-400">
                    <div className="flex gap-2 px-3 py-2 items-center  text-white">
                        <Plug2 size={14} /><p>Csv file</p>
                    </div>
                </div>
            </label>
            <input id="csvinput" accept="text/csv" type="file" onChange={onChange} className="hidden" />
        </>
    )
}

export default memo(CsvInput)