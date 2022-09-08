import './header.scss'
import {logic} from './logic'
const Header = {
  render: async () => {
    return (
      `
        <div class="container header__container">
        <a href="/" class="header__title">Books app</a>
            <div class="header__right">
              <span id='user'></span>
              <span class="user-logout">Logout</span>
            </div>
        </div>
      `
    )
  },
  after_render: async () => {
    logic()
  }
};
export default Header
