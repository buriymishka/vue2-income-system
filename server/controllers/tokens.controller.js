const db = require('../db')
const { generateAccessToken } = require('../utils/tokens')

module.exports.refresh = async (req, res) => {
  try {
    let token = await db.query(`SELECT user_id, expires FROM "token" WHERE token = $1`, [req.cookies.refreshToken])   // Token.findOne({ refreshToken: req.cookies.refreshToken })
    token = token.rows[0]
    if (token) {
      let tokenDate = token.expires
      if (tokenDate > (Date.now() - 2000)) {

        let user = await db.query(`SELECT id FROM "user" WHERE id = $1`, [token.user_id])
        user = user.rows[0]
        if (user) {
          let AC = generateAccessToken({ id: user.id })

          res.json({ res: true, newAccessToken: AC })
          return
        }

        res.json({ res: false })
        return
      }

      res.json({ res: false })
      return
    } else {
      res.json({ res: false })
    }
  } catch (e) {
    res.status(500).json(e)
  }

}




