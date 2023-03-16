const path = require("path")
const express = require("express")
const cors = require('cors')
const app = express()
app.use(cors())

function parseParams(req) {
    const urlParams = req.url.split('?')[1]; // Get the part of the URL after the "?"
    const queryParams = new URLSearchParams(urlParams); // Create a new URLSearchParams object
    const paramsObj = Object.fromEntries(queryParams.entries()); // Convert the URLSearchParams object to a plain object
    return paramsObj
}

function handleRoute(func, req, res){
    const paramsObj = parseParams(req)
    console.log(paramsObj)
    let values = Object.values(paramsObj)
    if(paramsObj.initial) res.json({Hello: "Waiting for data Entry"})
    else if (values.length === 0 || values.some(value => value === '')) res.status(400).json({ error: "Please check query, missing values." })
    else if (allowedParams.some(param => param in paramsObj))func(paramsObj)
    else res.status(400).json({ error: "Please Send valid params." })
}

function Server(routes, allowedParams, func, HTTP_PORT=8002) {
    app.use(express.static("."))
    app.get("/", (req, res) => res.send("hi, this is a Server."))
    app.get("/impact", (req, res) => { 
        handleRoute(() => {
            
        }, req, res)
    })
    app.listen(HTTP_PORT, () => console.log(`[Server] HTTP listening at http://localhost:${HTTP_PORT}`))
}

module.exports = { Server }