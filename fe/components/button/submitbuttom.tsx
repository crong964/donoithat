'use client'
import React from 'react'
import { useFormStatus } from 'react-dom'

export default function SubmitButton(p: { loading: React.ReactNode, children: React.ReactNode }) {
    const status = useFormStatus()
    return (
        status.pending ?
            p.loading : p.children
    )
}
