require('dotenv').config()
const parseQuestions = require('./parseQuestions')
const { Configuration, OpenAIApi } = require('openai')

const getQuestion = (input) => {
  return `Tạo 1 câu hỏi trắc nghiệm có 04 đáp án kèm theo đáp án đúng kèm giải thích từ đoạn văn sau: "${input}" theo định dạng sau: "1. Nội dung câu hỏi?
  A) Đáp án 1
  B) Đáp án 2
  C) Đáp án 3
  D) Đáp án 4
  Đáp án: D
  Giải thích: Giải thích đáp án"`
}

const getAns = async (input) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
  const openai = new OpenAIApi(configuration)

  const messages = []
  const question = getQuestion(input)

  messages.push({ role: 'user', content: question })

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: messages,
  })
  const completion_text = completion.data.choices[0].message.content

  console.log(completion_text)
  const result = parseQuestions(completion_text)
  return result
}

module.exports = getAns
