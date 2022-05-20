export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const saveAuthToken = (token) => {
  localStorage.setItem('token', token);
};

export const removeAuthToken = () => {
  localStorage.removeItem('token');
};