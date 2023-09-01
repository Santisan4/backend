const jwt = require('jsonwebtoken')

function isAuth (req, res, next) {
  const authorization = req.get('Authorization')
  let token = ''

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const { id, admin } = decodedToken

  req.user = { id, admin }
  next()
}

module.exports = isAuth
