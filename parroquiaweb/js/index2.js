window.onload = function () {
  var lunes = calcularProximosEventos(1);
  var month = lunes.getMonth() + 1;
  $('.lunes-id')[0].innerText = "Lunes : " + lunes.getDate() + "/" + month + "/" + lunes.getFullYear();


  var martes = calcularProximosEventos(2);
  var month = martes.getMonth() + 1;
  $('.martes-id')[0].innerText = "Martes : " + martes.getDate() + "/" + month + "/" + martes.getFullYear();

  var miercoles = calcularProximosEventos(3);
  month = miercoles.getMonth() + 1;
  $('.miercoles-id')[0].innerText = "Miércoles : " + miercoles.getDate() + "/" + month + "/" + miercoles.getFullYear();

  var sabado = calcularProximosEventos(6);
  month = sabado.getMonth() + 1;
  $('.sabado-id')[0].innerText = "Sábado : " + sabado.getDate() + "/" + month + "/" + sabado.getFullYear() + ": Turno<1> : 18h";
  $('.sabado-id2')[0].innerText = "Sábado : " + sabado.getDate() + "/" + month + "/" + sabado.getFullYear() + ": Turno<2> : 19:30h";
  $('.sabado-id3')[0].innerText = "Sábado : " + sabado.getDate() + "/" + month + "/" + sabado.getFullYear() + ": Turno<3> : 21h";


  $('.list-group-item').click(function () {
    fillSelect($(this));
    $('.active').removeClass('active');
    $(this).addClass('active');
    window.day = $(this).text().split(': ')[1];
    window.fecha = window.day;
    window.day = window.day.replace('/', 'a');
    window.day = window.day.replace('/', 'a');
    $('.fancy-grid').remove()
    fillGrid();
  });


  function fillSelect() {
    //Seteamos los div de los días
    $(this).attr("selected");
  }

  function calcularProximosEventos(x) {
    var now = new Date();
    now.setDate(now.getDate() + (x + (7 - now.getDay())) % 7);
    return now;
  }
}


function fillGrid() {
  var datos = [];
  var settings = {
    "url": "https://3koehqpokc.execute-api.eu-west-1.amazonaws.com/dev/availDate/" + window.day,
    "method": "GET",
    "timeout": 0,
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    datos = response.todo;
    if (datos.length != 0) {
      asignSitio(datos);
      getGrid(datos);
    }
    else {
      alert("No hay reservas para : " + window.fecha)
    }
  });
}

function asignSitio(datos) {
  var indNum = 0;
  var dobNum = 0;
  var famNum = 0;
  for (a in datos) {
    if (datos[a].type == "ind") {
      datos[a].sitio = ++indNum;
    }
    if (datos[a].type == "dob") {
      datos[a].sitio = ++dobNum;
    }
    if (datos[a].type == "fam") {
      datos[a].sitio = ++famNum;
    }
  }
}
function getGrid(datos) {
  new FancyGrid({
    renderTo: 'container',
    width: window.innerWidth,
    height: 400,
    data: datos,
    columns: [{
      index: 'id',
      title: 'ID',
      type: 'string',
      width: window.innerWidth / 16
    }, {
      index: 'day',
      title: 'Día',
      type: 'string',
      width: window.innerWidth / 16
    }, {
      index: 'type',
      title: 'Tipo',
      type: 'string',
      width: window.innerWidth / 16
    }, {
      index: 'p1',
      title: 'Titular',
      type: 'number',
      width: window.innerWidth / 4
    }, {
      index: 'p2',
      title: 'Acompañante',
      type: 'string',
      width: window.innerWidth / 4
    }, {
      index: 'p3',
      title: 'Titular Familiar',
      type: 'string',
      width: window.innerWidth / 8
    }, {
      index: 'turno',
      title: 'Turno',
      type: 'number',
      width: window.innerWidth / 16
    }, {
      index: 'sitio',
      title: 'Sitio',
      type: 'number',
      width: window.innerWidth / 8
    }]
  });
}

