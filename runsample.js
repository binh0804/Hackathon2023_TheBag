'use strict'

const path = require('path')
const google = require('@googleapis/forms')
const { authenticate } = require('@google-cloud/local-auth')

async function runSample(query) {
  const authClient = await authenticate({
    keyfilePath: path.join(__dirname, 'credentials.json'),
    scopes: 'https://www.googleapis.com/auth/drive',
  })
  const forms = google.forms({
    version: 'v1',
    auth: authClient,
  })
  const newForm = {
    info: {
      title: 'Creating a new form in Node 2',
    },
  }
  const res = await forms.forms.create({
    requestBody: newForm,
  })
  return res.data
}

module.exports = runSample
