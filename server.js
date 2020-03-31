/* 
后台服务器应用模块: 使用express快速搭建后台路由
*/
const express = require('express')  // 下载: npm install express -S
const axios = require('axios')
const usersSearch = require('./usersSearch.json')
const app = express()

// 能解析urlencode格式的post请求体参数
app.use(express.urlencoded())
// 能解析json格式的请求体参数
app.use(express.json())

/*
注册一个路由接口
访问的url: http://localhost:4000/search/users
query请求参数: q=xxx
*/
app.get('/search/users', (req, res) => {
  const q = req.query.q
  setTimeout(() => {
    res.send(usersSearch)
  }, 1000)
  /* axios.get('https://api.github.com/search/users', {
    params: {q}
  })
    .then(response => {
      const result = response.data
      res.send(result)
    }).catch(error => {
      console.log(error.message)
    }) */
})


app.listen('4000', () => {
  console.log('server listen on http://localhost:4000')
})