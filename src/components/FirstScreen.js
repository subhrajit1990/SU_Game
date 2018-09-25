import React from 'react';

export default class FirstScreen extends React.Component{
	constructor(){
		super();
		this.clickMe = this.clickMe.bind(this);
	}

	clickMe(){
		this.props.clickEvent(this.props.clickEvent);
	}

	render(){
		return(			
			<div className={ "wrapper homescreen" + (this.props.gameOver ? " homescreenVisible" : " homescreenHidden")}>
			  <div className="bg">
			    <div className="content">
			      	<div className="homescreenStats">
		                Your Score: <strong className="homescreenNumber" >{this.props.gameWon}</strong>
		            </div>
			    </div>
			  </div>
			  <div className="btn-wrapper">
			    <div className="cube spin">
			      <div className="face front text" onClick={this.clickMe}>Lets Play !</div>
			      <div className="face right"></div>
			      <div className="face left"></div>
			      <div className="face top"></div>
			      <div className="face bottom"></div>
			    </div>
			  </div>
			</div>
		);
	}
}


