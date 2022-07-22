import React,{useState,useRef,useEffect} from 'react';
import {Text,TextInput,Button,createStyles,Container,Paper,Space,Group,ActionIcon,Grid,Center,keyframes,
        Anchor,Textarea,Alert} from '@mantine/core';
import { Copy } from 'tabler-icons-react';
import {_TypedDataEncoder} from "ethers/lib/utils";

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

const HashDomain = () => {
  const { classes } = useStyles();
  const [fresult, setfResult] = useState('');
  const domInput = useRef();
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

  const handleLoad = () => {
    let domain = {"name":"Ether Mail","version":"1","chainId":1,"verifyingContract":"0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC"} ;
    let types = {"Person":[{"name":"name","type":"string"},{"name":"wallet","type":"address"}],"Mail":[{"name":"from","type":"Person"},{"name":"to","type":"Person"},{"name":"contents","type":"string"}]};
    let value ={"from":{"name":"Cow","wallet":"0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826"},"to":{"name":"Bob","wallet":"0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB"},"contents":"Hello, Bob!"} ;
   
   domInput.current.value = JSON.stringify(domain);
    
  }

  const handleClear = () => {
    domInput.current.value = "";
  }


  const handleClick = () => {
    let domain = (domInput.current.value);
    try{ 
      let domObj = JSON.parse(domain);
      console.log(typeof domObj);

      setfResult(_TypedDataEncoder.hashDomain(domObj));
      setError();
    }catch(e){
      setError('Invalid');
      //console.error(e);
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
       Encodes the Returns the hashed EIP-712 domain.
       Uses TypedDataEncoder for types.
     </Text>
     <Text> Input must be in JSON format. Use  <Anchor 
      href="https://jsonformatter.curiousconcept.com/#" target="_blank" rel="noopener 
      noreferrer">JSONformatter</Anchor> to 
      validate if necessary</Text>
     <Button  mt={10} onClick={handleLoad}> Load Sample </Button>
     <Space h="sm" />
     <Textarea autosize minRows={5} placeholder="Type" label="Type" ref={domInput} />
     <Group position="apart">
       <Button  mt={10} onClick={handleClick}> Calculate </Button> 
       <Button  mt={10} onClick={handleClear} > Clear </Button> 
     </Group>  
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

export default HashDomain;