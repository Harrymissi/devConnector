import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import Moment from 'react-moment';

import * as actions from '../../store/actions/index';

class Education extends Component{

    onDeleteClick = id => {
        this.props.onDeleteEducation(id);
    };

    render() {
        const education = this.props.education.map(edu =>  (
            <tr key={edu._id}>
                <td>{edu.school}</td>
                <td>{edu.degree}</td>
                <td>
                    <Moment format="YYYY/MM/DD">{edu.from}</Moment> - {edu.to === null ? 'Now' : <Moment format="YYYY/MM/DD">{edu.to}</Moment>}
                </td>
                <td>
                    <button
                        className="btn btn-danger"
                        onClick={() => this.onDeleteClick(edu._id)}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        ));
        return (
            <div>
                <h4 className="mb-4">Education Credentials</h4>
                <table className="table">
                    <thead>
                    <tr>
                        <th>School</th>
                        <th>Degree</th>
                        <th>Years</th>
                        <th></th>
                    </tr>

                    {education}

                    </thead>
                </table>
            </div>
        )
    }
}

Education.propTypes = {
    onDeleteEducation: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
    return {
        onDeleteEducation: (id) => dispatch(actions.deleteEducation(id))
    }
};

export default connect(null, mapDispatchToProps)(Education);