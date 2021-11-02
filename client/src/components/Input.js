import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Input({ label, name, type, reference, err, watcher }) {
  const [showLine, setShowLine] = useState(false);

  const variants = {
    init: {
      width: 0,
      transition: {
        duration: 0.6,
      },
    },
    animate: {
      width: "100%",
      transition: {
        duration: 0.6,
      },
    },
  };

  console.log(watcher);

  return (
    <label htmlFor={name}>
      <p
        className={`form__name ${watcher ? !err && "form__name--success" : ""}`}
      >
        {label}:
      </p>
      <input
        type={type}
        id={name}
        name={name}
        ref={reference}
        onFocus={() => setShowLine(true)}
        onBlur={() => setShowLine(false)}
        autoComplete="off"
      />
      <motion.div
        className={`line ${
          watcher ? (err ? "line--error" : "line--success") : ""
        }`}
        variants={variants}
        animate={watcher || showLine ? "animate" : "init"}
        initial="init"
      ></motion.div>
      <div className="input-error success">
        {err && watcher ? err.message : ""}
        {err && err.type === "required" && err.message}
      </div>
    </label>
  );
}
