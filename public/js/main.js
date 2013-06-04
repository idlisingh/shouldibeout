function textBoxEnter(e) {
  if (typeof e == 'undefined' && window.event) 
      { e = window.event; }
  if (e.keyCode == 13) {
      getWeather();
  }
}

function getWeather() {
  var zipCode = $('#zipCode').val();
  if (zipCode.length == 0) {
    alert("Enter a Zip Code or City");
    return;
  }
  try {
    $.post('/weather', 
        {zipCode: zipCode}, 
        function(data) {
          var weatherValue = JSON.parse(data);
          $('#shouldResult').fadeOut(300, function() {
            $('#shouldResult').html('<font style="color:black;font-size:50pt">Location: ' + weatherValue.city + '<br/><br/> ' + weatherValue.should + '</font>');
            $('#shouldResult').fadeIn(300);
          });
      });
  }catch (err) {alert(err);}
}