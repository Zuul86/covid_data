const axios = require('axios')

module.exports = async function (context, req) {
    // context.log('JavaScript HTTP trigger function processed a request.');

    // const name = (req.query.name || (req.body && req.body.name));
    // const responseMessage = name
    //     ? "Hello, " + name + ". This HTTP triggered function executed successfully."
    //     : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";
    const response = await axios({
        url: `https://dhsgis.wi.gov/server/rest/services/DHS_COVID19/COVID19_WI/FeatureServer/10/query`,
        params: {
            query: `NAME='${req.query.county}'`,
            outFields: `GEO,NAME,POS_NEW,NEG_NEW,TEST_NEW,DATE`,
            f: 'json'
        }
    });

    context.log(response)
    //https://dhsgis.wi.gov/server/rest/services/DHS_COVID19/COVID19_WI/FeatureServer/10/query?where=1%3D1&outFields=GEO,NAME,POS_NEW,NEG_NEW,TEST_NEW,DATE&outSR=4326&f=json
    context.res = {
        // status: 200, /* Defaults to 200 */ 
        body: responseMessage
    };
}