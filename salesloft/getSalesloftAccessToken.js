const { MongoClient, ServerApiVersion } = require('mongodb');
const { updateToken } = require('./updateToken');


const getSalesloftAccessToken = async () => {

  const uri = process.env.MONGODB_URI;

  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    let currentToken = await client.db("SalesloftTokens").collection("SalesloftTokens").findOne({ app: "salesloft" });

    //check if token is still valid
    if (!isvalid(currentToken)) {
      let newToken = await updateToken(currentToken);
      await client.db("SalesloftTokens").collection("SalesloftTokens")
        .updateOne({ app: "salesloft" }, {
          $set: {
            access_token: newToken.access_token,
            expires_in: newToken.expires_in,
            refresh_token: newToken.refresh_token,
            created_at: newToken.created_at
          }
        })
      currentToken = newToken;
    }

    return currentToken.access_token;

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }




}



module.exports = {
  getSalesloftAccessToken
}

const isvalid = (token) => {
  if (!token) {
    return false;
  }

  let now = Math.floor(Date.now() / 1000); // Date.now() returns milliseconds
  const tokenCreationTime = token.created_at;
  const tokenExpirationTime = tokenCreationTime + token.expires_in - 60; //adds one minute buffer

  // Check if the current time is less than the expiration time
  return now < tokenExpirationTime;

}