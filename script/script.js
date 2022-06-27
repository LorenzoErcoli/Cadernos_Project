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
  }
}



// function close(){
  
//   console.log("chiudi")
//   $("#id_close_button").animate({opacity: 0},1000)
// }