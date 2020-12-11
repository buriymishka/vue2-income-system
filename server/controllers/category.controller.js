const bcrypt = require('bcrypt')
const { getAccessTokenPayload } = require('../utils/tokens')
const db = require('../db')

module.exports.create = async (req, res) => {
  let token = getAccessTokenPayload(req.headers.access_token)
  try {
    let newCategory = await db.query(`INSERT INTO "category" (title, user_id) values ($1, $2) RETURNING id, title`, [req.body.title, token.id])
    res.json(newCategory.rows[0])
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.update = async (req, res) => {
  let token = getAccessTokenPayload(req.headers.access_token)
  try {
    let newCategory = await db.query(`UPDATE "category" SET title = $1 WHERE id = $2 AND user_id = $3 RETURNING id, title`, [req.body.title, req.body.id, token.id])
    res.json(newCategory.rows[0])
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.load = async (req, res) => {
  let token = getAccessTokenPayload(req.headers.access_token)
  try {
    let categories = await db.query(`SELECT id, title FROM "category" WHERE user_id = $1`, [token.id])
    res.json(categories.rows)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.loadById = async (req, res) => {
  let token = getAccessTokenPayload(req.headers.access_token)
  try {
    let category = await db.query(`SELECT id, title FROM "category" WHERE id = $1 AND user_id = $2`, [req.params.id, token.id])
    res.json(category.rows[0])
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.remove = async (req, res) => {
  let token = getAccessTokenPayload(req.headers.access_token)
  try {
    await db.query(`DELETE FROM "category" WHERE id = $1 AND user_id = $2`, [req.params.id, token.id])
    res.json({ res: true })
  } catch (e) {
    res.status(500).json(e)
  }
}



