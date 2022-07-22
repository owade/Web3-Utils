import React,{useState,useRef,useEffect} from 'react';
import {Text,TextInput,Button,createStyles,Container,Paper,Space,Group,ActionIcon,Grid,Center,keyframes,Select,
       Alert} from '@mantine/core';
import { Copy } from 'tabler-icons-react';
import {computeHmac} from "ethers/lib/utils";

const blinker = keyframes({
  '50%': {  opacity: '0.2' },
});

const useStyles = createStyles((theme) => ({
  myText: {  
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
  },
  pap:{
    wordWrap: 'break-word',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
  },
   blink:{
     animation: `${blinker} 1s linear infinite`,     
  },
}));

const ComputeHmac = () => {
  const { classes } = useStyles();
  const [fresult, setfResult] = useState('');
  const [error,setError] = useState(); 
  const algoInput = useRef();
  const keyInput = useRef();
  const dataInput = useRef();
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
    let algo = algoInput.current.value;
    let key = keyInput.current.value;
    let data = dataInput.current.value;
    try{ 
      setfResult(computeHmac(algo,key,data));
      setError();
    }catch(e){
      setError('Invalid');
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
        Returns the HMAC of data with key using the supported Algorithm (sha256/sha512).
     </Text>
     <Select
      label="Choose one algorithm"
      placeholder="Pick Algorithm"
      ref={algoInput}
      data={[
        { value: 'sha256', label: 'sha256' },
        { value: 'sha512', label: 'sha512' },
      ]}
     />
     <Space h="lg" />
     <TextInput placeholder="key" ref={keyInput} />
     <Space h="lg" />
     <TextInput placeholder="data" ref={dataInput} />
     <Space h="lg" />  
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

export default ComputeHmac;