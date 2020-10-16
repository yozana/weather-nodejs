
//console.log("Client side java script file is loaded")
$(document).ready(function () {
    var address = '';
    $('input[type="submit"]').click(function(){        
        address = $('input[type="text"]').val();
        
    });

    $("form").submit(function(e) {
        
        e.preventDefault(); // avoid to execute the actual submit of the form.
        
        $.ajax({
               type: "GET",
               url: 'http://localhost:3000/weather?address=' + address, 
               //data: form.serialize(), // serializes the form's elements.
               success: (res) => {
                console.log("Setting html data", res.data)
                $('#weather-data').html('<p>Data is ' + res.data.current.temperature +  '</p>');
            },
             });
    
        
    });
    
});
   
//   });

// fetch('http://localhost:3000/weather?address=ashkelon,israel').then((response) => {
//     response.json().then((data) => console.log("Returned data:", data))
// })

