import React, { useState, useEffect } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  Anchor, Space,
  useMantineTheme, Button, Modal,
  TextInput, Paper, Container, Center,
  createStyles,
  ActionIcon, useMantineColorScheme, Collapse, UnstyledButton, Box, ThemeIcon, Group, ScrollArea
} from '@mantine/core';
import { Sun, MoonStars, Notes, SwitchHorizontal, AddressBook, ShieldLock, CloudLockOpen, Copy, BrandTwitter } from 'tabler-icons-react';
import { Outlet, Link } from "react-router-dom";
import { LinksGroup } from './NavbarLinksGroup';

const useStyles = createStyles((theme) => ({


  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '500px',
    height: '500px',
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },
}))

const Layout = () => {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
  const [bopened, setBOpened] = useState(false);
  const [opened, setOpened] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = (colorScheme === 'dark');
  const [copySuccess, setCopySuccess] = useState('');
  const [active, setActive] = useState('');

  const handleCopy = function() {
    navigator.clipboard.writeText(`0xd1BbDA3da12bf086145EF8553aecDbf4C7883844`);
    setCopySuccess('Copied');
  }

  const handleTwitter = () => {
    let url = 'https://twitter.com/owadez';
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  useEffect(() => {
    let timer = setTimeout(() => setCopySuccess(''), 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [copySuccess])

  const item1 = {
    label: 'Convert',
    icon: SwitchHorizontal,
    initiallyOpened: false,
    link: '/FormatUnits'
  }

  const item2 = {
    label: 'Address',
    icon: AddressBook,
    initiallyOpened: false,
    links: [
      { label: 'getAddress', link: '/Address' },
      { label: 'getIcapAddress', link: '/IcapAddress' },
      { label: 'validAddress?', link: '/IsAddress' },
      { label: 'getContractAddress', link: '/ContractAddress' },
      { label: 'GetCreate2Address', link: '/GetCreate2Address' },
      { label: 'ComputeAddress', link: '/ComputeAddress' },
      { label: 'RecoverAddress', link: '/RecoverAddress' },
    ],
  }

  const item3 = {
    label: 'Hashing',
    icon: ShieldLock,
    initiallyOpened: false,
    links: [
      { label: 'id', link: '/HashId' },
      { label: 'keccak256', link: '/Keccak256' },
      { label: 'ripemd160', link: '/Ripemd160' },
      { label: 'sha256', link: '/Sha256' },
      { label: 'sha512', link: '/Sha512' },
      { label: 'computeHmac', link: '/ComputeHmac' },
      { label: 'hashMessage', link: '/HashMessage' },
      { label: 'namehash', link: '/NameHash' },
      { label: 'TypedDataEncoder/encode', link: '/Encode' },
      { label: 'TypedDataEncoder/getPayload', link: '/GetPayLoad' },
      { label: 'TypedDataEncoder/getPrimaryType', link: '/GetPrimaryType' },
      { label: 'TypedDataEncoder/Hash', link: '/Hash' },
      { label: 'TypedDataEncoder/HashDomain', link: '/HashDomain' },

    ],
  }

  const item4 = {
    label: 'Encoding',
    icon: CloudLockOpen,
    initiallyOpened: false,
    links: [
      { label: 'Base58Decode', link: '/Base58Decode' },
      { label: 'Base58Encode', link: '/Base58Encode' },
      { label: 'Base64Decode', link: '/Base64Decode' },
      { label: 'Base64Encode', link: '/Base64Encode' },
      { label: 'RLPEncode', link: '/RLPEncode' },
      { label: 'RLPDecode', link: '/RLPDecode' },
    ],
  }

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!bopened} width={{ sm: 200, lg: 300 }}>
          <Navbar.Section grow className={classes.links} component={ScrollArea}>
            <div className={classes.linksInner}>
              <LinksGroup {...item1} setBOpened={setBOpened} active={active}
                setActive={setActive} key={item1.label} />
              <LinksGroup {...item2} setBOpened={setBOpened} active={active}
                setActive={setActive} key={item2.label} />
              <LinksGroup {...item3} setBOpened={setBOpened} active={active}
                setActive={setActive} key={item3.label} />
              <LinksGroup {...item4} setBOpened={setBOpened} active={active}
                setActive={setActive} key={item4.label} />
            </div>
          </Navbar.Section>
        </Navbar>
      }
      footer={
        <Footer height={60} p="md">
          <Modal
            size="lg"
            centered
            opened={opened}
            onClose={() => setOpened(false)}
            title="Thank you for donating :)"
          >
            <Text weight={700}> The following eth address can be used to send tokens...</Text>
            <Group position="left">
              <Paper shadow="xs" p="md">
                <Text>0xd1BbDA3da12bf086145EF8553aecDbf4C7883844</Text>
              </Paper>

              <ActionIcon onClick={handleCopy} variant="filled"><Copy size={16} /></ActionIcon>
              {copySuccess && <Text color='green' >{copySuccess}</Text>}

            </Group>
          </Modal>
          <Center>
            <Button onClick={() => setOpened(true)}> Donate </Button>
            <Space w="md" />
            <ActionIcon onClick={handleTwitter} variant="filled">
              <BrandTwitter size={27} color={'#1971c2'} />
            </ActionIcon>
          </Center>

        </Footer>
      }
      header={
        <Header height={70} p="md">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={bopened}
                onClick={() => setBOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text size="lg" weight="700"> WEB3 UTILILTIES :)</Text>
            <ActionIcon
              variant="outline"
              color={dark ? 'yellow' : 'blue'}
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
            >
              {dark ? <Sun size={18} /> : <MoonStars size={18} />}
            </ActionIcon>
          </div>
        </Header>
      }
    >

      <Outlet />


    </AppShell>
  );
}

export default Layout