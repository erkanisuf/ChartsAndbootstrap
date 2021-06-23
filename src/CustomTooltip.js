export const CustomTooltop = async (context) => {
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
  // console.log(context.tooltip.dataPoints[0].raw); // if custom obj with cusotm data
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

    let innerHtml = "<thead>";

    titleLines.forEach(async function (title) {
      innerHtml += "<tr><th>" + title + "</th></tr>";
      innerHtml += "<tr><th>" + "WTF WE MAn" + "</th></tr>";
      const itemZ = await startFetch();
      if (itemZ.length) {
        innerHtml +=
          "<tr><th>" + itemZ[0].NewConfirmed.toString() + "</th></tr>";
      }

      console.log(itemZ.length);
    });
    innerHtml += "</thead><tbody>";

    bodyLines.forEach(async function (body, i) {
      let colors = tooltipModel.labelColors[i];
      let style = "background:" + colors.backgroundColor;
      style += "; border-color:" + colors.borderColor;
      style += "; border-width: 2px";
      let span = '<span style="' + style + '"></span>';
      innerHtml += "<tr><td>" + span + body + "</td></tr>";

      // innerHtml +=
      //   "<tr><td>" + span + someExampleFunctionMayBe(context) + "</td></tr>";
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
    position.top + window.pageYOffset + tooltipModel.caretY + "px";

  tooltipEl.style.padding =
    tooltipModel.padding + "px " + tooltipModel.padding + "px";
  //   tooltipEl.style.pointerEvents = "none";
};

// const someExampleFunctionMayBe = (context) => {
//   return context.tooltip.dataPoints[0].raw.x;
// };

const startFetch = () => {
  return fetch(
    "https://api.covid19api.com/world?from=2021-06-10T00:00:00Z&to=2021-06-18T00:00:00Z"
  )
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => console.log(err));
};
