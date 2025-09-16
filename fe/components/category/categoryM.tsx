"use client"
import { Menu } from "antd"
import { MenuItem } from "@/components/ui/menu"
import { iMainCateGory } from "./interface"

export default function CategoryM(p: iMainCateGory) {
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