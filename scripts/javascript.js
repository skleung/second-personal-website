$(document).ready(function($) { 
	$('.welcome-text').css({
		left: ($(window).width() - $('.welcome-text').width()) / 2 + 'px',
		top: ($(window).height() - $('.welcome-text').height()) / 2 + 'px'
	});	
});
$(window).resize(function($) {
	$('.welcome-text').css({
		left: ($(window).outerWidth() - $('.welcome-text').outerWidth()) / 2 + 'px',
		top: ($(window).outerHeight() - $('.welcome-text').outerHeight()) / 2 + 'px'
	});
});
var researchFlag;
var homeFlag;
var musicFlag;
var codeFlag;

//researchFlag = getUrlVars()["researchFlag"];
function toggleResearch(){
	if (researchFlag !== true){
		researchFlag=true;
		homeFlag=false;
		$('.home').hide();
		//$('.home').fadeOut(1000);
		$('.research').fadeIn(1200);
	}
}
function toggleMusic(){
	if (musicFlag !==true){
		musicFlag = true;
		homeFlag = false;
		$('.home').hide();
		//$('.home').fadeOut(1000);
		$('.music').fadeIn(1200);
	}
}
function toggleCode(){
	if (codeFlag !==true){
		codeFlag = true;
		homeFlag = false;
		$('.home').hide();
		//$('.home').fadeOut(1000);
		$('.code').fadeIn(1200);
	}
}

//source: http://papermashup.com/read-url-get-variables-withjavascript/
function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
  });
  if (vars["research"] === 'true'){
  	toggleResearch();
  }else if (vars["music"] === 'true'){
  	toggleMusic();
  }else{
  	researchFlag = false;
  	musicFlag = false;
  }
}
function defineHeight(arr){
	for (i=0;i<arr.length;i++){
		$('#'+arr[i]) .css({'min-height': (($(window).height())) + 'px'});
	}
}
getUrlVars();
$(document).ready(function(){

	$(".researchFlag").click(function(){
		toggleResearch();
	});
	$(".musicFlag").click(function(){toggleMusic()});
	$(".codeFlag").click(function(){toggleCode()});
	$(".defaultFlag").click(function(event){
		if (homeFlag !== true){
			$('.research').hide();
			$('.music').hide();
			$('.code').hide();
			//$('.research').fadeOut(1000);
			$('.home').fadeIn(1200);
			homeFlag = true;
			researchFlag = false;
			musicFlag = false;
			codeFlag = false;
		}
	});

	//Scrolling animation
	$(".scroll").click(function(event){
		//prevent the default action for the click event
		event.preventDefault();

		//get the full url - like mysitecom/index.htm#home
		var full_url = this.href;

		//split the url by # and get the anchor target name - home in mysitecom/index.htm#home
		var parts = full_url.split("#");
		var trgt = parts[1];

		//get the top offset of the target anchor
		var target_offset = $("#" + trgt).offset();
		var target_top = target_offset.top;

		//goto that anchor by setting the body scroll top to anchor top
		$('html, body').animate({scrollTop: target_top}, 400);
	});
	//Auto-resize function
	var arr = ["home","about","research","contact","classes", "research-home", "code-home", "projects","music-home","researchExp","pubs"]
	for (var i=0; i<arr.length;i++){
		$('#'+arr[i]) .css({'min-height': (($(window).height())) + 'px'});
	}
    $(window).resize(function(){
    	for (var i=0; i<arr.length;i++){
        	$('#'+arr[i]) .css({'min-height': (($(window).height())) + 'px'});
        }
    });
    /*
	$('#about') .css({'min-height': (($(window).height())) + 'px'});
    $(window).resize(function(){
        $('#about') .css({'min-height': (($(window).height())) + 'px'});
    });
	$('#research') .css({'min-height': (($(window).height())) + 'px'});
    $(window).resize(function(){
        $('#research') .css({'min-height': (($(window).height())) + 'px'});
    });
	$('#contact') .css({'min-height': (($(window).height())) + 'px'});
    $(window).resize(function(){
        $('#contact') .css({'min-height': (($(window).height())) + 'px'});
    });
*/
	//Show/hide work-items
	$(".buttons").click(function () {
		var divname = this.name;
		$("#"+divname).slideToggle("swing").siblings(".hide").slideUp("swing");
		return false;
	});
	/*$(".close").click(function () {
		$("#work-item-1").slideUp("swing")
		$("#work-item-2").slideUp("swing")
		$("#work-item-3").slideUp("swing")
		$("#work-item-4").slideUp("swing")
		$("#work-item-5").slideUp("swing")
		$("#work-item-6").slideUp("swing")
		$("#work-item-7").slideUp("swing")
		$("#work-item-8").slideUp("swing")
		$("#work-item-9").slideUp("swing")
		return false;
	});*/
	//Contact form
	/*
	$('#reset').click(function(){
		$('.error').hide();
	});
	$('#send').click(function(){ // when the button is clicked the code executes
		$('.error').hide(); // reset the error messages (hides them)
		var error = false; // we will set this true if the form isn't valid
		var name = $('input#name').val(); // get the value of the input field
		if(name == "" || name == " ") {
			$('#err-name').fadeIn(); // show the error message
			error = true; // change the error state to true
		}
		var email_compare = /^([A-Za-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/; // Syntax to compare against input
		var email = $('input#email').val(); // get the value of the input field
		if (email == "" || email == " ") { // check if the field is empty
			$('#err-email').fadeIn(); // error - empty
			error = true;
		}else if (!email_compare.test(email)) { // if it's not empty check the format against our email_compare variable
			$('#err-emailvld').fadeIn(); // error - not right format
			error = true;
		}
		if(error == true) {
			$('#err-form').fadeIn();
			return false;
		}
		var data_string = $('#contact-form').serialize(); // Collect data from form
		//alert(data_string);
		$.ajax({
			type: "POST",
			url: $('#contact-form').attr('action'),
			data: data_string,
			timeout: 6000,
			error: function(request,error) {
				if (error == "timeout") {
					$('#err-timedout').fadeIn();
				}
				else {
					$('#err-state').fadeIn();
					$("#err-state").html('An error occurred: ' + error + '');
				}
			},
			success: function() {
				$('.success').fadeIn();
				jQuery(".form-input").val("");
			}
		});
		return false; // stops user browser being directed to the php file
	});
*/
});