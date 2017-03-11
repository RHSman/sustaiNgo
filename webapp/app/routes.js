var spawn = require('child_process').spawn;


module.exports = function (app) {

    // api ---------------------------------------------------------------------
    app.post('/api/search', function (req, res) {
        //searh our DB for the brand
        console.log(req.body)
        res.status(200).send('all right');

    });

    app.post('/api/register', function (req, res) {
        //iregister the new opinion in the DB
        console.log(req.body)
        res.status(200).send('all right');

    });




    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
