import React from 'react';
import NavbarComp from './components/NavbarComp';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage'
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { URL_API } from './helper';
import { connect } from 'react-redux';
import { keepLogin } from './actions'
import UserCart from './pages/UserCart';
import HistoryPage from './pages/HistoryPage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.reLogin()
    this.getUserData()
  }

  reLogin = () => {
    let idToken = localStorage.getItem("tkn_id")
    // console.log("token :", idToken)
    axios.get(URL_API + `/users?id=${idToken}`)
      .then(res => {
        console.log("keep login", res.data[0])
        this.props.keepLogin(res.data[0])
      })
      .catch(err => {
        console.log("keeplogin :", err)
      })
  }


  getUserData = () => {
    axios.get(URL_API + `/users`)
      .then((res) => {
        console.log(res.data)
        this.props.authLogin(res.data)
      })
      .catch(err => console.log(err))
  }
  render() {
    return (
      <>
        <NavbarComp />
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/login" component={LoginPage} />
          <Route path="/cart" component={UserCart} /> 
          <Route path="/history" component={HistoryPage} /> 
        </Switch>
      </>
    );
  }
}

export default connect(null, { keepLogin })(App);