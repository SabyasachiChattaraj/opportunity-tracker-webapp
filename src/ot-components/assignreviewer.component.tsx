import React, { Component } from 'react';
import Button from '../../node_modules/devextreme-react/ui/button';
import Form from '../../node_modules/devextreme-react/ui/form';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card,  CardTitle, CardText, Row, Col, CardBody, CardHeader, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { LoadPanel } from 'devextreme-react/ui/load-panel'
import { Switch } from 'devextreme-react/ui/switch'
import notify from '../../node_modules/devextreme/ui/notify';
import DataSource from 'devextreme/data/data_source';
import { getLoggedInUser, getLoggedInUserId } from '../CommonUtility';
import { Template } from 'devextreme-react/core/template';
import DataGrid, { Selection } from 'devextreme-react/ui/data-grid';
import { User } from '../CommonModel';

interface IAssignReviewerComponentState {
    modal:boolean;
    loadingVisible:boolean;
    dataSourceOptions:any;
  }
  
  interface IAssignReviewerComponentProps {
   data:any;
  }
  
  


  class AssignReviewerComponent extends Component<IAssignReviewerComponentProps, IAssignReviewerComponentState>{


        assignArchitectFormItems:any=[
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
                    text: "Assign",
                    type: "success",
                    useSubmitBehavior: true
                }
            }
        ];

        architectsDataGrid:any;
        
       
        assignArchitectForm:any;
        constructor(props:IAssignReviewerComponentProps){
            super(props);
            this.state={
                modal:true,
                loadingVisible:false,
                dataSourceOptions: []
            }
            this.onAssignArchitectFormSubmit=this.onAssignArchitectFormSubmit.bind(this);
            this.toggleModal=this.toggleModal.bind(this);
        }

        render(){
            return (
                <div className="assignArchitectContainer">
                

                    <Modal isOpen={this.state.modal} toggle={this.toggleModal} >
                        <ModalHeader toggle={this.toggleModal}>Assign Reviewer</ModalHeader>
                        <ModalBody >

                             Click to select Reviewer   : 
                             <DataGrid
                                dataSource={this.state.dataSourceOptions}
                                allowColumnReordering={true}
                                key="id"
                                ref={(ref) => { if (ref != null) this.architectsDataGrid = ref.instance }}
                                >
                                <Selection mode={'single'} showCheckBoxesMode="always"/>
                            </DataGrid>        

                                    <form onSubmit={this.onAssignArchitectFormSubmit} >
                                                <Form ref={(ref) => { if (ref != null) this.assignArchitectForm = ref.instance }}  colCount={1}
                                                    readOnly={false}
                                                    showValidationSummary={true}
                                                    validationGroup= "customerData1"
                                                    items={this.assignArchitectFormItems}>
                                      
                                        
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
        
          onAssignArchitectFormSubmit=(e:any):void=>{
            e.preventDefault();
            let assignArchitectFormData = this.assignArchitectForm._options.formData;
        
            let selectedArchitectData=this.architectsDataGrid.getSelectedRowKeys()[0];    

            if(selectedArchitectData){
                let request={
                    action : "add_new_activity",
                    activityDetail :
                        {
                                        "rfp_id" : this.props.data.id,
                                        "assigned_by" : getLoggedInUserId(),
                                        "assigned_by_group" : getLoggedInUser().userGroup,
                                        "assinged_to" : selectedArchitectData.userName,
                                        "assinged_to_group" : selectedArchitectData.userGroup,
                                        "comments" : assignArchitectFormData.comment
                        }
                };
    
    
                let that = this;
                let URL:string="https://85xbnc949i.execute-api.us-east-1.amazonaws.com/prod/oppurtunityworkflow";
                
                this.toggleLoader();
                fetch(URL, {
                        method: 'post',
                        body: JSON.stringify(request)
                }).then(function (response) {
                  console.log(response);
                  return response.json();
                }).then(function (response) {
                  if(response.statusCode){
                    if(response.statusCode==200){
                      that.toggleModal();
                     
                      notify("Assign Reviewer Success","success",2500);
                    }else{
                        notify("Assign Reviewer Error : "+response.message,"error",2500);
                    }
                  }else{
                    notify("Assign Reviewer  Error : "+response.message,"error",2500);
                  }
                  that.toggleLoader();
                });

            }else{
                notify("Please select Reviewer","error",2500);
            }

            
            
          };    

          componentWillMount(){
                
            this.loadArchitects();
         }
     
          loadArchitects=()=>{
            let request={ 

                userGroup:getLoggedInUser().userGroup, 
            
                customerName:"", 
                skillsets:this.props.data.techStack,
            
                operationName:"SEARCHARCHITECTS" 
            
            }; 
            let that = this;
            
            this.toggleLoader();
            fetch("https://ut3742rhj5.execute-api.us-east-1.amazonaws.com/prod/searcharchitects", {
                    method: 'post',
                    body: JSON.stringify(request)
            }).then(function (response) {
              console.log(response);
              return response.json();
            }).then(function (response) {
              if(response.code){
                if(response.code=="200"){
                
                  let architects=that.prepareArchitectDetails(response.data);

                  that.setState({
                       dataSourceOptions:architects
                   });    
                  
                }else{
                    notify("Search Reviewer Error : "+response.message,"error",2500);
                }
              }else{
                notify("Search Reviewer Error : "+response.message,"error",2500);
              }
              that.toggleLoader();
            });
        };

        prepareArchitectDetails(data){
       
            let users=data.map((eachData)=>{
              let user:any={}
              user.userName=eachData.userDetails.user_name;
              user.userGroup=eachData.userDetails.user_group;
              user.primarySkills=eachData.userDetails.primary_skills;
              user.secondarySkills=eachData.userDetails.secondary_skills;
              user.availibilty=eachData.userDetails.available;
              return user;
            });
            return users;
          }

  }   

  export default AssignReviewerComponent;