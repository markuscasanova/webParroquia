
          console.log("Revisamos si hay alguna reserva Grupal segmentada");
          var id = 0;
          for(e in response)
          {
            if(response[e].converted == '1')
            {
              console.log("Entramos prueba");
              if(response[e].convertedFull == 0)
              {
                id = response[e].id;
                console.log("La reserva con id " + id + ", tiene un hueco.")
                
                break
              }
            }
          }

          console.log("Convertimos reserva Grupal en individual");

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

        const sql = 'UPDATE curso_sls.reservas t SET t.p3 = ?, t.convertedFull = \'1\' WHERE t.id = 313';
        connection.query(sql3, [event.pathParameters.todo], (error, row) => {
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
              turno: body.turno,
              hora: body.hora,
              celebracion: body.celebracion
            };
          
            if (body.turno = "0") {
              data.hora = "21h";
            }
            console.log(data);
            //FECHA A BUSCAR
            var id = body.day;
            var turno = body.turno;
            const sqlAvail = 'SELECT * FROM reservas WHERE day = ? && turno = ?';
            //COMPROBAMOS QUE AÚN QUEDAN ESPACIOS DISPONIBLES PARA ESE DÍA
            var dispo = new Array();
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
                console.log(response);
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
                  dispo.push(ind, dob, fam);
                }
              }
            });
            console.log(dispo);
            var limiteind = body.celebracion == "Eucaristia" ? 17 : 25;
            console.log("El limite Individual del día es :" + limiteind + "de las que hay " + dispo.ind);
            var limitedob = body.celebracion == "Eucaristia" ? 17 : 19;
            console.log("El limite Individual del día es :" + limitedob);
            if (body.type == "ind") {
              console.log("Entramos en Individual");
              if (dispo.ind >= limiteind) {
                avail = false;
                //PEDIMOS LAS RESERVAS GRUPALES PARA VER SI HAY HUECO.
                const sqlGrup = 'SELECT * FROM reservas WHERE day = ? && type = \'fam\'';
                connection.query(sqlGrup, [id], (error, result2) => {
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
                    avail = false;
                    console.log("Revisamos si hay alguna reserva Grupal segmentada");
                    var id = 0;
                    var resid;
                    for (e in response) {
                      if (response[e].converted == '1' & response[e].convertedFull != 1) {
                        console.log("Entramos prueba");
                        resid = response[e].id;
                        console.log("La reserva con id " + resid + ", tiene un hueco.");
                        const sql3 = 'UPDATE curso_sls.reservas t SET t.p3 = ?, t.convertedFull = \'1\' WHERE t.id = 313';
                        connection.query(sql3, [body.p1, resid], (error, responseUpdate) => {
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
                            console.log("Añadimos Segundo individual");
                            callback(null, {
                              statusCode: 200,
                              headers: {
                                "Access-Control-Allow-Headers": "Content-Type",
                                "Access-Control-Allow-Origin": "*",
                                "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
                              },
                              body: JSON.stringify({
                                todo: responseUpdate
                              })
                            })
                          }
                        })
                      }
                      else {
                        console.log("No hay hueco");
                        console.log("Revisamos si podemos hacer hueco en alguna reserva Familiar")
          
                      }
                    }
                  }
                  callback(null, {
                    statusCode: 200,
                    headers: {
                      "Access-Control-Allow-Headers": "Content-Type",
                      "Access-Control-Allow-Origin": "*",
                      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
                    },
                    body: JSON.stringify({
                      sospecha: result2
                    })
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
            if (avail) {
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
                      result,
                      dispo,
                      res: `Reserva realizada correctamente con id ` + result.insertId + ` para el dia ` + data.day + " a las : " + data.hora,
                    })
                  })
                }
              })
            }
          };







          
module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  var avail = true;
  var failedInd = false;
  var failedDob = false;
  var failedFam = false;  
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
      var limiteind = body.celebracion == "Eucaristia" ? 17 : 25;
      console.log("El limite Individual del día es :" + limiteind);
      var limitedob = body.celebracion == "Eucaristia" ? 17 : 19;
      console.log("El limite doble del día es :" + limitedob);
      var limitefam = "12";
      console.log("El limite familiar del día es : 12");
      var dispo = new Array();
      dispo.push(ind, dob, fam);
      if (body.type == "ind") {
        if (ind >= limiteind & fam>= limitefam) {
          avail = false;
          failedInd = true;
        }
        if (ind >= limiteind) {
          adaptamos = true;
        }
      }
      if (body.type == "dob") {
        if (dob >= limitedob & fam>= limitefam) {
          avail = false;
          failedDob = true;
        }
        if (dob >= limitedob) {
          adaptamos = true;
        }
      }
      if (body.type == "fam") {
        if (fam >= "12") {
          avail = false;
          failedFam = true;
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
      if(adaptamos)
      {
        console.log("Adaptamos reserva");
        if(failedInd)
        {
          callback(null, {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Headers": "Content-Type",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
            },
            body: JSON.stringify({
              res: "Reserva Fallida : No hay más reservas Individuales para " + data.day + " a las  : " + data.hora,
            })
          })
        }        
        if(failedDob)
        {
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
        if(failedFam)
        {
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
        const sql2 = 'SELECT * FROM reservas WHERE day = ?';
        connection.query(sql2, [data], (error, result) => {
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
                res: body,
              })
            })
          }
        })
        callback(null, {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
          },
          body: JSON.stringify({
            res: "Hemos adaptado la reserva a una grupal",
          })
        })
      }
    }
  })
};
