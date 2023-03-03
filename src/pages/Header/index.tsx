import { GiHamburgerMenu } from 'react-icons/gi';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { connect } from 'react-redux'
import { Box } from '@material-ui/core';

import { SearchInput } from 'components/SearchInput';
import { loadAllMedia } from 'redux/actions/MediaAction';

import styles from './style.module.scss';
import Web3 from 'web3';

type HeaderProps = {
  account: any,
  isOpen: boolean,
  setOpen: any,
  setAccount: any,
  loadAllMedia: any,
};

declare let window: any;

const Header: FC<HeaderProps> = ({ account, isOpen, setOpen, setAccount, loadAllMedia }) => {

  const { addToast } = useToasts();
  const [activepage, setActivePage] = useState(0);

  let ellipsis = "Connect";
  if (account) {
    ellipsis = account.substring(0, 4) + '...' + account.substring(account.length - 4);
  }

  const onMyItem = () => {
    if (!account) {
      addToast('Please Connect Wallet' || 'An error occured', { appearance: 'error' });
      return;
    }
    localStorage.setItem('activepage', '1');
  }

  useEffect(() => {
    setActivePage(Number(localStorage.getItem('activepage')));
    async function fetchData() {
      window.web3 = new Web3(window.ethereum);
      const accounts = await window.web3.eth.getAccounts();
      console.log(accounts);
      setAccount(accounts[0]);
    }
    fetchData();
  }, [])

  const setCriteria = (e: any) => {
    if (e.key === 'Enter') {
      loadAllMedia({ criteria: e.target.value });
    }
  }
  return (
    <div className={styles.nav} >
      <img src="/images/logo.png" style={{padding: 0}} alt='logo' />
      <span style={{fontSize: 20, color: 'white', fontWeight: 800}}>IPFS Upload Page</span>
    </div >
  );
};
export default connect(null, { loadAllMedia })(Header)
