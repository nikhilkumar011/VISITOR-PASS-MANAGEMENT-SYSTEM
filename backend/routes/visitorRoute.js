const express = require('express')
const { addVisitorRequest,getAllVisitors,deleteVisitor,qrGenerator,updateStatus,verifyQr ,checkIn} = require('../controllers/visitorController.js')
const multer = require('multer')

const visiterRoute = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage })

visiterRoute.post(
  '/registrationform',
  upload.single('photo'),
  addVisitorRequest
)

visiterRoute.get(
  '/registrationform',getAllVisitors
)

visiterRoute.get('/qrgenerate/:id',qrGenerator)

visiterRoute.delete('/registrationform',deleteVisitor)

visiterRoute.put('/updatestatus/:id',updateStatus)

visiterRoute.post('/verifyqr',verifyQr)

visiterRoute.post('/checkin',checkIn)

module.exports = visiterRoute
