"use client"
import { Menu } from "antd"
import { MenuItem } from "@/components/ui/menu"

export default function CategoryM(p: MainCateGory) {
    const item: MenuItem[] =
        [{
            label: p.name,
            key: p.id,
            children:
                p.subCa.map((v) => {
                    return {
                        label: <a className="text-text-shop font-normal" href="#">
                            {v.name}
                        </a>,
                        key: v.id
                    }
                })
        }]
    return (
        <Menu
            mode="inline"
            items={item}
            inlineIndent={0}
            forceSubMenuRender={true}
        />
    )
}