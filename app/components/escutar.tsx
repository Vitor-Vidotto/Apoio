"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Elogios from "./elogios";

const Escutar = () => {
  const [accepted, setAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  const moveNoButton = () => {
    // Random position within a reasonable range
    const newX = Math.random() * 300 - 150; // -150 to 150
    const newY = Math.random() * 300 - 150; // -150 to 150
    setNoPosition({ x: newX, y: newY });
  };

  if (accepted) {
    return <Elogios />;
  }

  return (
    <div style={styles.container}>
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        style={styles.header}
      >
        Você quer me escutar?
      </motion.h1>

      <div style={styles.buttonWrapper}>
        <motion.button
          style={styles.yesButton}
          onClick={() => setAccepted(true)}
          whileHover={{ scale: 1.1, backgroundColor: "#ff7518" }}
          whileTap={{ scale: 0.9 }}
        >
          Sim
        </motion.button>

        <motion.button
          style={{
            ...styles.noButton,
            transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
          }}
          onMouseEnter={moveNoButton}
          onClick={moveNoButton}
          animate={{ x: noPosition.x, y: noPosition.y }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          Não
        </motion.button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#0d0d1a",
    backgroundImage: "radial-gradient(circle at center, #1a1a2e 0%, #0d0d1a 100%)",
    fontFamily: "var(--font-geist-sans), Arial, sans-serif",
    textAlign: "center" as const,
    padding: "20px",
    overflow: "hidden", // prevent scrollbars when button runs away
  },
  header: {
    fontSize: "3em",
    lineHeight: "1.2",
    color: "#e0e0e0",
    textShadow: "0 0 10px #ff7518, 0 0 20px #ff7518",
    marginBottom: "50px",
    fontFamily: "var(--font-creepster), cursive",
    maxWidth: "800px",
  },
  buttonWrapper: {
    display: "flex",
    gap: "30px",
    alignItems: "center",
    justifyContent: "center",
    position: "relative" as const,
  },
  yesButton: {
    padding: "15px 40px",
    fontSize: "1.5em",
    fontWeight: "bold",
    backgroundColor: "#4a0e4e",
    color: "white",
    border: "2px solid #ff7518",
    borderRadius: "25px",
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(255, 117, 24, 0.4)",
    transition: "transform 0.2s ease, background-color 0.2s ease",
    zIndex: 2,
  },
  noButton: {
    padding: "15px 40px",
    fontSize: "1.5em",
    fontWeight: "bold",
    backgroundColor: "#1a1a2e",
    color: "#ff7518",
    border: "2px solid #e0e0e0",
    borderRadius: "25px",
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(255, 255, 255, 0.1)",
    position: "relative" as const,
    zIndex: 1,
  },
};

export default Escutar;
