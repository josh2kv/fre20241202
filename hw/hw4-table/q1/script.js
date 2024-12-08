class SalesTable {
  dataSorted = [];
  dataWithSum = [];
  headLabels = ["Region", "Model", "Sales"];
  parentElement = null;
  tableElement = null;
  tHeadElement = null;
  tBodyElement = null;

  constructor(parentElement, data) {
    this.parentElement = parentElement;
    this.dataSorted = data.slice().sort((a, b) => b.region - a.region);
    this.insertSumData();
  }

  render() {
    this.parentElement.appendChild(this.generateTable());
  }

  generateTbody() {
    this.tBodyElement = document.createElement("tbody");
    this.dataWithSum.forEach((item) => {
      const tds = [
        this.generateTd(item.region),
        this.generateTd(item.model),
        this.generateTd(this.formatNumber(item.sales)),
      ];
      this.tBodyElement.appendChild(this.generateTr(tds));
    });
    return this.tBodyElement;
  }

  generateThead() {
    this.tHeadElement = document.createElement("thead");
    const tr = document.createElement("tr");
    this.headLabels.forEach((label) => {
      tr.appendChild(this.generateTd(label));
    });
    this.tHeadElement.appendChild(tr);
    return this.tHeadElement;
  }

  generateTable() {
    this.tableElement = document.createElement("table");
    this.tableElement.appendChild(this.generateThead());
    this.tableElement.appendChild(this.generateTbody());
    return this.tableElement;
  }

  generateTr(tds) {
    const tr = document.createElement("tr");
    tds.forEach((td) => {
      tr.appendChild(td);
    });
    return tr;
  }

  generateTd(text) {
    const td = document.createElement("td");
    td.textContent = text;
    return td;
  }

  insertSumData() {
    let previousRegion = "";
    this.dataSorted.forEach((item) => {
      if (item.region !== previousRegion) {
        previousRegion = item.region;
        this.dataWithSum.push({
          region: item.region,
          model: "Sum",
          sales: this.getTotalSalesByRegion(item.region),
        });
      }
      this.dataWithSum.push(item);
    });
  }

  getTotalSalesByRegion(region) {
    return this.dataSorted
      .filter((item) => item.region === region)
      .reduce((acc, item) => acc + item.sales, 0);
  }

  formatNumber(number) {
    return number.toLocaleString("en-US", { maximumFractionDigits: 0 });
  }
}

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

const salesTable = new SalesTable(document.body, data);
salesTable.render();
