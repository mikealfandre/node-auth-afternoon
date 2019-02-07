
module.exports = {
    dragonTreasure: async (req, res) => {
        const db = req.app.get('db')

        const dragonTr = await db.get_dragon_treasure(1)
        return res.send(dragonTr)
    },
    getMyTreasure: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.session.user

        const myTreasure = await db.get_my_treasure(id)
        return res.send(myTreasure)
    },
    getAllTreasure: async (req, res) => {
        const db = req.app.get('db')
       
        const allTreasure = await db.get_all_treasure();
        return res.send(allTreasure);
    },
    addMyTreasure: async (req, res) => {
        const db = req.app.get('db')
        const { id } = req.session.user;
        const { treasureURL } = req.body;
       
        const myTreasure = await db.add_user_treasure([treasureURL, id]);
        return res.status(201).send(myTreasure);
    }
    
}