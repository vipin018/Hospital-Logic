const express = require('express')
const app = express()
const port = 3000
app.use(express.json())
const users = [{
    name: "John",
    kidneys: [{
        healthy: false
    }]
}];


app.get("/", function (req, res) {
    const johnKidney = users[0].kidneys;
    const noOfKidney = johnKidney.length;
    let noOfHealthyKidney = 0;
    for (let i = 0; i < johnKidney.length; i++) {
        if (johnKidney[i].healthy) {
            noOfHealthyKidney = noOfHealthyKidney + 1;
        }
    }
    const noOfUnHealthyKidney = noOfKidney - noOfHealthyKidney;
    res.json({
        noOfKidney,
        noOfHealthyKidney,
        noOfUnHealthyKidney
    })
})

app.post("/", function (req, res) {
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({})
})
app.put("/", function (req, res) {

    for (let i = 0; i < users[0].kidneys.length; i++) {
        users[0].kidneys[i].healthy = true;
    }
    res.json({});
})

app.delete("/", function (req, res) {
    const newKidneys = [];
    for (let i = 0; i < users[0].kidneys.length; i++) {
        if (users[0].kidneys[i].healthy) {
            newKidneys.push({
                healthy: true,
            })
        }
    }
    users[0].kidneys = newKidneys;
    res.json({ msg: "Done!" })
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
