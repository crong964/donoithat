"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import Link from "next/link"
import { iMainCateGory } from "@/components/category/interface"


export default function CategoryCombobox(p: { ls: iMainCateGory[] }) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const categories = p.ls
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"

                    className="w-150 justify-between"
                >
                    {value
                        ? categories.find((category) => category.slug === value)?.nameCategory
                        : "Chọn loại sản phẩm"}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-150 p-0">
                <Command>
                    <CommandInput placeholder="Search framework..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {categories.map((category) => (
                                <Link key={category.slug} href={`/admin/product?slug=${category.slug == value ? "all" : category.slug}`}>
                                    <CommandItem
                                        value={category.slug}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue)
                                            setOpen(false)
                                        }}
                                    >

                                        {category.nameCategory}
                                        <Check
                                            className={cn(
                                                "ml-auto",
                                                value === category.slug ? "opacity-100" : "opacity-0"
                                            )}
                                        />

                                    </CommandItem>
                                </Link>

                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
