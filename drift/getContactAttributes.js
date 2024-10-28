const axios = require('axios');

const getContactAttributes = async (contactId) => {
  const baseUrl = "https://driftapi.com/contacts/";
  const DRIFT_AUTH_TOKEN = process.env.DRIFT_AUTH_TOKEN;
  const headers = {
    Authorization: `Bearer ${DRIFT_AUTH_TOKEN}`,
    "Content-Type": "application/json",
  };

  return axios
    .get(baseUrl + contactId, {
      headers,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err.message);
      throw err
    });
}

module.exports = {
  getContactAttributes
}