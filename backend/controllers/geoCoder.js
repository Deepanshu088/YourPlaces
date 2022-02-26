const NodeGeocoder = require("node-geocoder")

const options = {
    provider: 'mapquest',
    httpAdapter: 'https',
    apiKey: process.env.MAPQUEST_KEY, 
    formatter: null
};

const geoCoder = async (address) =>{
    const test = NodeGeocoder(options);
    const res = await test.geocode(address);
    return res;
}

module.exports = geoCoder;