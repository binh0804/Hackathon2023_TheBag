'use strict'
const parseRequest = require('./parseRequest')
const path = require('path')
const google = require('@googleapis/forms')
const { authenticate } = require('@google-cloud/local-auth')

async function runSample(questions, title = 'Demo') {
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
      title,
    },
  }

  const request = parseRequest(questions)
  console.log(`parseRequest: ${{ request }}`)
  const NEW_QUESTION = {
    requests: request,
  }

  // const NEW_QUESTION = {
  //   requests: [
  //     {
  //       createItem: {
  //         item: {
  //           title:
  //             'In what year did the United States land a mission on the moon?',
  //           questionItem: {
  //             question: {
  //               required: true,
  //               grading: {
  //                 pointValue: 2,
  //                 correctAnswers: {
  //                   answers: [{ value: '1965' }],
  //                 },
  //               },
  //               choiceQuestion: {
  //                 type: 'RADIO',
  //                 options: [
  //                   { value: '1965' },
  //                   { value: '1967' },
  //                   { value: '1969' },
  //                   { value: '1971' },
  //                 ],
  //                 shuffle: true,
  //               },
  //             },
  //           },
  //         },
  //         location: {
  //           index: 0,
  //         },
  //       },
  //     },
  //   ],
  // }
  const updateSettings = {
    requests: [
      {
        updateSettings: {
          settings: {
            quizSettings: {
              isQuiz: true,
            },
          },
          updateMask: '*',
        },
      },
    ],
  }

  const res = await forms.forms.create({
    requestBody: newForm,
  })

  const up = await forms.forms.batchUpdate({
    formId: res.data.formId,
    requestBody: updateSettings,
  })
  const result = await forms.forms.batchUpdate({
    formId: res.data.formId,
    requestBody: NEW_QUESTION,
  })

  console.log(result.data)
  return res.data
}

module.exports = runSample
