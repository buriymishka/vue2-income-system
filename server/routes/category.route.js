const { Router } = require('express')
const auth = require('../middleware/auth')
const { load, create, loadById, update, remove } = require('../controllers/category.controller')
const router = new Router()

router.post('/api/category/create', auth, create)

router.get('/api/category/load', auth, load)

router.get('/api/category/loadById/:id', auth, loadById)

router.put('/api/category/update', auth, update)

router.delete('/api/category/remove/:id', auth, remove)

module.exports = router
