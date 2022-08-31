import classes from './Opts.module.css';
import { useState, useEffect } from 'react';


let wordOptions = [
  {
    label: "adverb",
    value: "adverb",
    
  },
  {
    label: "noun",
    value: "noun",
    
  },
  {
    label: "adjective",
    value: "adjective",
    
  },
  {
    label: "verb",
    value: "verb",
    
  },
];

function WordOptions(props) {

  const[selected,setSelected] = useState("");
  const[disable,setDisable] = useState(false);
  
  useEffect(()=>{
    
    setSelected("");
    setDisable(false);
    const els =document.getElementsByClassName(classes.itemlist)
    Array.from(els).forEach((el) => {
        el.style = null
    });
  },[props.word])

  const handleChange = (event)=> {
    setSelected(event.target.value)
    setDisable(true);
    props.disableBut(false)
    if(props.word.pos===event.target.value){
        event.target.parentElement.style.backgroundColor = 'rgba(26, 184, 87, 0.53)';
        props.score();
    }else{
        event.target.parentElement.style.backgroundColor = 'rgba(207, 0, 10, 0.53)';
    }
    
  }
  return (
    <div>
        {wordOptions.map((op,i)=><div key={i}  className={classes.itemlist}>
            <label htmlFor={op.label} >{op.label}</label>
            <input
                    type="checkbox"
                    id={op.label}
                    value={op.value}
                    disabled={disable}
                    checked={(op.value===selected)}
                    onChange={handleChange}
                />
            </div>)}
    </div>
  );
}

export default WordOptions;
