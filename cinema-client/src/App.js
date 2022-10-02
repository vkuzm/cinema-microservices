import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/home/home.component';
import Upcoming from './pages/upcoming/upcoming.component';
import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';
import TopWatched from './pages/top-watched/top-watched.component';
import SignIn from './pages/sign-in/sign-in.component';
import SignUp from './pages/sign-up/sign-up.component';
import Discounts from './pages/discounts/discounts.component';
import Movie from './pages/movie/movie.component';
import Session from './pages/session/session.component';
import { removeAuthToken, getAuthToken } from './services/Auth';
import ApiUrlConstants from './ApiUrlConstants';
import Profile from './pages/profile/profile.component';

const App = () => {
  const [signIn, setSignIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getAuthToken();

    if (token) {
      fetch(ApiUrlConstants.AUTH, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        }
      })
        .then((res) => toData(res))
        .then((data) => {
          if (data.status === 200) {
            if (!user) {
              setUser(data.body);
              setSignIn(true);
            }
          } else {
            signOut();
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [signIn]);

  const signOut = () => {
    removeAuthToken();
    setUser(null);
    setSignIn(false);
  }

  const toData = (res) => {
    return res.json().then((json) => {
      return {
        status: res.status,
        body: json
      };
    });
  };

  return (
    <div className="App">
      <Header user={user} signOut={signOut} />
      <section>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/upcoming" component={Upcoming} />
          <Route exact path="/top-watched" component={TopWatched} />
          <Route exact path="/discounts" component={Discounts} />
          <Route exact path="/movie/:movieId" render={(props) => <Movie user={user} {...props} />} />
          <Route exact path="/session/:sessionId" render={Session} />
          <Route exact path="/sign-in" render={(props) => <SignIn setSignIn={setSignIn} {...props} />} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/profile" render={() => <Profile user={user} />} />
        </Switch>
      </section>
      <Footer user={user} signOut={signOut} />
    </div>
  );
};

export default App;
