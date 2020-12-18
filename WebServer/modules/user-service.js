const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const nodeEmailer = require('nodemailer');

mongoose.Promise = global.Promise;
const userSchema = require('./user-schema.js');
// let Schema = mongoose.Schema;

let transporter = nodeEmailer.createTransport({

    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_ACCOUNT, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
});

validateEmailPass = function(data){
    return new Promise((resolve,reject)=>{
        var flag=true;
        let emailReg = /[^@]+@[^\.]+\..+/;
        let passReg = /^[0-9a-zA-Z@#$][0-9a-zA-Z@#$][0-9a-zA-Z@#$]+$/;
        if (!data.email||data.email ==""){
            flag = false;
            data.email = null;
            data.message ="Incorrect Email";
        }
        else if (!data.password||data.password==""){
            flag = false;
            data.password = null;
            data.message ="Incorrect Password";
        }
        else if (!passReg.test(data.password)){
            flag = false;
            data.password = null;
            data.message ="Password should be alpha numeric or !@#$";
        }
        else if (!emailReg.test(data.email)){
            flag = false;
            data.email = null;
            data.message ="Incorrect email format";
        }
        if (flag){
            resolve(data);
        }
        else{
            reject(data);
        }

    });
}


module.exports = function(mongoDBConnectionString){

    let User; // defined on connection to the new db instance

    return {
        connect: function(){
            return new Promise(function(resolve,reject){
                let db = mongoose.createConnection(mongoDBConnectionString,{ useNewUrlParser: true, useUnifiedTopology: true });
                
                db.on('error', (err)=>{
                    reject(err);
                });
        
                db.once('open', ()=>{
                    User = db.model("user", userSchema, "users");
                    resolve();
                });
            });
        },

        getAllUsers: function(){
            return new Promise((resolve,reject)=>{
                        
                User.find().exec().then(users=>{
                    resolve(users)
                    }).catch(err=>{
                    reject(err);
                });

            });
        },

        //Validating process
        getEmail: function(inEmail){
            return new Promise((resolve, reject)=>{
 
                User.find({email: inEmail})
                .exec()
                .then((returnedUser)=>{
                    if(returnedUser.length > 0){
                        resolve(returnedUser[0]);
                    }
                    else{
                        returnedUser.message="No User Found"
                        reject(returnedUser);
                    }
                }).catch((err)=>{
                    console.log("getEmail function caught error");
                    reject(err);
                });
            });

        },

        validateUser: function(inputs){
            return new Promise((resolve, reject)=>{
                validateEmailPass(inputs)
                .then((inputs)=>{
                    this.getEmail(inputs.email)
                    .then((returnUser)=>{
                        bcrypt.compare(inputs.password, returnUser.password).then((result) => {
                            if (result){
                                //for added security is return a student object w/o password
                                resolve(returnUser);
                                //resolve and pass the user back
                            }
                            else{
                                returnUser.message = "password don't match";
                                reject(returnUser);
                                return;
                                //reject pass error
                            }
                            // result === true
                        });
        
                    }).catch((err)=>{
                        reject(err);
                        return;
                    });
                }).catch((err)=>{
                    reject(err);
                    return;
                });
            }).catch((err)=>{
                reject(err);
                return;
            });
        },

        validateRegistration: function(inputs){
            return new Promise((resolve, reject)=>{
                validateEmailPass(inputs).then((inputs)=>{
                    if(inputs.name != "" && inputs.password != ""&& inputs.confirmPassword != ""&& inputs.email != ""){
                        console.log("Validating Registration!");
                        if(inputs.password == inputs.confirmPassword){
                            console.log("Passedword validation");
                            const msg = {
                                to:`${inputs.email}` ,
                                from: process.env.EMAIL_ACCOUNT,
                                subject: 'Welcome to Smart Way',
                                text: 'Hello',
                                html: `Hello ${inputs.name}!
                                        Welcome to Smart Way! `,
                            };
                            console.log(msg);
                            transporter.sendMail(msg,function(error, info){
                                console.log("Sending email!");
                                if(error){
                                    console.log(error);
                                }
                                else{
                                    console.log("Successfully sent!");
                                }
                            });
                            resolve(inputs);
                        }
                        else{
                            inputs.message = "Password and confirmed password need to be identical!";
                            // inputs.first = null;
                            // inputs.last = null;
                            reject(inputs);
                        }
                    }
                    else{
                        inputs.message = "Incomplete user information!";
                        reject(inputs);
                    }
                }).catch((err)=>{
                    reject(err);
                })
            })

        },
       


        addNewUser: function(data){
            return new Promise((resolve,reject)=>{

                data.manager = (data.manager) ? true : false;

                let newUser = new User(data);

                bcrypt.genSalt(10)
                .then(salt=>bcrypt.hash(newUser.password, salt))
                .then(hash=>{
                    newUser.password = hash;
                    newUser.save((err)=>{
                        if(err){
                            console.log("Failed to add new user");
                            reject("Failed to add new user" + err);
                        }
                        else{
                            User = mongoose.model("smartway_sample", userSchema);
                            console.log("Succesfully add new user!");
                            resolve();
                        }
                    })
                }).catch((err)=>{
                    console.log("AddUser function caught some error");
                    reject(err);
                })
            });
        },



        // getJobById: function(id){
        //     return new Promise((resolve,reject)=>{
        //         Job.findOne({_id: id}).exec().then(job=>{
        //             resolve(job)
        //         }).catch(err=>{
        //             reject(err);
        //         });
        //     });
        // },

        updateUserById: function(data, id){
            return new Promise((resolve,reject)=>{
                validateRegistration(data).then((validUser)=>{
                    validUser.manager = (validUser.manager) ? true : false;
                    bcrypt.genSalt(10).then(salt=>bcrypt.hash(validUser.password, salt))
                    .then(hash=>{
                        validUser.password = hash;
                        Job.updateOne({_id: id}, {
                            $set: validUser
                        }).exec().then(()=>{
                            resolve(`User ${validUser.name} successfully updated`)
                        }).catch(err=>{
                            reject(err);
                        });
                    });

                        // validUser.save((err)=>{
                        //     if(err){
                        //         console.log("Failed to add new user");
                        //         reject("Failed to add new user" + err);
                        //     }
                        //     else{
                        //         Users = mongoose.model("web322_assignment", userSchema);
                        //         console.log("Succesfully add new user!");
                        //         resolve();
                        //     }
                        // })
    
                    })
                }
               
            )
            //     Job.updateOne({_id: id}, {
            //         $set: data
            //     }).exec().then(()=>{
            //         resolve(`Job ${id} successfully updated`)
            //     }).catch(err=>{
            //         reject(err);
            //     });
            // });
        },
        deleteUserById: function(id){
            return new Promise((resolve,reject)=>{
                Job.deleteOne({_id: id}).exec().then(()=>{
                    resolve(`User ${id} successfully deleted`)
                }).catch(err=>{
                    reject(err);
                });
            });
        },

        confirmationEmail: function(visitor){
            return new Promise((resolve, reject)=>{
                //console.log("Im in confirmationEmail ------->" + user.email);
                console.log(process.env);
                //let str ="", totalPrice = 0;
                // userCart.forEach(meal=>{
                //     str += `Meal Package: ${meal.name} <br>
                //     Meal Price: ${meal.price}<br> `
                //     totalPrice += meal.price;
                // });
                const msg = {
                    to:`${visitor.email}` ,
                    from: process.env.EMAIL_ACCOUNT,
                    subject: 'From Smart Way: Your request has been received!',
                   // text: 'Hello',
                    html: `Hello ${user.name}!  <br>
                            Thank you for your interest with Smart Way!  <br>
                            We will reply your question within an hour. <br><br>
                            Thanks and Regards,<br>
                            Terrence Tan
                            `
                };
        
                console.log(msg);
                transporter.sendMail(msg,function(error, info){
                    console.log("Sending email!");
                    if(error){
                        console.log(error);
                    }
                    else{
                        console.log("Successfully sent!");
                       
                    }
                    resolve();
                });
                
            }).catch((err)=>{
                console.log("Something wrong with confirmationEmail: " + err)
                reject(err);
            })
        }
    }
}