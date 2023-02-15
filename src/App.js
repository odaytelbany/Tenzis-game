import React ,{useState, useEffect}from 'react'
import Die from './components/Die';
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  // create random values 
  function randomValue () {
    return Math.ceil(Math.random() * 9);
  }

  // generate random die
  function generateDie () {
    return {
            id : nanoid(),
            value: randomValue(),
            isHeld: false
           }
  }

  // return all dice as an array
  function allNewDice () {
    let newDice = [];
    for(let i=0; i<12; i++){
        let newDie = generateDie()
        newDice.push(newDie);
    }
    return newDice;
  }

  // for roll or new game button
  function roll_new_dice () {
    if (!tenzies){
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateDie()
      }))
    }else{
      setDice(() => {
        setTenzies(false);
        return allNewDice();
      })
    }
    
  } 

  // to hold any die
  function holdDice (id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? {...die,isHeld: !die.isHeld} : die
    }))
  }

  const allElements = dice.map((die) => {
    return <Die key={die.id} {...die} holdDice={() => holdDice(die.id)}/>
  })

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].value;
    const sameValue = dice.every(die => die.value === firstValue);
    if (allHeld && sameValue){
      setTenzies(true);
      console.log("done")
    }
  },[dice])


  return (
    <main>
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='die-container'>
            {allElements}
        </div>
        <button className='roll-dice' onClick={roll_new_dice}>{tenzies ? "New Game" : "Roll"}</button>
        {tenzies ? <Confetti /> : ""}
    </main>
  )
}


export default App;