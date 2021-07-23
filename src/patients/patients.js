const { patientModel } = require('./patientsModel');
//  const {patientHistoryModelll} = require('../patientsHistoryModelll');

const { patientsHistoryModel } = require('../patientsHistory/patientsHistoryModel');




const getPatientDetails = async (req, res, next) => {
    await patientModel.find((err, data) => {
        if (err) {
            return res.status(500).json({ error: err })
        }
        return res.status(200).json(data);
    })


}
const patientDetails = function (req, res) {
    const patientDetails = new patientModel(req.body);
    patientDetails.save((error, response) => {
        if (error) {
            res.status(500).json({
                error: error
            })
        }
        patientModel.aggregate([
            {
                $match: {
                    "doctor_id": req.body.doctor_id
                }
            },
            {
                $lookup:
                {
                    from: "doctors",
                    localField: "doctor_id",
                    foreignField: "doctors_home_clinic",
                    as: "join"
                }
            },
            {
                $lookup:
                {
                    from: "clinics",
                    localField: "doctors_home_clinic",
                    foreignField: "clinic_id",
                    as: "join1"
                }
            },
            {
                $project: { "join.doctors_home_clinic": 1 }
            },
            {
                $project: { "join.clinic_id": 1 }
            }
        ], function (error, result) {
            if (error) {
                res.send(error)
            }
            console.log(result);
            //    result.forEach(element => {
            //      element.join.forEach(em=>{
            //          let doctors_home_clinic = em.doctors_home_clinic;
            //          const patientHistory = new patientsHistoryModel({doctor:doctors_home_clinic,payments:100,
            //             products:919191,clinic:100,prescription:'skin',appointments:23
            //         })
            //         patientHistory.save((error,data) => {
            //         if(error){
            //             console.log('error')
            //             res.status(500).json({
            //             error:error
            //                     })
            //                  }
            //             })
            //         })
            //    });
            //    res.status(200).json(result);
        })

    })
}
const updateDetails = async (req, res, next) => {
    const id = req.params.id;
    const updates = req.body;
    const options = { new: true };

    await patientModel.findByIdAndUpdate(id, updates, options, function (error, data) {
        if (error) {
            res.status(500).json({
                error: 'No matching id'
            })
        }
        res.status(200).json('Updated Succesfully');
    });

}
const deleteDetails = async (req, res, next) => {
    const id = req.params.id;
    const updates = req.body;
    await patientModel.findByIdAndDelete(id, updates, function (error, data) {
        if (error) {
            res.status(500).json({
                error: 'No matching id'
            })

        }
        res.status(200).json('Deleted Succesfully');
    });
}

const joinFunction = function (req, res) {
    patientModel.aggregate([
        {
            $match: {
                "doctor_id": 56789
            }
        },
        {
            $lookup:
            {
                from: "doctors",
                localField: "doctor_id",
                foreignField: "doctors_home_clinic",
                as: "join"
            }
        },
        {
            $project: { "join.doctors_home_clinic": 1 }
        }
    ], function (error, result) {
        if (error) {
            res.send(error)
        }
        result.forEach(element => {
            element.join.forEach(em => {
                let doctors_home_clinic = em.doctors_home_clinic;
                console.log(doctors_home_clinic);
                const patientHistory = new patientHistoryModelll({
                    doctor: 56789, payments: 100,
                    products: 919191, clinic: 100, prescription: 'skin', appointments: 23
                })
                patientHistory.save((error, response) => {
                    if (error) {
                        res.status(500).json({
                            error: error
                        })
                    }
                })
            })
        });
        res.status(200).json(result)
    })

}
const test = function () {
    console.log("test")
}
const patientDetail = function (req, res) {
    const patientDetails = new patientModel(req.body);
    patientDetails.save((error, response) => {
        if (error) {
            res.status(500).json({
                error: error
            })
        }
        patientModel.aggregate([
            {
                $match: {
                    "doctor_id": req.body.doctor_id
                }
            },
            {
                $lookup:
                {
                    from: "doctors",
                    localField: "doctor_id",
                    foreignField: "doctors_home_clinic",
                    as: "join"
                }
            },
            {
                $project: { "join.doctors_home_clinic": 1 }
            }
        ], function (error, result) {
            if (error) {
                res.send(error)
            }
            result.forEach(element => {
                element.join.forEach(em => {
                    let doctors_home_clinic = em.doctors_home_clinic;
                    const patientHistory = new patientHistoryModelll({
                        doctor: doctors_home_clinic, payments: 100,
                        products: 919191, clinic: 100, prescription: 'skin', appointments: 23
                    })
                    patientHistory.save((error, data) => {
                        if (error) {
                            console.log('error')
                            res.status(500).json({
                                error: error
                            })
                        }
                    })
                })
            });
            res.status(200).json(result);
        })
    })
}
exports.getPatientDetails = getPatientDetails;
exports.patientDetails = patientDetails;
exports.updateDetails = updateDetails;
exports.deleteDetails = deleteDetails;
exports.joinFunction = joinFunction;
exports.test = test;


