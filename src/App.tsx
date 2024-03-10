import './App.css';
import { Navbar } from './components/navbar';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useState } from 'react';
import { Footer } from './components/footer';
import Dashboard  from './components/Dashboard/dashboard';
import { useAuth0 } from "@auth0/auth0-react";
import { HeroText } from './components/hero';
import Loading from './components/Loading';
import Profile from './components/profile';
import { ExitButtonContext } from './contexts/ExitButtonContext';

function App() {
  const [showExitButton, setShowExitButton] = useState(false);
  const { isLoading } = useAuth0();
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ExitButtonContext.Provider value={{ showExitButton, setShowExitButton }}>
      <Router>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
            <Navbar/>
            <Switch>
              <Route path="/" exact component={HeroText} />
              <Route path="/profile" component={Profile}/>
              <Route path="/dashboard" component={Dashboard}/>
              <Route path="/logout" component={Dashboard}/>
              <Route path='*' component={() => { return (<div>404 , PAGE NOT FOUND</div>) }}/>
            </Switch>
            <Footer/>
          </MantineProvider>
        </ColorSchemeProvider>
      </Router>
    </ExitButtonContext.Provider>
  );
}

export default App;
