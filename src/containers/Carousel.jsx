import React,{useState,useEffect} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wrap } from "popmotion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const images = [
    "https://http2.mlstatic.com/D_NQ_942388-MLA51264145748_082022-OO.webp",
    "https://http2.mlstatic.com/D_NQ_635824-MLA51168764523_082022-OO.webp",
    "https://http2.mlstatic.com/D_NQ_923401-MLA51168908741_082022-OO.webp",
    "https://http2.mlstatic.com/D_NQ_925605-MLA51183881425_082022-OO.webp",
    "https://http2.mlstatic.com/D_NQ_866834-MLA51169135176_082022-OO.webp"
];
const variants = {
    enter: (direction) => {
        return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction) => {
        return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
        };
    }
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
};

export const Carousel = () => {
    const [[page, direction], setPage] = useState([0, 0]);
    const [showRLButtons,setShowRLButtons] = useState(false);

    const imageIndex = wrap(0, images.length, page);

    const paginate = (newDirection) => {
        setPage([page + newDirection, newDirection]);
    };

    useEffect(() => {
        const interval = setInterval(() => {
          paginate(1);
        }, 4000);
        return () => clearInterval(interval);
      }, [page]);

    return (
        <>
            <motion.section
                className='carousel'
                onMouseOver={()=>{setShowRLButtons(true)}}
                onMouseLeave={()=>{setShowRLButtons(false)}}
            >
                <AnimatePresence initial={false} custom={direction}>
                    <motion.img
                        key={page}
                        src={images[imageIndex]}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);

                            if (swipe < -swipeConfidenceThreshold) {
                                paginate(1);
                            } else if (swipe > swipeConfidenceThreshold) {
                                paginate(-1);
                            }
                        }}
                    />
                </AnimatePresence>
                {showRLButtons && (
                    <>
                        <div className="next" onClick={() => paginate(1)}>
                            <FontAwesomeIcon icon="fa-solid fa-angle-right" />
                        </div>
                        <div className="prev" onClick={() => paginate(-1)}>
                            <FontAwesomeIcon icon="fa-solid fa-angle-right" />
                        </div>
                    </>
                )}
            </motion.section>


        </>
    );
}
