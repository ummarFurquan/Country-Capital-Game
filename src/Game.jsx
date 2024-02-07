import React from "react";
import _ from "lodash";
import classnames from "classnames";
import "./App.css";
import { useState, useEffect } from "react";
const Game = ({ data }) => {
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [correctSelection, setCorrectSelections] = useState([])
    const [matched, setMatched] = useState(new Set);
  useEffect(function onMount() {
    const allOptions = Object.entries(data).flat();
    // console.log(allOptions)

    setOptions(_.shuffle(allOptions));
  }, []);

  const handleSelection = (e) => {
    const {target} = e;

    const value = target.getAttribute('data-value');

    const newSelection = selectedOptions.concat(value);


    if(newSelection.length === 2 ){
        const [first, second ] = newSelection;

        if(data[first] === second || data[second] === first){
            setCorrectSelections(newSelection);
                setTimeout(()=>{
                    setMatched(new Set(
                        [...matched,
                        ...newSelection]));
                    setCorrectSelections([])
                    setSelectedOptions([])
                },1000)
        } else{
            setSelectedOptions(newSelection)
            setTimeout(function reset(){
                setSelectedOptions([]);
            },1000)
        }
    } else{
        setSelectedOptions(newSelection);
        
    }
  };

  if(matched.size === options.length) {
    return( <div className="game-board">
        <h1>Congrats!</h1></div> )
  }

  return (
    <div className="game-board">
      {options.map((option) => {

        if(matched.has(option)){
            return null
        }
        const isSelected = selectedOptions.includes(option) || correctSelection.includes(option);  
        const isCorrect = correctSelection.includes(option);
        const isIncorrect = selectedOptions.length === 2 && isSelected && !isCorrect;      
        return (
          <button className={classnames("btns", isSelected && 'selected', isIncorrect && 'incorrect', isCorrect && 'correct')} 
          key={option} onClick={handleSelection} data-value={option}>
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default Game;
