// ##############################
// // // javascript library for creating charts
// #############################
var Chartist = require("chartist");
const { parse } = require("dotenv");
const { default: products } = require("services/products");

// ##############################
// // // variables used to create animation on charts
// #############################
var delays = 80,
  durations = 500;
var delays2 = 80,
  durations2 = 500;
// Meses
var month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", 
"Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

var porcentaje = 0;
// ##############################
// // // Ventas por fecha
// #############################
function getPorcentaje(){
  return porcentaje
}
function ventaFecha(facturas, mesIni, mesFin){
  
  var ventasTotales = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  
  for(let i=0;i<facturas.length;i++){
    let aux = (String(facturas[i].fecha).split('-')[1] - 1)
    for(let j=0;j<(12-aux);j++){
      ventasTotales[aux+j] = ventasTotales[aux+j] + facturas[i]["costo"]
    }
  }
  
 if(ventasTotales[mesIni] == 0){
    porcentaje = Math.round(((ventasTotales[mesFin - 1] - 0) / 
                1) * 100);
  } else {
    porcentaje = Math.round(((ventasTotales[mesFin - 1] - ventasTotales[mesIni]) / 
                Math.abs(ventasTotales[mesIni])) * 100);
  }

  var maxHigh = Math.max(...ventasTotales) + ((Math.max(...ventasTotales) - Math.min(...ventasTotales))/2);

  const dailySalesChart  = {
    data: {
      labels: month.slice(mesIni, mesFin),
      series: [ventasTotales.slice(mesIni, mesFin)]
    },
    options: {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: maxHigh, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      fullWidth: true,
      chartPadding: {
        top: 0,
        right: 55,
        bottom: 0,
        left: 30
      }
    },
    // for animation
    animation: {
      draw: function(data) {
        if (data.type === "line" || data.type === "area") {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path
                .clone()
                .scale(1, 0)
                .translate(0, data.chartRect.height())
                .stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if (data.type === "point") {
          data.element.animate({
            opacity: {
              begin: (data.index + 1) * delays,
              dur: durations,
              from: 0,
              to: 1,
              easing: "ease"
            }
          });
        }
      }
    }
  }
  return dailySalesChart;
}

// ##############################
// // // Producto mas vendidos
// #############################
function productoMasVendidos(productos, facturas) {

  var nombresProductos = []
  var vendidos = []
  for(let i=0;i<productos.length;i++){
    nombresProductos.push(productos[i]["nombre"]);
    vendidos.push(0);
  }

  //Llenara la array con las cantidad de veces que se vendio un producto
  for(let i = 0;i<facturas.length;i++){
    let idProducto = facturas[i]["id_producto"];
    let aux = productos.findIndex(x => x.id === idProducto);
    for(let j=0;j<productos.length;j++){
      switch(idProducto){
        case productos[j]["id"]:
          vendidos[aux] = vendidos[aux] + facturas[i]["cantidad"];
          break;
        default:
          break;
      }
    }
  }

  var maxHigh = Math.max(...vendidos) + ((Math.max(...vendidos) - Math.min(...vendidos))/2);

  const emailsSubscriptionChart = {
    data: {
      labels: nombresProductos,
      series: [vendidos]
    },
    options: {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: maxHigh,
      chartPadding: {
        top: 0,
        right: 5,
        bottom: 0,
        left: 0
      }
    },
    responsiveOptions: [
      [
        "screen and (max-width: 640px)",
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function(value) {
              return value[0];
            }
          }
        }
      ]
    ],
    animation: {
      draw: function(data) {
        if (data.type === "bar") {
          data.element.animate({
            opacity: {
              begin: (data.index + 1) * delays2,
              dur: durations2,
              from: 0,
              to: 1,
              easing: "ease"
            }
          });
        }
      }
    }
  };
  return emailsSubscriptionChart
}
// ##############################
// // // Ventas ultimos 6 meses
// #############################
function ventaMeses(producto, facturas){
  var mesActual = new Date();

  var ultimosMeses = []
  var ultimosNmeses = []
  for(let i =6;i>=0;i--){
    if((mesActual.getMonth() - i) < 0){
      ultimosMeses.push(month[12 + (mesActual.getMonth() - i)]);
      ultimosNmeses.push(12 + (mesActual.getMonth() - i));
    } else {
      ultimosMeses.push(month[mesActual.getMonth() - i]);
      ultimosNmeses.push(mesActual.getMonth() - i);
    }
  }

  var ventas = [0, 0, 0, 0, 0, 0, 0]

  for(let i=0;i<facturas.length;i++){
    if(facturas[i]["id_producto"] == producto){
      for(let j = 0;j<ultimosNmeses.length;j++){
        if((String(facturas[i].fecha).split('-')[1] - 1) == ultimosNmeses[j]){
          ventas[j] = ventas[j] + facturas[i]["cantidad"];
        }
      }
    }
  }
  var maxHigh = Math.max(...ventas) + ((Math.max(...ventas) - Math.min(...ventas))/2);

  const completedTasksChart = {
    data: {
      labels: ultimosMeses,
      series: [ventas]
    },
    options: {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: maxHigh, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      fullWidth: true,
      chartPadding: {
        top: 0,
        right: 45,
        bottom: 0,
        left: 0
      }
    },
    animation: {
      draw: function(data) {
        if (data.type === "line" || data.type === "area") {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path
                .clone()
                .scale(1, 0)
                .translate(0, data.chartRect.height())
                .stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if (data.type === "point") {
          data.element.animate({
            opacity: {
              begin: (data.index + 1) * delays,
              dur: durations,
              from: 0,
              to: 1,
              easing: "ease"
            }
          });
        }
      }
    }
  };
  return completedTasksChart;
}
module.exports = {
  getPorcentaje,
  ventaFecha,
  productoMasVendidos,
  ventaMeses
};
