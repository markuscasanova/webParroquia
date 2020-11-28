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
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
        },
        body: JSON.stringify(error)
      })
    } else {
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
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

module.exports.dispo = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  var fecha = event.pathParameters.todo;
  console.log("Datos recibidos :" + fecha);
  var str = fecha.replace(/a/g, '/');
  console.log(str);

  const sql = 'SELECT * FROM reservas WHERE day = ?';
  connection.query(sql, [str], (error, response) => {
    if (error) {
      callback({
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
        },
        body: JSON.stringify(error)
      })
    } else {
      console.log(response.length)
      for (b in response)
      {
        console.log("La respuesta SQL es : " + response[b]);
      }
      var ind = 0;
      var dob = 0;
      var fam = 0;
      for (a in response) {
        if (response[a].type == "ind") {
          ind = ind + 1;
        }
        if (response[a].type == "dob") {
          dob = dob + 1;
        }
        if (response[a].type == "fam") {
          fam = fam + 1;
        }
      }
      var dispo = new Array();
      dispo.push(ind, dob, fam);
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
        },
        body: JSON.stringify({
          ind: ind,
          dob: dob,
          fam: fam
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
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
        },
        body: JSON.stringify(error)
      })
    } else {
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
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
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
        },
        body: JSON.stringify(error)
      })
    } else {
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
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
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
        },
        body: JSON.stringify(error)
      })
    } else {
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
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
  var fecha = id.split("+")[0];
  var turno = id.split("+")[1];
  console.log("Datos recibidos :" + fecha + " " + turno);
  var str = fecha.replace(/a/g, '/');
  console.log(str + turno);

  const sql = 'SELECT * FROM reservas WHERE day = ? && turno = ?';
  connection.query(sql, [str,turno], (error, response) => {
    if (error) {
      callback({
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
        },
        body: JSON.stringify(error)
      })
    } else {
      console.log(response.length)
      for (b in response)
      {
        console.log("La respuesta SQL es : " + response[b]);
      }
      var ind = 0;
      var dob = 0;
      var fam = 0;
      for (a in response) {
        if (response[a].type == "ind") {
          ind = ind + 1;
        }
        if (response[a].type == "dob") {
          dob = dob + 1;
        }
        if (response[a].type == "fam") {
          fam = fam + 1;
        }
      }
      var dispo = new Array();
      dispo.push(ind, dob, fam);
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
        },
        body: JSON.stringify({
          ind: ind,
          dob: dob,
          fam: fam
        })
      })
    }
  })
};

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  var avail = true;
  const body = queryString.parse(event['body']);
  const data = {
    day: body.day,
    type: body.type,
    p1: body.p1,
    p2: body.p2,
    p3: body.p3,
    com: body.com,
    turno:body.turno,
    hora: body.hora
  };

  if (body.turno = "0")
  {
    data.hora = "21h";
  }
  //FECHA A BUSCAR
  var id = body.day;
  var turno = body.turno;
  const sqlAvail = 'SELECT * FROM reservas WHERE day = ? && turno = ?';
  //COMPROBAMOS QUE AÚN QUEDAN ESPACIOS DISPONIBLES PARA ESE DÍA
  connection.query(sqlAvail, [id, turno], (error, response) => {
    if (error) {
      callback({
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
        },
        body: JSON.stringify(error)
      })
    }
    else {
      var ind = 0;
      var dob = 0;
      var fam = 0;
      for (a in response) {
        if (response[a].type == "ind") {
          ind = ind + 1;
        }
        if (response[a].type == "dob") {
          dob = dob + 1;
        }
        if (response[a].type == "fam") {
          fam = fam + 1;
        }
      }
      var dispo = new Array();
      dispo.push(ind, dob, fam);
      if (body.type == "ind") {
        if (ind >= "17") {
          avail = false;
          callback(null, {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Headers": "Content-Type",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
            },
            body: JSON.stringify({
              res: "Reserva Fallida : No hay más reservas Individuales para " + data.day + " a las : " + data.hora,
            })
          })
        }
      }
      if (body.type == "dob") {
        if (dob >= "14") {
          avail = false;
          callback(null, {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Headers": "Content-Type",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
            },
            body: JSON.stringify({
              res: "Reserva Fallida : No hay más reservas Dobles para " + data.day + " a las  : " + data.hora,
            })
          })
        }
      }
      if (body.type == "fam") {
        if (fam >= "12") {
          avail = false;
          callback(null, {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Headers": "Content-Type",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
            },
            body: JSON.stringify({
              res: "Reserva Fallida : No hay más reservas Familiares para " + data.day + " a las : " + data.hora,
            })
          })
        }
      }
      if(avail)
      {
        const sql = 'INSERT INTO reservas SET ?';
        connection.query(sql, [data], (error, result) => {
          if (error) {
            callback({
              statusCode: 500,
              headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
              },
              body: JSON.stringify(error)
            })
          } else {
            callback(null, {
              statusCode: 200,
              headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
              },
              body: JSON.stringify({
                res: `Reserva realizada correctamente con id ` + result.insertId + ` para el dia ` + data.day + " a las : " + data.hora,
              })
            })
          }
        })
      }
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
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
        },
        body: JSON.stringify(error)
      })
    } else {
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
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
          "Access-Control-Allow-Headers": "Content-Type",
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

