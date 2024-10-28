# Salesloft Signals Implementation Demo

This repository contains the companion code for the Salesloft custom [Signals Implementation Guide](https://docs.google.com/document/d/1K-Kihval3LKtpujRszzrFml7gom3f--oMEurSCREMGA/edit?usp=sharing). If you intend to use this code as written please do the following:

- clone the repo to a local folder
- register for an [NGROK](https://dashboard.ngrok.com/signup?) account and a [MongoDb](https://account.mongodb.com/account/register) account if needed
- run `NPM install`
- generate a .env and populate values with your own Drift and Salesloft keys (see the .env-sample file for an example)
- run `NGROK http 3000` in a separate terminal
- add the NGROK tunnel URL to your Drift developer app webhook field
- run the app with `node app.js` from the parent directory
- send conversation close events from your instance of Drift 