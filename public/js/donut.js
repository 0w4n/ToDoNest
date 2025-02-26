import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// Cargar datos desde el JSON
d3.json("data")
  .then((data) => {
    const dataset = data.dataset; // Extraer los datos del JSON

    // Configuración del gráfico
    const width = 250;
    const height = 250;
    const innerRadius = 70; // Radio interno (para hacer un "donut chart")
    const outerRadius = 120; // Radio externo
    const cornerRadius = 10; // Corner radius

    // Seleccionar el div.chart y agregar un SVG
    const svg = d3
      .select(".chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Crea el generador de sectores
    const pie = d3.pie().value((d) => d.value);
    const arc = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .cornerRadius(cornerRadius);

    // Genera los sectores y los dibuja con animación
    svg
      .selectAll("path")
      .data(pie(dataset))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => d.data.color) // Asigna los colores desde el JSON
      .attr("stroke", "#fff")
      .style("stroke-width", "2px")
      .transition()
      .duration(1000)
      .attrTween("d", function (d) {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return function (t) {
          return arc(interpolate(t));
        };
      });
  })
  .catch((error) => console.error("Error al cargar el JSON:", error));
