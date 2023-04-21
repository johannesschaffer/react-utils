import {cloneElement, ReactNode} from "react";
import {FCE} from "../types";

/**
 * Adds a prop like "id" to all elements of a certain type (e.g. "h1") recursively
 * @return The transformed root element with the props in the matched children applied (immutable) & The matched elements*/
export const addPropToElems = (root: FCE<{children: ReactNode}>, type: string, prop: string, value: (elem: JSX.Element) => any) => {
    const matchedElems: JSX.Element[] = []
    
    const handleChild = (child: any) => {
        if (child.type == type) {
            const cloned = cloneElement(child, {[prop]: value(child)})
            matchedElems.push(cloned)
            return cloned
        }
        return addProp(child)
    }
    const handleChildren = (elem: FCE<{children: ReactNode}>) => {
        if (Array.isArray(elem.props.children)) return elem.props.children.map(handleChild)
        if (typeof elem.props.children === 'object') return handleChild(elem.props.children)
        // TODO: Handle types of children
        return handleChild(elem.props.children)
    }
    const addProp = (elem: FCE<{children: ReactNode}>): FCE<{children: ReactNode}> => {
        if (!(elem.props?.children)) return elem
        return {
            ...elem,
            props: {
                ...elem.props,
                children: handleChildren(elem)
            }
        }
    }
    
    return {transformed: addProp(root), matchedElems}
}