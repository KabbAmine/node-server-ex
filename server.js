const express = require('express')
const hbs = require('hbs')

const path = require('path')
const fs = require('fs')

hbs.registerPartials(path.resolve(__dirname, 'views/partials'))
hbs.registerHelper('currentYear', () => {
  return new Date().getFullYear()
})
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
})

let app = express()
app.set('view engine', 'html')
app.engine('html', require('hbs').__express)

// Middlewares
app.use(express.static(path.resolve(__dirname, 'public')))
app.use((request, response, next) => {
  const now = new Date().toString()
  const log = `${now}: ${request.method} ${request.originalUrl}`
  console.log(log)
  fs.appendFile(path.resolve(__dirname) + '/server.log', log + '\n', err => {
    if (err) {
      console.log(`Error [${err}] Unable to append datas to log file.`)
    }
  })
  next()
})
// app.use((request, response, next) => {
//   response.render('maintenance')
// })

app.get('/', (request, response) => {
  response.render('home', {
    pageTitle: 'Home page',
    welcomeMessage: 'Welcome to my website'
  })
})

app.get('/about', (request, response) => {
  response.render('about', {
    pageTitle: 'About page'
  })
})

// app.get('/bad', (request, response) => {
//   response.send({
//     errorMessage: 'Unable to handle request'
//   })
// })

app.listen(3000, () => {
  console.log('Server is up on port 3000...')
})
