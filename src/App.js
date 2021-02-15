import axios from 'axios';
import { useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import './App.css';
import Admin from './components/Admin';
import Boravak from './components/Boravak';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Parkiraliste from './components/Parkiraliste';
import Racun from './components/Racun';
import RacunForma from './components/RacunForma';
import Register from './components/Register';
import { serverLocation } from './constants';

function App() {

  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const fun = async () => {
      try {
        const res = await (await axios.get(serverLocation + '/check', { withCredentials: true, })).data;
        setUser(res);
      } catch (error) {

      }
    }
    fun();
  }, [])
  return (
    <>
      {
        user && (
          <Navbar setUser={setUser} admin={user && user.category === 'admin'} />
        )
      }
      <>
        {
          !user ? (
            <Switch>
              <Route path='/register'>
                <Register />
              </Route>
              <Route path='/'>
                <Login setUser={setUser} />
              </Route>

            </Switch>
          ) : (
              <Switch>
                <Route path='/parkiralista'>
                  <Parkiraliste />
                </Route>
                <Route path='/racunforma/:id'>
                  <RacunForma />
                </Route>
                <Route path='/racun'>
                  <Racun />
                </Route>

                <Route path='/boravak'>
                  <Boravak />
                </Route>
                {
                  user.category === 'admin' && (
                    <Route path='/admin'>
                      <Admin ></Admin>
                    </Route>
                  )
                }
                <Route path='/'>
                  <Redirect to='/parkiralista' />
                </Route>
              </Switch>
            )
        }
      </>
    </>
  );
}

export default App;
