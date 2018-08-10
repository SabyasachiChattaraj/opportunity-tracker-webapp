import React, { Component } from 'react';
import { render } from 'react-dom';
import Form, { Item,IFormOptions  } from 'devextreme-react/ui/form'
import TagBox from 'devextreme-react/ui/tag-box'
import { Template, ITemplateMeta } from 'devextreme-react/core/template'
import DropDownBox from 'devextreme-react/ui/drop-down-box'
import { BrowserRouter as Router } from 'react-router-dom';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card,  CardTitle, CardText, Row, Col, CardBody, CardHeader, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { LoadPanel } from 'devextreme-react/ui/load-panel'
import { Button } from 'devextreme-react/ui/button'
import DataSource from 'devextreme/data/data_source';
import Notify from 'devextreme/ui/notify';
import  Validator from "devextreme/ui/validator";
import { User } from '../CommonModel';
import {getLoggedInUser,getAccessToken,saveUserSession}  from '../CommonUtility';



interface IProfileComponentProps {

}

interface IProfileComponentState {
    loadingVisible:boolean;
    userName:string;
    modal: boolean;
    loggedInUserData:any;
    editProfileFormItems:any;
    loaderShadingColor:string;
}



const USER_DATA:any=getLoggedInUser();

const SKILLSET_DATASOURCE: any = new DataSource({
    load: function () {
        let request: any = {
            operationName: "FINDALLSKILLSETS"
        };

        return fetch("https://7k8t2ultdl.execute-api.us-east-1.amazonaws.com/prod/bd-tracker-master-skill-set", {
                method: 'post',
                body: JSON.stringify(request)
        }).then(function (response) {
          console.log(response);
          return response.json();
        }).then(function (result) {
            return result.data;
        });

    }
});



const USERGROUP_DATASOURCE: any = new DataSource({
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
        
    },
    byKey: function (key) {
        console.log("inside bykey= " + JSON.stringify(key));
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
            let obj=result.userGrouplist.find(eachUserGroup => eachUserGroup.key === key.id);
            let inputElement=document.querySelector(".dx-dropdowneditor-button-visible .dx-texteditor-input") as HTMLInputElement;
            inputElement.value=obj.value;
            return obj;
        });
      },
  

});

class ProfileComponent extends Component<IProfileComponentProps, IProfileComponentState>{


    passwordPattern:any=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    namePattern: any =/^[^0-9]+$/;
    emailPattern:any=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    maxDate: Date = new Date();

    editProfileForm:any;
    constructor(props: IProfileComponentProps) {
        super(props);
        this.state={
            loadingVisible:false,
            userName:"" ,
            modal: false,
            loggedInUserData:{},
            editProfileFormItems:undefined,
            loaderShadingColor:"lightgrey"
        };
         this.onProfileFormSubmit = this.onProfileFormSubmit.bind(this);
       
    }



    render() {
        return (
            <div className="ot-container">

                <div className="ot-profile-container">

                    <Card>
                        <CardHeader>Profile</CardHeader>
                        <CardBody>
                            <form onSubmit={this.onProfileFormSubmit} >
                                <Form ref={(ref) => { if (ref != null) this.editProfileForm = ref.instance }} colCount={2}
                                 formData={this.state.loggedInUserData}
                                 readOnly={false}
                                 showValidationSummary={true}
                                 validationGroup= "customerData"
                                items={this.state.editProfileFormItems}
                                
                                >

                                <Template name="tagBoxComponent" component={TagBox} />
                          
                                       </Form></form>
                            </CardBody>
                            </Card>


                        <LoadPanel  shadingColor={this.state.loaderShadingColor} 
                                    position={{ of: '.ot-profile-container' }} 
                                    visible={this.state.loadingVisible}
                                    showIndicator={true} 
                                    showPane={true} 
                                    shading={true} 
                                    closeOnOutsideClick={false}/>

                                     </div>
                        </div>             
                    );
            }

            setLoaderShadingColor(color:string){
                this.setState({loaderShadingColor:color});
            }

            onProfileFormSubmit=(e:any):void=>{
                e.preventDefault();
                console.log(this.editProfileForm._options.formData);
                let editFormData=this.editProfileForm._options.formData;
                let request:any = {};
                request.userName=editFormData.userName;
                request.mobilenumber=editFormData.phone_number;
                request.primarySkills=editFormData.primarySkills;
                request.secondarySkills=editFormData.secondarySkills;
                request.userGroup=editFormData.userGroup
                request.accessToken=getAccessToken();
                request.action = "edit_user";
                let that = this;
                let USER_EDIT_URL:string="https://ut3742rhj5.execute-api.us-east-1.amazonaws.com/prod/edituser";
                that.setLoaderShadingColor("transparent");
                this.toggleLoader();
                fetch(USER_EDIT_URL, {
                        method: 'post',
                        body: JSON.stringify(request)
                }).then(function (response) {
                  console.log(response);
                  return response.json();
                }).then(function (response) {
                  if(response.statusCode){
                    if(response.statusCode==200){
                       saveUserSession(response);  
                       Notify("User Edit Success","success",2500);
                    }else{
                      Notify("User Edit Error : "+response.message,"error",2500);
                    }
                  }else{
                    Notify("User Edit Error : "+response.message,"error",2500);
                  }
                  that.toggleLoader();
                  that.setLoaderShadingColor("lightgrey");
                });
                
              };

              toggleLoader=()=>{
                let toggleloadingVisible=!this.state.loadingVisible;
                this.setState({loadingVisible:toggleloadingVisible});
            };

            componentWillMount(){
                
                this.initializeData();
            }

            initializeData(){
                let that=this;
                that.toggleLoader();
                let userGroupFetch=fetch("https://ut3742rhj5.execute-api.us-east-1.amazonaws.com/prod/getusergroups", {
                        method: 'post',
                        body: JSON.stringify({action: "get_user_group"})
                }).then(function (response) {
                        return response.json();
                });

                let skillsFetch=fetch("https://7k8t2ultdl.execute-api.us-east-1.amazonaws.com/prod/bd-tracker-master-skill-set", {
                        method: 'post',
                        body: JSON.stringify({operationName: "FINDALLSKILLSETS"})
                }).then(function (response) {
                        return response.json();
                });

                Promise.all([userGroupFetch,skillsFetch]).then(function(values){
                    let userGroupItems=values[0].userGrouplist;
                    let skillsItems=values[1].data;

                    let editProfileFormItems= [
                        {
                            itemType: "group",
                            caption: "Personal Info",
                            items: [
                                {
                                    dataField: "name",
                                    label:{
                                        text:"First Name"
                                    },
                                    editorOptions: {
                                        readOnly: true
                                    }
                                }, 
                                {
                                    dataField: "family_name",
                                    label:{
                                        text:"Last Name"
                                    },
                                    editorOptions: {
                                        readOnly: true
                                    }
                                }
                
                                ]
                        }, 
                        {
                            itemType: "group",
                            caption: "Contact Info",
                            items: [
                                {
                                    dataField: "email",
                                    label:{
                                        text:"Email"
                                    },
                                    editorOptions: {
                                        readOnly: true
                                    }
                                }, 
                                {
                                    dataField: "phone_number",
                                    label:{
                                        text:"Mobile No"
                                    },
                                    editorOptions: {
                                        
                                    },
                                    validationRules: [{
                                        type: "required",
                                        message: "Mobile is required"
                                    },{
                                        type: "numeric",
                                        message: "Please enter valid Mobile No"
                                    }, {
                                        type: "stringLength",
                                        min: 13,
                                        max:13,
                                        message: "Please enter valid Mobile No"
                                    }]
                                }
                
                                ]
                        }, 
                    
                    {
                        itemType: "group",
                        caption: "User Info",
                        items: [ {
                            dataField: "userName",
                            label:{
                                text:"User Name"
                            },
                            editorType: "dxTextBox",
                            editorOptions: {
                                readOnly: true
                            }
                        },
                        {
                            dataField: "userGroup",
                            label:{
                                text:"User Group"
                            },
                            editorType: "dxSelectBox",
                            editorOptions: {
                                items:userGroupItems,
                                displayExpr:"value",
                                valueExpr:"key"
                            },
                            validationRules: [{
                                type: "required",
                                message: "User Group is required"
                            }]
                        }
                
                        ]
                    },
                    {
                        itemType: "group",
                        caption: "Skill Info",
                        items: [ {
                            dataField: "primarySkills",
                            label:{
                                text:"Primary Skills"
                            },
                            editorType: "dxTagBox",
                            editorOptions: {
                                items:skillsItems,
                                displayExpr:"skillName",
                                valueExpr:"skillName"
                            },
                            validationRules: [{
                                type: "required",
                                message: "Primary Skills is required"
                            }]
                        },
                        {
                            dataField: "secondarySkills",
                            label:{
                                text:"Secondary Skills"
                            },
                            editorType: "dxTagBox",
                            editorOptions: {
                                items:skillsItems,
                                displayExpr:"skillName",
                                valueExpr:"skillName"
                            },
                            validationRules: [{
                                type: "required",
                                message: "Secondary Skills is required"
                            }]
                        }
                
                        ]
                    },
                    {
                        itemType: "button",
                        alignment: "right",
                        buttonOptions: {
                            text: "Update",
                            type: "success",
                            useSubmitBehavior: true
                        }
                    }];

                    that.setState({editProfileFormItems:editProfileFormItems});
                    
                    that.setState({loggedInUserData:getLoggedInUser()});
                    
                    that.toggleLoader();
                });


            }


        }    
 
export default ProfileComponent;  