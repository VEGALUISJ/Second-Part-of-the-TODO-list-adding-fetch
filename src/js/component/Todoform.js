import React from "react";
import shortid from "shortid";

//include images into your bundle

//create your first component
export class TodoForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: ""
		};
	}

	keyPress(e) {
		if (e.keyCode === 13) {
			this.state.text == "" ? null : this.props.addToDo(this.state.text);
			this.setState({ text: "" });
		}
	}

	render() {
		return (
			<input
				value={this.state.text}
				placeholder="What needs to be done?"
				onChange={e => this.setState({ text: e.target.value })}
				onKeyDown={e => this.keyPress(e)}
			/>
		);
	}
}