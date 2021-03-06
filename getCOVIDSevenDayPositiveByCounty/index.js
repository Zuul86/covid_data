const axios = require('axios')

module.exports = async function (context, req) {

    const response = await axios({
        baseURL: 'https://dhsgis.wi.gov/',
        url: `server/rest/services/DHS_COVID19/COVID19_WI/MapServer/12/query`,
        params: {
            where: `NAME='${req.query.county}'`,
            outFields: `GEO,NAME,POS_NEW,NEG_NEW,TEST_NEW,DATE`,
            orderByFields: `DATE DESC`,
            outSR: 4326,
            f: 'json'
        }
    });

    const data = response.data.features.slice(0, req.query.numberOfDays);

    const totals = data.reduce((agg, i) => {
        return {
            ...agg,
            totalTests: agg.totalTests + i.attributes.TEST_NEW,
            totalPositives: agg.totalPositives + i.attributes.POS_NEW
        }
    }, {totalTests: 0, totalPositives: 0});

    const percentPositive = (totals.totalPositives / totals.totalTests * 100).toFixed(2);
    
    const textMessage = `${req.query.county} has had a ${percentPositive}% positive rate over the last ${req.query.numberOfDays} days with a total of ${totals.totalTests} tests.`

    context.res = {
        status: 200,
        body: textMessage
    };
}