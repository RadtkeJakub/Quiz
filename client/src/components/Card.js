import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";

const Card = ({ additionalClass, front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const cardFlip = (e) => {
    if (back && !isFlipped) {
      e.preventDefault();
      setIsFlipped(true);
    }
  };

  const variants = {
    flip: {
      rotateY: [0, 90, 180],
      transition: { duration: 1, times: [0, 0.5, 1] },
    },
    initial: {
      rotateY: [180, 90, 0],
      transition: { duration: 1, times: [0, 0.5, 1] },
    },
  };

  const backVariants = {
    backFlip: {
      opacity: 1,
      rotateY: -180,
      transition: { duration: 0.1, delay: 0.4 },
      transitionEnd: {
        zIndex: 1,
        cursor: "default",
      },
    },
    backInitial: {
      opacity: 0,
      rotateY: -180,
      transition: { duration: 0.1, delay: 0.4 },
      transitionEnd: {
        zIndex: -1,
      },
    },
  };

  const frontVariants = {
    frontFlip: {
      opacity: 0,
      transition: { duration: 0.1, delay: 0.4 },
      transitionEnd: {
        zIndex: -1,
      },
    },
    frontInitial: {
      opacity: 1,
      transition: { duration: 0.1, delay: 0.4 },
      transitionEnd: {
        zIndex: 1,
      },
    },
  };

  return (
    <motion.div
      whileHover={{
        translateY: -10,
        transition: { duration: 0.3 },
      }}
      className={`card ${additionalClass || ""}`}
      variants={variants}
      initial="initial"
      animate={isFlipped ? "flip" : "initial"}
      onClick={cardFlip}
    >
      <motion.div
        className="card-front"
        variants={frontVariants}
        animate={isFlipped ? "frontFlip" : "frontInitial"}
        initial="frontInitial"
      >
        {front}
      </motion.div>
      {back && (
        <motion.div
          className="card-back"
          variants={backVariants}
          animate={isFlipped ? "backFlip" : "backInitial"}
          initial="backInitial"
        >
          {back}
          <div className="card__arrow" onClick={() => setIsFlipped(false)}>
            <FontAwesomeIcon icon={faLongArrowAltLeft} />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Card;
