import { showError, showSuccessMsg } from '../../shared/lib/alerts';
import { authService } from '../../service/auth.service';
import { errorCatch } from '../../utils/errorCatch';
import FormValidator, { validateLength } from '../../utils/FormValidator';
import { redirect } from '../../utils/redirect';
import './login.scss';

const Login = {
  render: async () => `
    <div class="auth__wrapper">
      <div class="container auth__container">
      <form id='login-form' class="form">
        <h2>Sign In</h2>
        <div class="form-field">
          <input type="text" name='username' class='username-field field-common' placeholder='Username'/>
          <span class="error-message"></span>
        </div>
        <div class="form-field">
          <input type="password" name='password' class='password-field field-common' placeholder='password'/>
          <span class="error-message"></span>
        </div>
        <button class="btn form-btn">Sign In</button>
        <a href="/#/register">You don't have account?</a>
      </form>
     </div> 
    </div>
  `,
  after_render: async () => {
    const redirectToHome = () => {
      redirect('/');
    };
    const handleSubmit = async (data) => {
      try {
        const res = await authService.login(data.username, data.password);
        if (res.data) {
          showSuccessMsg('Заебись', redirectToHome);
        }
      } catch (error) {
        showError(errorCatch(error));
      }
    };
    const loginForm = new FormValidator('#login-form', handleSubmit);
    loginForm.register('.username-field', validateLength);
    loginForm.register('.password-field', validateLength);
  },
};

export default Login;
