const { getRepository } = require("typeorm");
const Airport = require("../entity/Airport");
const City = require("../entity/City");
const Country = require("../entity/Country");

class AirportService {
    async getAirportByIataCode(iata_code) {
        const airportRepository = getRepository(Airport);
        return await airportRepository.findOne({
            where: { iata_code },
            relations: ["city", "city.country"],
        });
    }

    async getAllAirports() {
        const airportRepository = getRepository(Airport);
        return await airportRepository.find({ relations: ["city", "city.country"] });
    }

    async createAirport(airportData) {
        const airportRepository = getRepository(Airport);
        const cityRepository = getRepository(City);
        const countryRepository = getRepository(Country);

        let country = await countryRepository.findOne({ where: { id: airportData.city.country.id } });
        if (!country) {
            country = countryRepository.create(airportData.city.country);
            await countryRepository.save(country);
        }

        let city = await cityRepository.findOne({ where: { id: airportData.city.id } });
        if (!city) {
            city = cityRepository.create({ ...airportData.city, country });
            await cityRepository.save(city);
        }

        const airport = airportRepository.create({ ...airportData, city });
        return await airportRepository.save(airport);
    }

    async deleteAirportByIataCode(iata_code) {
        const airportRepository = getRepository(Airport);
        return await airportRepository.delete({ iata_code });
    }
}

module.exports = AirportService;
