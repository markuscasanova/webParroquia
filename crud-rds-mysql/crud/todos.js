const connection = require('../connection');
const queryString = require('querystring');
const { type } = require('os');

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
      for (b in response) {
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
  connection.query(sql, [str, turno], (error, response) => {
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
      for (b in response) {
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
  var body = queryString.parse(event['body']);
  var data = {
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

  function isEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop))
        return false;
    }

    return true;
  }



  var failedInd = false;
  var failedDob = false;
  var failedFam = false;
  var adaptamos = false;
  var familiares;

  if (body.turno = "0") {
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
      const asientosDisponibles = 'SELECT t.* FROM curso_sls.bancos t WHERE fecha = ?';
      connection.query(asientosDisponibles, [data.day], (error, respuestaAsientos) => {
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
          console.log(JSON.stringify({ response }));
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
          }
          var bases = new Array();
          var bases1 = new Array();
          var bases2 = new Array();
          var famidispo = false;
          console.log("Importante");
          console.log(JSON.stringify(respuestaAsientos));
          for (p in respuestaAsientos[0])
          {
            console.log(p);
            if (respuestaAsientos[0][p] != null && p[0] == "i") {
              console.log("Reserva Individual vacía : " + respuestaAsientos[0][p]);
              var notInd = p.includes("ind");
              var notDob = p.includes("dob");
              if (!notInd && !notDob) {
                bases1.push(p);
              }

            }
            if (respuestaAsientos[0][p] != null && p[0] == "d") {
              console.log("Reserva Doble vacía : " + respuestaAsientos[0][p]);
              var notInd = p.includes("ind");
              var notDob = p.includes("dob");
              if (!notInd && !notDob) {
                bases2.push(p);
              }

            }
            if (respuestaAsientos[0][p] != null  && respuestaAsientos[0][p] != 0 && respuestaAsientos[0][p] != 9999999 && p[0] == "f") {
              console.log("Reserva Familiar vacía : " + respuestaAsientos[0][p]);
              var notInd = p.includes("ind");
              var notDob = p.includes("dob");
              if (!notInd && !notDob) {
                bases.push(p);
              }
            }
            if (respuestaAsientos[0][p] == null && p[0] == "f") {
              console.log("Reserva Familiar vacía : " + respuestaAsientos[0][p]);
              var notInd = p.includes("ind");
              var notDob = p.includes("dob");
              if (!notInd && !notDob) {
                famidispo= true;
              }
            }
          }
          var ind = bases1.length;
          var dob = bases2.length;
          var fam = bases.length;
          var dispo = new Array();
          dispo.push(ind, dob, fam);
          console.log(dispo);
          var limiteind = body.celebracion == "Eucaristia" ? 20 : 26;
          console.log("El limite Individual del día es :" + limiteind);
          var limitedob = body.celebracion == "Eucaristia" ? 14 : 14;
          console.log("El limite doble del día es :" + limitedob);
          var limitefam = "12";
          console.log("El limite familiar del día es : 12");
          if (body.type == "ind") {
            console.log("Es una reserva Individual");
            if (ind < limiteind && fam < limitefam) {
              avail = true;
              console.log("Reservamos");
            }
            if (ind >= limiteind) {
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
            if (dob >= limitedob) {
              adaptamos = true;
              avail = false;
            }
            if (dob >= limitedob && fam == limitefam) {
              adaptamos = false;
              avail = false;
              console.log("Dispo Fam " + fam + " de : " + limitefam);
              failedDob = true;
              console.log("Dispo Dob " + dob + " de : " + limitedob);
            }
          }
          if (body.type == "fam" && famidispo) {
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
            else {
              console.log("Disponible reserva Familiar");
              avail = true;
            }
          }
          if (data.type != 'ind') {
            if (data.type != 'dob') {
              if (data.type != 'fam') {
                console.log("Tipo no válido");
                console.log("")
                avail = false;
                failedInd = true;
              }
            }
          }
          if (adaptamos) {
            var huecoFilled = false;
            var asientosTodos;
            console.log("Adaptamos reserva");
            var valor;
            var oloresp;
            var result2;
            var conta = false;
            var stop;
            var letsgo = false;
            asientosTodos = respuestaAsientos;
            var tipe = data.type;
            console.log(JSON.stringify(respuestaAsientos));
            var arrays = asientosTodos[0];
            console.log(JSON.stringify(arrays));
            if (tipe == 'ind') {
              console.log("Adaptamos Individual");
            }
            if (tipe == 'dob') {
              console.log("Adaptamos Doble");
            }
            var splittedOnly = Array();
            var baseOnly = Array();
            var lista = Array();
            for (x in arrays) {
              if (arrays[x] == null && x[0] == "f") {
                lista.push(x);
              }
              if (arrays[x] == null && x[0] == "f") {
                var valida = x.includes(body.type);
                if (valida) {
                  splittedOnly.push(x);
                }
                var notInd = x.includes("ind");
                var notDob = x.includes("dob");
                if (!notInd && !notDob) {
                  baseOnly.push(x);
                }

              }
            }
            console.log("La lista de posibles huecos es : " + JSON.stringify(lista));
            console.log("La lista de posibles Splitted es : " + JSON.stringify(splittedOnly));
            console.log("La lista de posibles Base es : " + JSON.stringify(baseOnly));


            for (a in arrays) {
              if (a[0] == "f" && arrays[a] == "0") {
                console.log("null?" + arrays[a]);
                console.log("Encontramos Reserva Mixta sin completar");
                var seleccion = a;
                console.log("La selección es : " + a + " apuntando a : " + a + data.type);
                var filtrado = splittedOnly.filter(word => word.includes(seleccion + data.type));
                console.log(filtrado);
                if (!filtrado.isEmpty) {
                  for (i in filtrado) {
                    var hueco = filtrado[i];
                    console.log("Filtrado : " + filtrado);
                    console.log("Hueco : " + hueco);
                    console.log("Valor : " + arrays[hueco]);
                    if (!arrays[hueco] && !stop) {
                      console.log("Encontramos Hueco Segmentado en : " + hueco);
                      var mensaje = "Encontramos Hueco Segmentado en : " + hueco;
                      var SLK = 'INSERT INTO reservas SET ?';
                      var SLK3 = 'UPDATE curso_sls.bancos t SET t.b = ? WHERE t.fecha = ?';
                      SLK.replace('.a', hueco);
                      var valor = '12321'
                      connection.query(SLK, [body], (error, oloresp) => {
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
                          console.log(oloresp);
                          var result2 = SLK3.replace('t.b', 't.' + seleccion);
                          var close = "9999999";
                          connection.query(result2, [close, body.day], (error, updateInfo) => {
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
                              console.log(updateInfo);
                              var result3 = SLK3.replace('t.b', 't.' + hueco);
                              connection.query(result3, [oloresp.insertId, body.day], (error, updatePut) => {
                                callback(null, {
                                  statusCode: 200,
                                  headers: {
                                    "Access-Control-Allow-Headers": "Content-Type",
                                    "Access-Control-Allow-Origin": "*",
                                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
                                  },
                                  body: JSON.stringify({
                                    oloresp,
                                    updateInfo,
                                    updatePut
                                  })
                                })
                              })
                            }
                          })
                        }
                      })
                      var stop = true;
                      var huecoFilled = true;
                    }
                    if (arrays[hueco]) {
                      console.log("Encontramos Hueco pero no está vacío en : " + hueco + " con resultado : " + arrays[hueco]);
                    }
                  }
                }
                if (arrays[a] == null && a[0] == "f" && a[0].includes(tipe)) {
                  console.log("Encontramos asiento");
                  console.log(a);
                }
              }
            }
            //SI NO HAY RESERVAS MIXTAS, VAMOS A CREARLA
            if (!huecoFilled) {
              console.log("NO HAY MAS RESERVAS MIXTAS PARA : " + body.day + ". Buscamos Posible Hueco.");
              var stop2 = false;
              for (x in arrays) {
                console.log(x + "-->" + x.includes(body.type));
                if (x[0] == "f" && !arrays[x] && !stop2) {
                  console.log(x);
                  if (!x.includes("ind") && !x.includes("dob")) {
                    console.log("Seleccionamos hueco : " + x + " para : " +  x+body.type);
                    console.log("La lista : " + lista);
                    console.log(lista.filter(word => word.includes(x + body.type)));
                    var compro = lista.filter(word => word.includes(x + body.type));
                    if (compro[0]) {
                      console.log("Entramos en COMPRO");
                      const reservaAdaptada = 'INSERT INTO reservas SET ?';
                      console.log("Entramos en COMPRO 2");
                      const updateBase = 'UPDATE curso_sls.bancos t SET t.a = 0 WHERE t.fecha = ?';
                      const updateDivid = 'UPDATE curso_sls.bancos t SET t.a = ? WHERE t.fecha = ?';
                      letsgo = true;

                      connection.query(reservaAdaptada, [body], (error, insertDiv) => {
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
                          console.log("Base --> " + compro[0].split(body.type)[0]);
                          var base = compro[0].split(body.type)[0];

                          var result3 = updateBase.replace('t.a', 't.' + base);
                          var prox = "0";
                          connection.query(result3, [body.day], (error, updateMod) => {
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
                              console.log("Hueco --> " + compro[0]);
                              var result5 = updateDivid.replace('t.a', 't.' + compro[0]);
                              connection.query(result5, [insertDiv.insertId, body.day], (error, updateMod2) => {
                                callback(null, {
                                  statusCode: 200,
                                  headers: {
                                    "Access-Control-Allow-Headers": "Content-Type",
                                    "Access-Control-Allow-Origin": "*",
                                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
                                  },
                                  body: JSON.stringify({
                                    insertDiv,
                                    updateMod,
                                    updateMod2
                                  })
                                })
                              })
                            }
                          })
                        }
                      })
                      var stop2 = true;
                    }
                  }
                }
              }
              failedDob = true;
            }
          }
          if (avail) {
            console.log("Disponible " + data.type);
            console.log(JSON.stringify({ data }));

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
                    function plaza(obj, data) {
                      console.log(JSON.stringify(obj));
                      var array = obj[0];
                      console.log(JSON.stringify(array));
                      var tipo = data.type;
                      for (var p in array) {
                        console.log(array[p]);
                        var letter = tipo[0];
                        console.log(letter + " --> " + p[0]);
                        if (array[p] == null && letter == p[0]) {
                          console.log("Encontramos asiento");
                          var asiento = Object.keys(obj[0]);
                          console.log(p);
                          console.log(reservarAsiento);
                          var result = reservarAsiento.replace('t.a', 't.' + p);
                          console.log(result);
                          return result
                        }
                      }
                      console.log(reservarAsiento);
                      if (data.type == 'ind') {
                        var result = reservarAsiento.replace('t.a', 't.i1');
                      }
                      if (data.type == 'dob') {
                        var result = reservarAsiento.replace('t.a', 't.d1');
                      }
                      if (data.type == 'fam') {
                        var result = reservarAsiento.replace('t.a', 't.fa1');
                      }
                      console.log(result);
                      return result;
                    }
                    if (isEmpty(r2)) {
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
                    connection.query(asignacion, [r1.insertId, data.day], (error, resAsiento) => {
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
                        if (!isEmpty(r2)) {
                          var createRow = "Row ya estaba creada";
                        }
                        if (isEmpty(r2)) {
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
          if (failedInd) {
            var texto = "Individuales";
            console.log("Falla individual");
          }
          if (failedDob && !letsgo) {
            var texto = "Dobles";
            console.log("Falla Dobles");
          }
          if (failedFam) {
            var texto = "Familiares";
            console.log("Falla Familiare");
          }
          if ((failedInd || failedDob || failedFam) && !letsgo) {
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

