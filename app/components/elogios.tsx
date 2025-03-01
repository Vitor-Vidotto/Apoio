"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion"; // Importando o framer-motion para animações suaves

const Elogios = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [gifIndex, setGifIndex] = useState(0);

  const messages = [
    "Você é incrível!",
    "A sua energia é contagiante!",
    "O mundo precisa de mais pessoas como você!",
    "Você está arrasando!",
    "Você é uma pessoa única!",
    "Eu sou seu fã!",
    "O seu sorriso ilumina qualquer lugar!",
    "Não existe ninguém melhor que você dançando!",
    "Você tem o melhor abraço do mundo!",
    "Você é ótima em tudo oq faz!",
    "OLHA O FLASH, TEM UMA GAROTA LINDA NA MINHA TELA!",
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

  const handleGifChange = () => {
    setGifIndex((prevIndex) => (prevIndex + 1) % gifs.length); // Troca o gif
    setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length); // Troca a frase
  };

  return (
    <div style={styles.container}>
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
        />
      </motion.div>

      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        style={styles.header}
      >
        {messages[messageIndex]} 💖
      </motion.h1>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        style={styles.buttonContainer}
      >
        <motion.button
          style={styles.button}
          onClick={handleGifChange} // Troca gif e mensagem quando clicado
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Mais um elogio! 🌟
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
          style={styles.button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Voltar
        </motion.a>
      </motion.div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const, // Garantir que 'flexDirection' seja tratado como valor literal
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#e3f9e3", // Cor de fundo suave e positiva
    fontFamily: "'Arial', sans-serif",
    textAlign: "center" as const, // Adicionando 'as const' em 'textAlign'
  },
  header: {
    fontSize: "2.5em",
    color: "#4caf50", // Verde positivo
    marginTop: "20px",
  },
  buttonContainer: {
    marginTop: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1.5em",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textDecoration: "none",
    transition: "transform 0.2s ease, background-color 0.2s ease",
  },
  gifContainer: {
    marginTop: "20px",
  },
  gifImage: {
    maxWidth: "100%",
    height: "auto",
    borderRadius: "10px",
  },
};

export default Elogios;
