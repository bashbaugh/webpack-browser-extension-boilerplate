import admin from 'firebase-admin'

export default function getData(req, res) {
  return res.json({ hello: 'world' })
}
