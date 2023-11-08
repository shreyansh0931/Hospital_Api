const jwt = require('jsonwebtoken');
const Doctor = require('../models/doctor');

// Registration of a doctor
module.exports.createDoctor = async (req, res) => {
  try {
    // Check if password and confirm password match
    if (req.body.password !== req.body.confirm_password) {
      return res.status(200).json({
        message: 'Passwords do not match'
      });
    }

    // Find the doctor using the phone number before signing up
    let doctor = await Doctor.findOne({ phone: req.body.phone });

    // If the doctor doesn't exist, create the user
    if (!doctor) {
      await Doctor.create(req.body);
      return res.status(200).json({
        message: 'Doctor registered successfully'
      });
    } else {
      // If the user/phone number already exists, return an error
      return res.status(422).json({
        message: 'Doctor already exists'
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
}

// Logging in a doctor
module.exports.createSession = async (req, res) => {
  try {
    // Find the doctor if they exist using phone number
    let doctor = await Doctor.findOne({ phone: req.body.phone });

    // If the doctor doesn't exist or if the password doesn't match, return an error
    if (!doctor || doctor.password !== req.body.password) {
      return res.status(422).json({
        message: 'Invalid username or password'
      });
    }

    // If the doctor exists and the passwords match, log in and generate a JWT token
    return res.status(200).json({
      message: 'Sign in successful',
      doctorID: doctor._id,
      Name: doctor.name,
      data: {
        token: jwt.sign(doctor.toJSON(), process.env.SECRET_KEY, { expiresIn: '500000' })
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
}
