const axios = require('axios');

const getConversation = async (conversationId) => {
  const baseUrl = "https://driftapi.com/conversations/";
  const DRIFT_AUTH_TOKEN = process.env.DRIFT_AUTH_TOKEN;
  const headers = {
    Authorization: `Bearer ${DRIFT_AUTH_TOKEN}`,
    "Content-Type": "application/json",
  };

  return axios
    .get(baseUrl + conversationId, {
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
  getConversation
}