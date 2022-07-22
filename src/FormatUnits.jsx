import React,{useState,useRef} from 'react';
import {Text,TextInput,Button, Container,Grid,Stack,Group } from '@mantine/core';
import { ethers } from "ethers";
import FormatGrid from './FormatGrid';
import { BigNumber } from "bignumber.js";

BigNumber.config({ DECIMAL_PLACES: 30 })

const FormatUnits = () => {
  const [valueWei,setValueWei] = useState('1000000000000000000');
  const [valueKwei,setValueKwei] = useState('1000000000000000');
  const [valueMwei,setValueMwei] = useState('1000000000000');
  const [valueGwei,setValueGwei] = useState('1000000000');
  const [valueSzabo,setValueSzabo] = useState('1000000');
  const [valueFinney,setValueFinney] = useState('1000');
  const [valueEther,setValueEther] = useState('1');
  const [valueKether,setValueKether] = useState('0.001');
  const [valueMether,setValueMether] = useState('0.000001');
  const [valueGether,setValueGether] = useState('0.000000001');
  const [valueTether,setValueTether] = useState('0.000000000001');


  const isNumber = (n) => {
    //let numStr = new RegExp('^[0-9]+$');
     let numStr = /^\d+(\.\d+)?$/gm;
    return numStr.test(n);
  }

  const safeParseUnits = (value, units) => {
    try{
      if(isNumber(value) == false){ return}
      if(value == '') {return ;}
      let x = new BigNumber(value);
      let y = new BigNumber(10 ** units);
      return x.times(y).toFixed();
      //return ethers.utils.parseUnits(value,units);
    }catch(e){
      console.error(e.message)
      //console.error("error occured sorry");
    }
  }

  const safeFormatUnits = (value, units) => {
    try{
      // let k = ethers.BigNumber.from("44.433");
      // let j = ethers.BigNumber.from("1000");
      // console.log(ethers.utils.formatUnits("44.433",9));
      if(isNumber(value) == false){ return}
      if(value == '') return ;
      let x = new BigNumber(value);
      let y = new BigNumber(10 ** units);
      return x.div(y).toFixed();
      //return ethers.utils.formatUnits(value,units);
    }catch(e){
      console.error(e.message)
      //console.error("error occured sorry");
    }
  }

  const dataMap = [
  { name:'wei', value:'1', decimals:1},
  { name:'kwei', value:'1000', decimals:3},
  { name:'babbage', value:'1000', decimals:3},
  { name:'femtoether',value:'1000', decimals:3},
  { name:'mwei',value:'1000000', decimals:6},
  { name:'lovelace',value:'1000000', decimals:6},
  { name:'picoether',value:'1000000', decimals:6},
  { name:'gwei',value:'1000000000', decimals:9},
  { name:'shannon',value:'1000000000', decimals:9},
  { name:'nanoether',value:'1000000000', decimals:9},
  { name:'nano',value:'1000000000', decimals:9},
  { name:'szabo',value:'1000000000000', decimals:12},
  { name:'microether',value:'1000000000000', decimals:12},
  { name:'micro',value:'1000000000000', decimals:12},
  { name:'finney',value:'1000000000000000', decimals:15},
  { name:'milliether',value:'1000000000000000', decimals:15},
  { name:'milli',value:'1000000000000000', decimals:15},
  { name:'ether',value:'1000000000000000000', decimals:18},
  { name:'kether',value:'1000000000000000000000', decimals:21},
  { name:'grand',value:'1000000000000000000000', decimals:21},
  { name:'mether',value:'1000000000000000000000000', decimals:24},
  { name:'gether',value:'1000000000000000000000000000', decimals:27},
  { name:'tether',value:'1000000000000000000000000000000', decimals:30}
];

  const data = ['wei','kwei', 'babbage', 'femtoether','mwei','lovelace','picoether','gwei','shannon',
                'nanoether','nano','szabo','microether','micro','finney','milliether','milli','ether',
                'kether','grand','mether','gether','tether'];

  const weiDriver = (value) => {    
    setValueWei(value);
    setValueKwei(safeFormatUnits(value,3));
    setValueMwei(safeFormatUnits(value,6));
    setValueGwei(safeFormatUnits(value,9));
    setValueSzabo(safeFormatUnits(value,12));
    setValueFinney(safeFormatUnits(value,15));
    setValueEther(safeFormatUnits(value,18));
    setValueKether(safeFormatUnits(value,21));
    setValueMether(safeFormatUnits(value,24));
    setValueGether(safeFormatUnits(value,27));
    setValueTether(safeFormatUnits(value,30));
  }

  const kweiDriver = (value) => {   
    setValueWei(safeParseUnits(value,3));
    setValueKwei(value);
    setValueMwei(safeFormatUnits(value,3));
    setValueGwei(safeFormatUnits(value,6));
    setValueSzabo(safeFormatUnits(value,9));
    setValueFinney(safeFormatUnits(value,12));
    setValueEther(safeFormatUnits(value,15));
    setValueKether(safeFormatUnits(value,18));
    setValueMether(safeFormatUnits(value,21));
    setValueGether(safeFormatUnits(value,24));
    setValueTether(safeFormatUnits(value,27));
  }

  const mweiDriver = (value) => {    
    setValueWei(safeParseUnits(value,6));
    setValueKwei(safeParseUnits(value,3));
    setValueMwei(value);
    setValueGwei(safeFormatUnits(value,3));
    setValueSzabo(safeFormatUnits(value,6));
    setValueFinney(safeFormatUnits(value,9));
    setValueEther(safeFormatUnits(value,12));
    setValueKether(safeFormatUnits(value,15));
    setValueMether(safeFormatUnits(value,18));
    setValueGether(safeFormatUnits(value,21));
    setValueTether(safeFormatUnits(value,24));
  }

  const gweiDriver = (value) => {    
    setValueWei(safeParseUnits(value,9));
    setValueKwei(safeParseUnits(value,6));
    setValueMwei(safeParseUnits(value,3));
    setValueGwei(value);
    setValueSzabo(safeFormatUnits(value,3));
    setValueFinney(safeFormatUnits(value,6));
    setValueEther(safeFormatUnits(value,9));
    setValueKether(safeFormatUnits(value,12));
    setValueMether(safeFormatUnits(value,15));
    setValueGether(safeFormatUnits(value,18));
    setValueTether(safeFormatUnits(value,21));
  }

  const szaboDriver = (value) => {    
    setValueWei(safeParseUnits(value,12));
    setValueKwei(safeParseUnits(value,9));
    setValueMwei(safeParseUnits(value,6));
    setValueGwei(safeParseUnits(value,3));
    setValueSzabo(value);
    setValueFinney(safeFormatUnits(value,3));
    setValueEther(safeFormatUnits(value,6));
    setValueKether(safeFormatUnits(value,9));
    setValueMether(safeFormatUnits(value,12));
    setValueGether(safeFormatUnits(value,15));
    setValueTether(safeFormatUnits(value,18));
  }

   const finneyDriver = (value) => {   
    setValueWei(safeParseUnits(value,15));
    setValueKwei(safeParseUnits(value,12));
    setValueMwei(safeParseUnits(value,9));
    setValueGwei(safeParseUnits(value,6));
    setValueSzabo(safeParseUnits(value,3));
    setValueFinney(value);
    setValueEther(safeFormatUnits(value,3));
    setValueKether(safeFormatUnits(value,6));
    setValueMether(safeFormatUnits(value,9));
    setValueGether(safeFormatUnits(value,12));
    setValueTether(safeFormatUnits(value,15));
  }
  
  const etherDriver = (value) => {
    //if(isNumber(value) == false && value !== "" && value.length !== 0){return;}  
    setValueWei(safeParseUnits(value,18));
    setValueKwei(safeParseUnits(value,15));
    setValueMwei(safeParseUnits(value,12));
    setValueGwei(safeParseUnits(value,9));
    setValueSzabo(safeParseUnits(value,6));
    setValueFinney(safeParseUnits(value,3));
    setValueEther(value);
    setValueKether(safeFormatUnits(value,3));
    setValueMether(safeFormatUnits(value,6));
    setValueGether(safeFormatUnits(value,9));
    setValueTether(safeFormatUnits(value,12));
  }

  const ketherDriver = (value) => {
    setValueWei(safeParseUnits(value,21));
    setValueKwei(safeParseUnits(value,18));
    setValueMwei(safeParseUnits(value,15));
    setValueGwei(safeParseUnits(value,12));
    setValueSzabo(safeParseUnits(value,9));
    setValueFinney(safeParseUnits(value,6));
    setValueEther(safeParseUnits(value,3));
    setValueKether(value);
    setValueMether(safeFormatUnits(value,3));
    setValueGether(safeFormatUnits(value,6));
    setValueTether(safeFormatUnits(value,9));
  }

  const metherDriver = (value) => { 
    setValueWei(safeParseUnits(value,24));
    setValueKwei(safeParseUnits(value,21));
    setValueMwei(safeParseUnits(value,18));
    setValueGwei(safeParseUnits(value,15));
    setValueSzabo(safeParseUnits(value,12));
    setValueFinney(safeParseUnits(value,9));
    setValueEther(safeParseUnits(value,6));
    setValueKether(safeParseUnits(value,3));
    setValueMether(value);
    setValueGether(safeFormatUnits(value,3));
    setValueTether(safeFormatUnits(value,6));
  }

  const getherDriver = (value) => {
    setValueWei(safeParseUnits(value,27));
    setValueKwei(safeParseUnits(value,24));
    setValueMwei(safeParseUnits(value,21));
    setValueGwei(safeParseUnits(value,18));
    setValueSzabo(safeParseUnits(value,15));
    setValueFinney(safeParseUnits(value,12));
    setValueEther(safeParseUnits(value,9));
    setValueKether(safeParseUnits(value,6));
    setValueMether(safeParseUnits(value,3));
    setValueGether(value);
    setValueTether(safeFormatUnits(value,3));
  }

  const tetherDriver = (value) => { 
    setValueWei(safeParseUnits(value,30));
    setValueKwei(safeParseUnits(value,27));
    setValueMwei(safeParseUnits(value,24));
    setValueGwei(safeParseUnits(value,21));
    setValueSzabo(safeParseUnits(value,18));
    setValueFinney(safeParseUnits(value,15));
    setValueEther(safeParseUnits(value,12));
    setValueKether(safeParseUnits(value,9));
    setValueMether(safeParseUnits(value,6));
    setValueGether(safeParseUnits(value,3));
    setValueTether(value);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    if(name === "wei"){
      weiDriver(value)
    }else if(name === "kwei"){
      kweiDriver(value)
    }else if(name === "mwei"){
      mweiDriver(value)
    }
    else if(name === "gwei"){
      gweiDriver(value)
    }else if(name === "szabo"){
      szaboDriver(value)
    }else if(name === "finney"){
      finneyDriver(value)
    }else if(name === "ether"){


      etherDriver(value);
      
      
    }else if(name === "kether"){
      ketherDriver(value)
    }else if(name === "mether"){
      metherDriver(value)
    }else if(name === "gether"){
      getherDriver(value)
    }else if(name === "tether"){
      tetherDriver(value)
    }
  }
  
  return (
     <Container>
          <Stack>
            <FormatGrid name="wei" value={valueWei} onChange={handleChange} />
            <FormatGrid name="kwei" value={valueKwei} onChange={handleChange} />
            <FormatGrid name="mwei" value={valueMwei} onChange={handleChange} />
            <FormatGrid name="gwei" value={valueGwei} onChange={handleChange} />
            <FormatGrid name="szabo" value={valueSzabo} onChange={handleChange} />
            <FormatGrid name="finney" value={valueFinney} onChange={handleChange} />
            <FormatGrid name="ether" value={valueEther} onChange={handleChange} />
            <FormatGrid name="kether" value={valueKether} onChange={handleChange} />
            <FormatGrid name="mether" value={valueMether} onChange={handleChange} />
            <FormatGrid name="gether" value={valueGether} onChange={handleChange} />
            <FormatGrid name="tether" value={valueTether} onChange={handleChange} />
         </Stack>
        
     </Container>
  );
}

export default FormatUnits;