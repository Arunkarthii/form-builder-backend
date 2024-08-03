const express = require('express')
const router = express.Router()
const mockData = require('../controller/controller')

router.post('/mockData', mockData.createmockData)
router.get('/mockData/:id?', mockData.getmockData)
router.put('/mockData/:id', mockData.updatemockData)
router.delete('/mockData/:id', mockData.deletemockData)
router.put('/form/update/:id', mockData.arrayUpdate)
router.delete('/form/delete/:id', mockData.arrayFieldDelete)
module.exports = router;