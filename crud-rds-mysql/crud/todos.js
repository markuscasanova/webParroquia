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
    hora: body.hora,
    celebracion: body.celebracion
  };

  var failedInd = false;
  var failedDob = false;
  var failedFam = false; 
  var adaptamos = false; 

  if (body.turno = "0")
  {
    data.hora = "21h";
  }
  //FECHA A BUSCAR
  var id = body.day;
  var turno = body.turno;
  const sqlAvail = 'SELECT * FROM reservas WHERE day = ?';
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
      console.log(data);
      console.log(JSON.stringify({response}));
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
      console.log(dispo);
      var limiteind = body.celebracion == "Eucaristia" ? 19 : 25;
      console.log("El limite Individual del día es :" + limiteind);
      var limitedob = body.celebracion == "Eucaristia" ? 19 : 19;
      console.log("El limite doble del día es :" + limitedob);
      var limitefam = "12";
      console.log("El limite familiar del día es : 12");
      if (body.type == "ind") {
        console.log("Es una reserva Individual");
        if (ind < limiteind && fam < limitefam) {
          avail = true;
          console.log("Reservamos");
        }
        if (ind >= limiteind)
        {
          adaptamos = true;
          avail = false;
        }
        if (ind >= limiteind && fam >= limitefam) {
          adaptamos = false;
          console.log("Dispo Fam " + fam + " de : " + limitefam);
          avail = false;
          failedInd = true;
          console.log("Dispo Ind " + ind + " de : " + limiteind);
        }
      }
      if (body.type == "dob") {
        console.log("Es una reserva Doble");
        if (dob < limitedob && fam < limitefam) {
          avail = true;
          console.log("Reservamos");
        }
        if (dob >= limitedob)
        { 
          adaptamos = true;
          avail = false;
        }
        if (dob >= limitedob && fam  == limitefam) {
          adaptamos = false;
          avail = false;
          console.log("Dispo Fam " + fam + " de : " + limitefam);
          failedDob = true;
          console.log("Dispo Dob " + dob + " de : " + limitedob);
        }
      }
      if (body.type == "fam") {
        console.log("Es una reserva Familiar");
        if (fam >= limitefam) {
          avail = false;
          console.log("Dispo Dob " + fam + " de : " + limitefam);
          callback(null, {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Headers": "Content-Type",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
            },
            body: JSON.stringify({
              res: "Reserva Fallida : No hay más reservas Familiares para " + data.day + " a las : " + data.hora,
              dispo
            })
          })
        }
        else
        {
          avail = true;
        }
      }
      if(avail)
      {
        console.log("Disponible " + data.type);
        console.log(JSON.stringify({data}));

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
                res: "Reserva " + data.type + " realizada correctamente con id " + result.insertId + " para el dia " + data.day + " a las : " + data.hora,
                dispo
              })
            })
          }
        })
      }
      if(failedInd)
      {
        var texto = "Individuales";
        console.log("Falla individual");
      }
      if(failedDob)
      {
        var texto = "Dobles";
        console.log("Falla Dobles");
      }            
      if(failedFam)
      {
        var texto = "Familiares";
        console.log("Falla Familiare");
      }
      if(adaptamos)
      {
        console.log("Adaptamos reserva");
        callback(null, {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
          },
          body: JSON.stringify({
            res: "Adaptamos " + data.type +  " para el día : " + data.day + " a las : " + data.hora,
            dispo
          })
        })
      }
      if (failedInd || failedDob || failedFam) {
        avail = false;

        callback(null, {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
          },
          body: JSON.stringify({
            res: "Reserva Fallida : No hay más reservas " + texto + " para " + data.day + " a las : " + data.hora,
            dispo
          })
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

