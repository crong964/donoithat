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
    children: React.JSX.Element[]
    onChange(id1: number, id2: number): void
}

export default function DndkitImage(p: IDndKit) {
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
                    p.onChange(active.id as number, over.id as number)
                }
            }}

        >
            <SortableContext
                items={p.children.map((v, i) => {
                    return i
                })}
                strategy={verticalListSortingStrategy}
            >
                {p.children.map((v, i) => <SortableItem id={i} children={v}></SortableItem>)}
            </SortableContext>

        </DndContext>
    );


}

function SortableItem(props: { children: React.JSX.Element, id: number }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    props.children
    return (
        <div ref={setNodeRef} {...props.children} style={style} {...attributes} {...listeners}>

        </div>
    );
}
