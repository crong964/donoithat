'use client'
import { Button } from "antd"
import { CloudUpload, Trash, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,

} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { IinputImage } from "./interface";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/reduxRoot";
import { addImageUrls, addStringFiles, removeImageUrls, removeStringFiles, swapImage } from "@/redux/admin/product/productRedux";

export default function ImagesInput() {
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5
            }
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );
    const imageurls = useSelector((state: RootState) => state.product.imageurls)
    const imageFiles = useSelector((state: RootState) => state.product.imageFiles)
    const dispatch = useDispatch()
    const [active, setActiveId] = useState()
    const dropHandler = (ev: React.DragEvent<any>) => {
        let urls: string[] = []
        let files: File[] = []
        ev.preventDefault();
        if (ev.dataTransfer.items) {
            [...ev.dataTransfer.items].map((item) => {
                if (item.kind === "file") {
                    const file = item.getAsFile();
                    if (file == null) {
                        return
                    }
                    urls.push(URL.createObjectURL(file))
                    files.push(file)
                }
            });
        }


        dispatch(addImageUrls(urls))
        dispatch(addStringFiles(files))
    }
    const drawOverHandler = (ev: React.DragEvent<any>) => {
        ev.preventDefault();
    }
    const removeImage = (urli: number) => {
        dispatch(removeImageUrls(urli))
        dispatch(removeStringFiles(urli))
    }

    return (
        <>
            <header>
                <div className="flex space-x-1">
                    <h1 className=" font-bold text-lg">
                        Hình ảnh
                    </h1>
                    <p className='text-red-600'>*</p>
                </div>
            </header>
            <section className="mt-3">
                <div
                    onDrop={dropHandler} onDragOver={drawOverHandler}
                    className="grid gap-2 grid-cols-6 justify-center">
                    {
                        imageurls.length > 0 ?
                            <>
                            </>
                            :
                            <div className="size-70  col-span-2 row-span-2">
                                <label htmlFor="imageurls" className="flex flex-col cursor-pointer p-2 border-2 border-black rounded-2xl  h-full justify-center items-center">
                                    <CloudUpload />
                                    <p>Draw anh Drop</p>
                                </label>
                                <input type="file" onChange={(v) => {
                                    let vfiles = v.currentTarget.files
                                    if (vfiles == null) {
                                        return
                                    }
                                    let urls: string[] = []
                                    let files: File[] = []
                                    for (let i = 0; i < vfiles.length; i++) {
                                        const e = vfiles[i];
                                        files.push(e)
                                        urls.push(URL.createObjectURL(e))
                                    }
                                    dispatch(addImageUrls(urls))
                                    dispatch(addStringFiles(files))

                                }} multiple id="imageurls" className="hidden" />
                            </div>
                    }
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragStart={({ active }) => {
                            if (!active) {
                                return;
                            }

                            setActiveId(active.id as any);
                        }}
                        onDragEnd={(ev) => {
                            const { active, over } = ev;
                            if (!active || !over) {
                                return
                            }
                            if (active.id !== over.id) {
                                dispatch(swapImage({ i1: active.id as any, i2: over.id as any }))
                            }
                            setActiveId(undefined)
                        }}

                    >
                        <SortableContext
                            items={imageurls.map((v, i) => {
                                return v
                            })}
                            strategy={verticalListSortingStrategy}
                        >
                            <>
                                {imageurls
                                    .map((url, i) => {
                                        if (i == 0) {
                                            return (
                                                <div className="size-70  col-span-2 row-span-2">
                                                    {
                                                        imageurls.length > 0 ?
                                                            <SortableItem url={url} index={i}>
                                                                <div className="p-2" >
                                                                    <div className="relative">
                                                                        <div className="absolute top-0 right-0 p-2">
                                                                            <Button onClick={() => removeImage(i)}
                                                                                icon={<Trash2 size={14} />} />
                                                                        </div>
                                                                        <img src={url} className="aspect-square shadow-2xl object-center object-cover" alt="" />
                                                                    </div>
                                                                </div>
                                                            </SortableItem>
                                                            :
                                                            <>
                                                                <label htmlFor="imageurls" className="flex flex-col cursor-pointer p-2 border-2 border-black rounded-2xl  h-full justify-center items-center">
                                                                    <CloudUpload />
                                                                    <p>Draw anh Drop</p>
                                                                </label>
                                                                <input type="file" multiple id="imageurls" className="hidden" />
                                                            </>
                                                    }
                                                </div>
                                            )
                                        }
                                        return (
                                            <SortableItem url={url} index={i} >
                                                <div className=" col-span-1 p-2">
                                                    <div className="relative">
                                                        <div className="absolute top-0 right-0 p-1">
                                                            <Button size={"middle"} onClick={() => removeImage(i)}
                                                                icon={<Trash2 size={14} />} />
                                                        </div>
                                                        <img src={url} className="aspect-square object-center object-cover shadow-2xl" alt="" />

                                                    </div>
                                                </div>
                                            </SortableItem>
                                        )
                                    })}
                                {
                                    imageurls.length == 0 && imageurls.length < 9 ?
                                        <></> :
                                        <div className="col-span-1 p-2 aspect-square">
                                            <label htmlFor="imageurls"
                                                className="flex flex-col cursor-pointer p-2 border rounded-2xl 
                                                         h-full justify-center items-center">
                                                <CloudUpload />
                                                <p>Draw anh Drop</p>
                                            </label>
                                            <input type="file" multiple id="imageurls" className="hidden" />
                                        </div>
                                }
                            </>
                            {
                                active ?
                                    <DragOverlay>
                                        <div className="p-2">
                                            <div className="relative">
                                                <img src={imageurls[active]} className="aspect-square shadow-2xl object-center object-cover" alt="" />
                                            </div>
                                        </div>
                                    </DragOverlay> : <></>
                            }
                        </SortableContext>
                    </DndContext>
                </div>
            </section>
        </>
    )
}

function SortableItem(props: { children: React.JSX.Element, index: number, url: string }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: props.index });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    props.children
    return (
        <div ref={setNodeRef} key={props.url} style={style} {...attributes} {...listeners}>
            {props.children}
        </div>
    );
}