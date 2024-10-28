const axios = require('axios');

const findSalesloftPerson = async (email, token) => {

  const baseUrl = "https://api.salesloft.com/v2/";
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: baseUrl + "people?email_addresses=" + encodeURIComponent(email),
    headers: {
      'Authorization': 'Bearer ' + token
    }
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
  findSalesloftPerson
}