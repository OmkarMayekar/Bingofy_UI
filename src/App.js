import React from 'react';
import {Helmet} from "react-helmet";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegisterUserComponent from "./RegisterUserComponent";
import NavigationBar from "./NavigationBar";
import Recipe from "./Recipes.jsx";
import Home from "./home.jsx";
import Login from "./LoginUserComponent";
import AddUserToList from "./AddUserToList";
import AddItemsToList from "./AddItemsToList";
import ViewMyList from "./ViewMyList.jsx";

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
                    <Route path="/add-user" component={AddUserToList} />
                    <Route path="/register-user" component={RegisterUserComponent} />
                    <Route path="/login-user" component={Login} />
                    <Route path="/recipes" component={Recipe} />
                    <Route path="/add-items" component={AddItemsToList} />
                    <Route path="/view-items" component={ViewMyList} />
                </Switch>
        </Router>
	   </div>
  );
	}
}

export default App;