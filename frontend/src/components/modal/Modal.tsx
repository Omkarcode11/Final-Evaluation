import React, { ReactNode, useEffect, useState } from 'react';
import classes from './Modal.module.css';
import { createPortal } from 'react-dom';

type Props = {
    children: ReactNode;
    show:boolean;
    onClose:()=>void
};

const Modal = ({ show,onClose,children }: Props) => {

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if(target.classList[0]=='modal' && show){
                 onClose()
            }
        };

        document.addEventListener('click', handleClick);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    const modalRoot = document.getElementById('modal');
    if (!modalRoot) return null;

    if(!show){
        return <></>
    }

    return createPortal(
        <div className={`modal ${classes.modalContainer} `}>
            <div className={classes.content}>
                {children}
            </div>
        </div>,
        modalRoot
    );
};

export default Modal;
