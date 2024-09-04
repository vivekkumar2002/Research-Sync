import axios from 'axios'


//register user
export function registerUserApi(form) {

    const config = {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    };
  
    return axios.post('http://localhost:4000/api/v1/signup', form, config);
  }
    
  

//login user
export function loginUserApi(form) {

  const config = {
    headers: {
      "Content-type": "application/json",
    },
    withCredentials: true,
  };

  return axios.post('http://localhost:4000/api/v1/login', form, config);
}
  
