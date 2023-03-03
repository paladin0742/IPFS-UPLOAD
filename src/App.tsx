import { useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './pages/Header';
import Mint from 'pages/mint/mint';
import { Box } from '@material-ui/core';

import ConnectModal from './components/ConnectModal';
import store from './app/store';
import { ToastProvider } from 'react-toast-notifications';


import useAuth from './hooks/useAuth';

function App() {
  const [isOpen, setOpen] = useState(false);
  const { login, logout } = useAuth()
  const [account, setAccount] = useState();
  return (
    <ToastProvider>
      <Provider store={store}>
        <Box position= 'relative'>
          <Router>
            <Header account={account} isOpen={isOpen} setOpen={setOpen} setAccount={setAccount} />
            <ConnectModal login={login} open={isOpen} setOpen={setOpen} account={account} setAccount={setAccount} />
            <Switch>
              <Route path="/">
                <Mint account={account} />
              </Route>
            </Switch>
          </Router>
        </Box>
      </Provider>
    </ToastProvider>

  );
}

export default App;
