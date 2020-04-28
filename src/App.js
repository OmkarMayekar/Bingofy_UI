import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListUserComponent from "./ListUserComponent";
import RegisterUserComponent from "./RegisterUserComponent";
import EditUserComponent from "./EditUserComponent";
import NavigationBar from "./NavigationBar";
import Recipe from "./Recipes.jsx";
import Home from "./home.jsx";
import Login from "./LoginUserComponent";
import {Helmet} from "react-helmet";

let imgUrl = '/RedOcean.jpg'; 

class App extends React.Component {
  
	render() {
  return (
      <div>
        <Helmet>
          <title>Bingofy</title>
		    </Helmet>  
		    <NavigationBar/>
        <Router>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/users" component={ListUserComponent} />
                    <Route path="/register-user" component={RegisterUserComponent} />
                    <Route path="/login-user" component={Login} />
                    <Route path="/edit-user" component={EditUserComponent} />
                    <Route path="/recipes" component={Recipe} />
                </Switch>
        </Router>
	   </div>
  );
	}
}
const style = {
    color: 'red',
    margin: '10px'
}

export default App;