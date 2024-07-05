const express = require("express");
const AirportService = require("../service/AirportService");

const router = express.Router();
const airportService = new AirportService();

router.get("/:iata_code", async (req, res) => {
    const iata_code = req.params.iata_code;
    const airport = await airportService.getAirportByIataCode(iata_code);
    if (!airport) {
        return res.status(404).json({ message: "Airport not found" });
    }
    res.json({
        airport: {
            id: airport.id,
            icao_code: airport.icao_code,
            iata_code: airport.iata_code,
            name: airport.name,
            type: airport.type,
            latitude_deg: airport.latitude_deg,
            longitude_deg: airport.longitude_deg,
            elevation_ft: airport.elevation_ft,
            address: {
                city: {
                    id: airport.city.id,
                    name: airport.city.name,
                    country_id: airport.city.country_id,
                    is_active: airport.city.is_active,
                    lat: airport.city.lat,
                    long: airport.city.long,
                },
                country: airport.city.country ? {
                    id: airport.city.country.id,
                    name: airport.city.country.name,
                    country_code_two: airport.city.country.country_code_two,
                    country_code_three: airport.city.country.country_code_three,
                    mobile_code: airport.city.country.mobile_code,
                    continent_id: airport.city.country.continent_id,
                } : null,
            },
        },
    });
});

router.get("/", async (req, res) => {
    const airports = await airportService.getAllAirports();
    res.json(airports);
});

router.post("/", async (req, res) => {
    const airportData = req.body;
    try {
        const newAirport = await airportService.createAirport(airportData);
        res.status(201).json(newAirport);
    } catch (error) {
        res.status(400).json({ message: "Error creating airport", error: error.message });
    }
});

router.delete("/:iata_code", async (req, res) => {
    const iata_code = req.params.iata_code;
    try {
        const result = await airportService.deleteAirportByIataCode(iata_code);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Airport not found" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: "Error deleting airport", error: error.message });
    }
});

module.exports = router;
