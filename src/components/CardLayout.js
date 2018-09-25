import React from 'react';

export default class CardLayout extends React.Component{
	constructor(){
		super();
		this.cardClick = this.cardClick.bind(this);
	}

	cardClick(){
		if(this.props.position === 'unselected'){
      		this.props.clickEvent(this.props.index);
    	}
	}
	
	render(){
		return(
			<div data-index={this.props.index} data-cardtype={this.props.type} onClick={this.cardClick } className={ 'card card--'+this.props.type+' card--'+this.props.position } > 
		        <div className="cardInner"> 
		            <div className="cardFace cardFront">?</div> 
		            <div className="cardFace cardBack">{this.props.type}</div> 
		        </div> 
    		</div> 
		);
	}
}



