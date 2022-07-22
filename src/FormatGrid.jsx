import React from 'react';
import {Grid,TextInput,Button, Center, useMantineTheme, Text } from '@mantine/core';

const FormatGrid = ({name,value,onChange}) => {
  const theme = useMantineTheme();
  const styles = { 
    display : 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#228be6',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
  };
  return(
    <Grid gutter={0} >
     <Grid.Col span={8}>
        <TextInput error="" name={name} value={value || ''} onChange={onChange}  />
     </Grid.Col>
     <Grid.Col span={2} style={styles}>
        <Text weight={700}>{name}</Text>
     </Grid.Col>
   </Grid>
  )
}

export default FormatGrid;