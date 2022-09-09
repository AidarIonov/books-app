export const getUserOrRedirect = () => {
  return JSON.parse(localStorage.getItem('user'));
};
