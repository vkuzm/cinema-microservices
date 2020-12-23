import React from 'react';
import './App.css';
import Home from './pages/home/home.component';
import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';

function App() {
  return (
    <div className="App">
      <Header />
      <section>
        <Home />
      </section>
      <Footer />
    </div>
  );
}

export default App;
