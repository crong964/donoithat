
"use client"

import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"

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
import { iAddressComboBox } from "./interface"


export function AddressComboBox(p: iAddressComboBox) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    return (
        <Popover open={open} onOpenChange={setOpen} >
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between items-center h-12"
                >
                    {value
                        ? p.addresses.find((address) => address.addressId === value)?.title
                        : "Chọn địa chỉ bạn muốn giao"}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className=" p-0">
                <Command>
                    <CommandInput placeholder="Tìm kiếm địa chỉ..." />
                    <CommandList>
                        <CommandEmpty>Không tin thấy địa chỉ nào</CommandEmpty>
                        <CommandGroup>
                            {p.addresses.map((address) => (
                                <CommandItem
                                    key={address.addressId}
                                    value={address.addressId}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                        p.onChange({ address: address.address, id: address.addressId })
                                    }}
                                >
                                    <CheckIcon
                                        className={cn(
                                            "mr-2 h-4 w-4 w-full",
                                            value === address.addressId ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {address.title}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}