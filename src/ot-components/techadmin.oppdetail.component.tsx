import React, { Component } from 'react';
import Button from '../../node_modules/devextreme-react/ui/button';
import Form from '../../node_modules/devextreme-react/ui/form';
import AssignToComponent from './assignto.component';
import AddCommentComponent from './addcomment.component';
import AssignArchitectComponent from './assignarchitect.component';
import AssignReviewerComponent from './assignreviewer.component';

interface ITechAdminOppDetailComponentState {
    assignArchitect:boolean;
    assignReviewer:boolean;
    comment:boolean;
  }
  
  interface ITechAdminOppDetailComponentProps {
   data:any;
  }
  
  
  class TechAdminOppDetailComponent extends Component<ITechAdminOppDetailComponentProps, ITechAdminOppDetailComponentState>{

        constructor(props:ITechAdminOppDetailComponentProps){
            super(props);
            this.state={
                comment:false,
                assignArchitect:false,
                assignReviewer:false
            }
            this.toggleAssignArchitect=this.toggleAssignArchitect.bind(this);
            this.toggleAssignReviewer=this.toggleAssignReviewer.bind(this);
            this.toggleAddComment=this.toggleAddComment.bind(this);
        }

        render(){
            return (
                <div>
                    <Form formData={this.props.data} colCount={4} readOnly={true}/>
                   
                    <Button text="Assign To Architect" onClick={this.toggleAssignArchitect}> </Button>

                    <Button text="Assign To Reviewer" type="success" onClick={this.toggleAssignReviewer}> </Button>

                    <Button text="Add Comment" type="default" onClick={this.toggleAddComment}> </Button>

                    {
                        this.state.assignArchitect   &&
                            <AssignArchitectComponent data={this.props.data}/> 
                    }  

                     {
                        this.state.assignReviewer   &&
                            <AssignReviewerComponent data={this.props.data}/> 
                    }      
                    
                    
                    {
                        this.state.comment   &&
                            <AddCommentComponent data={this.props.data}/> 
                    }    
                </div>    
            );
        }

        toggleAssignArchitect=(e:any)=>{
            this.setState({
                assignArchitect:!this.state.assignArchitect
            });
        };

        toggleAssignReviewer=(e:any)=>{
            this.setState({
                assignReviewer:!this.state.assignReviewer
            });
        };

        toggleAddComment=(e:any)=>{
            this.setState({
                comment:!this.state.comment
            });
        };

  }   

  export default TechAdminOppDetailComponent;