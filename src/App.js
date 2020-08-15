import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom'

import './App.css';
import Home from './components/Home';

import Signup from './components/Signup'
import Login from './components/Login';
import fireapp from './auth/firebase';
import Loading from './components/Loading';
class App extends React.Component {
  state = {
    user: null,
    signedin: false,
    loading: true
  }
  async componentDidMount() {
    await fireapp.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        var uid = user.uid;
        this.setState(() => ({ signedin: true, user: uid }));
        //console.log('called here state changed',displayName);
        console.log('called here state changed', uid);

        // ...
      } else {
        // User is signed out.
        // ...
        console.log('signed out');
        this.setState(() => ({ user: null }));
      }
      this.setState(() => ({ loading: false }))
    });

  }

  //setUser=()

  render() {
    if (this.state.loading) {
      return (<Loading></Loading>)
    }
    return (
      <BrowserRouter>
        <Route exact path="/" render={() => {
          if (this.state.user) {
            return (<Home user={this.state.user}></Home>);
          }
          return (<Redirect to="/login"></Redirect>)
        }}>
        </Route>
        <Route exact path="/login" render={() => <Login user={this.state.user}></Login>}></Route>
        {/* <Route exact path="/login" render={()=>(<login></login>)>
      </Route> */}
        <Route exact path="/signup" render={() => <Signup user={this.state.user}></Signup>}></Route>
      </BrowserRouter>

    );
  }
}

export default App;
