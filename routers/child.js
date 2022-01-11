const {ValidationError} = require("../utils/errors");

const {GiftRecord} = require("../records/gift.record");

const {ChildRecord} = require("../records/child.record");

const {Router} = require("express");


const childRouter = Router();

childRouter // /child
    .get('/', async (req, res) => {

        const childrenList = await ChildRecord.listAll();
        const giftsList = await GiftRecord.listAll();

        res.render('children/list', {
            childrenList,
            giftsList,
        })
    })

    .post('/', async (req, res) => {

        const newChild = new ChildRecord(req.body);
        await newChild.insert();

        res.redirect('/child')

    })


    .patch('/gift/:childId', async (req, res) => {

        const child = await ChildRecord.getOne(req.params.childId);
        // console.log(child)
        if (child === null) {
            throw new ValidationError("No child has been found with this ID")
        }

        const gift = req.body.giftId === '' ? null : await GiftRecord.getOne(req.body.giftId)

        if (gift) {

            if (gift.count <= await gift.countGivenGifts()) {
                // throw new ValidationError("This gift is not enough")
           // alert("not availalbe gift")
            }

            console.log(gift.count, await gift.countGivenGifts())
        }

        // child.giftId = gift === null ? null : gift.id;
        child.giftId = gift?.id ?? null; // newest JS syntax
        await child.update();


        res.redirect("/child")
    });

module.exports = {childRouter}
