"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Joguinho from "./joguinho";

const Cartinha = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showRose, setShowRose] = useState(false);
  const [playGame, setPlayGame] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // Show the rose shortly after the letter opens
    setTimeout(() => {
      setShowRose(true);
    }, 2000);
  };

  if (playGame) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ width: "100%" }}
      >
        <Joguinho />
      </motion.div>
    );
  }

  return (
    <div style={styles.container}>
      <AnimatePresence>
        {!isOpen ? (
          <motion.div
            key="envelope"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0, rotate: 10 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            style={styles.envelopeContainer}
            onClick={handleOpen}
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.95 }}
          >
            <div style={styles.envelopeIcon}>💌</div>
            <p style={styles.openText}>Clique para abrir</p>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={styles.letterContainer}
          >
            <p style={styles.letterText}>
              Olha ale, quando eu te conheci no boo, eu jamais pensaria em estar
              aqui lhe escrevendo isso, você é uma mulher maravilhosa em muitos
              sentidos e acredito que seu sorriso fez um estrago em mim, eu não
              estou aqui pra brincar com você, você é a pessoa que eu mais espero
              mensagem, que mais eu quero conversar, acho que eu nunca me diverti
              tanto jogando um jogo quanto me diverti contigo, não só da boca pra
              fora, você foi em bora sabado e eu já estava com saudade, então
              receba uma rosa para ti, pra não dizer que nunca te dei flores
            </p>

            <AnimatePresence>
              {showRose && (
                <motion.div
                  initial={{ opacity: 0, scale: 0, rotate: -45 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 1.5, type: "spring", bounce: 0.5 }}
                  style={styles.roseContainer}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      filter: [
                        "drop-shadow(0 0 10px rgba(255, 0, 100, 0.5))",
                        "drop-shadow(0 0 30px rgba(255, 0, 100, 0.8))",
                        "drop-shadow(0 0 10px rgba(255, 0, 100, 0.5))",
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={styles.rose}
                  >
                    🌹
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showRose && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2, duration: 1 }}
                  style={styles.gameButton}
                  onClick={() => setPlayGame(true)}
                  whileHover={{ scale: 1.05, backgroundColor: "#8a0303" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Continuar...
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    minHeight: "60vh",
    fontFamily: "var(--font-geist-sans), Arial, sans-serif",
  },
  envelopeContainer: {
    cursor: "pointer",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1a1a2e",
    border: "2px solid #ff7518",
    borderRadius: "20px",
    padding: "40px",
    boxShadow: "0 10px 30px rgba(255, 117, 24, 0.3)",
  },
  envelopeIcon: {
    fontSize: "6em",
    lineHeight: "1",
  },
  openText: {
    marginTop: "20px",
    fontSize: "1.5em",
    color: "#ff7518",
    fontFamily: "var(--font-creepster), cursive",
    letterSpacing: "2px",
  },
  letterContainer: {
    backgroundColor: "rgba(20, 20, 35, 0.8)",
    backdropFilter: "blur(10px)",
    border: "1px solid #4a0e4e",
    borderRadius: "15px",
    padding: "40px",
    maxWidth: "800px",
    width: "90%",
    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
    textAlign: "center" as const,
    position: "relative" as const,
  },
  letterText: {
    fontSize: "1.3em",
    lineHeight: "1.8",
    color: "#e0e0e0",
    textShadow: "0 0 5px rgba(255, 255, 255, 0.2)",
    fontStyle: "italic",
    whiteSpace: "pre-wrap" as const,
  },
  roseContainer: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
  },
  rose: {
    fontSize: "6em",
    cursor: "default",
  },
  gameButton: {
    marginTop: "40px",
    padding: "15px 30px",
    fontSize: "1.2em",
    fontWeight: "bold",
    backgroundColor: "#4a0303",
    color: "white",
    border: "2px solid #ff3333",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(255, 51, 51, 0.2)",
  },
};

export default Cartinha;
