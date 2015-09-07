
console.log("index.js loaded");

$(document).ready(function() {

    $( document ).bind( "mobileinit", function() {
        // Make jQuery Mobile framework configuration changes here
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
    });
    
    

     
$('#temp > input[type="button"]').click(function(){
	console.log("a temp button pressed");
	event.preventDefault();

    $('#temp input[type="button"].active').removeClass('active');
        $(this).addClass('active');
});


$('#lighting > input[type="button"]').click(function(){
	console.log("a lighting button pressed");
	event.preventDefault();

    $('#lighting input[type="button"].active').removeClass('active');
        $(this).addClass('active');
});


$('#noise > input[type="button"]').click(function(){
	console.log("a noise button pressed");
	event.preventDefault();

    $('#noise input[type="button"].active').removeClass('active');
        $(this).addClass('active');
});


$('#activity > input[type="button"]').click(function(){
	console.log("a activity button pressed");
	event.preventDefault();

    $('#activity input[type="button"].active').removeClass('active');
        $(this).addClass('active');
});






$('#submitButton').click(function(){
	console.log("submitButton clicked");

	$(".active").each( function () {
		console.log( $(this).val() );
		// hack - because nearest parent is a div of JQM without an id
		console.log( $(this).parent().attr("id"));
	});
});             
                  


                  





});


