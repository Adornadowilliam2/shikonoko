import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import shiko from "./assets/shiko.png";
import deerfood from "./assets/deerfood.jpg";
import birdfood from "./assets/birdfood.jpg";
import meatfood from "./assets/meatfood.jpg";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import DeerParticles from "./components/DeerParticles";
import shikonokoMusic from "./assets/shikonoko.mp3";

function App() {
  const [foodDialog, setFoodDialog] = useState(false);
  const [sleepDialog, setSleepDialog] = useState(false);
  const [hungerAmount, setHungerAmount] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);

  const max = 100;
  const hungerbarRef = useRef(null);
  const audioRef = useRef(null);

  const onsubmit = (e, amount) => {
    e.preventDefault();
    console.log(amount);
    let newAmount = hungerAmount + amount;
    if (newAmount >= max) {
      newAmount = max;
    } else if (newAmount < 0) {
      newAmount = 0;
    }
    setHungerAmount(newAmount);
    if (hungerbarRef.current) {
      hungerbarRef.current.style.width = newAmount + "%";
    }
  };

  useEffect(() => {
    if (musicPlaying && audioRef.current) {
      audioRef.current.play();
    } else if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset to start
    }
  }, [musicPlaying]);

  return (
    <>
      <fieldset>
        <legend>
          Pet Name: <strong>Shikonokonoko</strong>
        </legend>
        <img
          src={shiko}
          alt="Pet Image"
          width="100px"
          style={{ display: "block", border: "2px solid black", margin: 2 }}
        />
        <Typography sx={{ display: "block", m: "auto" }}>Happiness</Typography>
        <div className="happiness"></div>
        <Typography sx={{ display: "block", m: "auto" }}>Hunger</Typography>
        <div className="hunger">
          <div
            ref={hungerbarRef}
            className="hungerbar"
            style={{
              width: `${hungerAmount}%`,
              height: "5vh",
              backgroundColor: "green",
            }}
          ></div>
        </div>
        <Typography sx={{ display: "block", m: "auto" }}>Energy</Typography>
        <div className="energy"></div>
        <div className="btn container">
          <button onClick={() => setFoodDialog(true)}>Eat Food</button>
          <button
            onClick={() => {
              setSleepDialog(true);
              setMusicPlaying(true);
              setTimeout(() => {
                setSleepDialog(false);
                setMusicPlaying(false);
              }, 10000);
            }}
          >
            Sleep
          </button>
          <button>Play</button>
        </div>
      </fieldset>
      <Dialog open={foodDialog}>
        <DialogTitle>Food Choices</DialogTitle>
        <DialogContent>
          <Typography>Choose the food you want to eat</Typography>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Button
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
            onClick={(e) => {
              onsubmit(e, 10);
              setFoodDialog(false);
            }}
          >
            <img
              src={deerfood}
              alt="Deer Food"
              width="100px"
              style={{ border: "2px solid black" }}
            />
            Biscuit
          </Button>
          <Button
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
            onClick={(e) => {
              onsubmit(e, 5);
              setFoodDialog(false);
            }}
          >
            <img
              src={birdfood}
              alt="Bird Food"
              width="100px"
              style={{ border: "2px solid black" }}
            />
            Seed
          </Button>
          <Button
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
            onClick={(e) => {
              onsubmit(e, -5);
              setFoodDialog(false);
            }}
          >
            <img
              src={meatfood}
              alt="Meat Food"
              width="100px"
              style={{ border: "2px solid black" }}
            />
            Raw Meat
          </Button>
        </DialogActions>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            onClick={() => setFoodDialog(false)}
            style={{
              border: "2px solid blue",
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={sleepDialog}>
        <DeerParticles visible={sleepDialog} />
        <DialogContent>
          <Typography>ZZZZZzz.............</Typography>
          <audio autoPlay>
            <source src={shikonokoMusic} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default App;
