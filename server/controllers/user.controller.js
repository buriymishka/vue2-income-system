const bcrypt = require('bcrypt')
const { getAccessTokenPayload, generateRefreshToken, generateAccessToken } = require('../utils/tokens')
const { createPassword, generatePassword, sendMail } = require('../utils/functions')
const db = require('../db')

module.exports.signIn = async (req, res) => {

  try {
    let users = await db.query(`SELECT * FROM "users" WHERE email = $1`, [req.body.email])
    if (users.rows[0]) {
      let user = users.rows[0]
      let isPassCorrect = await bcrypt.compare(req.body.password, user.password)
      if (isPassCorrect) {

        const generatedRefreshToken = generateRefreshToken()
        await db.query(`INSERT INTO "token" (token, user_id, expires) values ($1, $2, $3)`, [generatedRefreshToken, user.id, Date.now() + (1000 * 60 * 60 * 24 * 30)])
        res.cookie('refreshToken', generatedRefreshToken, { maxAge: 2592000000, httpOnly: true });
        const generatedAccessToken = generateAccessToken({ id: user.id })

        res.json({
          name: user.name,
          email: user.email,
          locale: user.locale,
          accessToken: generatedAccessToken
        })
      } else {
        res.status(404).json({ message: 'WrongEmailOrPassword' })
      }
    } else {
      res.status(404).json({ message: 'WrongEmailOrPassword' })
    }
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.load = async (req, res) => {
  let token = getAccessTokenPayload(req.headers.access_token)

  try {
    let users = await db.query(`SELECT name, email, locale FROM "users" WHERE id = $1`, [token.id])
    if (users.rows[0]) {
      let user = users.rows[0]
      res.json(user)

    } else {
      res.status(404).json({ message: 'HowDidYouDoThat' })
    }
  } catch (e) {
    console.log(e)
    res.status(500).json(e)
  }
}

module.exports.signUp = async (req, res) => {

  try {
    let users = await db.query(`SELECT * FROM "users" WHERE email = $1`, [req.body.email])
    if (users.rows.length) {
      res.status(409).json({ message: 'EmailAlreadyExists' })
      return
    }

    let newUser = await db.query(`INSERT INTO "users" (name, email, password) values ($1, $2, $3) RETURNING id, name, email, locale`, [req.body.name, req.body.email, createPassword(req.body.password)])
    let user = newUser.rows[0]

    const generatedRefreshToken = generateRefreshToken()
    await db.query(`INSERT INTO "token" (token, user_id, expires) values ($1, $2, $3)`, [generatedRefreshToken, user.id, Date.now() + (1000 * 60 * 60 * 24 * 30)])
    res.cookie('refreshToken', generatedRefreshToken, { maxAge: 2592000000, httpOnly: true });
    const generatedAccessToken = generateAccessToken({ id: user.id })

    res.json({ name: user.name, email: user.email, locale: user.locale, accessToken: generatedAccessToken })
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.update = async (req, res) => {
  let token = getAccessTokenPayload(req.headers.access_token)
  try {
    let users = await db.query(`SELECT * FROM "users" WHERE email = $1 AND id <> $2`, [req.body.email, token.id])
    if (users.rows.length) {
      res.status(409).json({ message: 'EmailAlreadyExists' })
      return
    }
    if (req.body.newPassword) {
      let newUser = await db.query(`UPDATE "users" SET name = $1, email = $2, locale = $3, password = $4 WHERE id = $5 RETURNING name, email`,
        [req.body.name, req.body.email, req.body.locale, createPassword(req.body.newPassword), token.id]
      )
      res.json(newUser.rows[0])
    } else {
      let newUser = await db.query(`UPDATE "users" SET name = $1, email = $2, locale = $3 WHERE id = $4 RETURNING name, email, locale`,
        [req.body.name, req.body.email, req.body.locale, token.id]
      )
      res.json(newUser.rows[0])
    }
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.recover = async (req, res) => {

  try {
    let users = await db.query(`SELECT * FROM "users" WHERE email = $1`, [req.body.email])
    if (users.rows[0]) {
      const newPasswordPlain = generatePassword()
      const newPasswordHash = createPassword(newPasswordPlain)
      await sendMail(req.body.email, newPasswordPlain)
      let user = users.rows[0]
      await db.query(`UPDATE "users" SET password = $1 WHERE id = $2`, [newPasswordHash, user.id])
      res.json({})
    } else {
      res.status(404).json({ message: 'NoUserWithThisEmail' })
    }
  } catch (e) {
    res.status(500).json(e)
  }

}

module.exports.loadIncome = async (req, res) => {
  let token = getAccessTokenPayload(req.headers.access_token)
  try {
    let incomeCollection = await db.query(`SELECT category.title, SUM(record.amount) FROM "category" LEFT JOIN "record" ON record.category_id = category.id WHERE record.user_id = $1 AND record.income = TRUE GROUP BY category.id`,
      [token.id])
    let labels = []
    let values = []
    incomeCollection.rows.forEach(col => {
      labels.push(col.title)
      values.push(col.sum)
    })
    res.json({ labels, values })
  } catch (e) {
    res.status(500).json(e)
  }

}

module.exports.loadOutcome = async (req, res) => {
  let token = getAccessTokenPayload(req.headers.access_token)
  try {
    let incomeCollection = await db.query(`SELECT category.title, SUM(record.amount) FROM "category" LEFT JOIN "record" ON record.category_id = category.id WHERE record.user_id = $1 AND record.income = FALSE GROUP BY category.id`,
      [token.id])
    let labels = []
    let values = []
    incomeCollection.rows.forEach(col => {
      labels.push(col.title)
      values.push(col.sum)
    })
    res.json({ labels, values })
  } catch (e) {
    res.status(500).json(e)
  }

}

module.exports.logout = async (req, res) => {
  try {
    res.clearCookie('refreshToken')
    await db.query(`DELETE FROM "token" WHERE token = $1`, [req.cookies.refreshToken])
    res.json({ res: true })
  } catch (e) {
    res.status(500).json(e)
  }

}
