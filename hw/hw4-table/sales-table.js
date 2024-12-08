class SelectFilter {
  parentElement = null;
  selectElement = document.createElement("select");
  label = document.createElement("label");
  labelText = "";

  constructor(options, labelText, parentElement) {
    this.parentElement = parentElement;
    this.options = options;
    this.labelText = labelText;
  }

  render() {
    const group = document.createElement("div");
    group.classList.add("filter-group");
    this.label.textContent = this.labelText;
    group.appendChild(this.label);

    this.options.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.value = option;
      optionElement.textContent = option;
      this.selectElement.appendChild(optionElement);
    });

    group.appendChild(this.selectElement);
    this.parentElement.appendChild(group);
  }

  onChange(callback) {
    this.selectElement.addEventListener("change", callback);
  }
}

class SalesTable {
  #originalData = [];
  #currentData = [];
  filters = {
    region: null,
    model: null,
  };
  headLabels = ["Region", "Model", "Sales"];
  parentElement = null;
  tableElement = null;
  tHeadElement = null;
  tBodyElement = null;

  constructor(data, parentElement) {
    this.parentElement = parentElement;
    this.#originalData = data;
    this.#currentData = data;
  }

  get data() {
    return this.#currentData;
  }

  set data(data) {
    this.#currentData = data;
  }

  setFilter(filter, value) {
    this.filters[filter] = value === "All" ? null : value;
    this.applyFilters();
    this.replaceTBodyWithNewData();
  }

  applyFilters() {
    this.#currentData = this.#originalData.filter((item) => {
      const regionMatch =
        this.filters.region === null || item.region === this.filters.region;
      const modelMatch =
        this.filters.model === null || item.model === this.filters.model;
      return regionMatch && modelMatch;
    });
  }

  render() {
<<<<<<< HEAD
    this.parentElement.appendChild(this.generateTable());
=======
    this.parentElement.replaceChildren(this.generateTable());
>>>>>>> 5783d4a951616438611353d595fe900cb7da770f
  }

  renderWithSum() {
    this.addDataSumByRegion();
    this.render();
  }

  replaceTBodyWithNewData() {
    this.tBodyElement.innerHTML = "";
    this.#currentData.forEach((item) => {
      const tds = [
        this.generateTd(item.region),
        this.generateTd(item.model),
        this.generateTd(this.formatNumber(item.sales)),
      ];
      this.tBodyElement.appendChild(this.generateTr(tds));
    });
  }

  generateTbody() {
    this.tBodyElement = document.createElement("tbody");
    this.#currentData.forEach((item) => {
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

  getDataSortedByRegion() {
    return this.#originalData.slice().sort((a, b) => b.region - a.region);
  }

  addDataSumByRegion() {
    let previousRegion = "";
<<<<<<< HEAD
    this.#currentData = [];
=======
>>>>>>> 5783d4a951616438611353d595fe900cb7da770f
    this.getDataSortedByRegion().forEach((item) => {
      if (item.region !== previousRegion) {
        previousRegion = item.region;
        this.#currentData.push({
          region: item.region,
          model: "Sum",
          sales: this.getTotalSalesByRegion(item.region),
        });
      }
<<<<<<< HEAD

=======
>>>>>>> 5783d4a951616438611353d595fe900cb7da770f
      this.#currentData.push(item);
    });
  }

  getTotalSalesByRegion(region) {
    return this.#originalData
      .filter((item) => item.region === region)
      .reduce((acc, item) => acc + item.sales, 0);
  }

  formatNumber(number) {
    return number.toLocaleString("en-US", { maximumFractionDigits: 0 });
  }
}
