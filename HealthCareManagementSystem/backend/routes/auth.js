const router = require("express").Router();
const passport = require("passport");
const PatientModel = require("./model/patient")
const AppointmentModel = require('./model/appointment');
const BillingModel = require('./model/billing');
const CLIENT_URL = "http://localhost:3000/";

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

//Patient Information Model
router.post('/patient', async (req, res, next) => {
  try {
    const patient = new PatientModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      dateOfBirth: req.body.dateOfBirth,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      address: req.body.address,
      medicalHistory: req.body.medicalHistory,
      medications: req.body.medications,
      allergies: req.body.allergies,
      surgeries: req.body.surgeries,
    });

    const patientFind = await PatientModel.findOne({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    if (patientFind) {
      return res.status(404).json({ message: 'Patient already exists' });
    } else {
      await patient.save();
      res.status(201).send({
        message: 'Patient successfully added',
      });
    }
  } catch (err) {
    next('Patient model error', err);
  }
});

router.get('/patient', async (req, res, next) => {
  const patients = await PatientModel.find({});
  res.send(patients);
});


// Appointment Scheduling Model 
router.post('/appointment', async (req, res, next) => {
  try {
    const appointment = new AppointmentModel({
      patient: req.body.patientId,
      doctor: req.body.doctorId,
      appointmentDate: req.body.appointmentDate,
      reason: req.body.reason,
    });
    await appointment.save();
    res.status(201).json({
      message: 'Appointment created successfully',
      appointment,
    });
  } catch (error) {
    next(error);
  }
});

// Get all appointments
router.get('/appointment', async (req, res, next) => {
  try {
    const appointments = await AppointmentModel.find({});
    res.json(appointments);
  } catch (error) {
    next(error);
  }
});

// Update an appointment
router.patch('/appointments/:id', async (req, res, next) => {
  try {
    const appointment = await AppointmentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.json(appointment);
  } catch (error) {
    next(error);
  }
});

// Delete an appointment
router.delete('/appointments/:id', async (req, res, next) => {
  try {
    const appointment = await AppointmentModel.findByIdAndDelete(
      req.params.id,
    );
    res.json(appointment);
  } catch (error) {
    next(error);
  }
});



// Billing and insurance Model
router.post('/billing', async (req, res, next) => {
  try {
    const billing = new BillingModel({
      patient: req.body.patient,
      doctor: req.body.doctor,
      appointment: req.body.appointment,
      billingDate: req.body.billingDate,
      amount: req.body.amount,
      insurance: req.body.insurance,
      policyNumber: req.body.policyNumber,
    });

    await billing.save();
    res.status(201).json({ message: 'Billing record created successfully' });
  } catch (error) {
    next(error);
  }
});

// GET route to retrieve all billing records
router.get('/billing', async (req, res, next) => {
  try {
    const billing = await BillingModel.find({});
    res.json(billing);
  } catch (error) {
    next(error);
  }
});

// GET route to retrieve a specific billing record by ID
router.get('/billing/:id', async (req, res, next) => {
  try {
    const billing = await BillingModel.findById(req.params.id);
    if (!billing) {
      return res.status(404).json({ message: 'Billing record not found' });
    }
    res.json(billing);
  } catch (error) {
    next(error);
  }
});

// PUT route to update a specific billing record by ID
router.put('/billing/:id', async (req, res, next) => {
  try {
    const billing = await BillingModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!billing) {
      return res.status(404).json({ message: 'Billing record not found' });
    }
    res.json(billing);
  } catch (error) {
    next(error);
  }
});

// DELETE route to delete a specific billing record by ID
router.delete('/billing/:id', async (req, res, next) => {
  try {
    const billing = await BillingModel.findByIdAndDelete(req.params.id);
    if (!billing) {
      return res.status(404).json({ message: 'Billing record not found' });
    }
    res.json({ message: 'Billing record deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router