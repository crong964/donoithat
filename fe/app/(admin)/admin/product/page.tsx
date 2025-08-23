"use client"
import data from "@/tempdata/data";
import { Button, Table, TableColumnsType } from "antd"
import Link from "next/link";


interface DataType {
    featured_image: string;
    title: string;
    type: string;
    price: number;
}
const dataSource: DataType[] =
    data.map((v) => {
        return {
            featured_image: v.featured_image,
            price: v.price,
            title: v.title,
            type: v.type
        }
    })

const columns: TableColumnsType<DataType> = [
    {
        title: 'Ảnh',
        dataIndex: 'featured_image',
        key: 'featured_image',
        render: (v, record, index) => {
            return <div className=" flex justify-center">
                <img src={v == "" ? '/no_image.jpg' : v} className="h-25 " alt={record.title} /></div>
        },
        width: 150

    },
    {
        title: 'title',
        dataIndex: 'title',
        key: 'title',
        width: 150
    },
    {
        title: 'thuộc loại',
        dataIndex: 'type',
        key: 'type',
        width: 200
    },
    {
        title: 'price',
        dataIndex: 'price',
        key: 'price',
        width: 200
    },
    {
        title: "Hành động",
        key: "action",
        render: (value, record, index) => {
            return (
                <div className="grid grid-cols-2 gap-1.5">
                    <Button href="/admin/product/add" className="" type="default" >
                        Xem chi tiết
                    </Button>
                    <Button className="" type="primary" >
                        Thêm
                    </Button>
                    <Button className="" type="primary" >
                        Thêm
                    </Button>
                </div>
            )
        },
        width: 200
    }
];
const IndexPage = () => {
    return (
        <>
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">Danh sách sản phẩm</h1>

            </div>
            <div className="my-5">
                <Link href="/admin/product/add" >
                    <Button type="default">
                        Thêm sản phầm
                    </Button>
                </Link>
            </div>
            <div className="min-w-2xl">
                <Table
                    bordered={true}
                    dataSource={dataSource} columns={columns} />;
            </div>
        </>
    )
}


export default IndexPage

