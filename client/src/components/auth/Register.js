import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import * as actions from '../../store/actions';
import TextFieldGroup from '../common/TextFileldGroup';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: ''
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.onRegisterUser(newUser, this.props.history);

    };

    render() {
        const {errors} = this.state;

        return (
            <div>
                <div className="register">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h1 className="display-4 text-center">Sign Up</h1>
                                <p className="lead text-center">Create your DevConnector account</p>
                                <form onSubmit={this.onSubmit}>
                                    <TextFieldGroup
                                        placeholder="Name"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.onChange}
                                        error={errors.name}
                                    />
                                    <TextFieldGroup
                                        placeholder="Email Address"
                                        name="email"
                                        type="email"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                        error={errors.email}
                                        info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                                    />
                                    <TextFieldGroup
                                        placeholder="Password"
                                        name="password"
                                        type="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                        error={errors.password}
                                    />
                                    <TextFieldGroup
                                        placeholder="Confirm Password"
                                        name="password2"
                                        type="password"
                                        value={this.state.password2}
                                        onChange={this.onChange}
                                        error={errors.password2}
                                    />
                                    <input type="submit" className="btn btn-info btn-block mt-4"/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
   errors: state.errors,
   auth: state.auth
});

const mapDispatchToProps = dispatch => {
    return {
        onRegisterUser: (userData, history) => dispatch(actions.registerUser(userData, history))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));