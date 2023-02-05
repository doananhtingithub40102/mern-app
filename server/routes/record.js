const express = require("express")
const recordRoutes = express.Router()
const dbo = require("../db/conn")
const ObjectId = require("mongodb").ObjectId

// This section will help you get a list of all the records.
recordRoutes.route("/record").get(async function (req, res) {
    const db_connect = dbo.getDb()
    try {
        const result = await db_connect.collection("records").find({}).toArray()
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(async function (req, res) {
    const db_connect = dbo.getDb()
    const myquery = { _id: new ObjectId(req.params.id) }
    try {
        const result = await db_connect.collection("records").findOne(myquery)
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

// This section will help you create a new record.
recordRoutes.route("/record/add").post(async function (req, res) {
    const db_connect = dbo.getDb()
    const myobj = {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level
    }
    try {
        const result = await db_connect.collection("records").insertOne(myobj)
        console.log("1 document created")
        res.status(201).json(result)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
})

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(async function (req, res) {
    const db_connect = dbo.getDb()
    const myquery = { _id: new ObjectId(req.params.id) }
    const newvalues = {
        $set: {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level
        }
    }
    try {
        const result = await db_connect.collection("records").updateOne(myquery, newvalues)
        console.log("1 document updated")
        res.status(200).json(result)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
})

// This section will help you delete a record
recordRoutes.route("/:id").delete(async function (req, res) {
    const db_connect = dbo.getDb()
    const myquery = { _id: new ObjectId(req.params.id) }
    try {
        const result = await db_connect.collection("records").deleteOne(myquery)
        console.log("1 document deleted")
        res.status(200).json(result)
    } catch {
        res.status(204).json({ message: "It is gone!" })
    }
})

module.exports = recordRoutes