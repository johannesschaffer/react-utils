"use client"

import {AnimatePresence, AnimationProps, motion, Transition} from "framer-motion";
import tw from "tailwind-styled-components";
import {CloseBtn} from "./CloseBtn";
import {CP} from "../../types";

// Layout animation doesn't look good -> Flips a bit
const transition: Transition = {
    type: 'tween',
    ease: 'easeOut',
    duration: 0.23
}
const overlayAnimation: AnimationProps = {
    initial: {opacity: 0},
    animate: {opacity: 1},
    exit: {opacity: 0},
    transition
}
const contentAnimation: AnimationProps = {
    initial: {scale: 0},
    animate: {scale: 1},
    exit: {scale: 0, transition: {type: 'tween', duration: 0.35}},
    transition
}

interface Props extends CP<'div'>{
    show: boolean
    hide: () => void
    closeOnOutsideClick?: boolean
    closeBtn?: boolean
}
export const Modal = ({show, hide, closeOnOutsideClick = true, closeBtn = true, children, ...props}: Props) => (
    <AnimatePresence initial={false}>{show &&
        // With onClick, when starting the click in the form (highlighting text) then move out and leave -> triggers
        <Overlay {...overlayAnimation} onPointerDown={() => closeOnOutsideClick && hide()}>
            {/*Shouldn't apply {...props} to here, since should e.g. set overflow: hidden => Hides the close button*/}
            <ContentWrapper {...contentAnimation} onPointerDown={e => e.stopPropagation()}>
                <Content {...props}>{children}</Content>
                {closeBtn && <CloseBtn onClick={hide}/>}
            </ContentWrapper>
        </Overlay>
    }</AnimatePresence>
)

// This should cover the whole side to darken it
const Overlay = tw(motion.div)`
    bg-[rgba(0,0,0,0.5)]
    fixed z-50 inset-0
    row
`
// If Content & ContentWrapper are combined, the overflow hides the absolute button
const ContentWrapper = tw(motion.div)`
    relative
`
// With overflowing content, shouldn't display scroll bar (doesn't look good in Modal, especially with rounded corners)
const Content = tw.div`
    scrollbar-hide
    max-w-[80vw] max-h-[85vh]
    overflow-x-hidden
`
