const db = require("../db/connect")

class Leader {
    constructor({ leader_id, name, age, party, country_name, capital, population}) {
        this.leader_id = leader_id
        this.name = name
        this.age = age
        this.party = party
        this.country_name = country_name
        this.capital = capital
        this.population = population
    }

    static async getAll() {
        const response = await db.query("SELECT name FROM leader;")
        if (response.rows.length === 0) {
            throw Error("No leaders available")
        }
        return response.rows.map(l => new Leader(l))
    }

    static async getFullInfo(name) {

        const response = await db.query(
            `SELECT leaders.name, leaders.party, country.name AS country_name, country.capital, country.population FROM leaders 
            LEFT JOIN country 
            ON leaders.country_id = country.country_id WHERE LOWER(country.name) = LOWER($1);`, [name])
        if(response.rows.length === 0) {
            throw Error("No information found")
        }
        return new Leader(response.rows[0])
    }
}

module.exports = Leader