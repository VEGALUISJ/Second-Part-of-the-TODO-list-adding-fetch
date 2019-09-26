import React from "react";
import PropTypes from "prop-types";

//include images into your bundle

//import your own components
import { TodoForm } from "./Todoform.js";

//create your first component
export class Todolist extends React.Component {
	constructor() {
		super();
		this.state = {
			list: []
		};
		this.addToDo = this.addToDo.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	addToDo(todo) {
		const todos = {
			label: todo,
			done: false
		};
		this.updateTodo({ list: [...this.state.list, todos] });
	}

	handleClick(e, index) {
		e.preventDefault();
		console.log("HICE CLICK", index);
		let temp = this.state.list;
		temp.splice(index, 1);
		this.setState({ list: temp });
	}

	componentDidMount() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/VEGALUISJ")
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					console.log("Bad response");
				}
			})
			.then(data => {
				this.setState({ list: data });
				console.log(data);
			})
			.catch(error => console.log(error));
	}

	updateTodo(todo) {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/VEGALUISJ", {
			method: "PUT", // or 'POST'
			body: JSON.stringify(todo), // data can be `string` or {object}!
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(response => {
				if (!response.msg) {
					this.setState(todo);
				} else {
					console.log(response.msg);
				}
			})
			.catch(error => console.error("Error:", error));
	}

	render() {
		console.log(this.state);
		return (
			<div className="maincontainer">
				<div className="tittle">todos</div>
				<div className="lista">
					<TodoForm addToDo={this.addToDo} />
					<ul>
						{this.state.list.map((item, ind) => {
							return (
								<li key={ind}>
									{item.label}
									<span
										className="times fa fa-times"
										onClick={e => this.handleClick(e, ind)}
									/>
								</li>
							);
						})}
					</ul>
					<div className="footer">{this.state.list.length} items</div>
				</div>
			</div>
		);
	}
}

Todolist.propTypes = {
	addToDo: PropTypes.string
};
