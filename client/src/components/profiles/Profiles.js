import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';

import Spinner from '../common/Spinner';
import * as actions from '../../store/actions';
import ProfileItem from './ProfileItem';

class Profiles extends Component{

    componentDidMount() {
        this.props.onGetProfiles();
    }

    render() {
        const {profiles, loading} = this.props.profile;

        let profileItems;
        if (profiles === null || loading) {
            profileItems = <Spinner/>
        } else {
            if (profiles.length > 0) {
                profileItems = profiles.map(profile => (
                    <ProfileItem
                        profile={profile}
                        key={profile._id}
                    />
                ))
            } else {
                profileItems = <h4>No profiles found....</h4>
            }
        }
        return (
            <div className="profiles">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Developer Profiles</h1>
                            <p className="lead text-center">Browse and connect with developers</p>
                            {profileItems}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Profiles.propTypes = {
    profile: PropTypes.object.isRequired,
    onGetProfiles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

const mapDispatchToProps = dispatch => {
    return {
        onGetProfiles: () => dispatch(actions.getAllProfile())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
