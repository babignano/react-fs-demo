import React from 'react';
import { AuthContext } from '../../../services/auth.service';
import { SignInSuccess } from '../../../actions/actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import cookie from 'react-cookies'


const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
    isLoggedIn: false
};

export interface SignUpFormInputProps {
    auth: any;
    signInSuccess: any;
}

export interface SignInInputProps {
    signInSuccess: any;
}

export interface SignUpFormState {
    email: string;
    password: string;
    error: Error;
    isLoggedIn: boolean;
}

class SignIn extends React.Component<SignInInputProps> {
    constructor(props) {
        super(props);
    }
     
    render() {
        return (
            <AuthContext.Consumer>
                {auth => (<SignUpForm auth={auth} signInSuccess={this.props.signInSuccess} />)
                }
            </AuthContext.Consumer>
        )
    }
}

class SignUpForm extends React.Component<SignUpFormInputProps, SignUpFormState> {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE }
    }
    handleChange = event => {
        switch(event.target.name) {
            case 'email':
                this.setState({ email: event.target.value });
            case 'password':
                this.setState({ password: event.target.value });
        }
      }

    handleSubmit = event => {
        event.preventDefault();
        const { email, password } = this.state;
        this.props.auth
            .doSignInWithEmailAndPassword(email, password)
            .then(result => {
                this.props.signInSuccess(result.user);
                this.setState({
                    isLoggedIn: true
                });
            })
            .catch(error => {
                this.setState({ error });
            });  
    }

    render() {
        const { email, password, error, isLoggedIn } = this.state;

        if (isLoggedIn) {
            return <Redirect to='/tasks' />;
        }

        return (
            <form onSubmit={this.handleSubmit}>
                <label>Email:
                    <input name="email" type="email" value={email} onChange={this.handleChange} />
                </label>
                <label>Password:
                    <input name="password" type="Password" value={password} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
                {error && <p> {error.message} </p>}
            </form>
           
        )
    }
}
const mapDispatchToProps = dispatch => ({
    signInSuccess: user => dispatch(SignInSuccess(user))
})
   
export default connect(undefined, mapDispatchToProps)(SignIn)