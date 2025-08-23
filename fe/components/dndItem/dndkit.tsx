'use client'
import React, { useState } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,

} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

interface IDndKit {
    children: React.FC[]
    onChange(index1: number, index2: number): void
}

export default function Dndkit(p: IDndKit) {
    const [items, setItems] = useState([1, 2, 3]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );
    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={(ev) => {
                const { active, over } = ev;
                if (!active || !over) {
                    return
                }
                if (active.id !== over.id) {
                    const oldIndex = items.indexOf(active.id as any);
                    const newIndex = items.indexOf(over.id as any);
                    //p.onChange(oldIndex, newIndex)
                    console.log(active.id, over.id);

                    setItems((items) => {
                        return arrayMove(items, active.id as any, over.id as any);
                    });
                }
            }}

        >
            <SortableContext
                items={items.map((_, i) => {
                    return i
                })}
                strategy={verticalListSortingStrategy}
            >
                {items.map((id, i) => <SortableItem g={i} id={id} />)}
            </SortableContext>

        </DndContext>
    );


}

function SortableItem(props: { id: number, g: number }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: props.g });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} onClick={()=>{
            alert("f")
        }} key={props.id} style={style} {...attributes} {...listeners}>
            {props.id}
        </div>
    );
}
