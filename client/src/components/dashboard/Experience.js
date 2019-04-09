import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import Moment from 'react-moment';

import * as actions from '../../store/actions/index';

class Experience extends Component{

    onDeleteClick = id => {
        this.props.onDeleteExperience(id);
    };

    render() {
        const experience = this.props.experience.map(exp =>  (
            <tr key={exp._id}>
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                <td>
                    <Moment format="YYYY/MM/DD">{exp.from}</Moment> - {exp.to === null ? 'Now' : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}
                </td>
                <td>
                    <button
                    className="btn btn-danger"
                    onClick={() => this.onDeleteClick(exp._id)}
                >
                    Delete
                </button>
                </td>
            </tr>
        ));
        return (
            <div>
                <h4 className="mb-4">Experience Credentials</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Title</th>
                            <th>Years</th>
                            <th></th>
                        </tr>

                        {experience}

                    </thead>
                </table>
            </div>
        )
    }
}

Experience.propTypes = {
    onDeleteExperience: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
    return {
        onDeleteExperience: (id) => dispatch(actions.deleteExperience(id))
    }
};

export default connect(null, mapDispatchToProps)(Experience);