const express = require("express");
const router = express.Router();

const admin = require('firebase-admin');

const serviceAcc = require("../keyfile.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAcc),
    databaseURL: "https://cloud-matheusagnus.firebaseio.com"
});

const ref = admin.firestore().collection('users');

module.exports = {
    // create a new user
    async store(req, res) {
        const user = req.body;

        if (!user.email || !user.name || !user.uid) {
            return res.json({
                "statusCode": "500",
                "statusResponse": "Error parsing the data",
                "message": "There is no data to parse"
            })
        } else {
            await ref.doc(user.uid).set({
                email: user.email,
                name: user.name
            }).then(() => {
                return res.json({
                    "statusCode": "200",
                    "statusResponse": "Ok",
                    "message": "User has been registered",
                })                  
            })
        }   
    },
    // list all users
    async index(req, res) {
        try {
            let allUsers = [];
        
            ref.get().then(function(snapshot) {
                snapshot.forEach(doc => {
                    allUsers.push({
                        "docID" : doc.id,
                        "userData": doc.data()
                    })
                })

                return res.json({
                    "statusCode": "200",
                    "statusReponse": "Ok",
                    "message": "All users",
                    "data" : allUsers
                })
            })
        } catch(err) {
            console.log('Error getting documents', err)
        }
    },
    // show an user
    async show(req, res) {
        try {
            let uid = req.params.uid

            ref.doc(uid).get().then(doc =>{
                if (doc.exists) {
                    //if the data exists in the database
                    return res.json({
                        "statusCode": "200",
                        "statusReponse": "Ok",
                        "message" : "User found",
                        "userData": doc.data()
                    });
                } else {
                    res.json({
                        "statusCode": "404",
                        "statusReponse": "Not found",
                        "message" : "User not found"
                    })
                }
            })
        } catch (err) {
            console.log('Error getting documents', err)
        }
    }, 
    // async edit(req, res) {
    //     try {
    //         const user = req.body;
    //         let uid = req.params.uid

    //         if (req.)

    //         ref.doc(uid).set({
    //             capital: true
    //         })
    //     } catch (err) {
            
    //     }
    // }
    async destroy(req, res) {
        let uid = req.params.uid

        ref.doc(uid).delete().then(() => {
            res.json({
                "statusCode": "200",
                "message": "User was deleted successfully"
            });
        })
    }
}
   

    