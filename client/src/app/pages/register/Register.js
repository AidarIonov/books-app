import FormValidator, { validateLength } from '../../utils/FormValidator';
import '../login/login.scss';

const Register = {
  render: async () => {
    return `
      <div class="auth__wrapper">
      <div class="container auth__container">
        <form id='register-form' class="form">
        <h2>Sign Up</h2>
        <div class="form-field">
          <input type="text" name='username' class='username-field' placeholder='Username'/>
          <span class="error-message"></span>
        </div>
        <div class="form-field">
          <input type="password" name='password' class='password-field' placeholder='password'/>
          <span class="error-message"></span>
        </div>
        <div class="form-field">
          <input type="text" name='firstName' class='firstName-field' placeholder='First name'/>
          <span class="error-message"></span>
        </div>
        <div class="form-field">
          <input type="number" name='age' class='age-field' placeholder='Your age'/>
          <span class="error-message"></span>
        </div>
        <button class="btn form-btn">Sign Up</button>
        <a href="/#/login">Already have account?</a>
      </form>
      </div> 
      </div>
      `;
  },
  after_render: async () => {
    const handleSubmit = async (data) => {
      // const res = await authService.login(data.username, data.password);
      console.log(data);
    };
    const loginForm = new FormValidator('#register-form', handleSubmit);
    loginForm.register('.username-field', validateLength);
    loginForm.register('.password-field', validateLength);
    loginForm.register('.firstName-field', validateLength);
    loginForm.register('.age-field', validateLength);
  },
};

export default Register;
