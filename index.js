const express = require('express')
const runSample = require('./runsample')
const path = require('path')
const handlebars = require('express-handlebars')
const getAns = require('./gpt')

const app = express()

// Use static folder
app.use(express.static(path.join(__dirname, 'public')))

// Handlebar
app.engine(
  '.hbs',
  handlebars.engine({
    extname: '.hbs',
  }),
)
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(
  express.urlencoded({
    extended: true,
  }),
)
app.use(express.json())

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

app.get('/test/gpt', async (req, res) => {
  try {
    const proArr = [getAns(inputs[0]), getAns(inputs[1]), getAns(inputs[2])]
    const ans = await Promise.all(proArr)

    let index = 1
    const list = []
    ans.forEach((items) => {
      items.forEach((item) => {
        item.id = index++
        list.push(item)
      })
    })
    // console.log(list)
    runSample(list)
    .then((data) => {
      res.status(200).json({ message: 'success', data })
    })
    .catch((err) => res.status(500).json({ message: 'failure', err }))
  } catch (error) {
    res.status(500).json(error)
  }
})

app.get('/test/form', async (req, res) => {
  // const proArr = [getAns(inputs[0])]

  const ans = await getAns(inputs[0])

  runSample(ans)
    .then((data) => {
      res.status(200).json({ message: 'success', data })
    })
    .catch((err) => res.status(500).json({ message: 'failure', err }))
})

app.get('/gpt/form', (req, res) => {
  const uri =
    'https://docs.google.com/forms/d/e/1FAIpQLSepPveu3HvyGa88btfmo3dVDMT9sQE3RSFz-gPSTUd1bEsy6Q/viewform'
  res.render('showForm', { uri })
})

app.post('/gpt/form', async (req, res) => {
  const { formTittle, userInput } = req.body

  console.log('Send Resquet: ', { userInput, formTittle })

  getAns(userInput)
    .then((data) => {
      runSample(data, formTittle).then((data) => {
        const uri = data.responderUri
        console.log(uri)
        res.render('home', { uri })
      })
    })
    .catch((err) => res.status(500).json(err))
})

app.get('/', (req, res) => {
  res.render('home')
})

app.listen(2400, () => {
  console.log('Server started at port 2400')
})
