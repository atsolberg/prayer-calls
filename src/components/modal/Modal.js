import { Fragment, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import cx from "classnames";
import { Btn } from "../button/Button";

let modalRoot;

function TailwindModal({ children, show, onHide }) {
  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={onHide}
      >
        <div
          className={cx([
            "flex",
            "items-end",
            "justify-center",
            "min-h-screen",
            "pt-4",
            "px-4",
            "pb-20",
            "text-center",
            "sm:block",
            "sm:p-0",
          ])}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay
              className={cx([
                "fixed",
                "inset-0",
                "bg-gray-500 dark:bg-slate-900/50",
                "bg-opacity-75",
                "transition-opacity",
                "backdrop-blur",
              ])}
            />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={cx([
                "relative",
                "inline-block",
                "align-bottom",
                "bg-white dark:bg-slate-800",
                "rounded-md",
                "px-4",
                "pt-5",
                "pb-4",
                "text-left",
                "overflow-hidden",
                "shadow-xl",
                "transform",
                "transition-all",
                "sm:my-8",
                "sm:align-middle",
                "sm:max-w-sm",
                "sm:w-full",
                "sm:p-6",
              ])}
            >
              {/* Close Button */}
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <Btn
                  className={cx([
                    "bg-white dark:bg-slate-800",
                    "rounded",
                    "text-gray-400 dark:text-slate-500",
                    "hover:text-gray-500 hover:dark:text-slate-400",
                    // "focus:outline-none",
                    // "focus:ring-1",
                    // "focus:ring-offset-2",
                    // "focus:ring-sky-500",
                  ])}
                  onClick={onHide}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </Btn>
              </div>
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function Modal({ children, show, onHide }) {
  modalRoot = modalRoot || document.getElementById("modal");

  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    modalRoot.appendChild(elRef.current);
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(
    <TailwindModal show={show} onHide={onHide}>
      {children}
    </TailwindModal>,
    elRef.current
  );
}

export default Modal;
