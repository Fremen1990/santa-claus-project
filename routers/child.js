const {GiftRecord} =require("../records/gift.record");

const {ChildRecord} = require("../records/child.record");

const {Router} = require("express");


const childRouter = Router();

childRouter // /child
    .get('/', (req, res) => {

        const childrenList = ChildRecord.listAll();
        const giftsList = GiftRecord.listAll();

        res.render('children/list', {
            childrenList,!
            giftsList,
        })
    });

module.exports = {childRouter}
