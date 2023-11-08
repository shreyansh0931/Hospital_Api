const Report = require('../models/report'); 
// Generate reports based on status
module.exports.status = async (req, res) => {
  try {
    let reports = await Report.find({ status: req.params.status })
      .populate({
        path: 'patient',
        select: 'name city phone'
      })
      .populate({
        path: 'doctor',
        select: 'name _id'
      });

    if (reports && reports.length !== 0) {
      return res.status(200).json({
        message: `List of all the reports with ${req.params.status}`,
        reports: reports
      });
    } else {
      return res.status(422).json({
        message: `There are no patients with a status of ${req.params.status}`
      });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
}
