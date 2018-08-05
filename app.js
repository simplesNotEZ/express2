const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 9000;
const data = require('./instructors.json');

const findById = (params, dataParam) => {
    for(let i = 0; i < dataParam.length; i++) {
        let holderString = dataParam[i].ID.toString();
        if (params === holderString) {
            console.log(dataParam[i]);
            return dataParam[i];
        } 
    }
    return null;
}

app.use(cors());
app.use(bodyParser.json());



app.get("/", (request, response, next) => {
    response.json({data});
})

app.get("/:id", (req, res, next) => {
    console.log(req.params);
    const instructor = findById(req.params.id, data);
    if (instructor) {
        res.json({"data": instructor});
    } else {
        res.json({
            error: {
                "message": "No record found!"
            }
        })
    }
})



app.listen(port, () => {
    console.log(`Yo, I'm listening in on your life at ${port}`);
})