"use client"
import { DoubleLeftOutlined, DoubleRightOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { JSX } from 'react';



export default function PaginationHandle(p: { page: number, total: number, url: string, onClick(s: string): void }) {
    const margin = 5
    const pre: JSX.Element[] = []
    for (let i = p.page - 1; i > 0 && i >= p.page - margin; i--) {
        pre.push(<PaginationItem onClick={p.onClick} page={i} url={p.url} key={i} />)
    }

    const next: JSX.Element[] = []
    for (let i = p.page + 1; i <= p.total && i <= p.page + margin; i++) {
        next.push(<PaginationItem onClick={p.onClick} page={i} url={p.url} key={i} />)
    }

    const cur: JSX.Element = <button className='bg-f rounded-sm text-white  text-sm px-3 py-1.5'>{p.page}</button>

    return (
        <div className=''>
            <ul className='flex gap-2 justify-center'>
                {pre.reverse()}
                {cur}
                {next}
            </ul>
        </div>
    )

}

const PaginationItem = (p: {
    page: number,
    url: string,
    children?: JSX.Element,
    showOnlyPc?: boolean,
    onClick(s: string): void
}) => {
    const hrel = `${p.url}&page=${p.page}`
    return (
        <button type='button' onClick={() => {
            p.onClick(hrel)
        }} className={`${p.showOnlyPc ? 'hidden sm:block' : ''} 
        bg-white hover:no-underline! rounded-sm hover:text-white hover:bg-f text-black text-sm px-3 py-1.5`}>
            {p.children ? p.children : p.page}
        </button>

    )
}