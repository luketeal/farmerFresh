// const fetch = require("node-fetch");
require('dotenv').config();

module.exports = {
    getZips: async function ( zip ) {
        console.log(`here is the zipcode: ${zip}`)
        let requestURL = `https://redline-redline-zipcode.p.rapidapi.com/rest/radius.json/${zip}/10/mile`
        console.log(requestURL)
        try {
            var response = await fetch(requestURL, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": process.env.REDLINE_API_KEY,
                    "x-rapidapi-host": "redline-redline-zipcode.p.rapidapi.com"
                }
            })        
            var data = await response.json()
        } catch(err) {
            console.log(err)
        }
        let zipArray = [];
        for (let each of data.zip_codes) {
            zipArray.push(each.zip_code)
        }
        return zipArray
}}