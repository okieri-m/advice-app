import { useState } from 'react'
import { useEffect } from 'react';
import './App.css'
import diceIcon from "./assets/dice.png";
import borderImg from "./assets/border.png";

function App() {

  const [data, setData] = useState({
    id: "",
    advice: "",
});

const [adviceButton, setAdviceButton] = useState(0);

// 依存配列の値が変わった時に維持行される。依存配列は[adviceButton]
useEffect(()=>{
  fetch("https://api.adviceslip.com/advice")
  // レスポンスデータをjson形式に変換
  .then((response) => response.json())
  // 取得したデータを各値に保存
  .then((data) =>
    setData({
      id: data.slip.id,
      advice: data.slip.advice,
    })
  )
  .catch(error => console.error("Error ", error));
}, [adviceButton]);

const getAdvice = () =>{
  setAdviceButton(adviceButton + 1);
};

  return (
    <main className="main">
        <article className="wrapper">
            <div className="advice__container">
                <span className="advice__idContainer">ADVICE <span className="advice__id" aria-live="polite">#{data.id}</span></span>
                <p className="advice__textContainer">“{data.advice}”</p>
                <img src={borderImg} alt="dice icon" className="border" />
                <button aria-label="advice generate button" className="advice__generateBtn" onClick={getAdvice}>
                    <img src={diceIcon} alt="dice icon" className="dice__img" />
                </button>
            </div>
        </article>
    </main>
  )
}

export default App
