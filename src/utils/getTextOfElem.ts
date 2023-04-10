import {ReactNode} from "react";
import {FCE} from "../types";

/**
 * Recursively gets the text - also from nested elements like <span>*/
export const getTextOfElem = (elem: FCE<{children: ReactNode}>): string => {
    if (!elem.props.children) return ''
    if (!(elem.props.children instanceof Array)) return elem.props.children as string
    return elem.props.children.reduce((text, child) => (
        typeof child == 'string' // The child doesn't have children
            ? text + child
            : text + getTextOfElem(child)
    ), "")
}