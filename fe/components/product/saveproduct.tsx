'use client'

import { useEffect } from "react";
import { iProduct } from "./interface";

export default function SaveProduct(p: iProduct) {
    useEffect(() => {
        const ls = JSON.parse(localStorage.getItem("ls") || "{}")
        if (ls[p.slug] == null) {
            ls[p.slug] = p
        }
        localStorage.setItem("ls", JSON.stringify(ls));
        return () => {

        };
    }, [p]);
    return <></>
}