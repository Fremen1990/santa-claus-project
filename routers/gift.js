const {GiftRecord} = require("../records/gift.record");

const {Router} = require("express");


const giftRouter = Router();

giftRouter // /child
    .get('/', async (req, res) => {

        const giftsList = await GiftRecord.listAll();

        res.render('gift/list', {
            giftsList
        })
    })
    .post('/', async (req, res) => {

        // console.log(req.body);
        const data = {
            ...req.body,
            count: Number(req.body.count),
        }
        // console.log(data)
        const newGift = new GiftRecord(data);
        await newGift.insert();

        res.redirect('/gift')

    });

module.exports = {giftRouter}
