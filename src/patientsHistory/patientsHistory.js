const { patientHistoryModel } = require('./patientsHistoryModel');
const { patientModel } = require('../patients/patientsModel');

const getPatientHistory = async (req, res) => {
    let id = req.params.id
    if (!id) {
        return res.status(500).json({ error: 'Missing patient id' })
    } else if (isNaN(id)) {
        return res.status(500).json({ error: 'Invalid patient id' })
    }
    id = parseInt(id)
    let promises = [
        getDoctorDetails(id),
        getClinicDetails(id),
        getProductDetails(id)
    ]
    Promise.all(promises).then((resData) => {
        let result = {};
        let error = ''
        resData.forEach(data => {
            if (!data || !data.length) {
                error = `No record found for the patient Id ${id}`
            } else {
                delete data[0]._id;
                let key = Object.keys(data[0])[0]
                let obj = data[0][key][0]
                result = { ...result, ...obj };
            }
        });
        if (error) {
            return res.status(500).json({ success: false, error: error })
        }

        return res.status(200).json({ success: true, data: result })
    });
}

function getDoctorDetails(patientId) {
    return patientModel.aggregate([
        {
            $match: {
                "patient_id": patientId
            }
        },
        {
            $lookup:
            {
                from: "doctors",
                localField: "doctor_id",
                foreignField: "id",
                as: "doctor"
            }
        },

        {
            $project: { "doctor.doctor_name": 1 }
        }
    ]);
}

function getClinicDetails(patientId) {
    return patientModel.aggregate([
        {
            $match: {
                "patient_id": patientId
            }
        },
        {
            $lookup:
            {
                from: "clinics",
                localField: "clinic_id",
                foreignField: "clinic_id",
                as: "clinic"
            }
        },

        {
            $project: { "clinic.clinic_id": 1 }
        }
    ])
}
function getProductDetails(patientId) {
    return patientModel.aggregate([
        {
            $match: {
                "patient_id": patientId
            }
        },
        {
            $lookup:
            {
                from: "products",
                localField: "products_id",
                foreignField: "product_id",
                as: "product"
            }
        },
        {
            $project: { "product.product_id": 1 }
        }
    ]);
}
exports.getPatientHistory = getPatientHistory;


