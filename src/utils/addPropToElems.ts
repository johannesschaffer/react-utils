import {cloneElement, ReactNode} from "react";
import {FCE} from "../types";

/**
 * Adds a prop like "id" to all elements of a certain type (e.g. "h1") recursively
 * @return The transformed root element with the props in the matched children applied (immutable) & The matched elements*/
export const addPropToElems = (root: FCE<{children: ReactNode}>, type: string, prop: string, value: (elem: JSX.Element) => any) => {
    const matchedElems: JSX.Element[] = []
    
    const addProp = (elem: FCE<{children: ReactNode}>): FCE<{children: ReactNode}> => {
        if (!(elem.props?.children instanceof Array)) return elem
        return {
            ...elem,
            props: {
                ...elem.props,
                children: elem.props.children.map(child => {
                    if (child.type == type) {
                        const cloned = cloneElement(child, {[prop]: value(child)})
                        matchedElems.push(cloned)
                        return cloned
                    }
                    return addProp(child)
                })
            }
        }
    }
    
    return {transformed: addProp(root), matchedElems}
}