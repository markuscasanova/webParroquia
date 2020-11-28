$(".personaList1").click(function(){
    $(".hideP1").show();
    $(".hideP2").hide();
    $(".hideP3").hide();
    $(".hideFam").hide();
    $(".formP1").show();
    $(".submitForm").show();
    $(".alert-warning").hide();
    $(".numberList").show();
    clearAllInputs()
    window.type = "ind"
});
$(".personaList2").click(function(){
    $(".hideP1").show();
    $(".hideP2").show();
    $(".hideP3").hide();
    $(".hideFam").hide();
    $(".formP1").show();
    $(".submitForm").show();
    $(".alert-warning").hide();
    $(".numberList").show();
    clearAllInputs()
    window.type = "bin"
});
$(".personaList3").click(function(){
    $(".hideP1").hide();
    $(".hideP2").hide();
    $(".hideP3").hide();
    $(".hideFam").show();
    $(".formP1").show();
    $(".submitForm").show();
    $(".alert-warning").hide();
    $(".numberList").show();
    clearAllInputs()
    window.type = "fam"
});

$.fn.datepicker.defaults.format = "dd/mm/yyyy";
$('.datepicker').datepicker({
    startDate: '-3d'
});

function clearAllInputs()
{
    $('.formP1').val("");
    $('.formP2').val("");
    $('.formP3').val("");
    $('.datepicker').val("");
}

$("#datepicker").click(function(e){
    e.preventDefault();
    $(this).attr("autocomplete", "off");  
    $( "#datepicker" ).datepicker(({
        format: 'mm/dd/yyyy',
        startDate: '-3d'
    })
    
    );
});

$(".submitForm").click(function(){

    var checked = validateForm()
    if (checked)
    {
        alert("Faltan campos por rellenar : " + checked);
        return;
    }

 
    var settings = {
        "url": "https://3koehqpokc.execute-api.eu-west-1.amazonaws.com/dev/todos",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "day": $(".datepicker").val(),
          "type": window.type,
          "p1": $(".formP1").val(),
          "p2": $(".formP2").val(),
          "com": $(".comunidadList").val(),
          "turno":window.turno,
          "hora":window.hora
        }
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        alert(response.res);
        clearAllInputs();
        resetInterface();
        saveLocalStorage(response.data);
        location.reload(true);
    });
});

function saveLocalStorage(data)
{
    if(window.localStorage.getItem("reservas") != null)
    {
        var reservasCacheadas = JSON.parse(localStorage.getItem("reservas"));

        if(Array.isArray(reservasCacheadas))
        {
            var reservas = [];
            for(i in reservasCacheadas)
            {
                if(reservasCacheadas[i].type)
                {
                    reservas.push(reservasCacheadas[i]);
                }
            }
            reservas.push(data);
            localStorage.setItem("reservas", JSON.stringify(reservas));
            return
        }

        if(!Array.isArray(reservasCacheadas))
        {
            var reservas = [];
            reservas.push(reservasCacheadas);
            reservas.push(data);
            localStorage.setItem("reservas", JSON.stringify(reservas));
            return
        }
    }
    localStorage = window.localStorage;
    localStorage.setItem("reservas", JSON.stringify(data));
}


function validateForm()
{
    var check = null;
    switch(window.type) {
        case "ind":
            if (!$('.formP1').val()){return "Persona 1"}
            if ($('.comunidadList').val()){check= false}
        break;
        case "bin":
            if (!$('.formP1').val()){return "Persona 1"}
            if (!$('.formP2').val()){return "Persona 2"}
            if ($('.comunidadList').val()){check= false}
        break;
        case "fam":
            if (!$('.formP1').val()){return "Persona 1"}
            if ($('.comunidadList').val()){check= false}
        break;  
        default:
        return true
      }
    if(check == false)
    {return false}
    else{
        return true
    }
}

function resetInterface() {
    $(".hideP1").hide();
    $(".hideP2").hide();
    $(".hideP3").hide();
    $(".hideFam").hide();
    $(".formP1").hide();
    $(".submitForm").hide();
    $(".numberList").hide();
}
window.onload = function() {
    var datos =
    {
        "com":       "Tiger Nixon",
        "day":   "System Architect",
        "p1":     "$3,120",
        "p2": "2011/04/25",
        "type":     "Edinburgh"
    };
    $(".hideP1").hide();
    $(".hideP2").hide();
    $(".hideP3").hide();
    $(".hideFam").hide();
    $(".formP1").hide();
    $(".submitForm").hide();
    $(".numberList").hide();
    $(".datepicker").attr("autocomplete", "off");
    //$("#grid-basic").bootgrid();
    //writeData();
    loadCachedRes()
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

    
    
    fillPlazas()
    $( '.list-group-item' ).click(function() {
        fillSelect($(this));
        $('.active').removeClass('active');
        $(this).addClass('active');
        window.day = $(this).text().split(': ')[1];
        fillPlazas();
      });
   

    function fillSelect()
    {
        //Seteamos los div de los días
        $(this).attr("selected");
    }

    function fillPlazas()
    {
        var data = $('.active').text();
        var fecha = data.split(": ")[1];
        var turno = data.split("<")[1]
        window.fecha = fecha;
        if(turno != undefined)
        {
            var v = data.split("<")[1];
            turno = v.split('>')[0];
            fecha = fecha.split(':')[0];
            window.turno = turno;
            window.fecha = fecha;
        }
        else
        {
            turno = "0";
            window.turno = turno;
        }

        fecha = fecha.replace('/', 'a');        
        fecha = fecha.replace('/', 'a');
        var settings = {
            "url": "https://3koehqpokc.execute-api.eu-west-1.amazonaws.com/dev/avail/"+fecha+"+"+turno,
            "method": "GET",
            "timeout": 0,
          };
          
          $.ajax(settings).done(function (response) {
            console.log(response);
            //var individuales = document.createElement("li");
            var n1 = 17 - parseInt(response.ind);
            var n2 = 14 - parseInt(response.dob);
            var n3 = 12 - parseInt(response.fam);

            //individuales.innerText ="Reservas individuales Restantes : " + n1;
            $('#individuales li')[0].innerText = "Reservas individuales Restantes : " + n1; 
    
            var dobles = document.createElement("li");
            //dobles.innerText = "Reservas Dobles Restantes : " + n2;
            $('#Dobles li')[0].innerText = "Reservas Dobles Restantes : " + n2; 
    
    
            var familiares = document.createElement("li");
            //familiares.innerText = "Reservas Grupales Restantes : " + n3;
            $('#Familiares li')[0].innerText = "Reservas Grupales Restantes : " + n3; 
          });
     }
    function calcularProximosEventos(x)
    {
        var now = new Date();    
        now.setDate(now.getDate() + (x+(7-now.getDay())) % 7);
        return now;
    }

    
    function writeData()
    {
        var settings = {
            "url": "https://pdmx2p5svd.execute-api.eu-west-1.amazonaws.com/dev/todos",
            "method": "GET",
            "timeout": 0,
            "headers": {
              "Content-Type": "application/x-www-form-urlencoded"
            },
          };
          
          $.ajax(settings).done(function (response) {
            $.each(response.todos, function(){
                var html = "<tr><td>" + this.id + "</td><td>" + this.day+"</td><td>" + this.type + "</td><td>" + this.p1 + "</td><td>" + this.p2 + "</td><td>" + this.com+"</td></tr>";
                $('#grid-basic').append(html);
            });
          });
        

    }
}

function loadCachedRes()
{
    var reservasCacheadas = JSON.parse(localStorage.getItem("reservas"));
    var cacheRes = [];
    if(reservasCacheadas instanceof Object)
    {
        var html = "<tr><td>" + reservasCacheadas.com + "</td><td>" + reservasCacheadas.day+ "</td><td>" + reservasCacheadas.p1+ "</td><td>" + reservasCacheadas.p2+ "</td><td>" + reservasCacheadas.type+ "</td></tr>";
        $('.bodyReservas').append(html);
    }
    for(i in reservasCacheadas)
    {
        if(reservasCacheadas[i].type)
        {
            cacheRes.push(reservasCacheadas[i]);
        }
    }
    $.each(cacheRes, function(){
          var html = "<tr><td>" + this.com + "</td><td>" + this.day+ "</td><td>" + this.p1+ "</td><td>" + this.p2+ "</td><td>" + this.type+ "</td></tr>";
        $('.bodyReservas').append(html);
    });
}