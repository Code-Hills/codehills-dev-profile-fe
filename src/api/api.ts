import axios from 'axios';

import Secure from '@/utils/secureLs';
import Keys from '@/utils/keys';

const API = axios.create({
  baseURL: `${Keys.DEFAULT_API}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Secure.getToken()}`,
  },
});

export default API;
