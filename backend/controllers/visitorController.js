const userModel = require('../models/userModel.js')
const visitorModel = require('../models/visitorModel.js')
const PDFDOC = require('pdfkit')
const fs = require('fs')
const nodemailer = require("nodemailer");

exports.addVisitorRequest = async (req, res) => {
  const { firstname, lastname, email, mobile, date, time, reason, visitingEmployee } = req.body;
  if (!firstname || !lastname || !email || !mobile || !reason || !date || !time || !visitingEmployee) {
    return res.status(400).json({ error: "All fields are mandatory" })
  }
  if (!req.file) {
    return res.status(400).json({ error: "Photo is mandatory" })
  }
  let visitor = await visitorModel.create({ firstname: firstname, lastname: lastname, email: email, mobile: mobile, date: date, time: time, photo: req.file.path, approvedStatus: "Pending", reason: reason, visitingEmployee: visitingEmployee })
  res.status(200).send(visitor);
}

exports.getAllVisitors = async (req, res) => {
  const data = await visitorModel.find();

  if (!data) {
    return res.status(400).json({ "message": "No available data" })
  }

  res.status(200).send(data);
}

exports.deleteVisitor = async (req, res) => {
  try {
    const { id } = req.body;

    const deletedVisitor = await visitorModel.findByIdAndDelete(id);

    if (!deletedVisitor) {
      return res.status(404).json({ message: "No data found to delete" });
    }

    return res.status(200).json({
      message: "Visitor deleted successfully",
      id: deletedVisitor._id
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const QRCode = require("qrcode");

async function generateQR(passId) {
  return await QRCode.toDataURL(passId);
}
const sendMail = async ({ to, subject, text, attachments }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `"Visitor Management" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    attachments
  });
};
const generateVisitorPDF = (visitor) => {
  const doc = new PDFDOC({ size: "A4", margin: 50 });
  const filepath = `./pdfs/${visitor.passId}.pdf`
  doc.pipe(fs.createWriteStream(filepath));
  doc.fontSize(20).text("Visitor Pass", { align: "center" });
  doc.fontSize(12);
  doc.text(`Name: ${visitor.firstname} ${visitor.lastname}`);
  doc.text(`Email: ${visitor.email}`);
  doc.text(`Visiting Employee: ${visitor.visitingEmployee}`);
  doc.text(`Date: ${visitor.date}`);
  doc.text(`Time: ${visitor.time}`);
  doc.text(`Reason: ${visitor.reason}`);
  doc.moveDown();
  doc.moveDown();

  doc.font("Helvetica-Bold").text(`Pass ID: ${visitor.passId}`);
  doc.moveDown();
  const qr = visitor.qrCode.replace(/^data:image\/png;base64,/, "");
  doc.image(Buffer.from(qr, "base64"), { width: 150 });
  doc.end();
  return filepath
}

exports.qrGenerator = async (req, res) => {
  try {
    const { id } = req.params;
    const visitor = await visitorModel.findById(id);

    if (!visitor) {
      return res.status(404).json({ message: "Visitor not found" });
    }

    if (!visitor.passId || !visitor.qrCode) {
      visitor.passId = "PASS_" + visitor._id;
      visitor.qrCode = await generateQR(visitor.passId);
      await visitor.save();
    }

    if (!visitor.emailSent) {
      const pdfPath = generateVisitorPDF(visitor);

      await sendMail({
        to: visitor.email,
        subject: "Your Visitor Pass",
        text: `Hello ${visitor.firstname}, your visit request is approved. Please find your visitor pass attached.`,
        attachments: [
          {
            filename: "VisitorPass.pdf",
            path: pdfPath
          }
        ]
      });

      visitor.emailSent = true;
      await visitor.save();
    }

    res.json({
      message: "QR generated successfully",
      passId: visitor.passId,
      qrCode: visitor.qrCode
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "QR generation failed" });
  }
};

exports.updateStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  const user = await visitorModel.findById(id);

  if (!user) {
    return res.status(404).send("No user Found")
  }

  user.approvedStatus = status;
  await user.save();
  if(status === 'Rejected'){
    await sendMail({
      to: user.email,
      subject: "Visitor Request Update",
      text: `Hello ${user.firstname}, we regret to inform you that your visit request has been rejected.`
    });
  }
  res.status(200).send(user);
}

exports.verifyQr = async (req, res) => {
  try {
    const { passId } = req.body;
    const visitor = await visitorModel.findOne({ passId });
    if (!visitor) {
      return res.status(404).json({ message: "Invalid QR" });
    }
    if (visitor.approvedStatus !== "Approved") {
      return res.status(400).json({ message: "Visitor not approved" });
    }
    if (visitor.checkedIn) {
      return res.status(400).json({
        success: false,
        message: "Visitor already inside",
      });
    }
    res.json({
      visitor
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

exports.checkIn = async(req,res)=>{
  try {
    const { id } = req.body;
    const visitor = await visitorModel.findById( id );
    if (!visitor) {
      return res.status(404).json({ message: "Invalid QR" });
    }
    if (visitor.approvedStatus !== "Approved") {
      return res.status(400).json({ message: "Visitor not approved" });
    }
    if (visitor.checkedIn) {
      return res.status(400).json({
        success: false,
        message: "Visitor already inside",
      });
    }
    visitor.checkedIn = true;
    await visitor.save();
    res.json({
      message: "Check-in successful",
      visitor
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}




