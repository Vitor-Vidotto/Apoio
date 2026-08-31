"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Cartinha from "./cartinha";

const Elogios = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [gifIndex, setGifIndex] = useState(0);
  const [showCartinha, setShowCartinha] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const messages = [
    "Sabe, eu sempre achei você assustadoramente incrível. É a pessoa mais fantástica dessa nossa Cidade do Halloween.",
    "Eu vejo muito o quanto você é gentil. Mesmo nos seus dias mais escuros, essa sua doçura não apaga.",
    "Eu admiro demais a sua coragem. É muito legal ver você enfrentando os seus pesadelos sempre de cabeça erguida.",
    "Você me lembra o Jack às vezes. Eu vejo essa chama aí dentro e uma vontade de vencer que simplesmente não some.",
    "Eu acho incrível que você sabe o seu valor e não aceita pouco da vida. A coroa de tudo isso aqui é sua.",
    "Para mim, você tem o melhor dos dois mundos. O jeito cuidadoso da Sally, mas a força absurda de um furacão.",
    "Eu sei que essa situação agora está muito ruim, mas eu te conheço. Eu sei que isso vai passar e você vai espantar essa sombra.",
    "Qualquer um consegue ver o quão maravilhosa você é. Acho que até o Oogie Boogie amoleceria se te conhecesse direito.",
    "Eu adoro como você consegue transformar um dia cinzento em algo mágico, só pelo fato de você existir.",
    "Eu vejo você. Mesmo quando tudo parece dar errado, você levanta e faz a coisa acontecer. Você vai vencer.",
    "Olha o flash... Só para eu deixar registrado a garota mais especial e forte que eu conheço. Conta comigo.",
  ];

  const gifs = [
    "/gif1.gif",
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
    if (messageIndex === messages.length - 1) {
      setShowCartinha(true);
    } else {
      setGifIndex((prevIndex) => (prevIndex + 1) % gifs.length);
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }
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
      ) : showCartinha ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{ width: "100%" }}
        >
          <Cartinha />
        </motion.div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={styles.gifContainer}
            key={gifIndex}
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

          <AnimatePresence mode="wait">
            <motion.h1
              key={messageIndex}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={styles.header}
            >
              {messages[messageIndex]}
            </motion.h1>
          </AnimatePresence>

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
              {messageIndex === messages.length - 1 ? "Tenho uma surpresa..." : "Hmm, prossiga!"}
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
