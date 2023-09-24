import React, { Component } from 'react';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
      error: false,
      errorPwd: '',
      submitted: false,
      fontColor: 'white',
      emailError: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

    // Add form input change handlers and submit handler here
    handleInputChange = (event) => {
      const { name, value, checked, type } = event.target;
      this.setState({
        [name]: type === 'checkbox' ? checked : value,
        emailError: name === 'email' && !this.validateEmail(value) ? 'Valid email required' : ''
      });
    };

    validateEmail = (email) => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    };

    handlePassword = (event) => {
      const passwd = event.target.value;
      this.setState({password: passwd});
      let fontColor = 'white';

      const lowercase = /[a-z]/g;
      const uppercase = /[A-Z]/g;
      const numbers = /[0-9]/g;
      
      if (!passwd.match(lowercase) || !passwd.match(uppercase) || 
        !passwd.match(numbers) || passwd.length < 10) {
      fontColor = 'red';  // Change font color to red for weak passwords
      } else {
        fontColor = 'green';  // Change font color to green for strong passwords
      }

      if (!passwd.match(lowercase)) {
        this.setState({errorPwd: 'Password should contain lowercase letters!', fontColor});
        fontColor = 'red';
      } else if (!passwd.match(uppercase)) {
        this.setState({errorPwd: 'Password should contain uppercase letters!', fontColor});
   
      } else if (!passwd.match(numbers)) {
        this.setState({errorPwd: 'Password should contain numbers!', fontColor});

      } else if (passwd.length < 10) {
        this.setState({errorPwd: 'Password length should be more than 10', fontColor});

      } else {
        this.setState({errorPwd: "Password is strong!", fontColor});
      }
      
    }

    handleConfirmPassword = (event) => {
      const confirmPassword = event.target.value;
      const { password } = this.state;
      let confirmPwdError = '';

      if (confirmPassword !== password) {
        confirmPwdError = 'Passwords do not match.';
      }

      this.setState({ confirmPassword, confirmPwdError});
    }


    handleSubmit = (event) => {
      event.preventDefault();
      const { firstname, lastname, email, password, agreeToTerms } = this.state;
    
      // Validate email
      const isEmailValid = this.validateEmail(email);
    
      this.setState({
        emailError: isEmailValid ? '' : 'Valid email required!'
      });
    
      if (firstname === '' || lastname === '' || email === '' || password === '' || !agreeToTerms || !isEmailValid) {
        this.setState({
          error: true
        });
      } else {
        this.setState({
          submitted: true,
          error: false
        })
      };  
    }

      successMessage = () => {
        const { firstname, lastname, submitted } = this.state;
        return (
          <div className="success" style={{ display: submitted ? '' : 'none' }}>
            <h1>User {firstname + ' ' + lastname} successfully registered!!</h1>
          </div>
        );
      };
    
      errorMessage = () => {
        const { error } = this.state;
        return (
          <div className="error" style={{ display: error ? '' : 'none' }}>
            <h1>Please enter all the fields</h1>
          </div>
        );
      };

      errorPwd = () => {
        const { errorPwd } = this.state;
        return (
          <div style={{ display: errorPwd ? '' : 'none' }}>
            <span>{errorPwd}</span>
          </div>
        );
      };
        
    
  render() {
    const { firstname, lastname, email, password, submitted, fontColor, confirmPwdError, emailError } = this.state;
    return (
      <div className='App-header'>
        
        <div className="messages">
          {this.errorMessage()}
          {this.successMessage()}
        </div>
        {!submitted && (
          <>
          <h1>Sign Up</h1>
        <form className='form' onSubmit={this.handleSubmit}>
          <label htmlFor='fname'>First name:</label>
          <input type='text' id='fname' name='firstname'
          value={firstname}
          onChange={this.handleInputChange}
          />
          <label htmlFor='lname'>Last name:</label> 
          <input type='text' id='lname' name='lastname'
          value={lastname}
          onChange={this.handleInputChange}
          />

          <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={this.handleInputChange}
              required
            />
            {emailError && <span className="error">{emailError}</span>}

          <label htmlFor='password'>Password:</label>
          <input type='password' id='password' name='password'
          value={password}
          onChange={this.handlePassword}
          />
          <span className='small' style={{ color: fontColor }} >{this.errorPwd()}</span>

          <label htmlFor='confirmPwd'>Confirm password: </label>
          <input type='password' id='confirmPwd' name='confirmPassword'
          value={this.state.confirmPassword}
          onChange={this.handleConfirmPassword}
          />
          {confirmPwdError && <span className='error'> {confirmPwdError}</span>}


          <label className='terms'>
          <input type='checkbox' name='agreeToTerms'
          id='check' onChange={this.handleInputChange} required />{' '}
          I agree to the terms and conditions
          </label>

          <button type='submit'>Sign Up</button>

        </form>
        </>
       )} 
      </div>
      
    )
  }
}
export default App;
