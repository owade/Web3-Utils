import React,{useState,useRef,useEffect} from 'react';
import {Text,TextInput,Button,createStyles,Container,Paper,Space,Group,ActionIcon,Grid,Center,keyframes,
       Alert} from '@mantine/core';
import { Copy } from 'tabler-icons-react';
import {getCreate2Address,keccak256} from "ethers/lib/utils";

const blinker = keyframes({
  '50%': {  opacity: '0.2' },
});

const useStyles = createStyles((theme) => ({
  myText: {
    overflowWrap: 'break-word',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
  },
  pap:{
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
  },
   blink:{
     animation: `${blinker} 1s linear infinite`,     
  },
}));

const GetCreate2Address = () => {
  const { classes } = useStyles();
  const [fresult, setfResult] = useState('');
  const [input, setInput]  = useState('');
  const fInput = useRef();
  const sInput = useRef();
  const iInput = useRef();
  const [error,setError] = useState(); 
  const [copySuccess, setCopySuccess] = useState('');

  useEffect(() => {
    let timer = setTimeout(() => setCopySuccess(''), 1000);
    return () => {
        clearTimeout(timer);
    };
  }, [copySuccess])

  const handleCopy = function(){
    navigator.clipboard.writeText(`${fresult}`);
    setCopySuccess('Copied');
  }


 const handleClick = () => {
    let from = (fInput.current.value);
    let salt = sInput.current.value;
    let init_code = iInput.current.value;
    try{
      let icodehash = keccak256(init_code);
      setfResult(getCreate2Address(from,salt,icodehash));
      setError();
    }catch(e){
      setError('Invalid Address');
      setfResult('');
    }
    
  }
  
  return (
     <Container size='sm' mt={50} >
      <Grid className={classes.myText}>
        <Grid.Col >
      {error && <Alert  title="Bummer!" color="red">
      An error occured, check inputs...
      </Alert>}     
     <Text weight={500} >
      Returns the contract address that would result from the given CREATE2 call.
      Allows interactions to (actually or counterfactually in channels) be made with addresses 
      that do not exist yet on-chain but can be relied on to only possibly eventually contain code 
      that has been created by a particular piece of init code. Important for state-channel use 
      cases that involve counterfactual interactions with contracts.
     </Text>
     <Space h="sm" />
     <TextInput placeholder="from" label="from" ref={fInput} />
     <TextInput placeholder="Salt" label="salt" ref={sInput} />
     <TextInput placeholder="initCode" label="initCode" ref={iInput} /> 
     <Button  mt={10} onClick={handleClick}> Calculate </Button> 
     <Space h="sm" />
     {fresult && <Group position="apart"mb={10}>
        <Text> Result </Text>
       <Group>
        <ActionIcon onClick={handleCopy} variant="filled"><Copy size={16} /></ActionIcon>
        {copySuccess && <Text color='green' className={classes.blink}>{copySuccess}</Text>}
        </Group>
     </Group>}
     {fresult && <Paper shadow="xs" p="md" className={classes.pap}>
       <Center> {`${fresult}`} </Center>
     </Paper>}
        </Grid.Col>
     </Grid>
     </Container>
  );
}

export default GetCreate2Address;