const { createConnection, getRepository } = require("typeorm");
const XLSX = require("xlsx");
const Airport = require("./entity/Airport");
const City = require("./entity/City");
const Country = require("./entity/Country");

async function loadData() {
    const connection = await createConnection();
    const airportRepository = getRepository(Airport);
    const cityRepository = getRepository(City);
    const countryRepository = getRepository(Country);

    // Correct file path
    const workbook = XLSX.readFile('C:/Users/91957/OneDrive/Desktop/airport-api/airport_api/Database.xlsx');
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);

    for (const item of data) {
        let country = await countryRepository.findOne({ where: { id: item.country_id } });
        if (!country) {
            country = countryRepository.create({
                id: item.country_id,
                name: item.country_name,
                country_code_two: item.country_code_two,
                country_code_three: item.country_code_three,
                mobile_code: item.mobile_code,
                continent_id: item.continent_id,
            });
            await countryRepository.save(country);
        }

        let city = await cityRepository.findOne({ where: { id: item.city_id } });
        if (!city) {
            city = cityRepository.create({
                id: item.city_id,
                name: item.city_name,
                country: country,
                is_active: item.is_active,
                lat: item.city_lat,
                long: item.city_long,
            });
            await cityRepository.save(city);
        }

        const airport = airportRepository.create({
            icao_code: item.icao_code,
            iata_code: item.iata_code,
            name: item.airport_name,
            type: item.airport_type,
            latitude_deg: item.latitude_deg,
            longitude_deg: item.longitude_deg,
            elevation_ft: item.elevation_ft,
            city: city,
        });
        await airportRepository.save(airport);
    }

    await connection.close();
}

loadData().catch(error => console.log(error));