'use strict'

const AWS = require('aws-sdk')
const db = new AWS.DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:7000'
})

module.exports.handler = async (_, __, callback) => {
  let response

  db.scan({ TableName: 'photos' }, (error, data) => {
    if(error) {
      console.error(error)
      callback(new Error(error))
      return
    }
    response = {
      statusCode: 200,
      body: JSON.stringify(data.Items)
    }
    callback(null, response)
  })

}
