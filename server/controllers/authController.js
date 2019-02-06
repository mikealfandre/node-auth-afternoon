const bcrypt = require('bcryptjs')

module.exports = {
    login: async (req, res) => {
        const {username, password} = req.body
        let db = req.app.use('db')

       const user = await db.get_user(username)
       if (!user[0]){
           return res.status(401).send('User not found. Please register as a new user before logging in')
       }

       let isAuthenticated = bcrypt.compare(password, user.hash)

       if (!isAuthenticated){
           res.status(403).send('Incorrect Password')
       }

       delete user.hash

       req.session.user = { isAdmin: user.isadmin, id: user.id, username: user.username }; // Or just user[0]
       return res.send(req.session.user)
    },

    register: async (req, res) => {
        const {password, isAdmin} = req.body
        let db = req.app.use('db')
        const checkUser = await db.check_existing_user(username)
        
        if(checkUser[0]){
            return res.status(409).send('Username taken')
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        let user = await db.register_user([isAdmin, username, hash])

        delete checkUser.hash

        req.session.user[0] = { isAdmin: user.isadmin, id: user.id, username: user.username }
        req.send(req.session.user)
    },

    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    }
    
}