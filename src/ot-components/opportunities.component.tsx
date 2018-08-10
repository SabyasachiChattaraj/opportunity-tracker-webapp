import React, { Component } from 'react';
import DataGrid, {
  Column,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  SearchPanel,
  Selection,
  Sorting,
  HeaderFilter,
  FilterPanel,
  FilterRow,
  Export,
  ColumnChooser,
  Editing,
  Scrolling,
  Popup,
  Summary,
  MasterDetail
} from 'devextreme-react/ui/data-grid';
import DataSource from 'devextreme/data/data_source';
import $ from 'jquery';
import LoadPanel from 'devextreme-react/ui/load-panel';
import notify from 'devextreme/ui/notify';
import { Button, TabContent, TabPane, Nav, NavItem, NavLink, Card,  CardTitle, CardText, Row, Col, CardBody, CardHeader, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ChannelAdminOppDetailComponent from './channeladmin.oppdetail.component';
import { Template } from 'devextreme-react/core/template';
import { getLoggedInUser, getLoggedInUserId } from '../CommonUtility';
import TechAdminOppDetailComponent from './techadmin.oppdetail.component';
import { User } from '../CommonModel';

const DetailComponent = (props: any) => {
  return (
      <p>Row data:
          <br/>
          {JSON.stringify(props.data)}
      </p>
  );
};



interface IOpportunitiesComponentState {
  pageSizes: any;
  dataSourceOptions: any;
  loadingVisible:boolean;
  modal:boolean;
  saveToCloudResult:string;
  dataSummary:any;
  loggedInUser:User;
}

interface IOpportunitiesComponentProps {

}

const OPPORTUNITIES_URL: string = "https://85xbnc949i.execute-api.us-east-1.amazonaws.com/prod/opportunitydetailapi";

const USER_DATA:any=getLoggedInUser();


class OpportunitiesComponent extends Component<IOpportunitiesComponentProps, IOpportunitiesComponentState>{

  opportunitiesDataGrid:any;

  OPPORTUNITIES_DATASOURCE:any=new DataSource({
    load: function () {
      let request:any={};
      if(getLoggedInUser().userGroup==="ChannelAdmin"){
        request = {
          operationName: "ALLOPPODETAILS"
        };
      }else{
        request = {
          userName: getLoggedInUserId(),
          operationName: "ALLOPPODETAILSBYUSERNAME"
        };
      }

      var d = $.Deferred();
      return $.ajax({
        url: OPPORTUNITIES_URL,
        method: 'post',
        data: JSON.stringify(request)

      })
        .done(function (result) {
          result.data.forEach((eachData)=>{
            delete eachData.commentsList;
          });
         

          d.resolve(result.data);
        });
    },

    byKey: function (key) {
      console.log("inside bykey= " + JSON.stringify(key));
      let request: any = {};
      request.id = key.id;
      request.operationName = "ALLOPPODETAILSBYID";
      var d = $.Deferred();
      return $.ajax({
        url: OPPORTUNITIES_URL,
        method: 'post',
        data: JSON.stringify(request)
      })
        .done(function (result) {
          // Here, you can process the response
          d.resolve(result.data);
        });
    },

    insert: function (values) {
      let request: any = values;
      request.operationName = "ADDOPPODETAILS";
      return $.ajax({
        url: OPPORTUNITIES_URL,
        method: 'post',
        data: JSON.stringify(request)
      });
    },
    remove: function (key) {
      let request: any = {};
      request.id = key.id;
      request.operationName = "DELETEOPPODETAILS";
      return $.ajax({
        url: OPPORTUNITIES_URL,
        method: 'post',
        data: JSON.stringify(request)
      });
    },
    update: function (key, values) {
      let request: any = key;
      request.operationName = "UPDATEOPPODETAILSBYID";
      console.log("key= " + JSON.stringify(key));
      console.log("values= " + JSON.stringify(values));
      return $.ajax({
        url: OPPORTUNITIES_URL,
        method: 'post',
        data: JSON.stringify(request)
      });
    }

  });
  columns = [
    { field: "opportunity_name", title: "Opp Name", editType: "stringedit", edit: { params: {} }, type: "string", format: "",defaultVisible:true },
    { field: "vertical", title: "Vertical", editType: "stringedit", edit: { params: {} }, type: "string", format: "",defaultVisible:true },
    { field: "geo", title: "Geography", editType: "stringedit", edit: { params: {} }, type: "string", format: "",defaultVisible:true },
    { field: "customer_name", title: "Customer Name", editType: "stringedit", edit: { params: {} }, type: "string", format: "",defaultVisible:true },
    { field: "request_category", title: "Category", editType: "stringedit", edit: { params: {} }, type: "string", format: "",defaultVisible:true },
    { field: "request_received_date", title: "Received Date", editType: "datepickeredit", edit: { params: {} }, type: "date", format: "yMd",defaultVisible:true },
    { field: "response_submission_date", title: "Submission Date", editType: "datepickeredit", edit: { params: {} }, type: "date", format: "yMd",defaultVisible:true },
    { field: "opp_status", title: "Status", editType: "dropdownedit", edit: { params: {} }, type: "string", format: "",defaultVisible:true },
    

    { field: "created_by", title: "Created By", editType: "stringedit", edit: { params: {} }, type: "string", format: "",defaultVisible:false },
    { field: "request_action_date", title: "Req Action Date", editType: "datepickeredit", edit: { params: {} }, type: "date", format: "yMd",defaultVisible:false },
    { field: "tech_stack", title: "Tech Stack", editType: "stringedit", edit: { params: {} }, type: "string", format: "",defaultVisible:false },
    { field: "type_of_project", title: "Type Of Project", editType: "stringedit", edit: { params: {} }, type: "string", format: "",defaultVisible:false },
    { field: "type_of_request", title: "Type Of Request", editType: "stringedit", edit: { params: {} }, type: "string", format: "",defaultVisible:false },
    { field: "winzone_id", title: "Winzone Id", editType: "numericedit", edit: { params: {} }, type: "number", format: "N",defaultVisible:false },
    { field: "bd_owner_poc_id", title: "BD Owner POC ID", editType: "numericedit", edit: { params: {} }, type: "number", format: "N",defaultVisible:false },
    { field: "bd_owner_poc_name", title: "BD Owner POC Name", editType: "stringedit", edit: { params: {} }, type: "string", format: "",defaultVisible:false },
    { field: "business_case_description", title: "Description", editType: "stringedit", edit: { params: {} }, type: "string", format: "",defaultVisible:false },
    { field: "category", title: "Category", editType: "stringedit", edit: { params: {} }, type: "string", format: "",defaultVisible:false },
    { field: "channel_owner_poc_id", title: "Channel Owner POC ID", editType: "numericedit", edit: { params: {} }, type: "number", format: "N",defaultVisible:false },
    { field: "channel_owner_poc_name", title: "Channel Owner POC Name", editType: "stringedit", edit: { params: {} }, type: "string", format: "",defaultVisible:false },
    { field: "channel_reviewer", title: "Reviewer", editType: "stringedit", edit: { params: {} }, type: "string", format: "",defaultVisible:false },
    { field: "createdDate", title: "Created Date", editType: "datepickeredit", edit: { params: {} }, type: "date", format: "yMd",defaultVisible:false },
    { field: "request_from_existing_account_new_project_tech_stack", title: "Existing Acc. New Project Tech Stack", editType: "stringedit", edit: {}, type: "string", format: "",defaultVisible:false },
    { field: "request_from_existing_account_project", title: "Existing Acc. Project", editType: "stringedit", edit: { params: {} }, type: "string", format: "",defaultVisible:false },
    { field: "request_from_existing_account_tech_stack_new_project", title: "Existing Acc. Tech Stack New Project", editType: "stringedit", edit: { params: {} }, type: "string", format: "",defaultVisible:false },
    { field: "request_from_new_account_project", title: "New Account Project", editType: "stringedit", edit: { params: {} }, type: "string", format: "",defaultVisible:false },
    { field: "comments", title: "Comments", editType: "stringedit", edit: { params: {} }, type: "string", format: "",defaultVisible:false }
  
  ];


  constructor(props: IOpportunitiesComponentProps) {
    super(props);
    this.state = {
      pageSizes: [10, 25, 50, 100],
      dataSourceOptions: this.OPPORTUNITIES_DATASOURCE,
      loadingVisible:false,
      modal:false,
      saveToCloudResult:"",
      dataSummary:[{
          column: "opportunity_name",
          summaryType: "count"
      }],
      loggedInUser:new User()

    };
    this.onToolbarPreparing = this.onToolbarPreparing.bind(this);
    this.onContentReady = this.onContentReady.bind(this);
    this.copyToClipboard=this.copyToClipboard.bind(this);
    this.toggleModal=this.toggleModal.bind(this);
  }

  toggleLoader = () => {
    let toggleloadingVisible = !this.state.loadingVisible;
    this.setState({ loadingVisible: toggleloadingVisible });
  };


  render() {

    return (
      <div className="ot-container p-4">
        <DataGrid
          dataSource={this.state.dataSourceOptions}
          allowColumnReordering={true}
          key="id"
          rowAlternationEnabled={true}
          onContentReady={this.onContentReady}
          onToolbarPreparing={this.onToolbarPreparing}
          ref={(ref) => { if (ref != null) this.opportunitiesDataGrid = ref.instance }}
        >
          
          
                <Editing popup={{
                  title: "Add / Edit Opportunity",
                  showTitle: true,
                  width: 700,

                  position: {
                    my: "top",
                    at: "top",
                    of: window
                  }

                }} allowUpdating={false} allowAdding={getLoggedInUser().userGroup==='ChannelAdmin'} allowDeleting={getLoggedInUser().userGroup==='ChannelAdmin'} mode="popup" />

        

          <GroupPanel visible={true} />
          <SearchPanel visible={true} highlightCaseSensitive={true} />
          <Grouping autoExpandAll={true} />
          <Selection mode={'multiple'} />
          <FilterRow visible={true} applyFilter="auto" />
          <HeaderFilter visible={true} />
          <Export enabled={true} fileName="Opportunities" allowExportSelectedData={true} />
          <ColumnChooser enabled={true} />
          <FilterPanel visible={true} />
          <Summary totalItems={this.state.dataSummary} />
          <MasterDetail enabled={true} template="DetailTemplate" />
          
           {
             this.state.loggedInUser.userGroup==="ChannelAdmin" ?
                  <Template name="DetailTemplate" component={ChannelAdminOppDetailComponent}/>
             :
                  <Template name="DetailTemplate" component={TechAdminOppDetailComponent}/>

           }

             
           
  
          
          
          
          
          {this.columns.map((column, idx) =>
            (<Column key={idx} dataField={column.field} dataType={column.type}  defaultVisible={column.defaultVisible} caption={column.title}/>)
          )}



          <Pager allowedPageSizes={this.state.pageSizes} showPageSizeSelector={true} />
          <Paging defaultPageSize={10} />


        </DataGrid>

        <LoadPanel shadingColor="transparent"
          position={{ of: '.ot-container' }}
          visible={this.state.loadingVisible}
          showIndicator={true}
          showPane={true}
          shading={true}
          closeOnOutsideClick={false} />    

        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Save to Cloud</ModalHeader>
          <ModalBody>
                   <Row>
                     <Col md="6">
                        <a className="btn btn-primary" href={this.state.saveToCloudResult} download="true" target="_blank">Download</a>
                     </Col>
                     <Col md="6">
                        <Button onClick={this.copyToClipboard}>Copy Link</Button>
                        <textarea className="hide" value={this.state.saveToCloudResult} id="hiddenSavedToCloudURL"/>
                     </Col>
                   </Row>  
          </ModalBody>
        </Modal>          
          

      </div>

    );

  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal
    });
  }

  onContentReady = (e) => {
    this.moveEditColumnToLeft(e.component);
  };

  moveEditColumnToLeft = (dataGrid: any) => {
    dataGrid.columnOption("command:edit", {
      visibleIndex: -1
    });
  };

  onToolbarPreparing = (e) => {
    var dataGrid = e.component;
    let that=this;

    
      e.toolbarOptions.items.unshift({
        location: "after",
  
        widget: "dxButton",
        options: {
          text: "Save To Cloud",
          type:"default",
          onClick: function () {
            that.saveToCloud();
          }
        }
      }, {
          location: "after",
          widget: "dxButton",
          options: {
            icon: "refresh",
            onClick: function () {
              dataGrid.refresh();
            }
          }
        });
    

    
  };

  saveToCloud = () => {
    var that = this;
    that.toggleLoader();
    fetch('https://85xbnc949i.execute-api.us-east-1.amazonaws.com/prod/opportunitydetailapi', {
        method: 'post',
        body: JSON.stringify({ operationName: "SAVEFILES3ALLOPPODETAILS" })
    }).then(function (response) {
        return response.json();
    }).then(function (result) {
        if (result && result.code == "200") {
            that.setState({saveToCloudResult:result.data});
            that.toggleModal();
            console.log(result.data);
        }else{
          notify("Save to Cloud Error : "+result.message, "error", 2500);
        }
        that.toggleLoader();
    });
  }
  copyToClipboard=(e)=>{
    let hiddenSavedToCloudURLTA:HTMLTextAreaElement=document.querySelector("#hiddenSavedToCloudURL");
    hiddenSavedToCloudURLTA.select();
    document.execCommand('copy');
  };


  componentWillMount(){        
    this.setState({loggedInUser:getLoggedInUser()});
  }
}



export default OpportunitiesComponent;