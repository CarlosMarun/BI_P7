let people;
drawChart();
async function drawChart() {
  await getData();

  const creditCards = people.reduce((r, a) => {
    r[a.CreditCardType] = r[a.CreditCardType] || [];
    r[a.CreditCardType].push(a);
    return r;
  }, Object.create(null));
  const creditCardLabels = Object.keys(creditCards).map((item) => item);
  const creditCardValues = Object.keys(creditCards).map((item) => item.length);

  const data = {
    labels: creditCardLabels,
    datasets: [
      {
        label: [],
        data: creditCardValues,
        backgroundColor: [
          "#a742f5",
          "#f242f5",
          "#ddf542",
          "#57f542",
          "#34495e",
          "#4266f5",
          "#e67e22",
          "#e74c3c",
          "#95a5a6",
          "#1abc9c",
          "#2ecc71",
          "#3498db",
          "#9b59b6",
          "#34495e",
          "#f1c40f",
          "#e67e22",
          "#e74c3c",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
  };

  const ctx = document.getElementById("myChart1").getContext("2d");
  const chart1 = new Chart(ctx, {
    type: "bar",
    data: data,
    options: options,
  });
}

async function getData() {
  const response = await fetch("./data/people.json");
  const data = await response.json();
  people = data;
}
