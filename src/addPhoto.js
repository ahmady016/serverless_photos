'use strict'

const nanoid = require('nanoid')
const AWS = require('aws-sdk')
const db = new AWS.DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:7000'
})

module.exports.handler = async (event, context, callback) => {
  const _data = JSON.parse(event.body)
  let response

  if(!_data) {
    console.error('data not provided')
    response = {
      statusCode: 400,
      body: JSON.stringify({ message: 'data not provided' })
    }
    callback(new Error('data not provided'), response)
  }

  const photo = {
    TableName: 'photos',
    Items: {
      id: nanoid(12),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      title: _data.title,
      url: _data.url
    }
  }

  db.put(photo, (error, data) => {
    if(error) {
      console.error(error)
      callback(new Error(error))
      return
    }
    response = {
      statusCode: 201,
      body: JSON.stringify(data.Items)
    }
    callback(null, response)
  })

}
