const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // Added to get around the deprecation warning: "Mongoose: promise (mongoose's default promise library) is deprecated"

// Load the schema
const jobSchema = require('./job-schema.js');

module.exports = function(mongoDBConnectionString){

    let Job; // defined on connection to the new db instance

    return {
        connect: function(){
            return new Promise(function(resolve,reject){
                let db = mongoose.createConnection(mongoDBConnectionString,{ useNewUrlParser: true, useUnifiedTopology: true });
                
                db.on('error', (err)=>{
                    reject(err);
                });
        
                db.once('open', ()=>{
                    Job = db.model("job", jobSchema, "jobs");
                    resolve();
                });
            });
        },
        addNewJob: function(data){
            return new Promise((resolve,reject)=>{

                let newJob = new Job(data);

                newJob.save((err) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(`new post: ${newJob.docketNumber} successfully added`);
                    }
                });
            });
        },

            //page, perPage, service, customer, title, docket, purchase, pCount, cash, startDate, endDate
        getAllJobs: function(page, perPage,  service, customer, title, docket, purchase, pCount, cash, startDate, endDate){
            return new Promise((resolve,reject)=>{
               
                if(+page && +perPage){


                    
                        let filter = {}; 
                        if(customer) filter.customerName = customer;
                        if(service) filter.services = {$in: [service]};
                        if(title) filter.bookTitle = { $regex: title, $options: 'i' };  
                        if(docket) filter.docketNumber = { $regex: docket};  
                        if(purchase) filter.PONumber = { $regex: purchase, $options: 'i' };  
                        if(pCount) filter.pageCount = pCount;
                        if(cash) filter.isCash = 'true';

                        if(startDate||endDate){

                            let sDate = startDate? new Date(startDate) : new Date("October 13, 2020 11:13:00");
                            let eDate = endDate? new Date(endDate) : new Date();
                            filter.postDate = {$gte: sDate, $lt:eDate};

                        }

                        page = (+page) - 1; 
                        
                        
                        Job.find(filter).sort({postDate: -1}).skip(page * +perPage).limit(+perPage).exec().then(jobs=>{
                            resolve(jobs)
                        }).catch(err=>{
                            reject(err);
                        });

                        
                        
                }else{
                    reject('page and perPage query parameters must be present');
                }
            });
        },
        getCustomers: function(){
            return new Promise((resolve,reject)=>{
                               
                Job.find({}, '-_id customerName').sort().exec().then(data => {

                    let customers = data.map(cust => cust.customerName).sort();

                    let result = [];

                    let i = 0;
                    while (i < customers.length) {
                        let start = i;
                        while (i < customers.length && (customers[i] == customers[start])) {
                            ++i;
                        }
                        let count = i - start;
                        result.push({ cust: customers[start], num: count });
                    }

                    resolve(result);
                }).catch(err => {
                    reject(err);
                });
             
            });
        },
        getServices: function(){
            return new Promise((resolve,reject)=>{
                               
                Job.find({}, '-_id services').exec().then(data => {
            
                    let result = [];

                    // join the arrays
                    data.forEach(serviceObj => {
                        result = result.concat(serviceObj.services)
                    });

                    // filter the results
                    let filteredResult = result.filter(function(item, pos){
                        return result.indexOf(item)== pos; 
                    });

                    resolve(filteredResult);
                }).catch(err => {
                    reject(err);
                });
             
            });
        },
        getJobById: function(id){
            return new Promise((resolve,reject)=>{
                Job.findOne({_id: id}).exec().then(job=>{
                    resolve(job)
                }).catch(err=>{
                    reject(err);
                });
            });
        },

        updateJobById: function(data, id){
            return new Promise((resolve,reject)=>{
                Job.updateOne({_id: id}, {
                    $set: data
                }).exec().then(()=>{
                    resolve(`Job ${id} successfully updated`)
                }).catch(err=>{
                    reject(err);
                });
            });
        },
        deleteJobById: function(id){
            return new Promise((resolve,reject)=>{
                Job.deleteOne({_id: id}).exec().then(()=>{
                    resolve(`Job ${id} successfully deleted`)
                }).catch(err=>{
                    reject(err);
                });
            });
        }
    }
}