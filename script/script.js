(function(){   

  if (window.addEventListener)
  {
    window.addEventListener("load", nascondi_loading_screen, false);    
  }else{
    window.attachEvent("onload", nascondi_loading_screen);
  }
})();

function nascondi_loading_screen()
{
  // document.getElementById("loading_screen").style.display = 'none';
  $("#id_load_main_column").animate({opacity: 0},0)
  $("#id_load_main_column").animate({opacity: 1},100)

  $("#id_load_time").animate({opacity: 1},4000)
  $("#id_loading_page").animate({opacity: 1},4000)
  $("#id_load_main_column").animate({opacity: 1},4000)

  $("#id_load_main_column").animate({opacity: 0},5000)
  $("#id_loading_page").animate({opacity: 0},5000)
  $("#id_loading_page").animate({display: 'none'},7000)

  setTimeout(function() {removeloading()} ,10000)

  function removeloading(){
	  var el = document.getElementById('id_loading_page')
	  el.remove()
  };
};



function click_close(){

  let status_about = document.getElementsByClassName('close_button_icon')[0].innerHTML
  let w = window.innerWidth
  console.log(w)


  if (w < 600){
    var_left_margin =  "78%"
  }else{
    var_left_margin =  "90%"
  }

  if (status_about == "close"){

    console.log("chiudi")

    $(".about_text").animate({opacity: 0},300)
    $("#id_about_page").animate({width: 0},1000)
    $(".close_button").animate({left: "2%"},1000)

    document.getElementsByClassName('close_button_icon')[0].innerHTML = "info"
  
  }else{


    $(".about_text").animate({opacity: 1},1000)
    $("#id_about_page").animate({width: "100%"},800)
    $(".close_button").animate({left:  var_left_margin},1000)

    document.getElementsByClassName('close_button_icon')[0].innerHTML = "close"

  }


}