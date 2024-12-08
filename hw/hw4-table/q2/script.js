const data = [
  { region: "US", model: "A", sales: 150 },
  { region: "US", model: "B", sales: 120 },
  { region: "US", model: "C", sales: 350 },
  { region: "EU", model: "A", sales: 200 },
  { region: "EU", model: "B", sales: 100 },
  { region: "EU", model: "C", sales: 250 },
  { region: "CA", model: "A", sales: 200 },
  { region: "CA", model: "B", sales: 100 },
  { region: "CA", model: "C", sales: 230 },
  { region: "CA", model: "D", sales: 400 },
];

const regionOptions = ["All", ...new Set(data.map((item) => item.region))];
const modelOptions = ["All", ...new Set(data.map((item) => item.model))];
const tableHeader = document.getElementById("table-header");
const filterRegion = new SelectFilter(
  regionOptions,
  "Region Filter",
  tableHeader
);
const filterModel = new SelectFilter(modelOptions, "Model Filter", tableHeader);
filterRegion.render();
filterModel.render();

const tableContent = document.getElementById("table-content");
const salesTable = new SalesTable(data, tableContent);
salesTable.render();

filterRegion.onChange((event) => {
  salesTable.setFilter("region", event.target.value);
});
filterModel.onChange((event) => {
  salesTable.setFilter("model", event.target.value);
});
