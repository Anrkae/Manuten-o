let dataCSV = [];
let headersCSV = [];

function carregarCSV() {
  const fileInput = document.getElementById("csvFile");
  const file = fileInput.files[0];
  if (!file) return alert("Selecione um arquivo CSV.");
  
  const reader = new FileReader();
  reader.onload = function(e) {
    const text = e.target.result;
    processarCSV(text);
  };
  reader.readAsText(file);
}

function processarCSV(text) {
  const lines = text.split(/\r?\n/).filter(l => l.trim() !== "");
  headersCSV = lines[0].split(",");
  dataCSV = lines.slice(1).map(line => {
    const values = line.split(",");
    const obj = {};
    headersCSV.forEach((header, i) => {
      obj[header.trim()] = values[i] ? values[i].trim() : "";
    });
    return obj;
  });
  
  renderTabela();
}

function renderTabela() {
  const container = document.getElementById("tabelaCSV");
  container.innerHTML = "";
  
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  
  headersCSV.forEach(h => {
    const th = document.createElement("th");
    th.textContent = h;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);
  
  const tbody = document.createElement("tbody");
  
  dataCSV.forEach((row, rowIndex) => {
    const tr = document.createElement("tr");
    headersCSV.forEach(header => {
      const td = document.createElement("td");
      td.contentEditable = true;
      td.textContent = row[header];
      td.addEventListener("input", () => {
        dataCSV[rowIndex][header] = td.textContent;
      });
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  
  table.appendChild(tbody);
  container.appendChild(table);
}

function aplicarSubstituicao() {
  const find = document.getElementById("findText").value;
  const replace = document.getElementById("replaceText").value;
  const campo = document.getElementById("targetField").value;
  
  if (!find) return alert("Digite o texto a ser buscado.");
  
  let alterados = 0;
  
  dataCSV.forEach((row, index) => {
    if (campo === "all") {
      for (const key in row) {
        if (row[key] && typeof row[key] === "string" && row[key].includes(find)) {
          row[key] = row[key].replaceAll(find, replace);
          alterados++;
        }
      }
    } else if (row[campo] && row[campo].includes(find)) {
      row[campo] = row[campo].replaceAll(find, replace);
      alterados++;
    }
  });
  
  alert(`${alterados} substituições realizadas.`);
  renderTabela();
}

function alterarDescricao() {
  const filtro = document.getElementById("descricaoFiltroTipo").value.trim();
  const novaDescricao = document.getElementById("descricaoNova").value.trim();
  
  if (!filtro || !novaDescricao) {
    alert("Preencha o tipo de produto e a nova descrição.");
    return;
  }
  
  let alterados = 0;
  
  dataCSV.forEach(row => {
    if (row["Product Type"] && row["Product Type"].includes(filtro)) {
      row["Body (HTML)"] = novaDescricao;
      alterados++;
    }
  });
  
  alert(`Descrição atualizada para ${alterados} produto(s) do tipo "${filtro}".`);
  renderTabela();
}

function mostrarPreviewDescricao() {
  const desc = document.getElementById("descricaoNova").value.trim();
  if (!desc) return alert("Digite a nova descrição.");
  
  const preview = document.getElementById("previewContent");
  preview.innerHTML = desc;
  
  document.getElementById("modalPreview").classList.remove("hidden");
}

function fecharPreview() {
  document.getElementById("modalPreview").classList.add("hidden");
}

function exportarCSV() {
  if (dataCSV.length === 0) {
    alert("Nenhum dado para exportar.");
    return;
  }
  
  const csvRows = [];
  csvRows.push(headersCSV.join(","));
  
  dataCSV.forEach(row => {
    const values = headersCSV.map(h => {
      const val = row[h] ?? "";
      if (val.includes(",") || val.includes('"')) {
        return `"${val.replace(/"/g, '""')}"`;
      }
      return val;
    });
    csvRows.push(values.join(","));
  });
  
  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "produtos_editados.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
