
const express = require('express')
const app = express()
const port = 3987

app.use(express.static('views'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/test', (req, res) => {
    res.sendFile(__dirname + "/views/Test.html")
})

app.get('/Configure', (req, res) => {
    res.sendFile(__dirname + "/views/Configure.html")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

