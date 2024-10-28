const axios = require('axios');

const createSalesloftPerson = async (email, token) => {

  let data = JSON.stringify({
    "email_address": email
  })

  let config = {
    method: 'post',
    url: 'https://api.salesloft.com/v2/people',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    },
    data: data
  };

  return await axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });


}

module.exports = {
  createSalesloftPerson
}