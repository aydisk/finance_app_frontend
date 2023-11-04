import { motion, AnimatePresence } from "framer-motion";
import CrossIcon from "../icons/CrossIcon";

const dropIn = {
  hidden: {
    y: "-100vh",
    translateX: "-50%",
    opacity: 0,
  },
  visible: {
    y: "-50vh",
    translateX: "-50%",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    translateX: "-50%",
    opacity: 0,
  },
};

const backdrop = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const Modal = ({ open = false, setClose = () => {}, children }) => {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          variants={backdrop}
          className="bg-black bg-opacity-50 fixed z-50 left-0 top-0 h-full w-full"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            variants={dropIn}
            className="bg-[#f6f6f8] rounded-[20px] fixed left-[50%] z-[60] bottom-0 w-[500px] h-fit"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex flex-row justify-end items-center p-[12px]">
              <CrossIcon onClick={setClose} />
            </div>
            <div className="p-[12px]">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Modal;
