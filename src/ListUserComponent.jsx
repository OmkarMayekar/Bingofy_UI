import React, { Component } from 'react'
import ApiService from "./ApiService";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import '../node_modules/jquery/dist/jquery.min.js';
class ListUserComponent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			users: [],
			message: null
		}
		this.deleteUser = this.deleteUser.bind(this);
		this.editUser = this.editUser.bind(this);
		this.addUser = this.addUser.bind(this);
		this.reloadUserList = this.reloadUserList.bind(this);
	}

	componentDidMount() {
		this.reloadUserList();
	}

	reloadUserList() {
		ApiService.fetchUsers()
			.then((response) => {
				var test = JSON.stringify(response.data);
				console.log("response from get service is : " + test);
				this.setState({ users: response.data });
				console.log("user state value is : " + this.state.users);
			});
	}

	deleteUser(userId) {
		ApiService.deleteUser(userId)
			.then(res => {
				this.setState({ message: 'User deleted successfully.' });
				this.setState({ users: this.state.users.filter(user => user.id !== userId) });
			})

	}

	editUser(id) {
		window.localStorage.setItem("userId", id);
		this.props.history.push('/edit-user');
	}

	addUser() {
		window.localStorage.removeItem("userId");
		this.props.history.push('/add-user');
	}

	render() {
		return (
			<div  style={{backgroundColor: 'grey'}}>
			ListUserComponent
			</div>
		);
	}

}

export default ListUserComponent;