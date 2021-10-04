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

// ##############################
// // // Ventas por fecha
// #############################
function ventaFecha(){
  const dailySalesChart  = {
    data: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mai",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      series: [[12, 17, 7, 17, 23, 18, 38]]
    },
    options: {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
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
function productoMasVendidos(productos) {

  var nombresProductos = []
  for(let i=0;i<productos.length;i++){
    nombresProductos.push(productos[i]["nombre"]);
  }

  const emailsSubscriptionChart = {
    data: {
      labels: nombresProductos,
      series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]]
    },
    options: {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: 1000,
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
function ventaMeses(){
  var mesActual = new Date();
  var month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", 
              "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  var ultimosMeses = []
  for(let i =6;i>=0;i--){
    if((mesActual.getMonth() - i) < 0){
      ultimosMeses.push(month[12 + (mesActual.getMonth() - i)]);
    } else {
      ultimosMeses.push(month[mesActual.getMonth() - i]);
    }
  }

  const completedTasksChart = {
    data: {
      labels: ultimosMeses,
      series: [[230, 750, 450, 300, 280, 240, 250]]
    },
    options: {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: {
        top: 0,
        right: 0,
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
  ventaFecha,
  productoMasVendidos,
  ventaMeses
};
