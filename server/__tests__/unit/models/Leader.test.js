const Leader = require("../../../models/Leader")
const db = require("../../../db/connect")

describe('Leader Model', () => {
    beforeEach(() => jest.clearAllMocks())
    afterAll(() => jest.resetAllMocks())

    describe('getAll', () => {
        it('resolves with Leaders on successful db query', async () => {
            const mockLeaders = [
                { name: "Chairman Emile" },
                { name: "Tsar Clemson" },
                { name: "Queen Favaro" }
            ]

            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: mockLeaders})

            const leaders = await Leader.getAll()

            expect(leaders).toHaveLength(3)
            expect(leaders[0].name).toBe("Chairman Emile")
            expect(db.query).toHaveBeenCalledWith("SELECT name FROM leader;")
        })

        it('should throw an error when no leaders are found', async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: []})

            await expect(Leader.getAll()).rejects.toThrow("No leaders available")
        })
    })

    describe('getFullInfo', () => {
        it('resolves with information about leader and country on successful db query', async () => {
            const mockData = {
                name: "Chairman Emile",
                party: "Peoples Democratic Workers Party of Jamaica",
                country_name: "Jamaica",
                capital: "Emilegrad",
                population: 9999999999999999
            }

            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ ...mockData, leader_id: 1 }]})

            const result = await Leader.getFullInfo("Jamaica")

            expect(result).toBeInstanceOf(Leader)
            expect(result.name).toBe("Chairman Emile")
            expect(result.leader_id).toBe(1)
            expect(db.query).toHaveBeenCalledWith(`SELECT leaders.name, leaders.party, country.name AS country_name, country.capital, country.population FROM leaders 
            LEFT JOIN country 
            ON leaders.country_id = country.country_id WHERE LOWER(country.name) = LOWER($1);`, ["Jamaica"])
        })
    })
})