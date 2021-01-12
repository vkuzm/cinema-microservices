import React from 'react';
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

const App = () => {
  return (
    <div className="App">
      <Header />
      <section>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/upcoming" component={Upcoming} />
          <Route exact path="/top-watched" component={TopWatched} />
          <Route exact path="/sign-in" component={SignIn} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/discounts" component={Discounts} />
          <Route exact path="/movie/:movieId" component={Movie} />
          <Route exact path="/session/:sessionId" component={Session} />
        </Switch>
      </section>
      <Footer />
    </div>
  );
};

export default App;
