const mysql = require('mysql');
const connection = mysql.createConnection({
    host: '47.245.32.42',
    user: 'auth_user',
    password: 'QWER890@',
    database: 'bwg_11dom'
});
module.exports = {
    getText: function () {
        return '123';
    },
    addOAuth: function (req, res) {
        connection.connect();
        let user = {
            id: req.user.id,
            name: req.user.displayName
        }
        let cmd = `INSERT INTO oauth_bind VALUES (0, 0, 
                                                  '${req.user.id}', 
                                                  '${req.user.displayName}', 
                                                  2, 
                                                  '${req.user.pictureUrl}', 
                                                  '', 
                                                  '${new Date().toJSON().slice(0,10)}');`;

        connection.query(cmd, function(e, resp){
            if (e){
                console.log(e);
                return;
            }
            console.log(resp)

            JSON.stringify(user)
            var buffer = new Buffer(JSON.stringify(user));
            var s = buffer.toString('base64');
            // https://www.ark-museum.com/#/accountBinding?oid=U27a3d9d773fbc85463080044eff318e7&type=line
            // https://www.ark-museum.com/#/accountBinding?name=dannis&type=line
           
            res.redirect(`http://localhost:8080/#/accountBinding?token=${s}&type=line`);
        });

        /*
        connection.connect();
        connection.query('SELECT * FROM oauth_bind', function (error, results, fields) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('The solution is: ', results);
        });
        */
    }
};