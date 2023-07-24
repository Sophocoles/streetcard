import axios from 'axios';

const FetchUserInfo = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/accounts/api/user_info/');
    return response.data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    return null;
  }
};

export default FetchUserInfo;
