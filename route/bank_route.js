
const {getbank,postbank,putbank,deletebank, login} = require('../controller/bank_controller')
// const auth = require('../middleware/auth')

const route = require('express').Router()

route.get('/',getbank)

route.post('/',postbank)

route.put('/:id',postbank)

route.delete('/:id',deletebank)

route.post('/login',login)

module.exports = route