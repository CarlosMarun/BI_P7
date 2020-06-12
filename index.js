$(document).ready(function () {
  var data1 = [];
  var data2 = [];
  var gender;
  var url = "people.csv";
  var req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.responseType = "arraybuffer";

  req.onload = function (e) {
    var info = readDoc();
    info.forEach((element) => {
      if (element.gender.includes("Female")) {
        data1.push("Female");
      } else {
        data2.push("Male");
      }
    });

    function readDoc() {
      var arraybuffer = req.response;
      var data = new Uint8Array(arraybuffer);
      var arr = new Array();
      for (let i = 0; i < data.length; i++) {
        arr[i] = String.fromCharCode(data[i]);
      }
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });

      var sheet_name = workbook.SheetNames[0];

      var worksheet = workbook.Sheets[sheet_name];
      var info = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      return info;
    }
    var ctx = document.getElementById("myChart");

    var data = (data = {
      datasets: [
        {
          data: [data2.length, data1.length],
          backgroundColor: ["#0398fc", "#ff6bcb"],
        },
      ],
      borderWidth: 1,

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: ["Hombre", "Mujer"],
    });
    var myPieChart = new Chart(ctx, {
      type: "pie",
      data: data,
      backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
    });
  };
  req.send();
});
