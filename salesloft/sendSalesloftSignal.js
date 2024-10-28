const axios = require('axios');
const { v4: uuidv4 } = require('uuid');


const sendSalesloftSignal = async (person, convoId, token) => {

  let idempotencyKey = uuidv4();
  let timeNow = new Date().toISOString();

  let data = JSON.stringify({
    "type": "drift_activity",
    "urgency": "medium",
    "occurred_at": timeNow,
    "indicators": [
      {
        "key": "convo_closed",
        "metadata": {
          "convo_url": "https://app.drift.com/conversations/" + convoId
        }
      }
    ],
    "idempotency_key": idempotencyKey,
    "data": {
      "activity_name": `Completed a Drift <a href="https://app.drift.com/conversations/${convoId}">convo</a>` //Live Feed: https://app.salesloft.com/app/live-feed
    },
    "attribution": {
      "person_id": person.id
    }
  });

  let config = {
    method: 'post',
    url: 'https://api.salesloft.com/v2/signals',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    },
    data: data
  };

  await axios.request(config)
    .then((response) => {
      console.log("Signal sent: ", JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log("Error sending signal: ", error);
    });


}


module.exports = {
  sendSalesloftSignal
}

