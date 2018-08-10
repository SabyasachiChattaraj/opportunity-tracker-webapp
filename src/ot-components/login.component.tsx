import React, { Component } from 'react';
import { render } from 'react-dom';
import Form, { Item, IFormOptions } from 'devextreme-react/ui/form'
import TagBox from 'devextreme-react/ui/tag-box'
import { Template, ITemplateMeta } from 'devextreme-react/core/template'
import DropDownBox from 'devextreme-react/ui/drop-down-box'
import { BrowserRouter as Router } from 'react-router-dom';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, CardBody, CardHeader } from 'reactstrap';
import classnames from 'classnames';
import RegistrationComponent from './registration.component'
import { LoadPanel } from 'devextreme-react/ui/load-panel'
import DataSource from 'devextreme/data/data_source';
import Notify from 'devextreme/ui/notify';
import { History } from 'history';

import $ from 'jquery';
import { User } from '../CommonModel';

interface ILoginComponentState {
  loadingVisible: boolean;

};

interface ILoginComponentProps {
  history: History;
};


class LoginComponent extends Component<ILoginComponentProps, ILoginComponentState>{

  namePattern: any =/^[^0-9]+$/;

  loginFormItems: any = [

    {
      dataField: "userName",
      label:{
        text:"User Name"
      },
      validationRules: [{
        type: "required",
        message: "User Name is required"
      }, {
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
      dataField: "password",
      label:{
        text:"Password"
      },
      editorOptions: {
        mode: "password"
      },
      validationRules: [{
        type: "required",
        message: "Last Name is required"
      }]
    },
    {
      itemType: "button",
      alignment: "right",
      buttonOptions: {
        text: "Login",
        type: "success",
        useSubmitBehavior: true
      }
    }
  ];

  loginForm: any;
 


  constructor(props: ILoginComponentProps) {
    super(props);
    this.state = {
      loadingVisible: false
    };
    this.onLoginFormSubmit = this.onLoginFormSubmit.bind(this);
  }

  onLoginFormSubmit = (e) => {
    e.preventDefault();
    this.loginForm.validate();
    let that = this;
    let USER_SIGNIN_URL: string = "https://ut3742rhj5.execute-api.us-east-1.amazonaws.com/prod/usersignin";
    let request = this.loginForm._options.formData;
    request.action = "sign_in";
    this.toggleLoader()
    fetch(USER_SIGNIN_URL, {
      method: 'post',
      body: JSON.stringify(request)
    }).then(function (response) {
      return response.json();
    }).then(function (userLoginResponse) {

      if (userLoginResponse.statusCode == 200) {
        let authorization = userLoginResponse.adminInitiateAuthResult.authenticationResult.accessToken;
        console.log("authorization ::::" + authorization);
        localStorage.setItem("token", authorization);

        let loggedInUser: User = userLoginResponse.getUserResult.userAttributes.reduce(function (map: any, record: any, index: any) {
          map[record.name] = record.value;
          return map;
        }, {});
        loggedInUser.primarySkills=userLoginResponse.userDetails.primary_skills;
        loggedInUser.secondarySkills=userLoginResponse.userDetails.secondary_skills;
        loggedInUser.userGroup=userLoginResponse.userDetails.user_group;
        loggedInUser.userName=userLoginResponse.userDetails.user_name;
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        that.props.history.push("/opportunities");
        Notify("Successfully Logged In!", "success", 2500);

      } else {
        Notify("Login Error : " + userLoginResponse.errorMessage, "error", 2500);
      }
      that.toggleLoader();
    });

  }

  toggleLoader = () => {
    let toggleloadingVisible = !this.state.loadingVisible;
    this.setState({ loadingVisible: toggleloadingVisible });
  };

  render() {
    return (


      <div className="ot-login-container">
        <Card>
          <CardHeader>Login</CardHeader>
          <CardBody>
            <form action="#" onSubmit={this.onLoginFormSubmit}>
              <Form
                ref={(ref) => { if (ref != null) this.loginForm = ref.instance }} colCount={1}
                readOnly={false}
                showValidationSummary={true}
                validationGroup="loginData"

                items={this.loginFormItems}
              >

              </Form>
            </form>
          </CardBody>
        </Card>

        <LoadPanel shadingColor="transparent"
          position={{ of: '#smloginRegisterContainer' }}
          visible={this.state.loadingVisible}
          showIndicator={true}
          showPane={true}
          shading={true}
          closeOnOutsideClick={false} />
      </div>

    );
  }

}

export default LoginComponent;