'use strict';
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import keydown from 'react-keydown';
import PongApi from './PongApi';
import './styles/pong.scss';
const io = require('socket.io-client');
const socket = io.connect('http://localhost:5000');
const movementSize = 18;

@observer
class PongContainer extends Component {

	constructor(props) {
		super(props);

		this.state = {
			personNumber: null,
			message: "",
			otherMessage: "",
			draftingMessage: "",
		}

		socket.on('newMessage', (data) => {
			this.showMessage(data);
		});
	}
	
	sendMessage() {
		if (this.state.draftingMessage != null && this.state.draftingMessage !== "") {
		    this.setState({
		    	message: this.state.draftingMessage,
		    	draftingMessage: "",
		    });
		    socket.emit('sendMessage', {
			    	personNumber: this.state.personNumber,
			    	message: this.state.draftingMessage,
			    });
		    setTimeout(() => {
		    	this.setState({
		    		message: "",
		    	});
		    }, 5000);
		}
	}

	setDraftingMessage(e) {
		this.setState({
			draftingMessage: e.target.value,
		});
	}

	showMessage(message) {
		if (message.personNumber != this.state.personNumber) {
			this.setState({
				otherMessage: message.message,
			});
			setTimeout(() => {
		    	this.setState({
		    		otherMessage: "",
		    	});
		    }, 5000);
		}
	}

	handleKeyPress(e) {
		if (e.key == 'Enter') {
			this.sendMessage();
		}
	}

	componentDidMount(newProps) {
		PongApi.getPerson()
		.then((data) => {
			if (data.personNumber != null) {
				this.setState({
					personNumber: data.personNumber,
				});
			} else {
				this.setState({
					personNumber: null,
				});
			}
		});
	}

	render() {
		// var speechBubble1 = this.state.message && (<p className="speechBubble"> {this.state.message} </p>);
		// var speechBubble2 = this.state.otherMessage && (<p className="speechBubble"> {this.state.otherMessage} </p>);

		var speechBubble1, speechBubble2;
		if (this.state.personNumber == 1) {
			speechBubble1 = this.state.message && (<p className="speechBubble"> {this.state.message} </p>);
			speechBubble2 = this.state.otherMessage && (<p className="speechBubble"> {this.state.otherMessage} </p>);
		} else {
			speechBubble2 = this.state.message && (<p className="speechBubble"> {this.state.message} </p>);
			speechBubble1 = this.state.otherMessage && (<p className="speechBubble"> {this.state.otherMessage} </p>);
		}

		return (
			<div className="container">
				<div className="personContainer"> 
					<div className="person1View"> 
						<video className="person2View" src={require("../assets/john.mp4")} autoPlay loop />
						{speechBubble1}
					</div>
					<div className="person2View">
						<video className="person2View" src={require("../assets/brennan.mp4")} autoPlay loop />
						{speechBubble2}
					</div>
				</div>
				
				<input type="text"
				className="chatInput"
				placeholder="Say something."
				value={this.state.draftingMessage}
				onChange={this.setDraftingMessage.bind(this)}
				onKeyPress={this.handleKeyPress.bind(this)} />
			</div>
		);
	}
}

export default PongContainer;