// 服务器端代码（使用Node.js和Express框架）

// const express = require('express')
// const cors = require('cors')
// const mysql = require('mysql')

// const app = express()

// const connection = mysql.createConnection({
//   host: '121.199.48.82',
//   user: 'root',
//   password: 'cdqr2008',
//   database: 'dc_for_dataease'
// })

// app.use(cors({}))

// app.get('/users', (req, res) => {
//   connection.query('SELECT * FROM panel_data', (err, results) => {
//     if (err) {
//       console.error('Error executing query: ', err)
//       res.status(500).json({ error: 'Database error' })
//       return
//     }
//     res.json(results)
//   })
// })

// app.listen(3000, () => {
//   console.log('Server is running on port 3000')
// })
