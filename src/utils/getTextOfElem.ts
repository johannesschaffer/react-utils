import type {ReactElement, ReactNode} from "react";

const isReactElement = (elem: any): elem is ReactElement => !!elem?.props?.children

/**
 * Recursively gets the text - also from nested elements like <span>*/
export const getTextOfElem = (elem: ReactNode): string => {
    if (typeof elem === 'string') return elem
    if (isReactElement(elem)) return getTextOfElem(elem.props.children)
    if (Array.isArray(elem)) return elem.map(getTextOfElem).join(' ')
    return ''
}