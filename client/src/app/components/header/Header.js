import { authService } from '../../service/auth.service';
import { getUser } from '../../utils/getUser';
import { redirect } from '../../utils/redirect';
import './header.scss';
const Header = {
  render: async () => {
    return `
        <div class="container header__container">
        <a href="/" class="header__title">Books app</a>
            <div class="header__right">
              <span id='user'></span>
              <button class="btn logout-btn"></button>
            </div>
        </div>
      `;
  },
  after_render: async () => {
    const currentUser = getUser();
    const user = document.getElementById('user');
    const logoutBtn = document.querySelector('.logout-btn');
    if (currentUser) {
      user.textContent = currentUser.username;
      logoutBtn.style.display = 'inline-block'
      logoutBtn.textContent = 'Logout';
      logoutBtn.addEventListener('click', () => {
        authService.logout()
        redirect('/#/login');
      });
    } else {
      logoutBtn.style.display = 'none'
      //Todo remove comment 
      // window.location.replace('http://localhost:8081/#/login');
    }
  },
};
export default Header;
