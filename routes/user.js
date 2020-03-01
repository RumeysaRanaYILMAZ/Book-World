
import express from 'express';
import connection from '../database/db';
const router = express.Router()
import session from 'express-session';



router.get("/users", (req, res) => {

    const queryString = "SELECT * FROM user_info"
    connection.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("Failed to query for users: " + err)
            res.sendStatus(500)
            return
        }
        res.json(rows)
    })
})


router.get('/createUser',function(req,res){
    res.render('form');
});


router.get('/signup',function(req,res){
    res.render('signup');

});

router.get('/project',function(req,res){
    res.render('project');

});

router.get('/novelbooks',function(req,res){



    connection.execute('select * from books where books.book_category="Novel"')
        .then((results)=>{

            if (results.length > 0) {

                res.render('books',{book_list:results[0]});

            }
            else {
                response.send('No Book in DBS or lost connection');

            }

        }).catch((err)=>{

        console.log(err);
    });




});



router.get('/childbooks',function(req,res){



    connection.execute('select * from books where books.book_category="Child"')
        .then((results)=>{

            if (results.length > 0) {

                res.render('books',{book_list:results[0]});

            }
            else {
                response.send('No Book in DBS or lost connection');

            }

        }).catch((err)=>{

        console.log(err);
    });




});



router.get('/poetrybooks',function(req,res){



    connection.execute('select * from books where books.book_category="Poetry"')
        .then((results)=>{

            if (results.length > 0) {

                res.render('books',{book_list:results[0]});

            }
            else {
                response.send('No Book in DBS or lost connection');

            }

        }).catch((err)=>{

        console.log(err);
    });




});



        res.redirect('/navbar');


            if (results.length > 0) {


            }
            else {
                response.send('No Book in DBS or lost connection');

            }

        }).catch((err)=>{

        console.log(err);
    });


router.get('/categories',function(req,res){
    res.render('categories');

});
  router.get('/logout',function(req,res){
















router.get('/categories',function(req,res){
    res.render('categories');

});

 router.post('/createUser', (req, res)=> {

    const number = req.body.number;
    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;


    var sqlString =" INSERT INTO user_info (number, name, surname, email, password,role) VALUES ( ?,?,?,?,?,?)"
    connection.execute(sqlString, [number,name, surname,email,password,role])
        .then((results)=>{
            console.log("Inserted a new user with id: ")
            res.end();

        }).catch((err)=>{

        console.log("Failed to insert new user: " + err)
        return
    });





    res.end();

});


    const email = request.body.email;
    const password = request.body.password;
    request.session.isAuthenticated=false;

    if (email && password) {

        connection.execute('SELECT * FROM user_info WHERE email = ? AND password = ?',[email, password])
            .then((results)=>{
                console.log(results[0]);
                if (results.length > 0) {
                    request.session.isAuthenticated=true;
                    request.session.useremail=email;
                    response.redirect('/navbar');
                }
                else {
                    response.send('Incorrect Username and/or Password!');

                }

            }).catch((err)=>{

            console.log(err);
        });

    }
    else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});




module.exports = router