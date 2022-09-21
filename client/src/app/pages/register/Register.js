import { showError, showSuccessMsg } from '../../shared/lib/alerts';
import { authService } from '../../service/auth.service';
import { errorCatch } from '../../utils/errorCatch';
import FormValidator, {
  validateLength,
  validateRepeatPassword,
} from '../../utils/FormValidator';
import { redirect } from '../../utils/redirect';

import '../login/login.scss';

const Register = {
  render: async () => {
    return `
      <div class="auth__wrapper">
      <div class="container auth__container">
        <form id='register-form' class="form">
        <h2>Sign Up</h2>
        <div class="form-field">
          <input type="text" name='username' class='username-field field-common' placeholder='Username'/>
          <span class="error-message"></span>
        </div>
        <div class="form-field">
          <input type="password" name='password' class='password-field field-common' placeholder='password'/>
          <span class="error-message"></span>
        </div>
        <div class="form-field">
          <input type="password" name='repeat-password' class='repeat-password-field field-common' placeholder='Repeat your password'/>
          <span class="error-message"></span>
        </div>
        <div class="form-field">
          <input type="text" name='firstName' class='firstName-field field-common' placeholder='First name'/>
          <span class="error-message"></span>
        </div>
        <div class="form-field">
          <input type="number" name='age' class='age-field field-common' placeholder='Your age'/>
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
    const redirectToLoginPage = () => {
      redirect('/#/login');
    };

    const handleSubmit = async ({ username, password, firstName, age }) => {
      try {
        const res = await authService.register(
          username,
          password,
          firstName,
          age
        );
        if (res.data) {
          showSuccessMsg('Success register', redirectToLoginPage);
        }
      } catch (error) {
        showError(errorCatch(error));
      }
    };
    const loginForm = new FormValidator('#register-form', handleSubmit);
    loginForm.register('.username-field', validateLength);
    loginForm.register('.password-field', validateLength);
    loginForm.register('.repeat-password-field', validateRepeatPassword);
    loginForm.register('.firstName-field', validateLength);
    loginForm.register('.age-field', validateLength);
  },
};

export default Register;
