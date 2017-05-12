'use strict';

var AWS = require("aws-sdk");
var dynamo = new AWS.DynamoDB.DocumentClient();
var tableName = "toilets";
var toilet_id = "123456789";

module.exports.toilet = (event, context, callback) => {

  //Request
  var param = {
    "TableName": tableName,
    "Key": {
      "id": toilet_id
    }
  };

  // const response = {
  //   statusCode: 200,
  //   body: JSON.stringify({
  //     message: 'Go Serverless v1.0! Your function executed successfully!',
  //     input: event,
  //   }),
  // };
  //
  // callback(null, response);

  const response = {};

  dynamo.get(param, function(err, data) {
    if (data.Items){
      response.statusCode = 200;
      response.body = JSON.stringify({
        "place": "場所",
        "photo": "写真",
        "evaluation": "評価",
        "information": "情報"
      });
    } else {
      response.statusCode = 400;
      response.body = JSON.stringify({
          "message": "対象のトイレは存在しません。"
      });
    }
    callback(null, response);
});

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
