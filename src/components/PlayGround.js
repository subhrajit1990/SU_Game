import React,{Fragment} from 'react';
import FirstScreen from './FirstScreen'; 
import CardLayout from './CardLayout';
import requestService from '../api/api';

const API = '/staticData/cardList.json';
const numCardsToMatch = 2;

export default class PlayGround extends React.Component {

	constructor(){
		super();
		this.ignoreClicks = false;
    
		this.state = { 
	      cards : [],
	      selectedCards: [],
	      gameWon: 0,
	      gameOver: 1,
	      uniqueCards: []
    	};
		this.shuffleCards = this.shuffleCards.bind(this);
    	this.chooseCard = this.chooseCard.bind(this);
    	this.winner = this.winner.bind(this);
    	this.cardDetailsList = this.cardDetailsList.bind(this);
   
	}
  cardDetailsList(res){
  	let data = [];
  	(res.cards).filter( (i,v) => {
  		data.push(i.title);
  	});

  	console.log("API DATA "+JSON.stringify(data));
  	this.setState({
  		uniqueCards: data
  	})

    let multipliedCards = (this.numCards(this.state.uniqueCards,numCardsToMatch));

    multipliedCards = multipliedCards.map((a) => ({sort: Math.random(), value: a}))
  			.sort((a, b) => a.sort - b.sort)
  			.map((a) => a.value);

    console.log("CARDS "+ JSON.stringify(multipliedCards));
    
    let cards = multipliedCards.map(val => {
      return {
        type: val,
        position: 'unselected'
      }
    });
    
    this.setState({ 
      cards: cards,
      gameOver: 0
    });
  }


  numCards(cards,multiplier){
    let iterations = multiplier - 1;
    let multiplied = cards;
    
    for (var i = 0; i < iterations; i++){
      multiplied = multiplied.concat(cards);
    }
    
    return multiplied;
  }

  shuffleCards(){
      
  	requestService(API)
    .then(response => response.json())
    .then(this.cardDetailsList);    
  }
  
  changeAllPositionsOfSelected(allCards,selectedCards,newPosition){
  	selectedCards.map( v => {
  		allCards[v].position=newPosition;
  	})
    console.log("ALL CARDS"+ JSON.stringify(allCards));
    return allCards;
  }
  
  winner(){
    let newgameWon = this.state.gameWon + 1;
    this.setState({ 
    	gameWon: newgameWon, 
    	gameOver: 1 
    });
  }
  
  selectedHasSameAttribute(allCards,selectedCards,attribute){
    let eq = allCards[selectedCards[0]][attribute];
    for (var v of selectedCards) {
      if(allCards[v][attribute] !== eq){ return false; }
    }
    return true;
  }
  
  
  checkForMatch(pCurrentCards, curSelectedCards){
      
     if( this.selectedHasSameAttribute(pCurrentCards,curSelectedCards,'type') ){
        pCurrentCards = this.changeAllPositionsOfSelected(pCurrentCards,curSelectedCards,"removed");
        
       let winTest =  pCurrentCards.reduce( function(result, value, key) {
         
          if(result === value.position){
            return result;
          }else{
            return false;
          }
                
        }, pCurrentCards[0].position); 
        
     
       if(winTest !== false){
         this.winner();
       }
       
      }else{
        pCurrentCards = this.changeAllPositionsOfSelected(pCurrentCards,curSelectedCards,"unselected");
      }
    
      return pCurrentCards;
  }

  chooseCard(index){
   
    
    if(this.ignoreClicks !== true){

      let curSelectedCards = (this.state.selectedCards).concat(index);
      let currentCards = this.state.cards;      
      currentCards[curSelectedCards[ curSelectedCards.length-1 ]].position="selected";

      if(curSelectedCards.length === numCardsToMatch){

          this.setState({
            
            cards: currentCards
          })

        let pThis = this;
        this.ignoreClicks = true;

        let pauseGame = setTimeout(function(){ 
          currentCards = pThis.checkForMatch(currentCards, curSelectedCards);
          curSelectedCards = [];

          pThis.ignoreClicks = false;

          pThis.setState({
            selectedCards: curSelectedCards,
            cards: currentCards
          })

        }, 750);

      }else{
        currentCards[curSelectedCards[0]].position="selected";

          this.setState({
            selectedCards: curSelectedCards,
            cards: currentCards
          })

      }

    }
  }
  
  render(){ 
    let clickEvent = this.chooseCard,
    cardIndex = 0;
     return(
     <div className="memory-app">
       <FirstScreen gameOver={this.state.gameOver} gameWon={this.state.gameWon} clickEvent={this.shuffleCards} />
       <div className="cards">
           {this.state.cards.map((thisCard,i) => {
            return <CardLayout key={i} index={i} clickEvent={clickEvent} position={thisCard.position} type={thisCard.type} />
            })}
       </div> 

      </div>
     )
  }
}

