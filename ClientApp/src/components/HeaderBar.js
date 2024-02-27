import React, { Component } from 'react';
import { Logout } from './MainAction';
import { Grid, Button, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ClearAcquireData } from './Acquire/AcquireAction';
import { ClearMonetizationData } from './Monetization/MonetizationAction';

class HeaderBar extends Component {
    onClickHandler = () => {
        switch(this.props.location.pathname) {
            case "/monetization":
                this.props.ClearMonetizationData(this.props.history);
                break;
            case "/acquire":
                this.props.ClearAcquireData(this.props.history);
                break;
            default:
                break;
        }
        this.props.Logout(this.props.history);
    }
    render() {
        let pathname = this.props.location.pathname;
        return(<div className='center'>
            <Grid className='headerBar'>
                <Grid.Row columns={4}>
                    <Grid.Column>
                        <Button icon color='red' name='return' onClick={this.onClickHandler}>
                            <Icon name='arrow left'></Icon>
                            Logout
                        </Button>
                    </Grid.Column>
                    <Grid.Column textAlign='right'>
                        {pathname === "/monetization"? <h2>Organization Core ID</h2> :
                            pathname === "/acquire"? <h2>Organization ID</h2> : ""}
                    </Grid.Column>
                    <Grid.Column textAlign='left'>
                        <h2>{this.props.main.organizationId}</h2>
                    </Grid.Column>
                    <Grid.Column>
                        {pathname === "/monetization"? <h2>Monetization</h2> :
                            pathname === "/acquire"? <h2>Advertising</h2> : ""}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
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
        MapStateToProps, { Logout, ClearAcquireData, ClearMonetizationData }
)(HeaderBar));