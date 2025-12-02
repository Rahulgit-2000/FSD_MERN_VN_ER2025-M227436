import React, { useState } from "react";
import "./dice.css";

function Dice() {
  const [result, setResult] = useState("Let's Play!");
  const [player1, setPlayer1] = useState(6);
  const [player2, setPlayer2] = useState(6);

  const handleDiceRoll = () => {
    const randomNumber1 = Math.floor(Math.random() * 6) + 1;
    const randomNumber2 = Math.floor(Math.random() * 6) + 1;
    setPlayer1(randomNumber1);
    setPlayer2(randomNumber2);

    randomNumber1 > randomNumber2
      ? setResult("🚩 Player 1 Wins!")
      : randomNumber1 < randomNumber2
      ? setResult("Player 2 Wins! 🚩")
      : setResult("🚩 It's a Draw! 🚩");
  };

  return (
    <>
      <h1 id="result">{result}</h1>
      <div class="container">
        <div>
          <p>Player 1</p>
          <img id="dice1" src={`./images/dice${player1}.png`} alt="Dice 1" />
        </div>
        <div>
          <p>Player 2</p>
          <img id="dice2" src={`./images/dice${player2}.png`} alt="Dice 2" />
        </div>
      </div>
      <button id="rollButton" onClick={handleDiceRoll}>
        Roll Dice
      </button>
    </>
  );
}

export default Dice;
