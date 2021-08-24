## Ejercicios de modelos de entrevistas, basado en el framework Django 
La mejor forma de aprender algo es mediante la práctica y los ejercicios, permitiendo de esta forma mejorar nuestras habilidades como desarrollador.

## Ejercicio #1:
Construye una lista que contenga tramos horarios, en intervalos de 30 minutos, que empiece a las 8:00 am y termine a las 8:00 pm. La empresa tiene una disponiblidad de 8 motociclistas cada 30 minutos, cuando alguien haga click en estas cajitas tomará un recurso de motociclista (un contador que empiece en 8 y baje a 7), además deberá marcar la caja en verde, si vuelve marcar la cajita deberá liberar el recurso (si el contador se encontraba en 7 deberá pasar a 8), si otros usuarios han tomado a todos los motociclistas la caja deberá aparecer en color rojo y no deberá tomar ese horario.

Solución:

![alt text](https://github.com/olperezf/test-interview-Django/blob/master/img/availability_list.jpg?raw=true)


### Views:

    from django.template.defaulttags import register
    from django.views.generic.base import TemplateView


    class AvailabilityView(TemplateView):
        template_name = 'availability_list/availability_list.html'


    @register.filter
    def get_range(value):
        return(sorted(list(range(value)) * 2))[:-1]
        
La función get_range retorna una lista ordenada de elementos que es llamada por la declaración {% for item in 14|get_range %} en la linea 40 del template. Dicha lista tiene la estructura [1,1,2,2,3,3,4,4,5,5...], hasta 28 elementos, pero se necesita 27 elementos es por ello que se utiliza [:-1] al final.

### Template:
    
    {% load mathfilters %}
    {% block content %}

      <center>

        Availability (select Max 8):
        <div id="availability">
         8
        </div>

       {% for hour in 14|get_range %}
           <div id="{{forloop.counter}}" class="rectangle" >
               <b>
                   {% if forloop.counter|divisibleby:2 %}
                       {{ hour|addition:7 }}:30
                   {% else %}
                       {{ hour|addition:7 }}:00
                   {% endif %}
               </b>
           </div>
       {% endfor %}

       <span id="clear">clear all availability hours</span>

       <div><b> Horario Seleccionado:</b></div>
       <div id="selected_schedule" style="text-align: center;"></div>  

       <br><br>
       <a href="{% url 'index'  %}">Volver al Index</a>

      </center>

    {% endblock %} 
    
Para este template se necesita la instalación de django-mathfilters, permitiendo la utilización de addition dentro del for. Y forloop.counter es siempre asignada a un número entero representando el número de veces que se ha entrado en el bucle.
 

### Javascript:

      let availability = 8;
      let schedule = [];
      let selected_schedule = document.getElementById("selected_schedule");
      let ability = document.getElementById("availability");
      let divs = document.getElementsByTagName("div");
      let rectangles = document.getElementsByClassName("rectangle");
      let clear = document.getElementById("clear");


      const orderScheduleAddInHtml = () => {
          schedule.sort((a, b) => new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b));
          selected_schedule.textContent = schedule.join(' <-> ');
          ability.textContent = availability;
      };

      const removeClassAvailable = (div) => {
          div.classList.remove("available");
          availability += 1;
         //ciclo que busca todos los no disponible y los remueve
          for(let div of divs){
              if (div.classList.contains("not_available")){
                removeClassNotAvailable(div); 
              }
          }
          schedule = schedule.filter(item => item !== div.innerText);
          orderScheduleAddInHtml();
      };

      const removeClassNotAvailable = (div) => {
        div.classList.remove("not_available");
        availability += 1;  
      };

      const addClass = (div) => {
        availability -= 1;
        if (availability >= 0){
              schedule.push(div.innerText)
              orderScheduleAddInHtml();
              div.classList.add("available");
          }
          else
              div.classList.add("not_available");
      };


      const main = () => {
        for (let rectangle of rectangles) {
          rectangle.addEventListener('click', (function() {

          let div = document.getElementById(this.id);
          let cls = div.classList;  

          switch (true) {
            case cls.contains('available'):
              removeClassAvailable(div);
              break;
            case cls.contains('not_available'):
              removeClassNotAvailable(div);
              break;
            default:
              addClass(div);
          }

         }))
       }
      };

      clear.addEventListener('click', (function() {
        availability = 8;
        schedule = [];
        for(let div of divs){
          div.classList.remove("not_available");
          div.classList.remove("available");
        }
        selected_schedule.textContent = schedule;
        ability.textContent = availability;
      }));

      main();
      
Este algoritmo en javascript esta basado en añadir y remover clases para el cambio de colores en las cajitas de horas, y tiene un contador que va disminuyendo a medida que se va seleccionando la hora o aumentar cuando deselecciona. La función orderScheduleAddInHtml(), ordena los elementos del arreglo schedule de menor a mayor incluyendolo dentro del html.      
      
### Css:

    .rectangle{
        margin: 20px; 
        width:100px;
        height:50px;
        border: 1px solid black;
        text-align: center;
        display:inline-block;
        cursor: pointer;
        vertical-align: middle;
    }
    .available{
        background: green;

    }
    .not_available{ 
        background: red;
    }

    #clear{
        cursor: pointer;
        text-decoration: underline;
    }
