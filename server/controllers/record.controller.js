const bcrypt = require('bcrypt')
const { getAccessTokenPayload } = require('../utils/tokens')
const db = require('../db')

module.exports.create = async (req, res) => {
  let token = getAccessTokenPayload(req.headers.access_token)
  try {
    let newRecords = await db.query(`INSERT INTO "record" (title, income, category_id, amount, user_id) values ($1, $2, $3, $4, $5) RETURNING id, title, income, category_id, amount`,
      [req.body.title, req.body.income, req.body.categoryId, req.body.amount, token.id])
    let newRecord = newRecords.rows[0]
    newRecord.categoryId = newRecord.category_id
    delete newRecord.category_id
    res.json(newRecord)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.update = async (req, res) => {
  let token = getAccessTokenPayload(req.headers.access_token)
  try {
    let newRecordCollection = await db.query(`UPDATE "record" SET title = $1, income = $2, category_id = $3, amount = $4 WHERE id = $5 AND user_id = $6 RETURNING id, title, income, category_id, amount`,
      [req.body.title, req.body.income, req.body.categoryId, req.body.amount, req.body.id, token.id])
    let newRecord = newRecordCollection.rows[0]
    newRecord.categoryId = newRecord.category_id
    delete newRecord.category_id
    res.json(newRecord)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.load = async (req, res) => {
  let token = getAccessTokenPayload(req.headers.access_token)
  try {
    let recordsCollection = await db.query(`SELECT id, title, income, category_id, amount FROM "record" WHERE user_id = $1 ORDER BY id DESC`, [token.id])
    let records = recordsCollection.rows.map(rec => {
      rec.categoryId = rec.category_id
      delete rec.category_id
      return rec
    })
    res.json(records)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.loadById = async (req, res) => {
  let token = getAccessTokenPayload(req.headers.access_token)
  try {
    let recordCollection = await db.query(`SELECT id, title, income, category_id, amount FROM "record" WHERE id = $1 AND user_id = $2`, [req.params.id, token.id])
    let record = recordCollection.rows[0]
    record.categoryId = record.category_id
    delete record.category_id
    res.json(record)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.remove = async (req, res) => {
  let token = getAccessTokenPayload(req.headers.access_token)
  try {
    await db.query(`DELETE FROM "record" WHERE id = $1 AND user_id = $2`, [req.params.id, token.id])
    res.json({ res: true })
  } catch (e) {
    res.status(500).json(e)
  }
}



