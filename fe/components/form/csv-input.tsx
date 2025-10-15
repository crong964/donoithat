'use client'
import { Plug2, UploadCloud } from "lucide-react"
import { memo } from "react"


function CsvInput(p: { onChange(s: string): void }) {
    const onChange = async (v: React.ChangeEvent<HTMLInputElement>) => {
        const files = v.target.files
      
        
        if (files == null) {
            return
        }
        const file = files[0]
        let s = await file.text()
        p.onChange(s)


    }
    return (
        <>
            <label htmlFor="csvinput">
                <div className="bg-f text-sm leading-5  inline-block rounded-sm hover:bg-red-400">
                    <div className="flex gap-2 px-3 py-2 items-center  text-white">
                        <UploadCloud size={16} /><p>Tải CSV</p>
                    </div>
                </div>
            </label>
            <input id="csvinput" accept="text/csv" type="file" onChange={onChange} className="hidden" />
        </>
    )
}

export default memo(CsvInput)