const express = require('express')
const massive = require('massive')
const bodyParser = require('body-parser')
const session = require('express-session')
require('dotenv'). config()
const authc = require('./controllers/authController')

const app = express()

const {CONNECTION_STRING, SESSION_SECRET} = process.env


massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
})

app.use(bodyParser.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false
}))

app.post('/auth/login', authc.login)
app.post('/auth/register', authc.register)
app.get('/auth/logout', authc.logout)


const {PORT = 4000}
app.listen(PORT, () => console.log(`we are listening on port ${PORT}`))