
const express = require('express');
const http = require('http');
const user = require('./user/user');
const doctors = require('./doctors/doctors');
const appointment = require('./appointment/appointment');
const patients = require('./patients/patients');
const patientsHistory = require('./patientsHistory/patientsHistory');
const discount = require('./discount/discount');
const products = require('./products/products');
const clinic = require('./clinic/clinic');

const middleware = require('./middleware');
const app = express();
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE,OPTIONS,PATCH')
    next();
});
app.post('/create', user.createUser);
app.get('/count', user.findCount);
app.post('/login', user.login);
app.get('/clinic', clinic.getClinicName);
app.post('/clinic', clinic.postClinicDetails);
app.put('/clinic/:id', clinic.updateDetails);
app.delete('/clinic/:id', clinic.deleteDetails);
app.get('/appointment', appointment.getAppointmentDetails);
app.post('/appointment', appointment.appointmentDetails);
app.put('/appointment/:id', appointment.updateAppointmentDetails);
app.delete('/appointment/:id', appointment.deleteDetails);
app.get('/doctors', doctors.getDoctorDetails);
app.post('/doctors', doctors.doctorDetails);
app.put('/doctors/:id', doctors.updateDetails);
app.delete('/doctors/:id', doctors.deleteDetails);
app.get('/patients', patients.getPatientDetails);
app.post('/patients', patients.patientDetails);
app.put('/patients/:id', patients.updateDetails);
app.delete('/patients/:id', patients.deleteDetails);
app.get('/patientsHistory/:id', patientsHistory.getPatientHistory);
app.get('/discount', discount.getDiscount);
app.post('/discount', discount.discountDetails);
app.put('/discount/:id', discount.updateDetails);
app.delete('/discount/:id', discount.deleteDetails);
app.get('/products/:id', products.getProducts);
app.post('/products', products.productDetails);
app.put('/products/:id', products.updateDetails);
app.delete('/products/:id', products.deleteDetails);
app.post('/join', patients.joinFunction)

app.get('/jwt-test', middleware.verify, (req, res) => {
    res.status(200).json(req.user);
})
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


