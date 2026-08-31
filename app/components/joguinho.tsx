"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Joguinho = () => {
  const [started, setStarted] = useState(false);
  const [won, setWon] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 }); // percentage 0-100
  const [exitPosition, setExitPosition] = useState({ x: 80, y: 15 }); // Target fixed at top right
  const containerRef = useRef<HTMLDivElement>(null);

  const handleStart = async () => {
    if (typeof window !== "undefined" && typeof (window as any).DeviceOrientationEvent !== "undefined") {
      if (typeof (window as any).DeviceOrientationEvent.requestPermission === "function") {
        try {
          const permissionState = await (window as any).DeviceOrientationEvent.requestPermission();
          if (permissionState === "granted") {
            window.addEventListener("deviceorientation", handleOrientation);
            setStarted(true);
          } else {
            alert("Preciso da permissão de movimento para o joguinho funcionar!");
          }
        } catch (error) {
          console.error(error);
          alert("Erro ao pedir permissão do giroscópio.");
        }
      } else {
        window.addEventListener("deviceorientation", handleOrientation);
        setStarted(true);
      }
    } else {
      // Fallback if not supported
      alert("Giroscópio não suportado neste dispositivo/navegador.");
      setStarted(true); // Let them see it anyway, though they can't move
    }
  };

  const handleOrientation = (event: DeviceOrientationEvent) => {
    if (won) return;

    let { beta, gamma } = event; // beta is front-to-back, gamma is left-to-right

    // If device is flat, beta and gamma are ~0
    // Limit to reasonable tilt ranges (-90 to 90)
    if (beta === null || gamma === null) return;
    
    // Smooth out movement and convert tilt to a 0-100% position scale
    // Typical mobile holding angle is around beta=45. Let's make it relative or just direct mapping.
    // To make it easy, let's map -45 to 45 degrees to 0-100% on the screen.
    
    // Clamp values
    let xTilt = Math.max(-45, Math.min(45, gamma));
    let yTilt = Math.max(-45, Math.min(45, beta)); // Depending on holding position, this might need an offset, but let's keep it simple.

    // Map to 0-100
    const newX = ((xTilt + 45) / 90) * 100;
    const newY = ((yTilt + 45) / 90) * 100;

    setPosition({ x: newX, y: newY });
  };

  // Win condition check
  useEffect(() => {
    if (started && !won) {
      // Check if light position is close enough to exit
      const dist = Math.sqrt(
        Math.pow(position.x - exitPosition.x, 2) + Math.pow(position.y - exitPosition.y, 2)
      );
      
      // If within 10% distance
      if (dist < 10) {
        setWon(true);
        window.removeEventListener("deviceorientation", handleOrientation);
      }
    }
  }, [position, started, won]);

  // Clean up
  useEffect(() => {
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  return (
    <div style={styles.container}>
      <AnimatePresence mode="wait">
        {!started ? (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            style={styles.startScreen}
          >
            <h1 style={styles.creepyTitle}>E agora... um joguinho pra ti 🩸</h1>
            <p style={styles.creepySubtitle}>
              Mova o celular e guie a luz pelo escuro até a saída.
            </p>
            <motion.button
              style={styles.button}
              onClick={handleStart}
              whileHover={{ scale: 1.05, backgroundColor: "#8a0303" }}
              whileTap={{ scale: 0.95 }}
            >
              Aceitar o Desafio
            </motion.button>
          </motion.div>
        ) : !won ? (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={styles.gameArea}
            ref={containerRef}
          >
            {/* The exit */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 15px rgba(138, 43, 226, 0.2)",
                  "0 0 40px rgba(138, 43, 226, 0.6)",
                  "0 0 15px rgba(138, 43, 226, 0.2)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                ...styles.exit,
                left: `${exitPosition.x}%`,
                top: `${exitPosition.y}%`,
              }}
            >
              Saída
            </motion.div>

            {/* The player light/bat */}
            <motion.div
              animate={{ y: [-3, 3, -3] }} // Flying animation
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              style={{
                ...styles.player,
                left: `${position.x}%`,
                top: `${position.y}%`,
              }}
            >
              🦇
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="win"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring", bounce: 0.5 }}
            style={styles.winScreen}
          >
            <h1 style={styles.winTitle}>Boa!</h1>
            <p style={styles.winText}>
              Sei que você sempre consegue encontrar uma saída, vc é forte 🖤
            </p>
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
    position: "relative" as const,
    backgroundColor: "#050505", // Very dark
    borderRadius: "15px",
    overflow: "hidden",
    border: "1px solid #333",
  },
  startScreen: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    padding: "40px",
    textAlign: "center" as const,
  },
  creepyTitle: {
    fontSize: "2em",
    color: "#ff3333",
    fontFamily: "var(--font-creepster), cursive",
    textShadow: "0 0 10px rgba(255, 0, 0, 0.5)",
    marginBottom: "20px",
  },
  creepySubtitle: {
    color: "#888",
    marginBottom: "30px",
    fontSize: "1.2em",
  },
  button: {
    padding: "15px 30px",
    fontSize: "1.2em",
    fontWeight: "bold",
    backgroundColor: "#4a0303",
    color: "white",
    border: "1px solid #ff3333",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(255, 51, 51, 0.2)",
  },
  gameArea: {
    width: "100%",
    height: "60vh",
    minHeight: "400px",
    position: "relative" as const,
    backgroundColor: "#000",
    overflow: "hidden",
  },
  exit: {
    position: "absolute" as const,
    transform: "translate(-50%, -50%)",
    padding: "10px 20px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    border: "2px dashed #4a0e4e",
    color: "#e0e0e0",
    borderRadius: "10px",
    fontWeight: "bold",
    letterSpacing: "2px",
    boxShadow: "0 0 15px rgba(138, 43, 226, 0.5)",
  },
  player: {
    position: "absolute" as const,
    transform: "translate(-50%, -50%)",
    width: "50px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2em",
    borderRadius: "50%",
    backgroundColor: "transparent",
    boxShadow: "0 0 40px 20px rgba(255, 255, 255, 0.6), inset 0 0 20px 10px rgba(255, 255, 255, 0.4)",
    transition: "left 0.1s linear, top 0.1s linear", // Smooth movement
    zIndex: 10,
  },
  winScreen: {
    textAlign: "center" as const,
    padding: "40px",
  },
  winTitle: {
    fontSize: "3em",
    color: "#fff",
    textShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
    marginBottom: "20px",
    fontFamily: "var(--font-creepster), cursive",
  },
  winText: {
    fontSize: "1.5em",
    color: "#ccc",
    lineHeight: "1.5",
    maxWidth: "500px",
  },
};

export default Joguinho;
