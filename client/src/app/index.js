import { parseRequestUrl } from './utils/parseRequestUrl';
import Home from './pages/home/Home';
import Header from './components/header/Header';
import Register from './pages/register/Register';
import Login from './pages/login/Login';

const routes = {
  '/': Home,
  '/login': Login,
  '/register': Register,
};

const router = async () => {
  const header = null || document.getElementById('header');
  const content = null || document.getElementById('root');

  const { resource, id } = parseRequestUrl();
  header.innerHTML = await Header.render();
  await Header.after_render();
  const parsedUrl = (resource ? '/' + resource : '/') + (id ? '/:id' : '');

  const page = routes[parsedUrl];
  content.innerHTML = await page.render();
  await page.after_render();
};

window.addEventListener('hashchange', router);

window.addEventListener('load', router);
