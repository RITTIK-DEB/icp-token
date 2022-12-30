import React,{useState} from "react";
import { cryptotoken } from "../../../declarations/cryptotoken";
import {Principal} from "@dfinity/principal";


function Transfer() {
  const [recId,setId]=useState("");
  const [amount,setAmount]=useState("");
  const [Feed,setFeed]=useState("");
  async function handleClick() {
    const receptent=Principal.fromText(recId);
    const Amount=Number(amount);
     let feed=await cryptotoken.transfer(receptent,Amount);
     setFeed(feed);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recId}
                onChange={(e)=>setId(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e)=>setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} >
            Transfer
          </button>
          <p>{Feed}</p>
        </p>
      </div>
    </div>
  );
}

export default Transfer;
