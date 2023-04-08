const express = require('express')
const runSample = require('./runsample')
const getAns = require('./gpt')

const app = express()

const user_input = ``

const inputs = [
  `1.Quan niệm về chất lượng (phần mềm)
Chất lượng phần mềm liên quan đến độ tin cậy, khả năng bảo mật, tính khả dụng, hiệu suất và tính hợp tác của một phần mềm, một phần mềm được xem là có chất lượng khi nó đáp ứng được các yêu cầu về tính năng , hiệu suất và bảo mật một cách đáng chất lượng. Ngoài ra quan niệm về chất lượng phần mềm còn gắn liền với cung cấp trải nghiệm và giá trị sử dụng tốt cho người sử dụng.`,
  `2.Khái niệm về chất lượng
Tổ chức quốc tế và tiêu chuẩn hóa (ISO =  International Standard Organisation) xác định chất lượng như tổng thể các chi tiết nhỏ của một sản phẩm mà nó phải thỏa mãn những quy định đã được đề ra
Ngoài ra một số chuyên gia còn định nghĩa theo nguyên tắc cơ bản
Yêu cầu phù hợp: thỏa mãn các yêu cầu đòi hỏi
Tiện lợi cho sử dụng: chắc chắn rằng một sản phẩm có thể được sử dụng ngay từ khi có ý đính sản xuất nó.`,
  `3.Tầm quan trọng của quản lý chất lượng
Quản lý chất lượng dự án là một phần không thể thiếu trong quản lý dự án. Nó đảm bảo rằng các sản phẩm, dịch vụ và kết quả của dự án đáp ứng được các yêu cầu của khách hàng, đáp ứng các tiêu chuẩn và luôn đạt được chất lượng tối ưu.
Quản lý chất lượng đảm bảo sự thành công của dự án, tăng cường tính minh bạch và tin cậy, tăng cường tầm nhìn, đảm bảo tính hiệu quả và hiệu suất của dự án, đảm bảo sự trung thực và bảo mật của các thông tin và dữ liệu liên quan đến dự án.`,
]

app.get('/gpt', async (req, res) => {
  try {
    const proArr = [getAns(inputs[0])]
    const ans = await Promise.all(proArr)

    res.status(200).json(ans)
  } catch (error) {
    res.status(500).json(error)
  }
})

app.get('/form', async (req, res) => {
  // const proArr = [getAns(inputs[0])]

  const ans = await getAns(inputs[0])

  runSample(ans)
    .then((data) => {
      res.status(200).json({ message: 'success', data })
    })
    .catch((err) => res.status(500).json(err))
})

app.get('/', (req, res) => {
  res.status(200).json({ message: 'success' })
})

app.listen(2400, () => {
  console.log('Server started at port 2400')
})
