// const express = require('express');
// const axios = require('axios');

// // API endpoint to get locations
// exports.getLocations = async (req, res) => {
//     console.log("getLOcations");

//     try {
//         const { state } = req.query;  // Get the state from the query parameters
//         const response = await axios.get(`https://api.bridge.com/v1/locations?state=${state}`, {
//             headers: {
//                 'Authorization': `Bearer 6bffa75321f5d82126cfe03c77dbf774`  // Ensure the token is properly formatted as a string
//             }
//         });
//         res.json(response.data);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error retrieving locations');
//     }
// };

// // API endpoint to get property data
// exports.getProperties = async (req, res) => {
//     console.log("getProperties");
//     try {
//         const { district, city } = req.query;  // Get district and city from the query parameters
//         const response = await axios.get(`https://api.bridge.com/v1/properties?district=${district}&city=${city}`, {
//             headers: {
//                 'Authorization': `Bearer 6bffa75321f5d82126cfe03c77dbf774`  // Ensure the token is properly formatted as a string
//             }
//         });
//         res.json(response.data);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error retrieving properties');
//     }
// };





// const express = require('express');
// const axios = require('axios');

// // Mock Data (Replace with real data or database queries)
// const states = ['Tamil Nadu', 'Karnataka', 'Kerala'];
// const districts = {
//     'Tamil Nadu': ['Coimbatore', 'Erode', 'Salem'],
//     'Karnataka': ['Bangalore', 'Mysore', 'Mangalore'],
//     'Kerala': ['Kochi', 'Trivandrum', 'Kozhikode'],
// };
// const cities = {
//     'Coimbatore': ['Sulur', 'Singanallur', 'Edapadi'],
//     'Erode': ['Perundurai', 'Gobichettipalayam', 'Bhavani'],
//     'Salem': ['Attur', 'Mettur', 'Omalur'],
//     'Bangalore': ['Whitefield', 'Koramangala', 'Jayanagar'],
//     'Mysore': ['Chamundi Hill', 'Hebbal', 'Vijayanagar'],
//     'Mangalore': ['Surathkal', 'Panambur', 'Kadri'],
//     'Kochi': ['Fort Kochi', 'Mattancherry', 'Edappally'],
//     'Trivandrum': ['Kovalam', 'Varkala', 'Attingal'],
//     'Kozhikode': ['Kappad', 'Feroke', 'Beypore'],
// };

// // API to get all states
// exports.getStates = (req, res) => {
//     console.log("state");

//     res.json(states);
// };

// // API to get districts based on state
// exports.getDistricts = (req, res) => {
//     console.log("districts");

//     const { state } = req.query;
//     const stateDistricts = districts[state] || [];
//     res.json(stateDistricts);
// };

// // API to get cities based on district
// exports.getCities = (req, res) => {
//     console.log('citys');

//     const { district } = req.query;
//     const districtCities = cities[district] || [];
//     res.json(districtCities);
// };c3774501d4cd28dd274007465622ac24




const axios = require('axios');

// Replace with your GeoNames username
const geonamesUsername = 'asglobal23';
exports.getStates = async (req, res) => {
    console.log("getStates");

    try {
        // GeoNames "children" endpoint to fetch the first-level administrative divisions (states) of a country
        const countryGeonameId = 1269750; // Replace with the GeoNames ID for the country (e.g., 1269750 for India)
        const response = await axios.get(`http://api.geonames.org/childrenJSON?geonameId=${countryGeonameId}&username=${geonamesUsername}`);
        // console.log("Response Data:", response.data);

        // Assuming the states are returned in the 'geonames' array
        const states = response.data.geonames;
        res.json(states || []);
    } catch (error) {
        console.error("Error fetching states:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error fetching states' });
    }
};

exports.getDistricts = async (req, res) => {

    const { stateGeonameId } = req.query; // The state ID passed as a query parameter
    console.log("getDistricts", stateGeonameId);
    try {
        // GeoNames "children" endpoint to fetch the second-level administrative divisions (districts) of a state
        const response = await axios.get(`http://api.geonames.org/childrenJSON?geonameId=${stateGeonameId}&username=${geonamesUsername}`);
        // console.log("Response Data:", response.data);

        // Assuming the districts are returned in the 'geonames' array
        const districts = response.data.geonames;
        res.json(districts || []);
    } catch (error) {
        console.error("Error fetching districts:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error fetching districts' });
    }
};

exports.getCities = async (req, res) => {
    const { districtGeonameId } = req.query; // The district ID passed as a query parameter
    console.log('getCities', districtGeonameId);
    try {
        // GeoNames "children" endpoint to fetch cities or towns in a district
        const response = await axios.get(`http://api.geonames.org/childrenJSON?geonameId=${districtGeonameId}&username=${geonamesUsername}`);
        // console.log("Response Data:", response.data);

        // Assuming the cities are returned in the 'geonames' array
        const cities = response.data.geonames;
        res.json(cities || []);
    } catch (error) {
        console.error("Error fetching cities:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error fetching cities' });
    }
};
