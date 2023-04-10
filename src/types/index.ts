import {ComponentPropsWithoutRef, ElementType, FC, FunctionComponentElement} from "react";

export type CP<T extends ElementType> = ComponentPropsWithoutRef<T>
export type RC<T extends ElementType = 'div'> = FC<ComponentPropsWithoutRef<T>>
export type FCE<T> = FunctionComponentElement<T>

export interface RSCProps {
    params: {
        [key: string]: string
    }
    searchParams?: {
        [key: string]: string | string[] | undefined
    }
}
