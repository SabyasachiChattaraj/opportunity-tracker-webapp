import React, { Component } from 'react';
import Button from '../../node_modules/devextreme-react/ui/button';
import Form from '../../node_modules/devextreme-react/ui/form';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card,  CardTitle, CardText, Row, Col, CardBody, CardHeader, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { LoadPanel } from 'devextreme-react/ui/load-panel'
import notify from '../../node_modules/devextreme/ui/notify';
import DataSource from 'devextreme/data/data_source';
import { getLoggedInUser, getLoggedInUserId } from '../CommonUtility';

const OPPORTUNITIES_URL: string = "https://85xbnc949i.execute-api.us-east-1.amazonaws.com/prod/opportunitydetailapi";


interface IAddCommentComponentState {
    modal:boolean;
    loadingVisible:boolean;
  }
  
  interface IAddCommentComponentProps {
   data:any;
  }
  
 

  class AddCommentComponent extends Component<IAddCommentComponentProps, IAddCommentComponentState>{

        addCommentFormItems:any=[
            {
                dataField: "comment",
                label:{
                    text:"Comment"
                },
                editorType:"dxTextBox",
                editorOptions:{
                  
                },
                validationRules: [{
                    type: "required",
                    message: "Comment is required"
                }]
            }, 
            {
                itemType: "button",
                alignment: "right",
                buttonOptions: {
                    text: "Add Comment",
                    type: "success",
                    useSubmitBehavior: true
                }
            }
        ];

        addCommentForm:any;
        constructor(props:IAddCommentComponentProps){
            super(props);
            this.state={
                modal:true,
                loadingVisible:false
            }
            this.onAddCommentFormSubmit=this.onAddCommentFormSubmit.bind(this);
            this.toggleModal=this.toggleModal.bind(this);
        }

        render(){
            return (
                <div>
                

                    <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Assign To</ModalHeader>
                        <ModalBody>
                                    <form onSubmit={this.onAddCommentFormSubmit} >
                                                <Form ref={(ref) => { if (ref != null) this.addCommentForm = ref.instance }} colCount={1}
                                                readOnly={false}
                                                showValidationSummary={true}
                                                validationGroup= "customerData1"
                                                items={this.addCommentFormItems}
                                                >

                                            
                                        
                                    </Form>
                                </form>
                        
                        
                        </ModalBody>
                    </Modal>   

                    <LoadPanel shadingColor="transparent" 
                        position={{ of: '.ot-container' }} 
                        visible={this.state.loadingVisible}
                        showIndicator={true} 
                        showPane={true} 
                        shading={true} 
                        closeOnOutsideClick={false}/>            


                </div>    
            );
        }

        toggleModal() {
            this.setState({
              modal: !this.state.modal
            });
          }

          toggleLoader=()=>{
            let toggleloadingVisible=!this.state.loadingVisible;
            this.setState({loadingVisible:toggleloadingVisible});
        };
        
          onAddCommentFormSubmit=(e:any):void=>{
            e.preventDefault();
            console.log(this.addCommentForm._options.formData);
            
            let addCommentFormData = this.addCommentForm._options.formData;

            let request={
                id: this.props.data.id,
                commentsList: [
                  {
                    comments: addCommentFormData.comment,
                    commentedBy: getLoggedInUserId()
                  }
                ],
               operationName: "UPDATEOPPODETAILSCOMMENTSBYID"
              }
              
           
            let that = this;
            
            this.toggleLoader();
            fetch(OPPORTUNITIES_URL, {
                    method: 'post',
                    body: JSON.stringify(request)
            }).then(function (response) {
              console.log(response);
              return response.json();
            }).then(function (response) {
              if(response.code){
                if(response.code=="200"){
                  that.toggleModal();
                 
                  notify("Add Comment Success","success",2500);
                }else{
                    notify("Add Comment Error : "+response.message,"error",2500);
                }
              }else{
                notify("Add Comment Error : "+response.message,"error",2500);
              }
              that.toggleLoader();
            });
            
          };    

  }   

  export default AddCommentComponent;