// const inputQuestions = [
//   {
//     id: '1',
//     content: 'Chất lượng phần mềm liên quan tới những gì?',
//     options: {
//       A: 'Tính đa dạng',
//       B: 'Khả năng sáng tạo',
//       C: 'Độ tin cậy, khả năng bảo mật, tính khả dụng, hiệu suất và tính hợp tác',
//       D: 'Chức năng phân tích dữ liệu',
//     },
//     answer: 'C',
//   },
//   {
//     id: '2',
//     content: 'Một phần mềm được xem là có chất lượng khi nào?',
//     options: {
//       A: 'Khi có nhiều tính năng',
//       B: 'Khi thực hiện được nhiều chức năng một lúc',
//       C: 'Khi đáp ứng được các yêu cầu về tính năng, hiệu suất và bảo mật một cách đáng chất lượng',
//       D: 'Khi có khả năng sáng tạo',
//     },
//     answer: 'C',
//   },
//   {
//     id: '3',
//     content: 'Chất lượng phần mềm còn gắn liền với điều gì?',
//     options: {
//       A: 'Khả năng đồng bộ hóa',
//       B: 'Khả năng kết nối',
//       C: 'Cung cấp trải nghiệm và giá trị sử dụng tốt cho người sử dụng',
//       D: 'Hỗ trợ nhiều ngôn ngữ',
//     },
//     answer: 'C',
//   },
// ]

const parseRequest = (inputQuestions) => {
  const outputQuestions = inputQuestions.map((question) => {
    return {
      createItem: {
        item: {
          title: question.content,
          questionItem: {
            question: {
              required: true,
              grading: {
                pointValue: 1,
                correctAnswers: {
                  answers: [{ value: question.options[question.answer] }],
                },
                whenWrong: {
                  text: question.description,
                },
              },
              choiceQuestion: {
                type: 'RADIO',
                options: [
                  { value: question.options.A },
                  { value: question.options.B },
                  { value: question.options.C },
                  { value: question.options.D },
                ],
                shuffle: true,
              },
            },
          },
        },
        location: {
          index: question.id - 1,
        },
      },
    }
  })

  return outputQuestions
}

module.exports = parseRequest
