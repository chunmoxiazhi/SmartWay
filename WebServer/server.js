require('dotenv').config({path:"./config/keys.env"});

const HTTP_PORT = process.env.PORT || 8080;

const express = require("express");
const bodyParser = require('body-parser');

const cors = require("cors");
const clientSessions = require('express-session')

const dataService = require("./modules/data-service.js");
const userService = require("./modules/user-service.js");

const data = dataService(process.env.MONGODB);
const users = userService(process.env.MONGODB);

const app = express();

function ensureManager(req, res, next) {
    if (!req.session.user || req.session.user.manager!=true) {
      res.redirect("/login");
    } else {
      next();
    }
  }
  function ensureAdmin(req, res, next) {
    if (!req.session.user) {
      res.redirect("/login");
    } else {
      next();
    }
  }

app.use(bodyParser.json());
app.use(cors());

app.use(clientSessions({
    cookieName: "session", // this is the object name that will be added to 'req'
    secret: process.env.SESSION_SECRET, // this should be a long un-guessable string.
    duration: 61 * 60 * 1000, // duration of the session in milliseconds (2 minutes)
    activeDuration: 61 * 1000 * 60 // the session will be extended by this many ms each request (1 minute)
}));


/////////////////////////////////////////USERS RELATED MANAGEMENT////////////////////////////////////
app.post("/login", (req,res)=>{
    users.validateUser(req.body)
    .then((returnedUser)=>{
        req.session.user = returnedUser;
        res.redirect("/jobs");
        res.json({message: msg});
        // res.render("private",{userInfo: req.session.user.toJSON() });
    }).catch((err)=>{
        res.json({message: `an error occurred: ${err}`});
        // res.render("login",{errorMessage:data});
    })
});
app.get("/manager", ensureManager, (req,res) => {

    users.getAllUsers()
    .then((data)=>{
        res.json(data);
    })
    .catch((err)=>{
        res.json({message: `an error occurred: ${err}`});
    })
});

app.get("/manager/registration", ensureManager, (req,res)=>{

});

app.post("/manager/registration", ensureManager, (req,res)=>{
    users.validateRegister(req.body)
     .then((userInfo) => users.addNewUser(userInfo))
     .then(()=>{
         res.redirect("/");
     }).catch((err)=>{
        // res.render("registration",{errorMessage:inputs});
        res.json({message: `an error occurred: ${err}`});

     })
});
app.put("/manager/:id", ensureManager, (req,res)=>{
    data.updateUserById(req.body,req.params.id).then((msg)=>{
        res.json({message: msg});
    }).catch((err)=>{
        res.json({message: `an error occurred: ${err}`});
    });
});

app.delete("manager/:id", ensureManager, (req,res)=>{
    data.deleteJobById(req.params.id).then((msg)=>{
        res.json({message: msg});
    }).catch((err)=>{
        res.json({message: `an error occurred: ${err}`});
    });
});

/////////////////////////////////////////JOBS RELATED MANAGEMENT////////////////////////////////////

app.post("/jobs", ensureAdmin, (req,res)=>{
    data.addNewJob(req.body).then((msg)=>{
        res.json({message: msg});
    }).catch((err)=>{
        res.json({message: `an error occurred: ${err}`});
    });
});

// IMPORTANT NOTE: ?tag=#funny wll not function, but ?tag=funny will
app.get("/jobs", ensureAdmin, (req,res) => {

    //page, perPage, service, customer, title, docket, purchase, pCount, cash, startDate, endDate
    data.getAllJobs(req.query.page, req.query.perPage, req.query.service, req.query.customer, req.query.title, req.query.docket, req.query.purchase, req.query.pCount, req.query.cash, req.query.startDate, req.query.endDate)
    .then((data)=>{
        res.json(data);
    })
    .catch((err)=>{
        res.json({message: `an error occurred: ${err}`});
    })
});

app.get("/customers", ensureAdmin, (req,res)=>{
    data.getCustomers().then((data)=>{
        res.json(data);
    })
    .catch((err)=>{
        res.json({message: `an error occurred: ${err}`});
    })
});

app.get("/services", ensureAdmin, (req,res)=>{
    data.getServices().then((data)=>{
        res.json(data);
    })
    .catch((err)=>{
        res.json({message: `an error occurred: ${err}`});
    })
});

app.get("/jobs/:id",ensureAdmin, (req,res)=>{
    data.getJobById(req.params.id).then(data=>{
        res.json(data);
    }).catch((err)=>{
        res.json({message: `an error occurred: ${err}`});
    });
});

app.put("/jobs/:id", ensureAdmin, (req,res)=>{
    data.updateJobById(req.body,req.params.id).then((msg)=>{
        res.json({message: msg});
    }).catch((err)=>{
        res.json({message: `an error occurred: ${err}`});
    });
});

app.delete("jobs/:id", ensureAdmin, (req,res)=>{
    data.deleteJobById(req.params.id).then((msg)=>{
        res.json({message: msg});
    }).catch((err)=>{
        res.json({message: `an error occurred: ${err}`});
    });
});

// Connect to the DB and start the server

data.connect().then(()=>{
    app.listen(HTTP_PORT, ()=>{console.log("API listening on: " + HTTP_PORT)});
}).catch((err)=>{
    console.log("unable to start the server: " + err);
    process.exit();
});
