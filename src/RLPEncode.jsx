import React,{useState,useRef,useEffect} from 'react';
import {Text,TextInput,Button,createStyles,Container,Paper,Space,Group,ActionIcon,Grid,Center,keyframes,
       Alert} from '@mantine/core';
import { Copy } from 'tabler-icons-react';
import {RLP} from "ethers/lib/utils";

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

const RLPEncode = () => {
  const { classes } = useStyles();
  const [fresult, setfResult] = useState('');
  const regInput = useRef();
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
    let value = (regInput.current.value);
    try{ 
      setfResult(RLP.encode(value));
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
       Encode a structured Data Object into its RLP-encoded representation.
       Array input not supported.
     </Text>
     <Space h="sm" />
     <TextInput placeholder="input" ref={regInput} />
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

export default RLPEncode;