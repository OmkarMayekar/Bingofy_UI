import React from 'react';
import {Helmet} from "react-helmet";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegisterUserComponent from "./RegisterUserComponent";
import NavigationBar from "./NavigationBar";
import AddRecipes from "./AddRecipes.jsx";
import Home from "./home.jsx";
import Login from "./LoginUserComponent";
import AddUserToList from "./AddUserToList";
import AddItemsToList from "./AddItemsToList";
import ViewMyList from "./ViewMyList.jsx";
import LoginToViewPageWarning from "./LoginToViewPageWarning";
import OnlyForAdminWarningPage from "./OnlyForAdminWarning.jsx";
import ViewRecipe from "./ViewRecipe.jsx";
import PersonalizedRecipe from "./PersonalizedRecipe.jsx";
import Feedback from "./Feedback.jsx";
import ViewCommonLists from "./ViewCommonLists.jsx"
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
                    <Route path="/add-recipes" component={AddRecipes} />
                    <Route path="/add-items" component={AddItemsToList} />
                    <Route path="/view-items" component={ViewMyList} />
                    <Route path="/view-recipes" component={ViewRecipe} />
                    <Route path="/personalized-recipes" component={PersonalizedRecipe} />
                    <Route path="/give-feedback" component={Feedback} />
                    <Route path="/warning-page" component={LoginToViewPageWarning} />
                    <Route path="/only-adminwarning" component={OnlyForAdminWarningPage} />
                    <Route path="/common-lists" component={ViewCommonLists} />
                </Switch>
        </Router>
	   </div>
  );
	}
}

export default App;