const axios = require('axios');

const url = "https://issues.citrite.net/rest/greenhopper/1.0/xboard/work/allData.json?rapidViewId=9136&etag=9136%2C1734693399974%2C%5B%5D%2C%5B%5D%2Cfalse%2C241&activeQuickFilters=61404&_=1734694914906";

const options = {
    method: "GET",
    headers: {
        "Authorization": "Bearer <your_personal_access_token>",
        "Content-Type": "application/json"
    }
};

axios.get(url, options)
    .then(response => {
        console.log("API Response:", response.data);
    })
    .catch(error => {
        console.error("Error making API call:", error);
    });
