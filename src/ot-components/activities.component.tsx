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
  Summary
} from 'devextreme-react/ui/data-grid';
import DataSource from 'devextreme/data/data_source';
import Globalize from 'devextreme/localization'
import $ from 'jquery';
import data_grid from 'devextreme/ui/data_grid';



interface IActivitiesComponentState {
  pageSizes: any;
  dataSourceOptions: any;
  dataSummary:any;
  masterFilterQueryMode:string;
  masterFilterQueryValue:string;
}

interface IActivitiesComponentProps {

}

const ACTIVITIES_URL: string = "https://85xbnc949i.execute-api.us-east-1.amazonaws.com/prod/activitydetailsapi";

const ACTIVITIES_DATASOURCE: any = new DataSource({
  load: function (loadOptions) {
    let request:any={};
    if(loadOptions.userData.masterFilterQueryMode&&loadOptions.userData.masterFilterQueryValue){
      request={
        searchColumn: "",
        operationName:
          "FINDALLACTIVITYDETAILSBYFIELD"
      };
      let queryType=loadOptions.userData.masterFilterQueryMode;
      let queryValue=loadOptions.userData.masterFilterQueryValue;
      if(queryType==="winzoneIdIndex"){
        request.winzone_id=queryValue;
      }else if(queryType==="modifiedByIndex"){
        request.modified_by=queryValue;
      }else if(queryType==="oppnameIndex"){
        request.opportunity_name=queryValue;
      }
      request.searchColumn=queryType;
    }else{
      request = {
        operationName: "FINDALLACTIVITYDETAILS"
      }; 
    }

    var d = $.Deferred();
    return $.ajax({
      url: ACTIVITIES_URL,
      method: 'post',
      data: JSON.stringify(request)

    })
      .done(function (result) {
        // Here, you can process the response
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
      url: ACTIVITIES_URL,
      method: 'post',
      data: JSON.stringify(request)
    })
      .done(function (result) {
        // Here, you can process the response
        d.resolve(result.data);
      });
  }



});

class ActivitiesComponent extends Component<IActivitiesComponentProps, IActivitiesComponentState>{

  columns = [
    { field: "opportunity_name", title: "Opportunity Name", type: "string", width: "auto" },
    { field: "modified_by", title: "Modified By", type: "string", width: "auto" },
    { field: "event_type", title: "Activity Type", type: "string", width: "100" },
    { field: "winzone_id", title: "Winzone Id", type: "string", width: "100" },
    { field: "change_log", title: "Change Log", type: "string", width: "auto" },
    { field: "modified_date", title: "Modified Date", type: "date", width: "100" }
  ];


  constructor(props: IActivitiesComponentProps) {
    super(props);
    this.state = {
      pageSizes: [10, 25, 50, 100],
      dataSourceOptions: ACTIVITIES_DATASOURCE,
      dataSummary:[{
            column: "opportunity_name",
            summaryType: "count"
        },{
            column: "modified_date",
            summaryType: "max",
            customizeText: function(data) {
                return "Latest: " + Globalize.formatDate(data.value, "" );
            }
        }],
        masterFilterQueryMode:"",
        masterFilterQueryValue:""
    };
    this.onToolbarPreparing = this.onToolbarPreparing.bind(this);

  }


  render() {

    return (
      <div className="ot-container p-4">

        <DataGrid
          dataSource={this.state.dataSourceOptions}
          allowColumnReordering={true}
          key="id"
          rowAlternationEnabled={true}
          onToolbarPreparing={this.onToolbarPreparing}
        >


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

          {this.columns.map((column, idx) =>
            (<Column key={idx} dataField={column.field} dataType={column.type}  />)
          )}



          <Pager allowedPageSizes={this.state.pageSizes} showPageSizeSelector={true} />
          <Paging defaultPageSize={10} />


        </DataGrid>


      </div>

    );

  }



  onToolbarPreparing = (e) => {
    var dataGrid = e.component;
    var that=this;
    e.toolbarOptions.items.unshift( {
      location: "after",
      widget: "dxSelectBox",
      options: {
          width: 200,
          items: [{
              value: "winzoneIdIndex",
              text: "Winzone ID"
          }, {
              value: "modifiedByIndex",
              text: "Modified By"
          },{
            value: "oppnameIndex",
            text: "Opportunity Name"
          }],
          displayExpr: "text",
          valueExpr: "value",
          value:that.state.masterFilterQueryMode,
          onValueChanged: function(e) {
              that.setState({masterFilterQueryMode:e.value});
          }
      }
  }, {
      location: "after",
      widget: "dxTextBox",
      options: {
          text: "",
          width: 136,
          value:that.state.masterFilterQueryValue,
          onValueChanged: function(e) {
            that.setState({masterFilterQueryValue:e.value});
          }
            
      }
  },{
    location: "after",
    widget: "dxButton",
    options: {
        icon: "refresh",
        onClick: function() {
            let loadOptions:any={};
            loadOptions.userData.masterFilterQueryMode=that.state.masterFilterQueryMode;
            loadOptions.userData.masterFilterQueryValue=that.state.masterFilterQueryValue;
            that.state.dataSourceOptions.load(loadOptions)
            .done(function (data) {
                // Process "data" here
            })
            .fail(function (error) {
                // Handle the "error" here
            });
            dataGrid.refresh();
        }
    }}, {
      location: "after",
      widget: "dxButton",
      options: {
          icon: "refresh",
          onClick: function() {
              dataGrid.refresh();
          }
      }
  });

  };


}

export default ActivitiesComponent;