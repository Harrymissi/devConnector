import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';

import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import * as actions from '../../store/actions';

class PostForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps) {
       if (nextProps.errors) {
           this.setState({errors: nextProps.errors});
       }
    }

    onSubmit = e => {
        e.preventDefault();

        const {user} = this.props.auth;

        const newPost = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar
        };

        this.props.onAddPost(newPost);

        this.setState({text: ''});
    };

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    render() {
        const {errors} = this.state;

        return (
            <div className="post-form mb-3">
                <div className="card card-info">
                    <div className="card-header bg-info text-white">
                        Say Something...
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <TextAreaFieldGroup
                                    placeholder="Create a post"
                                    name="text"
                                    value={this.state.text}
                                    onChange={this.onChange}
                                    error={errors.text}
                                />
                            </div>
                            <button type="submit" className="btn btn-dark">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

PostForm.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    onAddPost   : PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

const mapDispatchToProps = dispatch => {
    return {
        onAddPost: (postData) => dispatch(actions.addPost(postData))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);