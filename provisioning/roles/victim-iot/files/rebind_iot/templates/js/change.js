let url_prefix = 'http://www.seediot32.com:8080'

function updateTemperature() {
  $.get(url_prefix + '/password', function(data) {
    let secret = (typeof data === 'object' && data.password) ? data.password : data;
    $.post(url_prefix + '/temperature?value=99'  
               + '&password=' + secret, 
               function(resp) {
                  console.debug('Got a response from the server:', resp);
               });
  });
}

button = document.getElementById("change");
button.addEventListener("click", updateTemperature);
