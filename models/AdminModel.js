
const  mongoose = require("mongoose");
const Schema = mongoose.Schema
const User = require("./userSchema")
const Pet = require('./petSchema')

async function tableResults(req, res) {

    try {
        const sumResults = await Pet.find()

        console.log("Getting pets for dashboard")
        console.log(sumResults.length, req.query.limit * (req.query.page)  )
            const result = await Pet.find()
            .sort({name: 1})
            .skip(req.query.page > 0 ? ( ( req.query.page - 1 ) * req.query.limit) : 0)
            .limit(req.query.limit)
            console.log(result.length)
            res.status(200).send(result);

    }
    catch (err) {
        res.send(err.messege)
    }

}

async function tableResultsUsers(req, res) {

    try {
        const sumResults = await User.find()
        console.log("Getting pets for dashboard")
        console.log(sumResults.length, req.query.limit * (req.query.page)  )
            const result = await User.find()
            .sort({name: 1})
            .skip(req.query.page > 0 ? ( ( req.query.page - 1 ) * req.query.limit) : 0)
            .limit(req.query.limit)
            console.log(result.length)
            res.status(200).send(result);

    }
    catch (err) {
        res.send(err.messege)
    }

}



module.exports = { tableResults, tableResultsUsers }
