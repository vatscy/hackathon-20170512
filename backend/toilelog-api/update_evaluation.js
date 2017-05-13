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


module.exports.updateevaluation = (event, context, callback) => {

  var body = JSON.parse(event.body);
  console.log("スタート");

  //データ設定
  var comprehensive = (body.location + body.functionality + body.design + body.comfortability + body.others) / 5;
  var item = {
    "id": body.id,
    "comprehensive": comprehensive,
    "location": body.location,
    "functionality": body.functionality,
    "design": body.design,
    "comfortability": body.comfortability,
    "others": body.others
  };
  console.log("アイテム ->" + item);

  //get Request
  var get_param = {
    "TableName": tableName,
    "Key": {
      "id": body.id
    },
  };

  //dynamo get
  dynamo.get(get_param, function(err, data) {
    console.log("エラー ->" + err);
    //error
    if (err) {
      response.statusCode = 400;
      response.body = JSON.stringify({
        "message": err
      });
      //success
    } else if (data.Item) {
      //update Request
      var update_param = {
        "TableName": tableName,
        "Key": {
          "id": body.id
        },
        UpdateExpression: "set evaluation = :new_evaluation, evaluation_count= evaluation_count + :val",
        ExpressionAttributeValues: {
          ":new_evaluation": (data.Item.evaluation + comprehensive) / (data.Item.evaluation_count + 1),
          ":val": 1
        }
      };
      //dynamo update
      dynamo.update(update_param, function(err2, data2) {
        console.log("エラー2 ->" + err2);
        //error
        if (err) {
          response.statusCode = 400;
          response.body = JSON.stringify({
            "message": err2
          });
          //success
        } else {
          response.statusCode = 200;
          response.body = JSON.stringify({
            "message": "update success"
          });
        }
      });

    } else {
      response.statusCode = 404;
      response.body = JSON.stringify({
        "message": "対象のトイレは削除されたか、最初から存在しません。"
      });
    }
    callback(null, response);
  });
};
