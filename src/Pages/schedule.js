const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require('@sendgrid/mail'); // For sending emails

admin.initializeApp();
const db = admin.firestore();

// Set your SendGrid API key
sgMail.setApiKey("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");

exports.createAppointment = functions.https.onRequest(async (req, res) => {
    const { date, time, clientName, clientEmail, details } = req.body;
  
    // Ensure all required fields are filled
    if (!date || !time || !clientName || !clientEmail) {
      return res.status(400).send("Missing required fields");
    }
  
    // Check for conflicts
    const snapshot = await db.collection("appointments")
      .where("date", "==", date)
      .where("time", "==", time)
      .get();
  
    if (!snapshot.empty) {
      return res.status(409).send("Time slot already booked");
    }
  
    // Store appointment in Firestore
    const newAppointment = {
      date, time, clientName, clientEmail, details,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };
  
    try {
      const docRef = await db.collection("appointments").add(newAppointment);
  
      // Send confirmation email
      await sendConfirmationEmail(clientName, clientEmail, { date, time, details });
  
      res.status(201).send({ id: docRef.id, ...newAppointment });
    } catch (error) {
      console.error("Error creating appointment:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  exports.getAppointments = functions.https.onRequest(async (req, res) => {
    try {
      const snapshot = await db.collection("appointments").get();
      const appointments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  
  exports.updateAppointment = functions.https.onRequest(async (req, res) => {
    const { id, ...updatedData } = req.body;
  
    if (!id) {
      return res.status(400).send("Appointment ID is required");
    }
  
    try {
      await db.collection("appointments").doc(id).update(updatedData);
      res.status(200).send("Appointment updated successfully!");
    } catch (error) {
      console.error("Error updating appointment:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  

  async function sendConfirmationEmail(clientName, clientEmail, appointmentDetails) {
    const msg = {
      to: clientEmail,
      from: 'your-email@domain.com', // Verified sender email
      subject: 'Appointment Confirmation',
      text: `Hello ${clientName},\n\nYour appointment has been scheduled.\nDate: ${appointmentDetails.date}\nTime: ${appointmentDetails.time}\nDetails: ${appointmentDetails.details}\n\nThank you!`,
    };
  
    try {
      await sgMail.send(msg);
      console.log('Confirmation email sent to:', clientEmail);
    } catch (error) {
      console.error('Error sending confirmation email:', error);
    }
  }
  