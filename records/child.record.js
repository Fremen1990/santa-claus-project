const {ValidationError} = require("../utils/errors");
const {pool} = require("../utils/db");
const {v4: uuid} = require('uuid');

class ChildRecord {
    constructor(obj) {
        if (!obj.name || obj.name.length < 3 || obj.name.length > 25) {
            throw new ValidationError("Child name need to have between 3 and 25 characters")
        }
        this.id = obj.id;
        this.name = obj.name;
        this.giftId = obj.giftId;
    }

    async insert() {
        if (!this.id) {
            this.id = uuid();
        }
        await pool.execute("INSERT INTO `children`(`id`, `name`) VALUES(:id, :name)", {
            id: this.id,
            name: this.name,
        })
        return this.id;
    }


    static async listAll() {
        const [results] = await pool.execute('SELECT * FROM `children` ORDER BY `name` ASC');
        return results.map(obj => new ChildRecord(obj));
    }


    static async getOne(id) {
        const [results] = await pool.execute('SELECT * FROM `children` WHERE `id` = :id', {
            id,
        });
        return results.length === 0 ? null : new ChildRecord(results[0]);
    }


    async update() {

        // console.log("this giftID: ", this.giftID);

        await pool.execute("UPDATE `children` SET `name`=:name, `giftId`=:giftId WHERE `id`=:id", {
            id: this.id,
            name: this.name,
            giftId: this.giftId,
        })
        return this.id;
    }

}


module.exports = {ChildRecord}
