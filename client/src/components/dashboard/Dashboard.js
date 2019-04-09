import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import * as actions from '../../store/actions';
import Spinner from '../common/Spinner';
import ProfileAction from './ProfileAction';
import Experience from './Experience';
import Education from './Education';

class Dashboard extends Component{

    componentDidMount() {
        this.props.onGetCurrentProfile()
    }

    onDeleteClick = e => {
        this.props.onDeleteAccount();
    };

    render() {
        const {user} = this.props.auth;
        const {profile, loading} = this.props.profile;

        let dashboardContent;

        if (profile === null || loading) {
            dashboardContent = <Spinner/>
        } else {
            // Check if logged in user has profile data
            if (Object.keys(profile).length > 0) {
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link></p>
                        <ProfileAction/>
                        <Experience experience={profile.experience}/>
                        <Education education={profile.education}/>
                        <div
                            style={{marginBottom: '60px'}}
                        >
                            <button className="btn btn-danger" onClick={this.onDeleteClick}>Delete My Account</button>
                        </div>
                    </div>
                );
            } else {
                // User is logged in has no profile
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">Welcome {user.name}</p>
                        <p>You have not yet set a profile, please add some info</p>
                        <Link to="/create-profile" className="btn btn-lg btn-info">Create Profile</Link>
                    </div>
                )
            }
        }

        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-mid-12">
                            <h1 className="display-4">Dashboard</h1>
                            {dashboardContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    onGetCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

const mapDispatchToProps = dispatch => {
    return {
        onGetCurrentProfile: () => dispatch(actions.getCurrentProfile()),
        onDeleteAccount: () => dispatch(actions.deleteAccount()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);