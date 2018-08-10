import React, { Component } from 'react';

interface IOpportunityDetailComponentState {

  }
  
  interface IOpportunityDetailComponentProps {
   data:any;
  }
  
  
  class OpportunityDetailComponent extends Component<IOpportunityDetailComponentProps, IOpportunityDetailComponentState>{

        constructor(props:IOpportunityDetailComponentProps){
            super(props);
        }

        render(){
            return (
                <div>
                     <p>Row data:
          <br/>
          {JSON.stringify(this.props.data)}
      </p>
                </div>    
            );
        }

  }   

  export default OpportunityDetailComponent;