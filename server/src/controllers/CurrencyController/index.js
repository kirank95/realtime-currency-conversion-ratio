const express = require('express');
const router = express.Router();
const axios = require('axios');

// Convert object of currency keys to array of urls
const createCurrencyURLs = (urlObj) => {
    let listOfURL = [];
    const apiKey = 'YJ0WIHE63PHJCDR5';
    for (let key in urlObj) {
        listOfURL.push(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=INR&to_currency=${urlObj[key]}&apikey=${apiKey}`);
    }
    return listOfURL;
}

// Get the list of present currency conversion ratios for the provided list of currencies (passed as a query).
router.get('/getConversionRatios', async (req, res) => {

    try {
        let urlObj = JSON.parse(req.query.currObj);
        const listOfURLs = createCurrencyURLs(urlObj);
        const currencyConversionRatios = [];

        const results = await Promise.allSettled(listOfURLs.map((url) => axios.get(url)));
        results.forEach((result) => {
            if (result.status === 'fulfilled') {
                const ratioObject = Object.values(result.value.data)[0];
                currencyConversionRatios.push({
                    currencyCode: ratioObject['3. To_Currency Code'] || '-',
                    value: ratioObject['5. Exchange Rate'] || '-'
                });
            } else {
                currencyConversionRatios.push({
                    currencyCode: '-',
                    value: '-',
                    lastRefreshed: '-',
                    timeZone: '-'
                });
            }
        })
        res.status(200).json(currencyConversionRatios);
    } catch (err) {
        res.status(500).json([]);
    }
});

module.exports = router;