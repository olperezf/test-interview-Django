// función que se ejecuta cuando el DOM haya cargado todos los nodos
document.addEventListener("DOMContentLoaded", function(){
  
  let availability = 8;
  let ability = document.getElementById("availability");
  let divs = document.getElementsByTagName("div");
  let rectangles = document.getElementsByClassName("rectangle");
  let clear = document.getElementById("clear");
  
  const removeClassAvailable = function(div) {
      div.classList.remove("available");
      availability += 1;
     //ciclo que busca todos los no disponible y los remueve
      for(div of divs){
          if (div.classList.contains("not_available")){
            removeClassNotAvailable(div); 
          }
      }        
      ability.textContent = availability;
  }

  const removeClassNotAvailable = function(div){
    div.classList.remove("not_available");
    availability += 1;  
  }

  const addClass = function(div){
    availability -= 1;
    if (availability >= 0){ 
          ability.textContent = availability;
          div.classList.add("available");
      }
      else
          div.classList.add("not_available");
  }

  const main = function(){
    for (rectangle of rectangles) {
      rectangle.addEventListener('click', (function() {
    
      let div = document.getElementById(this.id);
      
      if (div.classList.contains('available')){
         removeClassAvailable(div);
      }
      else{
          if (div.classList.contains('not_available')){
            removeClassNotAvailable(div);
          }
          else{
            addClass(div);
          }  
      }
      
     }))
   }
  }

  clear.addEventListener('click', (function() {
    availability = 8;
    for(div of divs){
      div.classList.remove("not_available");
      div.classList.remove("available");
    }        
    ability.textContent = availability;
  }));

  main();

});


