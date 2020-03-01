// Authors :Rumeysa Rana YILMAZ, Sila ERYILMAZ
// Server version: 10.4.10-MariaDB
// Node version v13.2.0
import * as express from "express";
const app = express();
import * as morgan from 'morgan';
import * as  mysql from 'mysql';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as connection from './database/db';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';


app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('./public'));
app.use(express.static(__dirname + '../public'));
app.use(morgan('short'));


app.set('view engine','pug');
app.set('views','./public');
app.use(cookieParser());
app.use(session({
  secret: 'secret cat',
  resave: false,
  saveUninitialized:false,
  cookie:{
    maxAge :360000 //1 hour
  }
}));



app.get('/',function(req,res){
  res.render('load2');
});

app.get("/users", (req, res) => {

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

app.get('/createUser',function(req,res){
  res.render('register');
});
app.get('/signup',function(req,res){
  res.render('signup');

});
app.get('/project',function(req,res){
  res.render('project');
});

app.get('/about',function(req,res){
  res.render('about');
});

app.get('/novelbooks',function(req,res){



  connection.execute('select * from books where books.book_category="Novel"')
  .then((results)=>{

      if (results.length > 0) {

          res.render('books',{book_list:results[0]});

      }
      else {
          res.send('No Book in DBS or lost connection');

      }

  }).catch((err)=>{

     console.log(err);
  });




});

app.get('/childbooks',function(req,res){



  connection.execute('select * from books where books.book_category="Child Book"')
  .then((results)=>{

      if (results.length > 0) {

          res.render('books',{book_list:results[0]});

      }
      else {
          res.send('No Book in DBS or lost connection');

      }

  }).catch((err)=>{

     console.log(err);
  });




});

app.get('/poetrybooks',function(req,res){



  connection.execute('select * from books where books.book_category="Poetry"')
  .then((results)=>{

      if (results.length > 0) {

          res.render('books',{book_list:results[0]});

      }
      else {
          res.send('No Book in DBS or lost connection');

      }

  }).catch((err)=>{

     console.log(err);
  });




});

app.get('/logout',function(req,res){



      req.session.destroy(function(err){

      });

      res.redirect('/navbar');


});

app.get('/navbar',function(req,res){



  if(req.session.isAuthenticated){
      res.render('navbar', {isAuthenticated:req.session.isAuthenticated});
  }
  else{
      res.render('navbar', {isAuthenticated:false});
  }


});

app.get('/categories',function(req,res){
  res.render('categories');

});
app.get('/mybooks',function(req,res){
    
  if(!req.session.isAuthenticated){
      req.session.destroy(function(err){});
      
      res.redirect('/navbar');
  }
  const email=req.session.useremail;
  let sqlString="SELECT books.book_id,books.book_title,books.book_category,books.book_price,books.img,books.author FROM books,user_info_has_books,user_info where user_info.email= ? and user_info.number=user_info_has_books.user_number and user_info_has_books.book_id=books.book_id";
 
  connection.execute(sqlString, [email])
 .then((results)=>{
     
     if (results.length > 0) {
          
         res.render('books',{book_list:results[0]});
        
     } 
     else {
         res.send('No Book in DBS or lost connection');

     }
     
 }).catch((err)=>{

    console.log(err);
 });
  
 
 
 
});




app.post('/favbook',(req,res)=>{

         
          
          
          if(req.session.isAuthenticated){

              const email=req.session.useremail;
              const idd=req.body.book;

              
             
             var sqlString ="INSERT INTO user_info_has_books (user_number,book_id) VALUES ( (select number from user_info where email=?),?)"
               connection.execute(sqlString, [email,idd])
              .then((results)=>{
                  console.log(results)
                  

              }).catch((err)=>{

                  console.log("Failed to insert new favourite book " + err)
                  return
              });

              
              res.redirect('/mybooks');



          }
          else{
              res.redirect('/signup');
          }
          
});

app.post('/createUser', (req, res)=> {

      const number = req.body.number;
      const name = req.body.name;
      const surname = req.body.surname;
      const email = req.body.email;
      const password = req.body.password;
      

      if(number&&name&&surname&&email&&password ){

          var sqlString =" INSERT INTO user_info (number, name, surname, email, password,role) VALUES ( ?,?,?,?,?,?)"
          connection.execute(sqlString, [number,name, surname,email,password,"role"])
              .then((results)=>{
                  console.log("Inserted a new user with id: ")
                  res.redirect('/signup');

              }).catch((err)=>{
                 
                  console.log("Failed to insert new user: " + err)
                 
                  return
              
              });
          }
      else{

          res.send("Please fill all areas");
      }    

      });

app.post('/signup', function(request, response) {
  
  const email = request.body.email;
  const password = request.body.password;
  request.session.isAuthenticated=false;

  if (email && password) {
      
      connection.execute('SELECT * FROM user_info WHERE email =? AND password =?',[email,password])
          .then((results)=>{
              
                  console.log(results[0][2]);               
                
                
                if (results[0].length > 0) {
                    
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



const port = 3009;
// localhost:3003
app.listen(port, () => {
  console.log(`Server is up and listening on '${port}'...`)
})



