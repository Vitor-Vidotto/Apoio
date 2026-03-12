"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Elogios = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [gifIndex, setGifIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const messages = [
    "Você é assustadoramente incrível! 🎃",
    "Sua energia é mais contagiante que o próprio Halloween!",
    "Até o Rei da Abóbora acha você demais!",
    "O mundo precisa de mais pessoas fantásticas como você!",
    "Você está arrasando mais que o Oogie Boogie! 👻",
    "Você é uma pessoa única, até na Cidade do Halloween!",
    "O seu sorriso ilumina até as noites mais escuras!",
    "Não existe ninguém que dança melhor que você!",
    "Sua vibe é simplesmente a melhor de todas! 🦇",
    "Você é ótima em tudo o que faz, até assustando!",
    "OLHA O FLASH, TEM UMA PESSOA INCRÍVEL NA TELA! 📸",
  ];

  const gifs = [
    "/gif1.gif",  // GIFs de elogios e positividade
    "/gif2.gif",
    "/gif3.gif",
    "/gif4.gif",
    "/gif5.gif",
    "/gif6.gif",
    "/gif7.gif",
    "/gif8.gif",
    "/gif9.gif",
    "/gif10.gif",
    "/gif11.gif",
  ];

  const handleStart = () => {
    setHasStarted(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(console.error);
    }
  };

  const handleGifChange = () => {
    setGifIndex((prevIndex) => (prevIndex + 1) % gifs.length); // Troca o gif
    setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length); // Troca a frase
  };

  return (
    <div style={styles.container}>
      <audio
        ref={audioRef}
        src="/song.mp3"
        loop
      />

      {!hasStarted ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            style={styles.button}
            onClick={handleStart}
            whileHover={{ scale: 1.05, backgroundColor: "#ff7518" }}
            whileTap={{ scale: 0.95 }}
          >
            Entrar na Cidade do Halloween 🎃
          </motion.button>
        </motion.div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={styles.gifContainer}
          >
            <Image
              src={gifs[gifIndex]}
              alt="Positive GIF"
              width={600}
              height={400}
              style={styles.gifImage}
              priority
            />
          </motion.div>

          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            style={styles.header}
          >
            {messages[messageIndex]}
          </motion.h1>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            style={styles.buttonContainer}
          >
            <motion.button
              style={styles.button}
              onClick={handleGifChange}
              whileHover={{ scale: 1.05, backgroundColor: "#ff7518" }}
              whileTap={{ scale: 0.95 }}
            >
              Hmm, prossiga!
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            style={styles.buttonContainer}
          >
            <motion.a
              href="/"
              style={styles.linkButton}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Voltar
            </motion.a>
          </motion.div>
        </>
      )}
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
  },
  header: {
    fontSize: "2.5em",
    lineHeight: "1.2",
    color: "#e0e0e0",
    textShadow: "0 0 10px #ff7518, 0 0 20px #ff7518",
    marginTop: "30px",
    fontFamily: "var(--font-creepster), cursive",
    maxWidth: "800px",
  },
  buttonContainer: {
    marginTop: "20px",
  },
  button: {
    padding: "15px 30px",
    fontSize: "1.2em",
    fontWeight: "bold",
    backgroundColor: "#4a0e4e",
    color: "white",
    border: "2px solid #ff7518",
    borderRadius: "25px",
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(255, 117, 24, 0.4)",
    transition: "transform 0.2s ease, background-color 0.2s ease",
  },
  linkButton: {
    padding: "10px 20px",
    fontSize: "1em",
    color: "#ff7518",
    textDecoration: "none",
    border: "1px solid #ff7518",
    borderRadius: "20px",
    transition: "transform 0.2s ease",
  },
  gifContainer: {
    marginTop: "20px",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 0 20px rgba(138, 43, 226, 0.5)",
    border: "2px solid #4a0e4e",
    backgroundColor: "#000",
  },
  gifImage: {
    maxWidth: "100%",
    height: "auto",
    display: "block",
    borderRadius: "10px",
  },
};

export default Elogios;
