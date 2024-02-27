import React, { Component } from 'react';
import { Button, Icon, Input } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Login } from './MainAction';
import { SetError } from './ErrorModal/ErrorModalAction';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organizationId: "",
      apiKey: ""
    }
  }
  onClickHandler = (event, data) => {
    const state = this.state;
    if (state.organizationId === "")
    {
      this.props.SetError("Warning", "Organization (Core) ID is Required");
      return;
    }
    if(state.apiKey === "")
    {
      this.props.SetError("Warning", "API Key is Required");
      return;
    }
    this.props.Login(state, this.props.history, data.name);
  }
  organizationIdInfo = () => {
    alert("Monetization - Organization Core ID. Acquire - Organization ID");
  }
  onChangeHandler = (event) => {
    const data = event.target;
    this.setState({
      ...this.state,
      [data.name]: data.value
    });
  }
  render() {
    return (
      <div className='center'>
        <h1>Unity Stats API</h1>
        <Input type='text' placeholder='Organization (Core) ID' name='organizationId' onChange={this.onChangeHandler}
          icon={<Icon name='info' inverted circular link onClick={this.organizationIdInfo}/>}/><br/><br/>
        <Input type='text' placeholder='API Key' name='apiKey' onChange={this.onChangeHandler}/><br/><br/>
        <Button color='blue' className='menuButton' name='monetization' onClick={this.onClickHandler} 
          loading={this.props.main.isButtonLoading}>Monetization</Button><br/><br/>
        <Button color='green' className='menuButton' name='acquire' onClick={this.onClickHandler} 
          loading={this.props.main.isButtonLoading}>Advertising</Button><br/><br/>
      </div>
    );
  }
}

function MapStateToProps(state) {
  return {
      main: state.Main
  };
}

export default withRouter(
  connect(
    MapStateToProps, { Login, SetError }
  )(Home));