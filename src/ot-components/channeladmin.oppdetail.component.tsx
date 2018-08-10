import React, { Component } from 'react';
import Button from '../../node_modules/devextreme-react/ui/button';
import Form from '../../node_modules/devextreme-react/ui/form';
import AssignToComponent from './assignto.component';
import AddCommentComponent from './addcomment.component';

interface IChannelAdminOppDetailComponentState {
    assign:boolean;
    comment:boolean;
  }
  
  interface IChannelAdminOppDetailComponentProps {
   data:any;
  }
  
  
  class ChannelAdminOppDetailComponent extends Component<IChannelAdminOppDetailComponentProps, IChannelAdminOppDetailComponentState>{

    
    


        constructor(props:IChannelAdminOppDetailComponentProps){
            super(props);
            this.state={
                comment:false,
                assign:false
            }
            this.toggleAssignTo=this.toggleAssignTo.bind(this);
            this.toggleAddComment=this.toggleAddComment.bind(this);
        }

        render(){
            return (
                <div>
                    <Form formData={this.props.data} colCount={4} readOnly={true}/>
                   
                    <Button text="Assign To" type="success" onClick={this.toggleAssignTo}> </Button>

                    <Button text="Add Comment" type="default" onClick={this.toggleAddComment}> </Button>

                    {
                        this.state.assign   &&
                            <AssignToComponent data={this.props.data}/> 
                    }  

                    {
                        this.state.comment   &&
                            <AddCommentComponent data={this.props.data}/> 
                    }    
                </div>    
            );
        }

        toggleAssignTo=(e:any)=>{
            this.setState({
                assign:!this.state.assign
            });
        };

        toggleAddComment=(e:any)=>{
            this.setState({
                comment:!this.state.comment
            });
        };

  }   

  export default ChannelAdminOppDetailComponent;