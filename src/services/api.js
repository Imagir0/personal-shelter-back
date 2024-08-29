const API_URL = process.env.REACT_APP_API_URL;

export const getWelcomeMessage = async () => {
  const response = await fetch(`${API_URL}/`);
  const data = await response.json();
  return data;
};