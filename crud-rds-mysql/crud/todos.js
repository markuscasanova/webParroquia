const connection = require('../connection');
const queryString = require('querystring');

module.exports.findAll = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const sql = 'SELECT * FROM reservas';
    connection.query(sql, (error, rows) => {
      if (error) {
        callback({
          statusCode: 500,
          headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
        },
          body: JSON.stringify(error)
        })
      } else {
        callback(null, {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
        },
          body: JSON.stringify({
            todos: rows
          })
        })
      }
    })
};

module.exports.findAllApi = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const sql = 'SELECT * FROM reservas';
  connection.query(sql, (error, rows) => {
    if (error) {
      callback({
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
      },
        body: JSON.stringify(error)
      })
    } else {
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
      },
        body: JSON.stringify({
          rows
        })
      })
    }
  })
};

module.exports.findOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const sql = 'SELECT * FROM reservas WHERE id = ?';
  connection.query(sql, [event.pathParameters.todo], (error, row) => {
    if (error) {
      callback({
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
      },
        body: JSON.stringify(error)
      })
    } else {
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
      },
        body: JSON.stringify({
          todo: row
        })
      })
    }
  })
};

module.exports.availDate = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  //var id = event.pathParameters.todo;
  var id = event.pathParameters.todo;
  var str = id.replace(/a/g, '/');

  const sql = 'SELECT * FROM reservas WHERE day = ?';
  connection.query(sql, [str], (error, response) => {
    if (error) {
      callback({
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
      },
        body: JSON.stringify(error)
      })
    } else {
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
      },
        body: JSON.stringify({
          todo: response
        })
      })
    }
  })
};

module.exports.avail = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  var id = event.pathParameters.todo;
  var str = id.replace(/a/g, '/');

  const sql = 'SELECT * FROM reservas WHERE day = ?';
  connection.query(sql, [str], (error, response) => {
    if (error) {
      callback({
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
      },
        body: JSON.stringify(error)
      })
    } else {
      var ind = 0;
      var dob = 0;
      var gru = 0;
      var dispo = new Array();     
      for (a in response)
      {
        if(response[a].type == "ind")
        {
          ind= ind+1;
        }
        if(response[a].type == "dob")
        {
          dob= dob+1;
        }
        if(response[a].type == "gru")
        {
          gru= gru+1;
        }
      }
      dispo.push(ind,dob,gru);
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
      },
        body: JSON.stringify({
          ind: ind,
          dob: dob,
          gru: gru
        })
      })
    }
  })
};

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  
  const body = queryString.parse(event['body']);
  const data = {
    day: body.day,
    type: body.type,
    p1: body.p1,
    p2: body.p2,
    p3: body.p3,
    com: body.com
  };

  const sql = 'INSERT INTO reservas SET ?';
  connection.query(sql, [data], (error, result) => {
    if (error) {
      callback({
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
      },
        body: JSON.stringify(error)
      })
    } else {
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
      },
        body: JSON.stringify({data,
          res: `Reserva realizada correctamente con id `+ result.insertId + ` para el dia ` + data.day,
        })
      })
    }
  })
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const body = queryString.parse(event['body']);

  const sql = 'UPDATE todos SET todo = ? WHERE id = ?';
  connection.query(sql, [body.todo, event.pathParameters.todo], (error, result) => {
    if (error) {
      callback({
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
      },
        body: JSON.stringify(error)
      })
    } else {
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
      },
        body: JSON.stringify({
          res: `Todo actualizado correctamente`
        })
      })
    }
  })
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const sql = 'DELETE from reservas WHERE id = ?';
  connection.query(sql, [event.pathParameters.todo], (error, result) => {
    if (error) {
      callback({
        statusCode: 500,
        body: JSON.stringify(error)
      })
    } else {
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
      },
        body: JSON.stringify({
          res: `Reserva eliminada correctamente`
        })
      })
    }
  })
};

