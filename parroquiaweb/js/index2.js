window.onload = function() {


  
    var martes = calcularProximosEventos(2);
    var month = martes.getMonth()+1;
    $('.martes-id')[0].innerText = "Martes : "+ martes.getDate()+"/"+month+"/"+martes.getFullYear();

    var miercoles = calcularProximosEventos(3);
    month = miercoles.getMonth()+1;
    $('.miercoles-id')[0].innerText = "Miércoles : "+ miercoles.getDate()+"/"+month+"/"+miercoles.getFullYear();

    var sabado = calcularProximosEventos(6);
    month = sabado.getMonth()+1;
    $('.sabado-id')[0].innerText = "Sábado : "+ sabado.getDate()+"/"+month+"/"+sabado.getFullYear()+": Turno<1> : 18h";
    $('.sabado-id2')[0].innerText = "Sábado : "+ sabado.getDate()+"/"+month+"/"+sabado.getFullYear()+": Turno<2> : 19:30h";
    $('.sabado-id3')[0].innerText = "Sábado : "+ sabado.getDate()+"/"+month+"/"+sabado.getFullYear()+": Turno<3> : 21h";

    
    $( '.list-group-item' ).click(function() {
        fillSelect($(this));
        $('.active').removeClass('active');
        $(this).addClass('active');
        window.day = $(this).text().split(': ')[1];
        window.fecha = window.day;
        window.day = window.day.replace('/', 'a');        
        window.day = window.day.replace('/', 'a');
        getBancos();  
        $('.fancy-grid').remove()
        //window.reservas = getReservas();
        fillGrid();
        //fillGrid2();

      });
   

    function fillSelect()
    {
        //Seteamos los div de los días
        $(this).attr("selected");
    }

    function calcularProximosEventos(x)
    {
        var now = new Date();    
        now.setDate(now.getDate() + (x+(7-now.getDay())) % 7);
        return now;
    }
}

function getBancos()
{
    var datos = [];
    var settings = {
      async: false,
        "url": "https://3koehqpokc.execute-api.eu-west-1.amazonaws.com/dev/bancosAvail/"+window.day,
        "method": "GET",
        "timeout": 0,
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        datos = response.todo;
        if(datos.length != 0)
        {
          window.bancos = datos[0];
        }
        else
        {
        }
      });
}

function getReservas()
{
    var datos = [];
    var settings = {
        "url": "https://3koehqpokc.execute-api.eu-west-1.amazonaws.com/dev/availDate/"+window.day,
        "method": "GET",
        "timeout": 0,
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        datos = response.todo;
        if(datos.length != 0)
        {
          return datos[0];
        }
        else
        {
            alert("No hay reservas para : " + window.fecha)
        }
      });
}

function fillGrid()
{
  var familiares = {
    a: [{dob: 'DOB 22'}],
    b: [{ind: 'IND 21', ind2:'IND 22'},{ind: 'IND 23', ind2:'IND 24'}],
    c: [{ind: 'IND 17', dob:'DOB 18'},{ind: 'IND 18', dob:'DOB 19'},{ind: 'IND 19', dob:'DOB 20'},{ind: 'IND 20', dob:'DOB 21'},{ind: 'IND 25', dob:'DOB 23'},{ind: 'IND 26', dob:'IND 24'},{ind: 'IND 27', dob:'IND 25'},{ind: 'IND 28', dob:'IND 26'},{ind: 'IND 29', dob:'IND 27'}],
    d: [{dob: 'DOB 28', dob2:'DOB 29'}]

  }
    var datos = [];
    var settings = {
        "url": "https://3koehqpokc.execute-api.eu-west-1.amazonaws.com/dev/availDate/"+window.day,
        "method": "GET",
        "timeout": 0,
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        datos = response.todo;
        var bancos =  window.bancos;
        
        for (b in datos)
        {
          var ref = datos[b].id
          for (c in bancos)
          {
            if (bancos[c] == ref)
            {
              if(c[0] == 'i')
              {
                var num = c.split(c[0]);
                position= "IND " + num[1];
              }
              if(c[0] == 'd')
              {
                var num = c.split(c[0]);
                position= "DOB " + num[1];
              }

              if(c[0] == 'f')
              {
                if(c.length != 3)
                {              
                  var col = c[1];
                  var orde = c[2];
                  var orden = orde-1;
                  var posi = (c[3] == 'i'?'ind':'dob')
                  var out = "FAM " + col + " " + orden + " " + posi;
                  var position = familiares[col][orden][posi];
                  if (c.split(posi)[1])
                  {
                    var tipe = c.split(posi)[1][0];
                    var position = familiares[col][orden][posi + tipe];
                  }
                }
                var num = c.split(c[0]);
                position= "FAM " + num[1];
              }
              datos[b].asiento = position;
            }
          }
        }

        if(datos.length != 0)
        {
          asignSitio(datos);
          getGrid(datos);
        }
        else
        {
            alert("No hay reservas para : " + window.fecha)
        }
      });
}

function fillGrid2()
{
    var datos = [];
    var settings = {
        "url": "https://3koehqpokc.execute-api.eu-west-1.amazonaws.com/dev/bancosAvail/"+window.day,
        "method": "GET",
        "timeout": 0,
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        datos = response.todo;
        if(datos.length != 0)
        {
            getGrid2(datos);
        }
        else
        {
            alert("No hay reservas para : " + window.fecha)
        }
      });
}

function asignSitio(datos)
{
    var indNum = 0;
    var dobNum = 0;
    var famNum = 0;
    for(a in datos)
    {
        if(datos[a].type == "ind")
        {
            datos[a].sitio = ++indNum;
        }        
        if(datos[a].type == "dob")
        {
            datos[a].sitio = ++dobNum;
        }        
        if(datos[a].type == "fam")
        {
            datos[a].sitio = ++famNum;
        }
    }
}
function getGrid(datos)
{
    new FancyGrid({
        renderTo: 'container',
        width: window.innerWidth,
        height: 400,
        data: datos,
        columns: [{
          index: 'asiento',      
          title: 'ASIENTO',
          type: 'string',
          width: window.innerWidth/8
        },{
          index: 'id',      
          title: 'ID',
          type: 'string',
          width: window.innerWidth/16
        },{
          index: 'day',
          title: 'Día',
          type: 'string',
          width: window.innerWidth/16
        },{
          index: 'type',
          title: 'Tipo',
          type: 'string',
          width: window.innerWidth/16
        },{
          index: 'p1',
          title: 'Titular',
          type: 'number',
          width: window.innerWidth/4
        },{
          index: 'p2',
          title: 'Acompañante',
          type: 'string',
          width: window.innerWidth/4
        },{
          index: 'p3',
          title: 'Titular Familiar',
          type: 'string',
          width: window.innerWidth/8
        },{
          index: 'turno',
          title: 'Turno',
          type: 'number',
          width: window.innerWidth/16
        },{
          index: 'sitio',
          title: 'Sitio',
          type: 'number',
          width: window.innerWidth/8
        }]
      });
}
function getGrid2(datos)
{
  function Columna(make, model, year, dimen) {
    this.title = make;
    this.model = make;
    this.type = 'string';
    this.width = window.innerWidth/16;
  }

  var columnas = new Array();
  for(a in datos[0])
  {
    if (datos[0][a])
    {
      var tempo = new Columna(a,datos[0][a],'string',)
      columnas.push(tempo);
    }
  }

  console.log(columnas);
  var hola2 = new Columna('id2','ID2','String',)
  var hola = {
    index: 'id',      
    title: 'ID',
    type: 'string',
    width: window.innerWidth/16
  };
    new FancyGrid({
        renderTo: 'container',
        width: window.innerWidth,
        height: 400,
        data: datos[0],
        columns: [columnas[1],{
          index: 'day',
          title: 'Día',
          type: 'string',
          width: window.innerWidth/16
        },{
          index: 'type',
          title: 'Tipo',
          type: 'string',
          width: window.innerWidth/16
        },{
          index: 'p1',
          title: 'Titular',
          type: 'number',
          width: window.innerWidth/4
        },{
          index: 'p2',
          title: 'Acompañante',
          type: 'string',
          width: window.innerWidth/4
        },{
          index: 'p3',
          title: 'Titular Familiar',
          type: 'string',
          width: window.innerWidth/8
        },{
          index: 'turno',
          title: 'Turno',
          type: 'number',
          width: window.innerWidth/16
        },{
          index: 'sitio',
          title: 'Sitio',
          type: 'number',
          width: window.innerWidth/8
        }]
      });
}

  