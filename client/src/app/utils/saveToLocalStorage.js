export const saveToLocalStorage = (data) => {
  localStorage.setItem('user', JSON.stringify(data));
};
