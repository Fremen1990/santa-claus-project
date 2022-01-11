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
        const [results] = await pool.execute('SELECT * FROM `gifts`');
        return results;
    }


    static async listAll() {
        const [results] = await pool.execute('SELECT * FROM `children` ORDER BY `name` ASC');
        return results;
    }

}


module.exports = {ChildRecord}
