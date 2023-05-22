
const jwt = require('jsonwebtoken')


async function auth(req, res, next) {
    try {
        const token = req.header('auth_token')
        if (!token) res.json({ errors: true, message: "token must be requried" })

        const validtoken = await jwt.verify(token, process.env.SEC)
        if (!validtoken) res.json({ errors: true, message: "token is invalid" })

        next()
    } catch (error) {
        return res.status(400).json({ errors: true, message: error.message })
    }
}