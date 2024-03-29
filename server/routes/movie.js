import express from "express";
//pour se connecter à la bdd
import db from "../db/connection.js";
//truc de conversion de string à ObjetId pour l' id
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
    let collection = await db.collection("movies");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

router.get("/sortByYear", async (req, res) => {
    let collection = await db.collection("movies");
    let mySort = { year :1};
    let results = await collection.find({}).sort(mySort).toArray();
    res.send(results).status(200);
})
router.get("/sortByYearDec", async (req, res) => {
    let collection = await db.collection("movies");
    let mySort = { year :-1};
    let results = await collection.find({}).sort(mySort).toArray();
    res.send(results).status(200);
})

router.get("/sortByTitle", async (req, res) => {
    let collection = await db.collection("movies");
    let mySort = {titre:1};
    let results = await collection.find({}).sort(mySort).toArray();
    res.send(results).status(200);
})

router.get("/:id", async (req, res) => {
    let collection = await db.collection("movies");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("not found").status(404);
    else res.send(result).status(200);
});

router.post("/", async (req, res) => {
    try {
        let newDocument = {
            titre: req.body.titre,
            resume: req.body.resume,
            real: req.body.real,
            year: req.body.year,
            stream: req.body.stream
        };
        let collection = await db.collection("movies");
        let result = await collection.insertOne(newDocument);
        res.send(result).status(204);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding movie");
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const updates = {
            $set: {
                titre: req.body.titre,
                resume: req.body.resume,
                real: req.body.real,
                year: req.body.year,
                stream: req.body.stream
            },
        };
        let collection = await db.collection("movies");
        let result = await collection.updateOne(query, updates);
        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating movie");
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };

        const collection = await db.collection("movies");
        let result = await collection.deleteOne(query);

        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting movie");
    }
});

export default router;