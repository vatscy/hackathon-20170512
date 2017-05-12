/*
  トイレ一覧取得API
*/
'use strict';

var AWS = require("aws-sdk");
var dynamo = new AWS.DynamoDB.DocumentClient();
var tableName = "toilets";

//Response
var response = {
  statusCode: 200,
  headers: {
    "Access-Control-Allow-Origin": "*"
  },
  body: JSON.stringify({
    message: 'default message'
  }),
};


module.exports.listtoilet = (event, context, callback) => {

  const query = event.queryStringParameters;
  if (!query || query.q) {
    response.statusCode = 400;
    response.body = JSON.stringify({
      "message": "リクエストパラメータが不足しています。"
    });
  }

  //Request
  var param = {
    "TableName": tableName
  };

  dynamo.scan(param, function(err, data) {
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
    } else if (data.Items) {
      response.statusCode = 200;
      response.body = JSON.stringify({
        "data": data.Items
      });
      //success data_nothing
    } else {
      response.statusCode = 404;
      response.body = JSON.stringify({
        "message": "対象のトイレは存在しません。"
      });
    }
    callback(null, response);
  });
};
