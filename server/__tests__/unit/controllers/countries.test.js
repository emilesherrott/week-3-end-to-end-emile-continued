const countriesController = require("../../../controllers/countries")
const Country = require("../../../models/Country")

const mockJson = jest.fn()
const mockEnd = jest.fn()

const mockStatus = jest.fn(() => ({
    json: mockJson,
    end: mockEnd
}))

const mockRes = { status: mockStatus }

describe('Countries Controller', () => {
    beforeEach(() => jest.clearAllMocks())
    afterAll(() => jest.resetAllMocks())

    describe("index", () => {
        it("should return cointries with a status code 200", async () => {
            const testLeaders = [ {name: "England" }, { name: "Scotland" }, { name: "Wales" }, { name: "Northern Ireland" } ]

            jest.spyOn(Country, 'getAll').mockResolvedValue(testLeaders)

            await countriesController.index(null, mockRes)

            expect(Country.getAll).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith(testLeaders)
        })

        it('should retrun an error upon failure', async () => {
            jest.spyOn(Country, 'getAll').mockRejectedValue(new Error("Something happened to your db"))

            await countriesController.index(null, mockRes)

            expect(Country.getAll).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(500)
            expect(mockJson).toHaveBeenCalledWith({ error: "Something happened to your db"})
        })
    })

    describe('show', () => {
        let testCountry, mockReq

        beforeEach(() => {
            testCountry = {
                country_id: 1,
                name: "Jamaica",
                capital: "Kingston Town",
                population: 120000,
                languages: "English, Patois",
                fun_fact: "Jamaica is the only flag in the world without the colours red, green or white in it's flag",
                map_image_url: "jamaica.png"
              }
              mockReq = { params: { name: "Jamaica" }}
        })

        it('should return a country with a 200 status code', async () => {
            jest.spyOn(Country, 'getOneByCountryName').mockResolvedValue(new Country(testCountry))

            await countriesController.show(mockReq, mockRes)

            expect(Country.getOneByCountryName).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith(testCountry)
        })

        it('should return an error if the Country is not found', async () => {
            jest.spyOn(Country,'getOneByCountryName').mockRejectedValue(new Error("Unable to locate country"))

            await countriesController.show(mockReq, mockRes)

            expect(Country.getOneByCountryName).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(404)
            expect(mockJson).toHaveBeenCalledWith({ error: "Unable to locate country"})
        })

    })
}) 