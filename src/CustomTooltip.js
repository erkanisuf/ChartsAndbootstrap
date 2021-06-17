export const CustomTooltop = (context) => {
  console.log(context);
  // Tooltip Element
  let tooltipEl = document.getElementById("chartjs-tooltip");

  // Create element on first render
  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.id = "chartjs-tooltip";
    tooltipEl.innerHTML = "<table></table>";

    document.body.appendChild(tooltipEl);
  }

  // Hide if no tooltip
  let tooltipModel = context.tooltip;
  if (tooltipModel.opacity === 0) {
    tooltipEl.style.opacity = 0;

    return;
  }

  // Set caret Position
  tooltipEl.classList.remove("above", "below", "no-transform");
  if (tooltipModel.yAlign) {
    tooltipEl.classList.add(tooltipModel.yAlign);
  } else {
    tooltipEl.classList.add("no-transform");
  }

  function getBody(bodyItem) {
    return bodyItem.lines; // This is the Data as string
  }

  // Set Text
  if (tooltipModel.body) {
    let titleLines = tooltipModel.title || [];
    let bodyLines = tooltipModel.body.map(getBody);
    console.log(tooltipModel, "NEw");
    let innerHtml = "<thead>";

    titleLines.forEach(function (title) {
      innerHtml += "<tr><th>" + title + "</th></tr>";
    });
    innerHtml += "</thead><tbody>";

    bodyLines.forEach(function (body, i) {
      let colors = tooltipModel.labelColors[i];
      let style = "background:" + colors.backgroundColor;
      style += "; border-color:" + colors.borderColor;
      style += "; border-width: 2px";
      let span = '<span style="' + style + '"></span>';
      innerHtml += "<tr><td>" + span + body + "</td></tr>";
      innerHtml +=
        "<tr><td>" + span + someExampleFunctionMayBe() + "</td></tr>";
    });
    innerHtml += "</tbody>";

    let tableRoot = tooltipEl.querySelector("table");
    tableRoot.innerHTML = innerHtml;
  }

  let position = context.chart.canvas.getBoundingClientRect();

  // Display, position, and set styles for font
  tooltipEl.classList.add("customtooltip");
  tooltipEl.style.opacity = 1;
  tooltipEl.style.position = "absolute";
  // tooltipEl.style.backgroundColor =
  //   context.tooltip.dataPoints[0].dataset.borderColor;
  tooltipEl.style.padding = "15px";
  tooltipEl.style.cursor = "Pointer";
  tooltipEl.style.left =
    position.left + window.pageXOffset + tooltipModel.caretX + "px";
  tooltipEl.style.top =
    tooltipModel.caretY < 150
      ? position.top + window.pageYOffset + tooltipModel.caretY + 100 + "px"
      : position.top + window.pageYOffset + tooltipModel.caretY + "px";

  tooltipEl.style.padding =
    tooltipModel.padding + "px " + tooltipModel.padding + "px";
  tooltipEl.style.pointerEvents = "none";
};

const someExampleFunctionMayBe = () => {
  return "Migh add extra info maybe";
};
