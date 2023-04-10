import {AnimatePresence, AnimationProps, motion, Transition} from "framer-motion";
import tw from "tailwind-styled-components";
import {useState} from "react";
import {CP} from "../../types";
import {FA_CircleXmark_Regular, FA_CircleXmark_Solid} from "../styles/icons";

const transition: Transition = {
    type: 'tween',
    duration: 0.25,
    ease: 'easeOut'
}
const normalAnimation: AnimationProps = {
    initial: {opacity: 0},
    animate: {opacity: 1},
    exit: {opacity: 0},
    transition
}
const hoverAnimation: AnimationProps = {
    initial: {opacity: 0},
    animate: {opacity: 1},
    exit: {opacity: 0, transition: {type: 'tween', duration: 0.28, ease: 'linear'}},
    transition
}

export const CloseBtn = (props: CP<'div'>) => {
    const [hoverCloseBtn, setHoverCloseBtn] = useState(false)
    
    return (
        <Wrapper
            onMouseEnter={() => setHoverCloseBtn(true)}
            onMouseLeave={() => setHoverCloseBtn(false)}
            {...props}
        >
            <AnimatePresence> {!hoverCloseBtn
                ?
                    <CloseBtn_ key={hoverCloseBtn ? 'true' : 'false'} {...normalAnimation}>
                        <FA_CircleXmark_Regular/>
                    </CloseBtn_>
                :
                    <CloseBtn_ key={hoverCloseBtn ? 'true' : 'false'} {...hoverAnimation}>
                        <FA_CircleXmark_Solid/>
                    </CloseBtn_>
            }</AnimatePresence>
        </Wrapper>
    )
}

const Wrapper = tw.div`
    cursor-pointer
    aspect-square w-[30px]
    absolute z-10 top-0 right-0 translate-x-1/2 -translate-y-1/2
`
const CloseBtn_ = tw(motion.div)`
    absolute
    [&>svg]:w-full [&>svg]:h-full
`