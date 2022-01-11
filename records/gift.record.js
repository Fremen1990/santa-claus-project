const {v4: uuid} = require('uuid');

const {ValidationError} = require("../utils/errors");

const {pool} = require("../utils/db");

class GiftRecord {
    constructor(obj) {
        if (!obj.name || obj.name.length < 3 || obj.name.length > 50) {
            throw new ValidationError("Gift name need to have between 3 and 50 characters")
        }
        if (!obj.count || obj.count < 1 || obj.count > 999999) {
            throw new ValidationError("Number of gifts should be between 1 and 999999")
        }
        this.id = obj.id;
        this.name = obj.name;
        this.count = obj.count;
    }

    async insert() {
        if (!this.id) {
            this.id = uuid();
        }
        await pool.execute("INSERT INTO `gifts` VALUES(:id, :name, :count)", {
            id: this.id,
            name: this.name,
            count: this.count,
        })
        return this.id;
    }


    static async listAll() {
        const [results] = await pool.execute('SELECT * FROM `gifts`');
        return results;
    }

}

module.exports = {GiftRecord}
