const express = require('express')
const massive = require('massive')
const bodyParser = require('body-parser')
const session = require('express-session')
require('dotenv'). config()
const authc = require('./controllers/authController')
const tc = require('./controllers/treasureController')
const authMW = require('./middleware/authMiddleware')

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

app.get('/api/treasure/dragon', tc.dragonTreasure)
app.get('/api/treasure/user', authMW.usersOnly, tc.getMyTreasure)
app.get('/api/treasure/all', authMW.usersOnly, authMW.adminsOnly, tc.getAllTreasure)
app.post('/api/treasure/user', authMW.usersOnly, tc.addMyTreasure)






const PORT = process.env.SERVER_PORT
app.listen(PORT, () => console.log(`we are listening on port ${PORT}`))