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

  function isEmpty(obj) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
        return false;
    }
  
    return true;
  }



  var failedInd = false;
  var failedDob = false;
  var failedFam = false; 
  var adaptamos = false; 
  var familiares; 

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
          console.log("Dispo Fam " + fam + " de : " + limitefam);
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
          console.log("Disponible reserva Familiar");
          avail = true;
        }
      }
      if(data.type != 'ind')
      {
        if(data.type != 'dob')
        {
          if(data.type != 'fam')
          {
            console.log("Tipo no válido");
            console.log("")
            avail = false;
            failedInd = true;
          }
        }
      }
      if(adaptamos)
      {
        familiares = response.filter(character => character.type === 'fam');
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
            dispo,
            familiares
          })
        })
      }
      if(avail)
      {
        console.log("Disponible " + data.type);
        console.log(JSON.stringify({data}));

        const reserva = 'INSERT INTO reservas SET ?';
        const asientos = 'SELECT t.* FROM curso_sls.bancos t WHERE fecha = ?';
        const crearRow = 'INSERT INTO curso_sls.bancos (fecha) VALUES (?)';
        var reservarAsiento = 'UPDATE curso_sls.bancos t SET t.a = ? WHERE t.fecha = ?';
        connection.query(reserva, [data], (error, r1) => {
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
              connection.query(asientos, [data.day], (error, r2) => {
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
                function plaza(obj,data) {
                  console.log(JSON.stringify(obj));
                  var array = obj[0];
                  console.log(JSON.stringify(array));
                  var tipo = data.type;
                  for(var p in array) 
                  {
                    console.log(array[p]);
                    var letter = tipo[0];
                    console.log(letter + " --> " + p[0]);
                    if(array[p] == null && letter == p[0])
                    {
                      console.log("Encontramos asiento");
                      var asiento = Object.keys(obj[0]);
                      console.log(p);
                      console.log(reservarAsiento);
                      var result = reservarAsiento.replace('t.a','t.'+p);
                      console.log(result);
                      return result
                    }
                  }
                  console.log(reservarAsiento);
                  if(data.type == 'ind')
                  {
                    var result = reservarAsiento.replace('t.a','t.i1');
                  }
                  if(data.type == 'dob')
                  {
                    var result = reservarAsiento.replace('t.a','t.d1');
                  }
                  if(data.type == 'fam')
                  {
                    var result = reservarAsiento.replace('t.a','t.f1');
                  }
                  console.log(result);
                  return result;
                }
                if(isEmpty(r2))
                {
                  connection.query(crearRow, [data.day], (error, createRow) => {
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
                      console.log("Creamos Row para : " + data.day);
                      console.log(JSON.stringify(createRow));
                    }
                  })
                }
                var asignacion = plaza(r2, data);
                console.log("La plaza libre es : " + asignacion)
                connection.query(asignacion, [r1.insertId,data.day], (error, resAsiento) => {
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
                    if (!isEmpty(r2))
                    {
                      var createRow = "Row ya estaba creada";
                    }
                    if (isEmpty(r2))
                    {
                      var createRow = "Row recien Creada";
                    }
                    callback(null, {
                      statusCode: 200,
                      headers: {
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
                      },
                      body: JSON.stringify({
                        res: "Reserva " + data.type + " realizada correctamente con id " + r1.insertId + " para el dia " + data.day + " a las : " + data.hora,
                        dispo,
                        r1,
                        r2,
                        resAsiento,
                        createRow
                      })
                    })
                  }
                })
              }
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
            dispo,
            failedInd,
            failedDob,
            failedFam
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

