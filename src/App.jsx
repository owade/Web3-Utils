import React, { useState, useRef } from 'react';
import {MantineProvider,ColorSchemeProvider} from '@mantine/core';
import {Routes,Route} from "react-router-dom";
import FormatUnits from './FormatUnits';
import IcapAddress from './IcapAddress';
import IsAddress from './IsAddress';
import ContractAddress from './ContractAddress';
import GetCreate2Address from './GetCreate2Address';
import ComputeAddress from './ComputeAddress';
import Address from './Address';
import HashId from './HashId';
import Keccak256 from './Keccak256';
import Ripemd160 from './Ripemd160';
import Sha256 from './Sha256';
import Sha512 from './Sha512';
import ComputeHmac from './ComputeHmac';
import HashMessage from './HashMessage';
import NameHash from './NameHash';
import Encode from './Encode';
import GetPayLoad from './GetPayLoad';
import GetPrimaryType from './GetPrimaryType';
import Hash from './Hash';
import HashDomain from './HashDomain';
import Base58Decode from './Base58Decode';
import Base58Encode from './Base58Encode';
import Base64Decode from './Base64Decode';
import Base64Encode from './Base64Encode';
import RLPEncode from './RLPEncode';
import RLPDecode from './RLPDecode';
import RecoverAddress from './RecoverAddress';
import NotFound from './NotFound';
import Layout from './Layout';
 

 function App() {   
const [colorScheme, setColorScheme] = useState('dark');
const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<FormatUnits />} />
            <Route path="FormatUnits" element={<FormatUnits />} />
            <Route path="Address" element={<Address />} />
            <Route path="IcapAddress" element={<IcapAddress />} />
            <Route path="IsAddress" element={<IsAddress />} />
            <Route path="ContractAddress" element={<ContractAddress />} />
            <Route path="GetCreate2Address" element={<GetCreate2Address />} />
            <Route path="ComputeAddress" element={<ComputeAddress />} />
            <Route path="HashId" element={<HashId />} />
            <Route path="Keccak256" element={<Keccak256 />} />
            <Route path="Ripemd160" element={<Ripemd160 />} />
            <Route path="Sha256" element={<Sha256 />} />
            <Route path="Sha512" element={<Sha512 />} />
            <Route path="ComputeHmac" element={<ComputeHmac />} />
            <Route path="HashMessage" element={<HashMessage />} />
            <Route path="NameHash" element={<NameHash />} />
            <Route path="Encode" element={<Encode />} />
            <Route path="GetPayLoad" element={<GetPayLoad />} />
            <Route path="GetPrimaryType" element={<GetPrimaryType />} />
            <Route path="Hash" element={<Hash />} />
            <Route path="HashDomain" element={<HashDomain />} />
            <Route path="Base58Decode" element={<Base58Decode />} />
            <Route path="Base58Encode" element={<Base58Encode />} />
            <Route path="Base64Decode" element={<Base64Decode />} />
            <Route path="Base64Encode" element={<Base64Encode />} />
            <Route path="RLPEncode" element={<RLPEncode />} />
            <Route path="RLPDecode" element={<RLPDecode />} />
            <Route path="RecoverAddress" element={<RecoverAddress />} />
             <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>  
      </MantineProvider>
    </ColorSchemeProvider>
      
  );
}

export default App;