function getWeather() {
  var zipCode = $('#zipCode').val();
  try {
    $.post('/weather', 
        {zipCode: zipCode}, 
        function(data) {
          var weatherValue = JSON.parse(data);
          $('#shouldResult').fadeOut(300, function() {
            $('#shouldResult').html('<font size=\"13\">' + weatherValue.should + '</font>');
            $('#shouldResult').fadeIn(300);
          });
      });
  }catch (err) {alert(err);}
}

function textBoxEnter(e) {
  if (typeof e == 'undefined' && window.event) 
      { e = window.event; }
  if (e.keyCode == 13) {
      getWeather();
  }
}