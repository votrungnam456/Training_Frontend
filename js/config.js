var mysql = require('mysql');

var connect = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: "",
    database: "test"
})

function addUser(username, password, email, birthday){
     connect.connect(function(err){
          if (err) throw err;
          let sql = "insert into users values('"+username+"', '" + password +"','" + email + "','" + birthday +"')";
          connect.query(sql, (err, reulst) => {
              if (err) throw err;
              console.log(reulst)
          });
     })

}

export {addUser}