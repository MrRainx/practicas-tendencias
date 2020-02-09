import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import ImagenS3 from './pages/ImagenS3';
import Firebase from './pages/Firebase';
import NavBar from './components/Navbar';
import { Provider } from 'react-redux';
import store from "./store";
import ModalComponent from './components/Modal';

function App() {

  return (

    <Provider store={store}>
      <Router>
        <NavBar />
        <>
          <Switch>

            <Route path="/" exact component={Home} />
            <Route path="/imagens3" exact component={ImagenS3} />
            <Route path="/firebase" exact component={Firebase} />

          </Switch>
        </>
        <ModalComponent />
      </Router>
    </Provider>

  )
}

export default App;
