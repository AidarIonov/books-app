import { authService } from '../../service/auth.service';
import FormValidator, { validateLength } from '../../utils/FormValidator';
import './login.scss';

const Login = {
  render: async () => `
    <div class="auth__wrapper">
      <div class="container auth__container">
      <form id='login-form' class="form">
        <h2>Sign In</h2>
        <div class="form-field">
          <input type="text" name='username' class='username-field' placeholder='Username'/>
          <span class="error-message"></span>
        </div>
        <div class="form-field">
          <input type="password" name='password' class='password-field' placeholder='password'/>
          <span class="error-message"></span>
        </div>
        <button class="btn form-btn">Sign In</button>
        <a href="/#/register">You don't have account?</a>
      </form>
     </div> 
    </div>
  `,
  after_render: async () => {
    const handleSubmit = async (data) => {
      const res = await authService.login(data.username, data.password);
      console.log(res);
    };
    const loginForm = new FormValidator('#login-form', handleSubmit);
    loginForm.register('.username-field', validateLength);
    loginForm.register('.password-field', validateLength);
  },
};

export default Login;
