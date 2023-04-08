const express = require('express')
const { Configuration, OpenAIApi } = require('openai')
const runSample = require('./runsample')

const { google } = require('googleapis')
const auth = new google.auth.GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/forms'], // the API scope needed for creating forms
})
require('dotenv').config()

const app = express()
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

const messages = []
const user_input =
  'Tạo 5 câu hỏi trắc nghiệm có 4 đáp án từ văn bản sau: Code quality tool là một loại công cụ phần mềm được sử dụng để kiểm tra chất lượng mã nguồn trong quá trình phát triển phần mềm. Các công cụ này cung cấp các cách tiếp cận khác nhau để đánh giá chất lượng của mã nguồn, bao gồm cả việc phân tích mã nguồn, kiểm tra lỗi, đánh giá khả năng mở rộng, hiệu suất và độ bảo mật.'

messages.push({ role: 'user', content: user_input })
app.get('/', async (req, res) => {
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: messages,
    })
    const completion_text = completion.data.choices[0].message.content

    res.status(200).json(completion_text)
  } catch (error) {
    res.status(500).json(error)
  }
})

app.get('/form', async (req, res) => {
  runSample()
    .then((data) => {
      res.status(200).json({ message: 'success', data })
    })
    .catch((err) => res.status(500).json(err))
})

app.listen(2400, () => {
  console.log('Server started at port 2400')
})
