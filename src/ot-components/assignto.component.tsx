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

interface IAssignToComponentState {
    modal:boolean;
    loadingVisible:boolean;
    assignToFormItems:any;
  }
  
  interface IAssignToComponentProps {
   data:any;
  }
  
  const USERGROUP_DATASOURCE: any = new DataSource({
    key: "key",
    load: function () {
        let request: any = {
            action: "get_user_group"
        };

       return fetch("https://ut3742rhj5.execute-api.us-east-1.amazonaws.com/prod/getusergroups", {
                method: 'post',
                body: JSON.stringify(request)
        }).then(function (response) {
          console.log(response);
          return response.json();
        }).then(function (result) {
            return result.userGrouplist;
        });
        
    }

});


  class AssignToComponent extends Component<IAssignToComponentProps, IAssignToComponentState>{

        onQualificationValueChanged=(data)=>{
            if(data.value==="Disqualified"){
                this.setState({assignToFormItems:this.assignToFormItemsDisqualified});
            }else{
                this.setState({assignToFormItems:this.assignToFormItemsQualified});
            }
        };

        onTechGroupValueChanged=(data)=>{
            let request={ 

                userGroup:data.value, 
            
                customerName:"", 
            
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
                 
                   
                  
                   let newassignToFormItems=[
                    {
                        dataField: "qualification",
                        label:{
                            text:"Qualification"
                        },
                        editorType:"dxSelectBox",
                        editorOptions:{
                            items:["Qualified","Disqualified"],
                            onValueChanged: that.onQualificationValueChanged
                        },
                        validationRules: [{
                            type: "required",
                            message: "Qualification is required"
                        }]
                    }, 
                    {
                        dataField: "userGroup",
                        label:{
                            text:"User Group"
                        },
                        editorType: "dxSelectBox",
                        editorOptions: {
                            dataSource:USERGROUP_DATASOURCE,
                            displayExpr:"value",
                            valueExpr:"key",
                            onValueChanged: that.onTechGroupValueChanged
                        },
                        validationRules: [{
                            type: "required",
                            message: "User Group is required"
                        }]
                    },
                    {
                        dataField: "member",
                        label:{
                            text:"Member"
                        },
                        editorType: "dxSelectBox",
                        editorOptions: {
                           items:response.data.map((eachData)=>{return eachData.username})
                        },
                        validationRules: [{
                            type: "required",
                            message: "Member is required"
                        }]
                    },{
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


                   that.setState({
                        assignToFormItems:newassignToFormItems
                   });
                  
                }else{
                    notify("Search Member : "+response.message,"error",2500);
                }
              }else{
                notify("Search Member: "+response.message,"error",2500);
              }
              that.toggleLoader();
            });
        };

        assignToFormItemsDisqualified=[
            {
                dataField: "qualification",
                label:{
                    text:"Qualification"
                },
                editorType:"dxSelectBox",
                editorOptions:{
                    items:["Qualified","Disqualified"],
                    onValueChanged: this.onQualificationValueChanged
                },
                validationRules: [{
                    type: "required",
                    message: "Qualification is required"
                }]
            },{
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

        assignToFormItemsQualified=[
            {
                dataField: "qualification",
                label:{
                    text:"Qualification"
                },
                editorType:"dxSelectBox",
                editorOptions:{
                    items:["Qualified","Disqualified"],
                    onValueChanged: this.onQualificationValueChanged
                },
                validationRules: [{
                    type: "required",
                    message: "Qualification is required"
                }]
            }, 
            {
                dataField: "userGroup",
                label:{
                    text:"User Group"
                },
                editorType: "dxSelectBox",
                editorOptions: {
                    dataSource:USERGROUP_DATASOURCE,
                    displayExpr:"value",
                    valueExpr:"key",
                    onValueChanged: this.onTechGroupValueChanged
                },
                validationRules: [{
                    type: "required",
                    message: "User Group is required"
                }]
            },
            {
                dataField: "member",
                label:{
                    text:"Member"
                },
                editorType: "dxSelectBox",
                editorOptions: {
                   
                },
                validationRules: [{
                    type: "required",
                    message: "Member is required"
                }]
            },{
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

        
       
        assignToForm:any;
        constructor(props:IAssignToComponentProps){
            super(props);
            this.state={
                modal:true,
                loadingVisible:false,
                assignToFormItems:this.assignToFormItemsQualified
            }
            this.onAssignToFormSubmit=this.onAssignToFormSubmit.bind(this);
            this.toggleModal=this.toggleModal.bind(this);
        }

        render(){
            return (
                <div>
                

                    <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Assign To</ModalHeader>
                        <ModalBody>
                                    <form onSubmit={this.onAssignToFormSubmit} >
                                                <Form ref={(ref) => { if (ref != null) this.assignToForm = ref.instance }} colCount={1}
                                                readOnly={false}
                                                showValidationSummary={true}
                                                validationGroup= "customerData1"
                                                items={this.state.assignToFormItems}
                                                >

                                         <Template name="" component={Switch}/>   
                                        
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
        
          onAssignToFormSubmit=(e:any):void=>{
            e.preventDefault();
            console.log(this.assignToForm._options.formData);
            let assignToFormData = this.assignToForm._options.formData;
        
            let request={
                action : "add_new_activity",
                activityDetail :
                    {
                                    "rfp_id" : this.props.data.id,
                                    "assigned_by" : getLoggedInUserId(),
                                    "assigned_by_group" : getLoggedInUser().userGroup,
                                    "assinged_to" : assignToFormData.member,
                                    "assinged_to_group" : assignToFormData.userGroup,
                                    "comments" : assignToFormData.comment
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
                 
                  notify("Assign To Success","success",2500);
                }else{
                    notify("Assign To Error : "+response.message,"error",2500);
                }
              }else{
                notify("Assign To Error : "+response.message,"error",2500);
              }
              that.toggleLoader();
            });
            
          };    

  }   

  export default AssignToComponent;