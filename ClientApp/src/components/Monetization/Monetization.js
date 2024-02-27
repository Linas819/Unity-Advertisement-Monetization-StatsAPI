import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ClearMonetizationData, GetMonetizationData } from './MonetizationAction';
import HeaderBar from '../HeaderBar';
import { Button, Checkbox, Dropdown, Grid, Input, Menu, Sidebar, Icon } from 'semantic-ui-react';
import { scaleOptions, groupByCheckbox, fieldCheckbox } from './MonetizationUtils';
import { CheckSession } from '../MainAction';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const columnDefs = [
    { headerName: "Timestamp", field: "timestamp", filter: true, sortable: true, flex: 1, resizable: true, floatingFilter: true, valueFormatter: typeFormatter },
    { headerName: "Country", field: "country", filter: true, sortable: true, flex: 1, resizable: true, floatingFilter: true },
    { headerName: "Platform", field: "platform", filter: true, sortable: true, flex: 1, resizable: true, floatingFilter: true },
    { headerName: "Placement", field: "placement", filter: true, sortable: true, flex: 1, resizable: true, floatingFilter: true },
    { headerName: "Source Game Id", field: "sourceGameId", filter: true, sortable: true, flex: 1, resizable: true, floatingFilter: true },
    { headerName: "Source Name", field: "sourceName", filter: true, sortable: true, flex: 1, resizable: true, floatingFilter: true },
    { headerName: "Ad Request Count", field: "adRequestCount", filter: true, sortable: true, flex: 1, resizable: true, floatingFilter: true },
    { headerName: "Available Sum", field: "availableSum", filter: true, sortable: true, flex: 1, resizable: true, floatingFilter: true },
    { headerName: "Revenue Sum", field: "revenueSum", filter: true, sortable: true, flex: 1, resizable: true, floatingFilter: true },
    { headerName: "Start Count", field: "startCount", filter: true, sortable: true, flex: 1, resizable: true, floatingFilter: true },
    { headerName: "View Count", field: "viewCount", filter: true, sortable: true, flex: 1, resizable: true, floatingFilter: true },
];

class Monetization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scale: 'all',
            groupBy: {
                country: false,
                placement: false,
                platform: false,
                game: false
            },
            fields: {
                adRequest: false,
                availableSum: false,
                revenuSum: false,
                startCount: false,
                viewCount: false
            },
            startTime: '',
            endTime: '',
            gameIds: '',
            sideBar: false
        }
    }
    componentDidMount = () => {
        this.props.CheckSession(this.props.history)
    }
    onClickHandler = () => {
        this.props.ClearMonetizationData(this.props.history);
    }
    getData = () => {
        this.props.GetMonetizationData(this.state);
    }
    gameIdsFieldInfo = () => {
        alert("Game IDs (CSV) - values must be seperated by comma");
      }
    onChangeHandler = (event, data) => {
        switch (data.name) {
            case "groupBy":
                this.setState({
                    ...this.state,
                    groupBy: {
                        ...this.state.groupBy,
                        [data.variable]: data.checked
                    }
                });
                break;
            case "fields":
                this.setState({
                    ...this.state,
                    fields: {
                        ...this.state.fields,
                        [data.variable]: data.checked
                    }
                });
                break;
            case "scale":
            case "startTime":
            case "endTime":
            case "gameIds":
                this.setState({
                    ...this.state,
                    [data.name]: data.value
                });
                break;
            case "sideBar":
                this.setState({
                    ...this.state,
                    sideBar: data.checked
                });
                break;
            default:
                break;
        }
    }
    render() {
        return(
            <div> 
                <HeaderBar/>
                <Grid columns={2}>
                    <Grid.Row className='center'> 
                        <Grid.Column>
                            <Checkbox label='Data Selections' name='sideBar' onChange={this.onChangeHandler}/>
                        </Grid.Column>
                        <Grid.Column>
                            <Button color='green' onClick={this.getData} loading={this.props.main.isButtonLoading}>Get Data</Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Sidebar.Pushable>
                    <Sidebar 
                        as={Menu}
                        direction='left'
                        visible={this.state.sideBar}
                        animation='push'
                        width='thin'
                        vertical
                    >
                        <Grid columns={1} divided='vertically'>
                            <Grid.Row>
                                <Grid.Column>
                                    <h3>Group by</h3>
                                    {groupByCheckbox.map((items) =>
                                    {
                                        let item = items.split(',');
                                        return <div><Checkbox key={item[1]} label={item[0]} variable={item[1]} name='groupBy' onChange={this.onChangeHandler}/><br/></div>
                                    })}
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>  
                                    <h3>Fields</h3>
                                    {fieldCheckbox.map((items) =>
                                    {
                                        let item = items.split(',');
                                        return <Checkbox key={item[1]} label={item[0]} variable={item[1]} name='fields' onChange={this.onChangeHandler}/>
                                    })}
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Dropdown placeholder='Scale' name="scale" options={scaleOptions} onChange={this.onChangeHandler}
                                    />
                                    <h3>Start</h3>
                                    <Input type='datetime-local' name='startTime' onChange={this.onChangeHandler}></Input>
                                    <h3>End</h3>
                                    <Input type='datetime-local' name='endTime' onChange={this.onChangeHandler}></Input>
                                    <h3>Game IDs</h3>
                                    <Input placeholder='Game Ids (CSV)' name='gameIds' onChange={this.onChangeHandler}
                                        icon={<Icon name='info' inverted circular link onClick={this.gameIdsFieldInfo}/>}></Input>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Sidebar>
                    <Sidebar.Pusher>
                        <div className='ag-theme-alpine' style={{width: '100%', height: '800px'}}>
                            <AgGridReact
                                rowData={this.props.monetization.monetizationData}   
                                columnDefs={columnDefs}
                                context={this.state.scale}
                            />
                        </div>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        );
    }
}

function typeFormatter(params) {
    let formatedValue;
    let scale = params.context;
    const date = new Date(params.value);
    switch (scale) {
        case "Hour":
            formatedValue = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":00";
            break;
        case "Day":
        case "Week":
            formatedValue = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
            break;
        case "Month":
            formatedValue = date.getFullYear() + "-" + (date.getMonth()+1);
            break;
        case "Year":
            formatedValue = date.getFullYear();
            break;
        case "all":
            formatedValue = "All Time";
            break;
        default:
            formatedValue = params.value;
            break;
    }
    return formatedValue;
}

function MapStateToProps(state) {
    return {
        monetization: state.Monetization,
        main: state.Main
    };
  }

export default withRouter(
  connect(
    MapStateToProps, { ClearMonetizationData, GetMonetizationData, CheckSession }
)(Monetization));