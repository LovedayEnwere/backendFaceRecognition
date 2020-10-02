const express=require('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const app=express();
const knex=require('knex');
const register=require('./controllers/register');
const signin=require('./controllers/signin');
const profile=require('./controllers/profile')
const image=require('./controllers/image');






const db=knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl:true,
    }
  });

 



app.use(cors());
app.use(bodyParser.json());
app.get('/',(req,res)=>{
    res.json(database.users);
})

app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)})


app.post('/register', (req,res)=>{register.handleRegister(req,res,db,bcrypt)})


app.get('/profile/:id',(req,res=>{profile.handleProfileGet(req,res,db)}))



app.put('/image',(req,res)=>{image.handleImage(req,res,db)})

app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res,db)})

/*bcrypt.hash("bacon",null,null,function(err,hash){
	//store hash in your password DB.
});

//Load hash from your password DB.
bcrypt.compare("bacon",hash,function(err,res){
	//res==true
});

bcrypt.compare("veggies",hash,function(err,res){
	//res=false
});
*/
app.listen(process.env.PORT||3000,()=>
{
    console.log(`listening to port ${process.env.PORT}`);
})