"use client"
import { DoubleLeftOutlined, DoubleRightOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { JSX } from 'react';



export default function Pagination(p: { page: number, total: number, url: string }) {
    const margin = 2
    const pre: JSX.Element[] = []
    for (let i = p.page - 1; i > 0 && i >= p.page - margin; i--) {
        pre.push(<PaginationItem page={i} url={p.url} key={i} />)
    }

    const next: JSX.Element[] = []
    for (let i = p.page + 1; i <= p.total && i <= p.page + margin; i++) {
        next.push(<PaginationItem page={i} url={p.url} key={i} />)
    }

    const cur: JSX.Element = <button className='bg-f rounded-sm text-white  text-sm px-3 py-1.5'>{p.page}</button>

    let jumpPrev
    if (p.page - margin - 2 > 0) {
        jumpPrev = <PaginationItem children={<DoubleLeftOutlined />} page={p.page - 5} url={p.url} key={p.page - 5} />
    }
    let jumpNext
    if (p.page + margin + 2 <= p.total) {
        jumpNext = <PaginationItem page={p.page + 5}
            children={<DoubleRightOutlined />}
            url={p.url}
            key={p.page + 5} />
    }

    let nextPage
    if (p.page + 1 <= p.total) {
        nextPage = <PaginationItem showOnlyPc page={p.page + 1}
            children={<RightOutlined />}
            url={p.url}
            key={p.page + 1} />
    }
    let prePage
    if (p.page - 1 > 0) {
        prePage = <PaginationItem showOnlyPc page={p.page - 1}
            children={<LeftOutlined />}
            url={p.url}
            key={p.page - 1} />
    }
    return (
        <div className=''>
            <ul className='flex gap-2 justify-center'>
                
                {jumpPrev}
                {prePage}
                {pre.reverse()}
                {cur}
                {next}
                {nextPage}
                {jumpNext}
                
            </ul>
        </div>
    )

}

const PaginationItem = (p: {
    page: number,
    url: string,
    children?: JSX.Element,
    showOnlyPc?: boolean
}) => {
    const hrel = `${p.url}?page=${p.page}`
    return (
        <Link href={hrel} className={`${p.showOnlyPc ? 'hidden sm:block' : ''} 
        bg-white hover:no-underline! rounded-sm hover:text-white hover:bg-f text-black text-sm px-3 py-1.5`}>
            {p.children ? p.children : p.page}
        </Link>

    )
}