import React,{useState} from "react";
// click on the two links of dfx deploy

import {Principal} from  '@dfinity/principal';
//importing from motoko 
//check typo

import {cryptotoken} from "../../../declarations/cryptotoken";

// ../ means outside one level so its default that alll func in main.mo saved in declarations,projectname foleder we should import {projectname} like this to use the func of main.mo


function Balance() {
  const [inputValue,setInput]=useState("");
  //use state first imported ,{useState} and the like above format
  //initial value set to "" empty and 2nd parameter used to set value of firts parameter
  const [balanceResult,setBalance]=useState("");
  const [Symbol,setSymbol]=useState("");
  const [isHidden,setisHidden]=useState(true);
  
  async function handleClick() {
      console.log(inputValue);
      const principal=Principal.fromText(inputValue);
      //fromTest used to covert string value to principal datatype
      const balance=await cryptotoken.balanceOf(principal);
      //imported cryptotoken.did from above and used the function
      setBalance(balance.toLocaleString());
      //tolocale string js function dsformat string
      const symbol=await cryptotoken.getSymbol();
      setSymbol(symbol);
      setisHidden(false);
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
        
          onChange={(e)=>setInput(e.target.value)}
          //fist intially value is empty then as vent occured value changed to input value by useState
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}

        >
          Check Balance
        </button>
      </p>
      <p hidden={isHidden}> {balanceResult} {Symbol}.</p>
    </div>
  );
}

export default Balance;
