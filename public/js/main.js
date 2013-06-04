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
            if (weatherValue.should == "Error occured") {
              $('#shouldResult').html('<font style="color:black;font-size:50pt">I dont know where \"' + zipCode + '\" is!!</font>');
            }else {
              $('#shouldResult').html('<font style="color:black;font-size:50pt">In ' + weatherValue.city + '<br/><br/> ' + weatherValue.should + '</font>');
            }
            $('#shouldResult').fadeIn(300);
          });
      });
  }catch (err) {alert(err);}
}