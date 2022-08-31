import { useState,useEffect } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import classes from './Words.module.css';
import { Fragment } from 'react';


import WordOptions from './WordOptions';




function Words() {
    const[words,setWords] = useState([]);
    const[curQus,setCurQus] = useState(0);
    const[progress,setProgress] = useState(parseFloat(((1/words.length)*100).toFixed(2)));
    const[butTxt,setButTxt] = useState("Next");
    const[disable,setDisable] = useState(true);
    const[again,setAgain] = useState(true);
    const[score,setScore] = useState(0);
    const[rank,setRank] = useState(-1);

    useEffect(()=>{
         async function fetchData(){
            const res = await fetch('http://localhost:3000/words');
            const data = await res.json();
            setWords(data.words)
            setProgress(parseFloat(((1/data.words.length)*100).toFixed(2)))
         }
         fetchData();
        
    },[again])

    useEffect(()=>{
        if(curQus!==0){
            setProgress(parseFloat((((curQus+1)/words.length)*100).toFixed(2)))
        }
        
    },[curQus])
    
    const changeQus = ()=>{
        if(curQus!==words.length-1){
            setDisable(true);
            if(1+curQus===words.length-1){
                setButTxt("submit")
            }
            setCurQus(1+curQus)
            
        }
        if(butTxt==='submit'){
            setButTxt("try again")
            setAgain(!again);
            const scorePer = (score/words.length)*100;
            
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({score:scorePer})
            };
            fetch('http://localhost:3000/rank', requestOptions)
                .then(response => response.json())
                .then(data => setRank(data.rank));
        }
        if(butTxt==='try again'){
            setButTxt("Next")
            setAgain(!again);
            setCurQus(0);
            setScore(0);
            setRank(-1)
        }
    };
    
    const handleScore = ()=>setScore(1+score);
  return (
    <Fragment>
        
        {words.length>0&&<div className={classes.item}>
            {rank===-1&&<div className={classes.score}> 
                <div><h4>Score : </h4></div>
                <div><h4> {score}/{words.length}</h4></div>
            </div>}
            {rank!==-1&&<div className={classes.score}> 
                <div><h4>Your Rank : </h4></div>
                <div><h4> {rank}%</h4></div>
            </div>}
            {again&&<Fragment>
                <ProgressBar className={classes.bar} now={progress} label={`${progress}%`} />
                <h5>What is the type of this word "{words[curQus].word}"? </h5>
                <WordOptions word = {words[curQus]} score={handleScore}   disableBut={setDisable}/>
            </Fragment>}
            <Button className={classes.but} onClick={changeQus} disabled={disable}>{butTxt}</Button>
            
        </div>}
    </Fragment>
    
  );
}

export default Words;
