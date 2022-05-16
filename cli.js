#! /usr/bin/env node

const { readCsv, formatData, saveToFile } = require("./utils");

const getTranslations = async () => {
  const [SPREADSHEET_ID, SPREADSHEET_PAGE] = process.argv.slice(2);
  const SPREADSHEET_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${
    SPREADSHEET_PAGE || "0"
  }`;
  const rawData = await readCsv(SPREADSHEET_URL);
  const formattedData = formatData(rawData);
  await saveToFile(formattedData);
  console.log("Success ✅");
};

getTranslations();
