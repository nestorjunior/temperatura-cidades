$(document).ready(function() {

  $('button').bind('click', function(e){
    e.preventDefault();
    var cidade = $('#buscar-cidade').val();
    var now = new Date();
    var tempoURL = 'https://query.yahooapis.com/v1/public/yql?format=json&rnd=' + now.getFullYear() + now.getMonth() + now.getDay() + now.getHours() + '&diagnostics=true&callback=?&q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="'+cidade+'") and u="c"';

    $.ajax({
      url: encodeURI(tempoURL),
      dataType:'json',
      type: 'GET',
      beforeSend: function(){
        $('#resultado').html('Carregando...');
      },
      success: function(data){
        var temp = data.query.results.channel.item.condition.temp;
        $('#resultado').html(temp + 'º C');
      },
      error: function() {
        $('#resultado').html('Erro!');
      } 
    })
  })

});