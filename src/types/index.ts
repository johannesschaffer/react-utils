import {ComponentPropsWithoutRef, ElementType, FC} from "react";

// Component Props
export type CP<T extends ElementType> = ComponentPropsWithoutRef<T>
// React Component
export type RC<T extends ElementType = 'div'> = FC<ComponentPropsWithoutRef<T>>

export interface RSCProps {
    params: {
        [key: string]: string
    }
    searchParams?: {
        [key: string]: string | string[] | undefined
    }
}