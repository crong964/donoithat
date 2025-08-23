"use client"
import React, { useState } from 'react';
import { Drawer } from 'antd';
import { AlignLeft } from 'lucide-react';
import App from '../layout/test';
import { category } from '@/tempdata/category';

const Sidebar = () => {
    const [open, setOpen] = useState(false);
    const [childrenDrawer, setChildrenDrawer] = useState(false);
    const [index, setIn] = useState(0)

    const [o, sO] = useState(false)
    const showDrawer = () => {
        setOpen(true);
        sO(true)
    };

    const onClose = () => {
        setChildrenDrawer(false)
        setOpen(false);
        sO(false)
    };
    const showChildrenDrawer = (i: number) => {
        setChildrenDrawer(true);

        setIn(i)
    };

    const onChildrenDrawerClose = () => {
        setChildrenDrawer(false);
        
    };


    return (
        <>
            <button onClick={showDrawer} className="lg:hidden w-11.5">
                <AlignLeft className="w-6.25 h-8.75 m-auto text-white" />
            </button>

            <Drawer
                title={<button className='block' onClick={onClose}>
                    close pa
                </button>}
                placement={'left'}
                onClose={onClose}
                closable={false}
                open={open}
                width={"90vw"}
                styles={{
                    body: { padding: 0 },
                    content: { padding: 0, position: "relative" },

                }}

            >
                <ul>
                    {
                        category.map((v, i) => {
                            return (
                                <li key={v.id}
                                    className='p-3.75 uppercase text-[14px] border-b-boder border-b-2 font-bold relative'
                                    onClick={() => {
                                        showChildrenDrawer(i)
                                    }}>
                                    {v.name}
                                    <svg className="absolute right-3.75 top-1/2 -translate-y-1/2 w-2 h-3" viewBox="0 0 8 12" role="presentation">
                                        <path stroke="currentColor" stroke-width="2" d="M2 2l4 4-4 4" fill="none" stroke-linecap="square"></path>
                                    </svg>
                                </li>
                            )
                        })
                    }
                </ul>
                <Drawer
                    title={<button className='block' onClick={onClose}>
                        close pa
                    </button>}
                    styles={{
                        body: { padding: 0 },
                        content: { padding: 0 },
                    }}
                    width={"80vw"}
                    closable={false}
                    open={childrenDrawer}
                    onClose={onChildrenDrawerClose}
                    placement='left'

                >
                    <button className='p-3.75 flex items-center w-full'
                        onClick={() => {
                            onChildrenDrawerClose()
                        }}>
                        <svg className=" rotate-180 w-2 h-3" viewBox="0 0 8 12" role="presentation">
                            <path stroke="currentColor" stroke-width="2" d="M2 2l4 4-4 4" fill="none" stroke-linecap="square"></path>
                        </svg>
                        <button className='px-2  text-[14px] '> Quay về</button>

                    </button>
                    <div className='p-3.75 uppercase text-[14px] border-b-boder border-b-2 font-bold relative'>
                        xem tất cả {category[index]?.name}
                    </div>
                    <ul>
                        {
                            category[index]?.con?.map((v, i) => {
                                return (
                                    <li key={v.id} className='p-3.75 uppercase text-[14px] border-b-boder border-b-2 '
                                        onClick={() => {
                                            showChildrenDrawer(i)
                                        }}>
                                        {v.name}

                                    </li>
                                )
                            })
                        }
                    </ul>
                </Drawer>
            </Drawer>

        </>
    );
};

export default Sidebar;