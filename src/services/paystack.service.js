import axios from 'axios/index';
// import {API_KEY} from 'react-native-dotenv';

const PAYSTACK_SECRET_KEY = '';//} from '../utils/Constants';

class PaystackService {
  initialize = (data) => {
    let config = {
      method: 'post',
      url: 'https://api.paystack.co/transaction/initialize',
      headers: {
        'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
      },
      data: data
    };
    return axios(config);
  };
  verify = (ref) => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer sk_test_5328bb31fd570d8412a635ca6bcff3ff98e233f4');
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    return fetch('https://api.paystack.co/transaction/verify/' + ref, requestOptions)
      .then(response => response.json());
  };
}

export default new PaystackService();
