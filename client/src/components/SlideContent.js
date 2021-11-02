import React, { useState } from "react";
import { motion } from "framer-motion";

const SlideContent = (props) => {
  const [slide, setSlide] = useState();

  return (
    <motion.div animate={{ y: -300 }} className="slideContent">
      <h1>SlideContent</h1>
    </motion.div>
  );
};

export default SlideContent;
