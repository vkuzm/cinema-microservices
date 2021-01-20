export const getAuthToken = () => {
  const token = localStorage.getItem('token');
  return token ? token : '';
};

export const saveAuthToken = (token) => {
  localStorage.setItem('token', token);
};

export const removeAuthToken = () => {
  localStorage.removeItem('token');
};