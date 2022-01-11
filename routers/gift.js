const {GiftRecord} = require("../records/gift.record");

const {Router} = require("express");


const giftRouter = Router();

giftRouter // /child
    .get('/', (req, res) => {

        const giftsList = GiftRecord.listAll();

        res.render('gift/list',{
            giftsList
        })
    });

module.exports = {giftRouter}
