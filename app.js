require('dotenv').config()
const express = require('express');
const { getSalesloftAccessToken } = require('./salesloft/getSalesloftAccessToken');
const { getContactAttributes } = require('./drift/getContactAttributes');
const { getConversation } = require('./drift/getConversation');
const { findSalesloftPerson } = require('./salesloft/findSalesloftPerson');
const { createSalesloftPerson } = require('./salesloft/createSalesloftPerson');
const { sendSalesloftSignal } = require('./salesloft/sendSalesloftSignal');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', async (req, res) => {
  res.status(202).send();

  try {
    let conversationId = req.body.data.conversationId;

    console.log(`Webhook received for conversationId ${conversationId}`, req.body)

    //retrieve additional data from Drift via the Drift developer API
    let conversation = await getConversation(conversationId);
    let contact = await getContactAttributes(conversation.data.contactId);
    let contactEmail = contact.data.attributes.email;

    //if no email, stop
    if (!contactEmail) {
      return
      // res.send('No email.')
    }

    //else, retrieve Salesloft Person Id
    let slAccessToken = await getSalesloftAccessToken();

    let lookUpSalesloftPerson = await findSalesloftPerson(contactEmail, slAccessToken);

    let salesloftPerson = lookUpSalesloftPerson.data[0];

    //if no Person, create one
    if (!salesloftPerson) {
      salesloftPerson = await createSalesloftPerson(contactEmail, slAccessToken);
    }

    //send the Salesloft Signal
    await sendSalesloftSignal(salesloftPerson, conversationId, slAccessToken);

  } catch (error) {
    console.log(error)
  }
});

const server = app.listen(3000, () => {
  console.log('Express listening at ', server.address().port);
})