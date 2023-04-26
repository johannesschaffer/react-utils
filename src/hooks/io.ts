import {useState} from "react";

export const useNumberInput = (initial = 0) => {
    const [state, setState] = useState(initial)
    return {value: state, onChange: (e: any) => setState(Number(e.target.value))}
}

export const useStringInput = (initial = "") => {
    const [state, setState] = useState(initial)
    return {value: state, onChange: (e: any) => setState(String(e.target.value))}
}