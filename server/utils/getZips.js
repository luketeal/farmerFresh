

module.exports = {
    getZips: function ( zip ) {
        fetch(`https://redline-redline-zipcode.p.rapidapi.com/rest/radius.json/${zip}/10/mile`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "e972b7d645mshf34d0fe56773d97p1fc220jsn1e1d00244010",
                "x-rapidapi-host": "redline-redline-zipcode.p.rapidapi.com"
            }
        })
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.error(err);
        });
    }
}