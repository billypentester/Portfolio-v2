"use client"

import { useEffect, useRef } from "react"
import { useDialogStore } from "@/src/store";

export default function Dialog() {

    const isOpen = useDialogStore((state) => state.isOpen);
    const handleDialog = useDialogStore((state) => state.handleDialog);
    const content = useDialogStore((state) => state.content);

    const modalRef = useRef<HTMLDivElement | null>(null)
    const contentRef = useRef<HTMLElement | null>(null)

    useEffect(() => {
        if (isOpen) {
            const modal: any = modalRef.current
            modal.style.display = 'flex'
            setTimeout(() => {
                modal.classList.add('show')
            }, 100)
            modal.setAttribute('aria-hidden', 'false')
            document.body.style.overflow = 'hidden'
            document.body.classList.add('astroui-modal-open')
        }
    }, [isOpen])

    const dismissModal = () => {
        const modal: any = modalRef.current
        if (!modal) return
        modal.classList.remove('show')
        setTimeout(() => {
            modal.style.display = 'none'
        }, 200)
        modal.setAttribute('aria-hidden', 'true')
        document.body.style.overflow = ''
        document.body.classList.remove('astroui-modal-open')
        setTimeout(() => {
            handleDialog(false)
        }, 200)
    }

    const handleOverlayMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        const contentEl = contentRef.current
        if (contentEl && !contentEl.contains(e.target as Node)) {
            dismissModal()
        }
    }

    return (
        <>
            {
                isOpen ?
                    <div
                        role="dialog"
                        id="contact-modal"
                        aria-hidden="false"
                        className="flex modal fixed top-0 left-0 z-50 w-screen h-screen bg-black/60 items-center flex-col justify-center p-6 fade"
                        tabIndex={-1}
                        ref={modalRef}
                        onMouseDown={handleOverlayMouseDown}
                    >

                        <div className="absolute top-0 left-0 z-0 w-full h-full" tabIndex={-1}></div>

                        <article ref={contentRef} className="card w-5/6 md:w-2/3 lg:w-1/3 modal-content flex flex-col relative m-0 rounded-md bg-base-100 sm:my-16" aria-labelledby="modal-title" aria-describedby="modal-body">

                            <header className="flex p-4 items-center justify-between">
                                <h2 className="m-0 text-xl font-bold text-secondary max-w-[calc(100%-3rem)]">{content.title}</h2>
                                <button
                                    type="button"
                                    className="flex items-center justify-center w-8 h-8 rounded-full bg-transparent transition-colors duration-300 hover:bg-black/10 cursor-pointer"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={()=>dismissModal()}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="22"
                                        height="22"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        className="stroke-current text-secondary"
                                        stroke="#000000"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </header>

                            <main className="relative pb-5 px-4 pt-0">
                                <p>
                                    {content.message}
                                </p>
                            </main>

                        </article>

                    </div>
                : 
                    null
            }
            
        </>
    )
}