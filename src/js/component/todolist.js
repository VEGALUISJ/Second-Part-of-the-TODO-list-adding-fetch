import React from "react";

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
		console.log(todos);
		const list = [...this.state.list, todos];
		this.setState({ list: list });
		console.log("en el addtodo", list);
		this.updateTodo(list);
	}

	handleClick(e, index) {
		e.preventDefault();
		console.log("HICE CLICK", index);
		let temp = this.state.list;
		temp.splice(index, 1);
		this.setState({ list: temp });
		this.updateTodo(temp);
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
		console.log(todo);
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
				console.log(response);
			})
			.catch(error => console.error("Error:", error));
	}

	render() {
		console.log(this.state.list);
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
