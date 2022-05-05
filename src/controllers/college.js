const collegeModel = require("../models/collegeModel")



const CollegeController = async function (req, res) {

    try {
        let body = req.body

        if (Object.keys(body).length === 0) {
            return res.status(404).send({ Status: false, msg: "Sorry You have not enterd any data to create the account" })
        }
        // validation
        let StringCheck = /^[A-Za-z ,]{1,10000}$/
        let StringCheck1 = /^[A-Za-z]{1,10000}$/

        if (!body.name) {
            return res.status(404).send({ Status: false, msg: "Please Enter the name , example: iith" })
        }
        if (!body.fullName) {
            return res.status(404).send({ Status: false, msg: "Please enter the fullname of college" })
        }
        if (!body.logoLink) {
            return res.status(404).send({ Status: false, msg: "Sorry You have not enter the logoLink" })
        }
        if(!StringCheck1.test(body.name)){
            return res.status(403).send({ Status: false, msg: "name must be alphabetic, special character or space or number are not allowed" })
        }
        if(!StringCheck.test(body.fullName)){
            return res.status(403).send({ Status: false, msg: "fullName must be alphabetic, no special characet or number allowed" })
        }

        let checkName= await collegeModel.findOne({name:body.name})
        
        if(checkName){
            if(checkName.name === body.name){
                return res.status(403).send({Status: false, msg: "Please use another name, this has been used already"})
            }
        }

        let Data = await collegeModel.create(body)

        return res.status(201).send({ Status: true, msg: Data })
    }
    catch (err) {
        return res.status(404).send({ Status: false, msg: err.message })
    }
}


module.exports.CollegeController = CollegeController