// ItemDetails.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import supabase from "../supabase"
import DisplayLap from './displayLap';
import DisplayOther from "./displayOther";
import DisplayPhone from "./diaplayPhone";


function ItemDetails() {
 
  const {id,type} = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    async function fetchRecords() {
      
let { data: others, error:itemsError } = await supabase
.from(type)
.select('*')
.eq('id', `${id}`);
     
      if (itemsError) {
        console.error(itemsError);
        return;
      }
      else{
        setItem(others);
      }
    }
    fetchRecords();
  },);

  if(type==="laptops"){
    return (
      <>
      <DisplayLap item={item}/>
      </>
    );

  }else if(type==="phones"){
    return (
      <>
      <DisplayPhone item={item}/>
      </>
    );

  }else{
    return (
      <>
      <DisplayOther item={item}/>
      </>
    );

  }
  
}

export default ItemDetails;