const db = require("../../../db/connect")
const Country = require("../../../models/Country")

describe("Country Model", () => {
  beforeEach(() => jest.clearAllMocks())
  afterAll(() => jest.resetAllMocks())

  describe("getAll", () => {
    it("resolves with country data on successful db query", async () => {
      const mockCountries = [{ name: "Jamaica" }, { name: "Scotland" }, { name: "Hong Kong" }, { name: "Norway" }]
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: mockCountries })

      const countries = await Country.getAll()

      expect(countries).toHaveLength(4)
      expect(countries[0]).toHaveProperty("name", "Jamaica")
      expect(db.query).toHaveBeenCalledWith("SELECT name FROM country;")
    })

    it("should throw an error when no countries are found", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] })

      await expect(Country.getAll()).rejects.toThrow("No countries available")
    })
  })

  describe("getOneByCountryName", () => {
    it("resolves with country on a successful db query", async () => {
      const mockCountry = [
        {
          country_id: 1,
          name: "Jamaica",
          capital: "Kingston Town",
          population: 120000,
          languages: "English, Patois",
          fun_fact: "Jamaica is the only flag in the world without the colours red, green or white in it's flag",
          map_image_url: "jamaica.png",
        },
      ]

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: mockCountry })

      const country = await Country.getOneByCountryName("Jamaica")

      expect(country).toBeInstanceOf(Country)
      expect(country.country_id).toBe(1)
      expect(country.capital).toBe("Kingston Town")
      expect(db.query).toHaveBeenCalledWith("SELECT * FROM country WHERE LOWER(name) = LOWER($1);", ["Jamaica"])
    })

    it("should throw an error when no Country is found", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] })

      await expect(Country.getOneByCountryName(100)).rejects.toThrow("Unable to locate country")
    })
  })

  describe("create", () => {
    it("resolves with a Country on successful creation", async () => {
      const countryData = {
        name: "Scotland",
        capital: "Edinburgh",
        population: 4000000,
        languages: "Scottish Gaelic, English",
      }

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] })
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [{ ...countryData, id: 2 }] })

      const result = await Country.create(countryData)

      expect(result).toBeInstanceOf(Country)
      expect(result.name).toBe("Scotland")
      expect(result).toHaveProperty("capital", "Edinburgh")
      expect(db.query).toHaveBeenCalledWith("INSERT INTO country (name, capital, population, languages) VALUES ($1, $2, $3, $4) RETURNING *;", [
        countryData.name,
        countryData.capital,
        countryData.population,
        countryData.languages,
      ])
    })
  })

  describe("update", () => {
    it("updates a Country upon a successful query", async () => {
      const country = new Country({
        country_id: 1,
        name: "Jamaica",
        capital: "Kingston Town",
        population: 120000,
        languages: "English, Patois",
        fun_fact: "Jamaica is the only flag in the world without the colours red, green or white in it's flag",
        map_image_url: "jamaica.png",
      })
      const updatedData = { name: "St. Jamaica", capital: "Montego Bay", population: 120001 }
      const updatedCountry = {
        country_id: 1,
        languages: "English, Patois",
        fun_fact: "Jamaica is the only flag in the world without the colours red, green or white in it's flag",
        map_image_url: "jamaica.png",
        ...updatedData,
      }

      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [updatedCountry] })

      const result = await country.update(updatedData)

      expect(result).toBeInstanceOf(Country)
      expect(result.country_id).toBe(1)
      expect(result.name).toBe("St. Jamaica")
      expect(result.capital).toBe("Montego Bay")
      expect(db.query).toHaveBeenCalledWith("UPDATE country SET name = $1, capital = $2, population = $3 WHERE name = $4 RETURNING *;", [
        updatedData.name,
        updatedData.capital,
        updatedData.population,
        country.name,
      ])
    })

    it("should throw an error when capital and population is missing", async () => {
      const country = new Country({
        country_id: 1,
        name: "Jamaica",
        capital: "Kingston Town",
        population: 120000,
        languages: "English, Patois",
        fun_fact: "Jamaica is the only flag in the world without the colours red, green or white in it's flag",
        map_image_url: "jamaica.png",
      })
      const incompleteData = { name: "St. Jamaica" }

      await expect(country.update(incompleteData)).rejects.toThrow("Missing information")
    })
  })

  describe("destroy", () => {
    it("should return the deleted country on successful deletion", async () => {
      const country = new Country({
        country_id: 1,
        name: "Jamaica",
        capital: "Kingston Town",
        population: 120000,
        languages: "English, Patois",
        fun_fact: "Jamaica is the only flag in the world without the colours red, green or white in it's flag",
        map_image_url: "jamaica.png",
      })
      jest.spyOn(db, "query").mockResolvedValueOnce({
        rows: [
          {
            country_id: 1,
            name: "Jamaica",
            capital: "Kingston Town",
            population: 120000,
            languages: "English, Patois",
            fun_fact: "Jamaica is the only flag in the world without the colours red, green or white in it's flag",
            map_image_url: "jamaica.png",
          },
        ],
      })

      const result = await country.destroy()

      expect(result).toBeInstanceOf(Country)
      expect(result.country_id).toBe(1)
      expect(result.name).toBe("Jamaica")
      expect(db.query).toHaveBeenCalledWith("DELETE FROM country WHERE name = $1 RETURNING *;", [country.name])
    })
  })
})
