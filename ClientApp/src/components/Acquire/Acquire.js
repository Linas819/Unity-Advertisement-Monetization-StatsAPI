import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import HeaderBar from '../HeaderBar';
import { Checkbox, Dropdown, Grid, Input, Sidebar, Menu, Button } from 'semantic-ui-react';
import { AgGridReact } from 'ag-grid-react';
import { scaleOptions, adTypeOptions, splitByCheckbox, fieldsCheckbox } from '../Acquire/AcquireUtils';
import { GetAcquireData } from './AcquireAction';
import { CheckSession } from '../MainAction';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const columnDefs = [
    { headerName: "Timestamp", field: "timestamp", filter: true, sortable: true, flex: 1, resizable: true, floatingFilter: true, valueFormatter: typeFormatter },
    { headerName: "Campaign Set Id", field: "campaignSetId", filter: true, sortable: true, flex: 1, resizable: true, floatingFilter: true },
    { headerName: "Campaign Set Name", field: "campaignSetName", filter: true, sortable: true, flex: 1, resizable: true, floatingFilter: true },
    { headerName: "Creative Pack Id", field: "creativePackId", filter: true, sortable: true, flex: 1, resizable: true, floatingFilter: true },
    { headerName: "Creative Pack Name", field: "creativePackName", filter: true, sortable: true, flex: 1, resizable: true, floatingFilter: true },
    { headerName: "Ad Type", field: "adType", filter: true, sortable: true, flex: 1, resizable: true, floatingFilter: true },
    { headerName: "Campaign Id", field: "campaignId", filter: true, sortable: true, flex: 1, resizable: true, floatingFilter: true },
    { headerName: "Campaign Name", field: "campaignName", filter: true, sortable: true, flex: 1, resizable: true, floatingFilter: true },
    { headerName: "Target Id", field: "targetId", filter: true, sortable: true, flex: 1, resizable: true, floatingFilter: true },
    { headerName: "Target Store Id", field: "targetStoreId", filter: true, sortable: true, flex: 1, resizable: true, floatingFilter: true },
    { headerName: "Target Name", field: "targetName", filter: true, sortable: true, flex: 1, resizable: true, floatingFilter: true },
    { headerName: "Source App Id", field: "sourceAppId", filter: true, sortable: true, flex: 1, resizable: true, floatingFilter: true },
    { headerName: "Store", field: "store", filter: true, sortable: true, flex: 1, resizable: true, floatingFilter: true },
    { headerName: "Country", field: "country", filter: true, sortable: true, flex: 1, resizable: true, floatingFilter: true },
    { headerName: "Platform", field: "platform", filter: true, sortable: true, flex: 1, resizable: true, floatingFilter: true },
    { headerName: "Os Version", field: "osVersion", filter: true, sortable: true, flex: 1, resizable: true, floatingFilter: true },
    { headerName: "Starts", field: "starts", filter: true, sortable: true, flex: 1, resizable: true, floatingFilter: true },
    { headerName: "Views", field: "views", filter: true, sortable: true, flex: 1, resizable: true, floatingFilter: true },
    { headerName: "Clicks", field: "clicks", filter: true, sortable: true, flex: 1, resizable: true, floatingFilter: true },
    { headerName: "Installs", field: "installs", filter: true, sortable: true, flex: 1, resizable: true, floatingFilter: true },
    { headerName: "Spend", field: "spend", filter: true, sortable: true, flex: 1, resizable: true, floatingFilter: true },
    { headerName: "SKAD Installs", field: "skadInstalls", filter: true, sortable: true, flex: 1, resizable: true, floatingFilter: true },
    { headerName: "SKAD CPI", field: "skadCpi", filter: true, sortable: true, flex: 1, resizable: true, floatingFilter: true },
    { headerName: "CVR", field: "cvr", filter: true, sortable: true, flex: 1, resizable: true, floatingFilter: true },
    { headerName: "CTR", field: "ctr", filter: true, sortable: true, flex: 1, resizable: true, floatingFilter: true },
    { headerName: "eCPM", field: "ecpm", filter: true, sortable: true, flex: 1, resizable: true, floatingFilter: true },
    { headerName: "CPI", field: "cpi", filter: true, sortable: true, flex: 1, resizable: true, floatingFilter: true }
];

class Acquire extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startTime: '',
            endTime: '',
            scale: 'all',
            splitBy: {
                campaignSet: false,
                creativePack: false,
                adType: false,
                campaign: false,
                target: false,
                sourceAppId: false,
                store: false,
                country: false,
                platform: false,
                osVersion: false,
                skadConversionValue: false
            },
            fields: {
                timestamp: false,
                campaignSet: false,
                creativePack: false,
                adType: false,
                campaign: false,
                target: false,
                sourceAppId: false,
                store: false,
                country: false,
                platform: false,
                osVersion: false,
                starts: false,
                views: false,
                clicks: false,
                installs: false,
                spend: false,
                skadInstalls: false,
                skadCpi: false,
                skadConversion: false
            },
            campaignSets: '',
            campaigns: '',
            targets: '',
            adTypes: '',
            stores: {
                apple: false,
                google: false
            },
            countries: '',
            platforms: {
                ios: false,
                android: false
            },
            osVersions: '',
            creativePacks: '',
            sourceAppIds: '',
            skadConversionValues: ''
        }
    }
    componentDidMount = () => {
        if(!this.props.main.isLoggedIn)
            this.props.CheckSession(this.props.history)
    }
    onClickHandler = () => {
        this.props.GetAcquireData(this.state);
    }
    onChangeHandler = (event, data) => {
        switch (data.name) {
            case "startTime":
            case "endTime":
            case "scale":
            case "campaignSets":
            case "campaigns":
            case "targets":
            case "adTypes":
            case "countries":
            case "osVersions":
            case "creativePacks":
            case "sourceAppIds":
            case "skadConversionValues":
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
            case "stores":
                let variables = data.variable.split(',')
                if(variables[0] === 'ios' && data.checked === false)
                {
                    this.setState({
                        ...this.state,
                        stores: {
                            ...this.state.stores,
                            [variables[1]]: data.checked
                        },
                        platforms: {
                            ...this.state.platforms,
                            [variables[0]]: data.checked
                        },
                        splitBy: {
                            ...this.state.splitBy,
                            skadConversionValue: false
                        },
                        fields: {
                            ...this.state.fields,
                            skadInstalls: false,
                            skadCpi: false,
                            skadConversion: false
                        },
                        skadConversionValues: ''
                    });
                } else {
                    this.setState({
                        ...this.state,
                        stores: {
                            ...this.state.stores,
                            [variables[1]]: data.checked
                        },
                        platforms: {
                            ...this.state.platforms,
                            [variables[0]]: data.checked
                        }
                    });
                }
                break;
            case "splitBy":
                this.setState({
                    ...this.state,
                    splitBy: {
                        ...this.state.splitBy,
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
                            <Button color='green' onClick={this.onClickHandler} loading={this.props.main.isButtonLoading}>Get Data</Button>
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
                                    <h3>Start</h3>
                                    <Input type='datetime-local' name='startTime' onChange={this.onChangeHandler}></Input>
                                    <h3>End</h3>
                                    <Input type='datetime-local' name='endTime' onChange={this.onChangeHandler}></Input><br/><br/>
                                    <Dropdown placeholder='Scale' name='scale' options={scaleOptions} onChange={this.onChangeHandler}/>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <h3>Stores/Platforms</h3>
                                    <Checkbox key='apple' label='iOS' variable='ios,apple' name='stores' onChange={this.onChangeHandler}/>
                                    <Checkbox key='google' label='Android' variable='android,google' name='stores' onChange={this.onChangeHandler}/>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <h3>Split by</h3>
                                    {splitByCheckbox.map((items) =>
                                    {
                                        let item = items.split(',');
                                        if(item[1] === 'skadConversionValue')
                                            return <div><Checkbox key={item[1]} label={item[0]} variable={item[1]} name='splitBy' 
                                                onChange={this.onChangeHandler} disabled={!this.state.stores.apple}
                                                checked={this.state.splitBy.skadConversionValue}/><br/></div>
                                        else
                                            return <div><Checkbox key={item[1]} label={item[0]} variable={item[1]} name='splitBy' 
                                                onChange={this.onChangeHandler}/><br/></div>
                                    })}
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <h3>Fields</h3>
                                    {fieldsCheckbox.map((items) =>
                                    {
                                        let item = items.split(',');
                                        if(item[1] === 'skadInstalls' || item[1] === 'skadCpi' || item[1] === 'skadConversion')
                                            return <div><Checkbox key={item[1]} label={item[0]} variable={item[1]} name='fields' 
                                                onChange={this.onChangeHandler} disabled={!this.state.stores.apple}
                                                checked={this.state.fields[item[1]]}/><br/></div>
                                        else
                                            return <div><Checkbox key={item[1]} label={item[0]} variable={item[1]} name='fields' 
                                                onChange={this.onChangeHandler}/><br/></div>
                                    })}
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Input placeholder='Campaign Sets' name='campaignSets' onChange={this.onChangeHandler}/><br/><br/>
                                    <Input placeholder='Campaigns' name='campaigns' onChange={this.onChangeHandler}/><br/><br/>
                                    <Input placeholder='Targets' name='targets' onChange={this.onChangeHandler}/><br/><br/>
                                    <Dropdown placeholder='Ad Types' name='adTypes' options={adTypeOptions} onChange={this.onChangeHandler}/><br/><br/>
                                    <Input placeholder='Countries' name='countries' onChange={this.onChangeHandler}/>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Input placeholder='OS Versions' name='osVersions' onChange={this.onChangeHandler}/><br/><br/>
                                    <Input placeholder='Creative Packs' name='creativePacks' onChange={this.onChangeHandler}/><br/><br/>
                                    <Input placeholder='Source App Ids' name='sourceAppIds' onChange={this.onChangeHandler}/><br/><br/>
                                    <Input placeholder='Skad Conversion Values' name='skadConversionValues' disabled={!this.state.stores.apple}
                                        type='number' step='1' min='0' max='63' onChange={this.onChangeHandler} style={{width: "182px"}}
                                        value={this.state.skadConversionValues}/>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Sidebar>
                    <Sidebar.Pusher>
                        <div className='ag-theme-alpine' style={{width: '100%', height: '800px'}}>
                            <AgGridReact
                                rowData={this.props.acquire.acquireData}
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
            break
    }
    return formatedValue;
}

function MapStateToProps(state) {
    return {
        acquire: state.Acquire,
        main: state.Main
    };
  }

export default withRouter(
  connect(
    MapStateToProps, { GetAcquireData, CheckSession }
)(Acquire));