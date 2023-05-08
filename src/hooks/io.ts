import {useState} from "react";

/**
 * When using a number instead of a string -> Initially always 0 instead of nothing
 * Can't even delete the 0*/
export const useNumberInput = (initial = '') => {
    const [state, setState] = useState(initial)
    return {
        value: Number(state),
        form: {value: state, onChange: (e: any) => setState(e.target.value)}
    }
}

export const useStringInput = (initial = '') => {
    const [state, setState] = useState(initial)
    return {value: state, onChange: (e: any) => setState(e.target.value)}
}