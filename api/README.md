# Express Mongo JWT Boilerplate [![Build Status](https://travis-ci.org/kasvith/express-mongo-jwt-boilerplate.svg?branch=master)](https://travis-ci.org/kasvith/express-mongo-jwt-boilerplate)

## Installation

- Install NodeJS, MongoDB
- Install `npm` or `yarn`
- Rename `.env.example` to `.env`
- Fulfill `.env` data
- Start MongoDB
- Run `yarn run dev` or `npm run dev`
- Check `http://localhost:3000/api/status` to see it works

## Note when setting transporter in `.env`

- TRANSPORTER_SERVICE can be for example `gmail` but also SMTP of your server
- TRANSPORTER_EMAIL is email from which mails will be sent
- TRANSPORTER_PASSWORD is password to above email 
  - if gmail you need to generate special app-password, see for further support: https://support.google.com/mail/answer/185833?hl=en)

## Changelog

- Fixed deprecation warnings with mongoose usage.
- Updated dependencies to fix vulnerabilities.
- Added email confirmation after registration.
- Distinguish admin and user.

## TODO

- Integrate Swagger UI documentation
- Write unit tests