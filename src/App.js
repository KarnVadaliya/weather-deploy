import React from 'react';
import './App.css';
import weather from './components/weather';
import threehourly from './components/threehourly';
import {Route,BrowserRouter} from 'react-router-dom';




function App() {
  return (
    <BrowserRouter className="App" >
      <div>
        <Route exact path="/" component={weather} />
        <Route exact path="/:day" component={threehourly}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
