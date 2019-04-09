import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../../store/actions/index';
import TextFieldGroup from '../common/TextFileldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

class AddExperience extends Component{
    constructor(props) {
        super(props);
        this.state = {
            company: '',
            title: '',
            location: '',
            from: '',
            to: '',
            current: false,
            description: '',
            errors: {},
            disabled: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    onSubmit = e => {
        e.preventDefault();

        const expData = {
            company: this.state.company,
            title: this.state.title,
            location: this.state.location,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        };

        this.props.onAddExperience(expData, this.props.history);
    };

    onCheck = e => {
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current
        })
    };

    render() {
        const {errors} = this.state;

        return (
            <div className="add-experience">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">Go Back</Link>
                            <h1 className="display-4 text-center">Add Experience</h1>
                            <p className="lead text-center">Add any job or position that you have had in the past or current</p>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    name="company"
                                    value={this.state.company}
                                    placeholder="* Company"
                                    onChange={this.onChange}
                                    error={errors.company}
                                />
                                <TextFieldGroup
                                    name="title"
                                    value={this.state.title}
                                    placeholder="* Job Title"
                                    onChange={this.onChange}
                                    error={errors.title}
                                />
                                <TextFieldGroup
                                    name="location"
                                    value={this.state.location}
                                    placeholder="* Location"
                                    onChange={this.onChange}
                                    error={errors.location}
                                />
                                <h6>From Date</h6>
                                <TextFieldGroup
                                    name="from"
                                    value={this.state.from}
                                    onChange={this.onChange}
                                    error={errors.from}
                                    type="date"
                                />
                                <h6>To Date</h6>
                                <TextFieldGroup
                                    name="to"
                                    value={this.state.to}
                                    onChange={this.onChange}
                                    error={errors.to}
                                    type="date"
                                    disabled={this.state.disabled? 'disabled' : ''}
                                />
                                <div className="form-check mb-4">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="current"
                                        value={this.state.current}
                                        checked={this.state.current}
                                        onChange={this.onCheck}
                                        id="current"
                                    />
                                    <label className="form-check-label" htmlFor="current">
                                        Current Job
                                    </label>
                                </div>
                                <TextAreaFieldGroup
                                    name="description"
                                    value={this.state.description}
                                    placeholder="* Job Description"
                                    onChange={this.onChange}
                                    error={errors.description}
                                />
                                <input type="submit" value="submit" className="btn btn-info btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

AddExperience.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    onAddExperience: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

const mapDispatchToProps = dispatch => {
    return {
        onAddExperience: (expData, history) => dispatch(actions.addExperience(expData, history))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddExperience));