/*
  評価登録API
*/
'use strict';

var AWS = require("aws-sdk");
var dynamo = new AWS.DynamoDB.DocumentClient();
var tableName = "evaluations";

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


module.exports.postevaluation = (event, context, callback) => {

    var body = JSON.parse(event.body);
    var item = {
      "id": body.id,
      "comprehensive": body.comprehensive,
      "location": body.location,
      "functionality": body.functionality,
      "design": body.design,
      "comfortably": body.comfortably,
      "others": body.others
    };
    console.log(item);


  //Request
  var param = {
    "TableName": tableName,
    "Item": item
  };

  dynamo.put(param, function(err, data) {
    //debug
    console.log(err);
    console.log(data);

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
        "message": "post success"
      });
    }
    callback(null, response);
  });
};
