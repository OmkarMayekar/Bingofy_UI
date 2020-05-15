import React, { Component } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import '../node_modules/jquery/dist/jquery.min.js'
import { Navbar, Nav, NavDropdown,Form,FormControl,Button } from 'react-bootstrap';

class NavigationBar extends Component {
	constructor(props) {
		super(props)
	this.logOutUser = this.logOutUser.bind(this);
	}

	logOutUser()
	{
		window.sessionStorage.removeItem("LoginResponse");
		window.sessionStorage.removeItem("LoggedInUsername");
	}

	render() {
		return (
			<Navbar bg="dark" variant="dark" expand="lg">
				<Navbar.Brand href="">Bingofy</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="navbar navbar-expand-xl navbar-dark bg-dark pmd-navbar pmd-z-depth fixed-top" style={{fontFamily:'cursive'}}>
						<Nav.Link href="/">Home</Nav.Link>
						<Nav.Link href="/register-user">Register User</Nav.Link>
						<Nav.Link href="/add-user">Add User To List</Nav.Link>
						<Nav.Link href="/login-user">Login</Nav.Link>
						<Nav.Link href="/add-items">Add Items To List</Nav.Link>
						<Nav.Link href="/view-items">View My List</Nav.Link>
						<NavDropdown title="Others" id="basic-nav-dropdown">
							<NavDropdown.Item href="/add-recipes">Add Recipes</NavDropdown.Item>
							<NavDropdown.Item href="/view-recipes">View Recipes</NavDropdown.Item>
							<NavDropdown.Item href="/personalized-recipes">Personalized Recipes</NavDropdown.Item>
							<NavDropdown.Item href="/#Notes">Notes</NavDropdown.Item>
							<NavDropdown.Divider/>
							<NavDropdown.Item href="/give-feedback">Feedback</NavDropdown.Item>
						</NavDropdown>
						<div class="dropdown pmd-dropdown pmd-user-info ml-auto">
					        <a href="javascript:void(0);" class="btn-user dropdown-toggle media align-items-center" data-toggle="dropdown" data-sidebar="true" aria-expanded="false">
					            <img class="mr-2" src="/profileIcon.png" width="40" height="40" alt="avatar"/>
					            <div class="media-body">
					                Logout
					            </div>
					        </a>
					        <ul class="dropdown-menu dropdown-menu-right" role="menu">
					            <a class="dropdown-item" href="#" onClick={this.logOutUser}>Logout</a>
					        </ul>
				    </div>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}

}

export default NavigationBar;