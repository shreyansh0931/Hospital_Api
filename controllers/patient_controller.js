// Import necessary models
const Patient = require('../models/patient');
const Report = require('../models/report');
const Doctor = require('../models/doctor');

// Registering patients
module.exports.register = async (req, res) => {
  try {
    // Check if the patient is already registered
    let patient = await Patient.findOne({ phone: req.body.phone });

    // If the patient does not exist, create the patient
    if (!patient) {
      let newPatient = await Patient.create(req.body);
      return res.status(200).json({
        message: 'Patient registered successfully',
        patientId: newPatient._id,
        name: newPatient.name
      });
    } else {
      // Patient already exists
      return res.status(422).json({
        message: 'A patient already exists with this number'
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
}

// Creating a patient report
module.exports.createReport = async (req, res) => {
  try {
    // Check if the patient is available
    let patient = await Patient.findById(req.params.id);

    // If the patient is present, create a report
    if (patient) {
      let doctor = await Doctor.findById(req.body.doctor);

      // Create a report for the patient
      let reportData = {
        doctor: req.body.doctor,
        patient: req.params.id,
        status: req.body.status,
        date: req.body.date
      };

      let report = await Report.create(reportData);
      patient.reports.push(report);
      patient.save();

      return res.status(200).json({
        message: 'Patient report created successfully'
      });
    } else {
      return res.status(422).json({
        message: 'Patient registration unsuccessful'
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
}

// Generating all the reports of the user
module.exports.allReports = async (req, res) => {
  try {
    // Find the patient and populate their reports with doctor details
    let patient = await Patient.findById(req.params.id).populate({
      path: 'reports',
      populate: { path: 'doctor', select: 'name _id' },
    });

    if (patient) {
      return res.status(200).json({
        message: `${patient.name} reports`,
        reports: patient.reports
      });
    } else {
      return res.status(422).json({
        message: 'Patient not registered'
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
}
