const router = require('express').Router();
const verifyToken = require('./verifyToken');


router.get('/', verify, (req, res) => {
    res.json({
        posts : {
            title: 'my favourite song', 
            description: '2pac'
        }
    })
})




module.exports = router;