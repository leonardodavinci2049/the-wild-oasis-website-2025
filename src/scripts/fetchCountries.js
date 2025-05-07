// Script para buscar países da API e salvar no arquivo countries.ts
const fs = require("fs");
const path = require("path");
const https = require("https");

// URL da API de países
const apiUrl = "https://restcountries.com/v2/all?fields=name,flag";

// Função para buscar os dados da API
function fetchCountries() {
  return new Promise((resolve, reject) => {
    https
      .get(apiUrl, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          try {
            const countries = JSON.parse(data);
            resolve(countries);
          } catch (error) {
            reject(error);
          }
        });
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

// Função para salvar os dados no arquivo countries.ts
async function saveCountries() {
  try {
    const countries = await fetchCountries();

    // Formatar os dados para exportação
    const countriesString = JSON.stringify(countries, null, 2);
    const fileContent = `// filepath: d:\\projects\\nextJS\\the-wild-oasis-website-2025\\src\\data\\countries.ts
// Dados obtidos da API: https://restcountries.com/v2/all?fields=name,flag
// Gerado automaticamente em ${new Date().toLocaleString()}

export const countries = ${countriesString};
`;

    // Caminho do arquivo de destino
    const filePath = path.resolve(__dirname, "../data/countries.ts");

    // Salvar no arquivo
    fs.writeFileSync(filePath, fileContent, "utf8");
    console.log("Arquivo countries.ts atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao buscar ou salvar os países:", error);
  }
}

// Executar a função
saveCountries();
