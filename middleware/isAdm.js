function isAdmin (req, res, next) {
  const { id, admin } = req.user
  console.log(id, admin)
  if (id && admin === 2) {
    next()
  } else {
    return res.status(401).json({ error: 'Invalid Admin token' })
  }
}

module.exports = isAdmin
