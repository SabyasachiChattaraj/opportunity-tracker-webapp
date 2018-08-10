import React, { Component } from 'react';
import { render } from 'react-dom';
import Form, { Item, IFormOptions } from 'devextreme-react/ui/form'
import TagBox from 'devextreme-react/ui/tag-box'
import {Template,ITemplateMeta} from 'devextreme-react/core/template'
import DropDownBox from 'devextreme-react/ui/drop-down-box'
import { BrowserRouter as Router } from 'react-router-dom';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, CardBody, CardHeader } from 'reactstrap';
import classnames from 'classnames';
import RegistrationComponent from './registration.component'
import LoginComponent from './login.component'
import {LoadPanel}  from 'devextreme-react/ui/load-panel'
import DataSource from 'devextreme/data/data_source';
import Notify from 'devextreme/ui/notify';
import { History } from 'history';
import {signOut}  from '../CommonUtility';

import $ from 'jquery';



class LoginRegComponent extends Component<{history:History}, { activeTab: any }>{

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  componentWillMount(){
    signOut();
  }
  

  render() {
    return (


      <div className="ot-container p-4" id="smloginRegisterContainer">

        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Login
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Register
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <LoginComponent history={this.props.history}/>
          </TabPane>
          <TabPane tabId="2">
             <RegistrationComponent/>    
          </TabPane>
        </TabContent>

      </div>

    );
  }

}

export default LoginRegComponent;