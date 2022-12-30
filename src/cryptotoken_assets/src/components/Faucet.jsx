import React,{useState} from "react";
import {cryptotoken} from "../../../declarations/cryptotoken";

function Faucet() {
   const [Msg,setMsg]=useState("");
  async function handleClick(event) {

     let msg= await cryptotoken.payOut();
     setMsg(msg);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free tokens from Rittik Deb is here! Claim 10,000 DANG coins to your account.</label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick}>
          claim
        </button>
        {Msg}
      </p>
    </div>
  );
}

export default Faucet;
