

import React from 'react';

export class NotFoundPage extends React.Component {
  render() {
    return (
		<div id="pageNotFound" className="container-fluid jumbotron text-center">
			<div className="row">
				<div className="col-sm-12">
		      		<h2>Page not found!</h2><br/>			     		
		    	</div>			    	
			</div>
		</div>
    );
  }
}

export class NoDataFoundPage extends React.Component {
  render() {
    return (
      <div id="noDataFound" className="container-fluid jumbotron text-center">
			<div className="row">
				<div className="col-sm-12">
		      		<h2>No data found!</h2><br/>			     		
		    	</div>			    	
			</div>
		</div>
    );
  }
}


