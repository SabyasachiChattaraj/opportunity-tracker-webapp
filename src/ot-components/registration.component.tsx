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

import $ from 'jquery';

interface IRegistrationComponentProps {

}

interface IRegistrationComponentState {
    loadingVisible:boolean;
    userName:string;
    modal: boolean;
}


const SKILLSET_DATASOURCE: any = new DataSource({
    load: function () {
        let request: any = {
            operationName: "FINDALLSKILLSETS"
        };

        var d = $.Deferred();
        return $.ajax({
            url: "https://7k8t2ultdl.execute-api.us-east-1.amazonaws.com/prod/bd-tracker-master-skill-set",
            method: 'post',
            data: JSON.stringify(request)

        })
            .done(function (result) {
                // Here, you can process the response
                d.resolve(result.data);
            });
    }
});



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

class RegistrationComponent extends Component<IRegistrationComponentProps, IRegistrationComponentState>{

    passwordPattern:any=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    namePattern: any =/^[^0-9]+$/;
    emailPattern:any=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    maxDate: Date = new Date();

    confirmRegistrationFormItems:any=[
        {
            dataField: "userName",
            label:{
                text:"User Name"
            },
            validationRules: [{
                type: "required",
                message: "User Name is required"
            },{
                type: "pattern",
                pattern: this.namePattern,
                message: "Please enter valid User Name"
            }, {
                type: "stringLength",
                min: 3,
                message: "User Name must have at least 3 symbols"
            }]
        }, 
        {
            dataField: "otpCode",
            label:{
                text:"OTP Code"
            },
            validationRules: [{
                type: "required",
                message: "OTP Code is required"
            }, {
                type: "stringLength",
                min: 6,
                max:6,
                message: "OTP Code must have at 6 digits"
            }]
        },
        {
            itemType: "button",
            alignment: "right",
            buttonOptions: {
                text: "Confirm Registration",
                type: "success",
                useSubmitBehavior: true
            }
        }
    ];
   
   
    registrationFormItems:any= [
        {
            itemType: "group",
            caption: "Personal Info",
            items: [
                {
                    dataField: "firstName",
                    label:{
                        text:"First Name"
                    },
                    validationRules: [{
                        type: "required",
                        message: "First Name is required"
                    },{
                        type: "pattern",
                        pattern: this.namePattern,
                        message: "Please enter valid First Name"
                    }, {
                        type: "stringLength",
                        min: 3,
                        message: "First Name must have at least 3 symbols"
                    }]
                }, 
                {
                    dataField: "lastName",
                    label:{
                        text:"Last Name"
                    },
                    validationRules: [{
                        type: "required",
                        message: "Last Name is required"
                    },{
                        type: "pattern",
                        pattern: this.namePattern,
                        message: "Please enter valid Last Name"
                    }, {
                        type: "stringLength",
                        min: 3,
                        message: "Last Name must have at least 3 symbols"
                    }]
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
                    validationRules: [{
                        type: "required",
                        message: "Email is required"
                    },{
                        type: "email",
                        message: "Email should be valid"
                    }]
                }, 
                {
                    dataField: "mobilenumber",
                    label:{
                        text:"Mobile No"
                    },
                    editorOptions: {
                        value: "+91"
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
        caption: "Credentials",
        items: [ {
            dataField: "password",
            label:{
                text:"Password"
            },
            editorOptions: {
                mode: "password"
            },
            validationRules: [{
                type: "required",
                message: "Password is required"
            },{
                type: "pattern",
                pattern: this.passwordPattern,
                message: "Password must contains atleast : Special character , number , Capital Letter and length must be greater or equal to 8."
            }]
        }]
    }, 
    
    {
        itemType: "group",
        caption: "User Info",
        items: [ {
            dataField: "primarySkills",
            label:{
                text:"Primary Skills"
            },
            editorType: "dxTagBox",
            editorOptions: {
                dataSource:SKILLSET_DATASOURCE,
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
                dataSource:SKILLSET_DATASOURCE,
                displayExpr:"skillName",
                valueExpr:"skillName"
            },
            validationRules: [{
                type: "required",
                message: "Secondary Skills is required"
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
        itemType: "button",
        alignment: "right",
        buttonOptions: {
            text: "Register",
            type: "success",
            useSubmitBehavior: true
        }
    }]

    
    constructor(props: IRegistrationComponentProps) {
        super(props);
        this.state={
            loadingVisible:false,
            userName:"" ,
            modal: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.onRegistrationFormSubmit = this.onRegistrationFormSubmit.bind(this);
        this.onConfirmRegisterFormSubmit=this.onConfirmRegisterFormSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
          modal: !this.state.modal
        });
      }

    onRegistrationFormSubmit=(e:any):void=>{
        e.preventDefault();
        console.log(this.registerForm._options.formData);
        let request = this.registerForm._options.formData;
        request.action = "sign_up";
        let that = this;
        let USER_SIGNUP_URL:string=" https://ut3742rhj5.execute-api.us-east-1.amazonaws.com/prod/userregistration";
        
        this.toggleLoader();
        fetch(USER_SIGNUP_URL, {
                method: 'post',
                body: JSON.stringify(request)
        }).then(function (response) {
          console.log(response);
          return response.json();
        }).then(function (userRegistrationResponse) {
          if(userRegistrationResponse.signUpResult && userRegistrationResponse.signUpResult.sdkHttpMetadata){
            if(userRegistrationResponse.signUpResult.sdkHttpMetadata.httpStatusCode==200){
              that.setState({userName:request.firstName+request.lastName});
              that.registerForm.resetValues();
              that.toggleModal();
             
              Notify("Registration Success : Please enter confirmation code received via email.","success",2500);
            }else{
              Notify("Registration Error : "+userRegistrationResponse.message,"error",2500);
            }
          }else{
            Notify("Registration Error : "+userRegistrationResponse.message,"error",2500);
          }
          that.toggleLoader();
        });
        
      };
  

      onConfirmRegisterFormSubmit=(e:any):void=>{
        e.preventDefault(); 
        console.log(this.confirmRegisterForm._options.formData);
        let request = this.confirmRegisterForm._options.formData;
        request.action="confirm_sign_up";
        let that = this;
        let CONFIRM_SIGNUP_URL:string="https://ut3742rhj5.execute-api.us-east-1.amazonaws.com/prod/confirmuser";
        that.toggleLoader();
        fetch(CONFIRM_SIGNUP_URL, {
                method: 'post',
                body: JSON.stringify(request)
        }).then(function (response) {
          return response.json();
        }).then(function (userRegistrationConfirmationResponse) {
          that.toggleLoader();
          
          if(userRegistrationConfirmationResponse.confirmSignUpResult && userRegistrationConfirmationResponse.confirmSignUpResult.sdkHttpMetadata){
            if(userRegistrationConfirmationResponse.confirmSignUpResult.sdkHttpMetadata.httpStatusCode==200){
              Notify("Confirm Registration Success : Successfully registered. Please Login using User Name : "+request.userName,"success",2500);
              that.toggleModal();
            }else{
              Notify("Confirm Registration Error : "+userRegistrationConfirmationResponse.message,"error",2500);
            }
          }else{
             Notify("Confirm Registration Error : "+userRegistrationConfirmationResponse.message,"error",2500); 
          }
        });
      };

    
    registerForm: any;
    confirmRegisterForm:any;
    render() {
        return (
            <div className="ot-registration-container">

                    <Card>
                        <CardHeader>Register</CardHeader>
                        <CardBody>
                            <form onSubmit={this.onRegistrationFormSubmit} >
                                <Form ref={(ref) => { if (ref != null) this.registerForm = ref.instance }} colCount={2}
                                 readOnly={false}
                                 showValidationSummary={true}
                                 validationGroup= "customerData"
                                items={this.registrationFormItems}
                                
                                >

                                <Template name="tagBoxComponent" component={TagBox} />
                          
                                       </Form></form>
                            </CardBody>
                            </Card>


<LoadPanel  shadingColor="transparent" 
               position={{ of: '#smloginRegisterContainer' }} 
               visible={this.state.loadingVisible}
               showIndicator={true} 
               showPane={true} 
               shading={true} 
               closeOnOutsideClick={false}/>


 <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Confirm Registration</ModalHeader>
          <ModalBody>
                    <form onSubmit={this.onConfirmRegisterFormSubmit} >
                                <Form ref={(ref) => { if (ref != null) this.confirmRegisterForm = ref.instance }} colCount={1}
                                 readOnly={false}
                                 showValidationSummary={true}
                                 validationGroup= "customerData1"
                                items={this.confirmRegistrationFormItems}
                                >

                               
                          
                                       </Form>
                  </form>
        
          
          </ModalBody>
        </Modal>               

                
                </div>
                    );
            }
    toggleLoader=()=>{
        let toggleloadingVisible=!this.state.loadingVisible;
        this.setState({loadingVisible:toggleloadingVisible});
    };


    }    
 
export default RegistrationComponent;