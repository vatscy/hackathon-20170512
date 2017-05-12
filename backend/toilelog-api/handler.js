'use strict';

var AWS = require("aws-sdk");
var dynamo = new AWS.DynamoDB.DocumentClient();
var tableName = "toilets";
var toilet_id = "123456789";

//Response
var response = {
  statusCode: 200,
  body: JSON.stringify({
    message: 'default message'
  }),
};


module.exports.toilet = (event, context, callback) => {

  //Request
  var param = {
    "TableName": tableName,
    "Key": {
      "id": toilet_id
    }
  };

  dynamo.get(param, function(err, data) {
    //debug
    // console.log(err);
    // console.log(data);

    //error
    if (err) {
      response.statusCode = 400;
      response.body = JSON.stringify({
        "message": err
      });
      //success
    } else if (data.Item) {
      response.statusCode = 200;
      response.body = JSON.stringify({
        "place": data.Item.place,
        "photo": data.Item.photo,
        "evaluation": data.Item.evaluation,
        "information": data.Item.information
      });
      //success data_nothing
    } else {
      response.statusCode = 200;
      response.body = JSON.stringify({
        "message": "対象のトイレは存在しません。"
      });
    }
    callback(null, response);
  });
};
