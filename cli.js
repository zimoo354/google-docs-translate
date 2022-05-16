#! /usr/bin/env node

const { readCsv, formatData, saveToFile } = require("./utils");

const getTranslations = async () => {
  const { SPREADSHEET_ID, PAGE_ID } = process.env;

  const SPREADSHEET_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${
    PAGE_ID || "0"
  }`;

  const rawData = await readCsv(SPREADSHEET_URL);
  const formattedData = formatData(rawData);
  await saveToFile(formattedData);
  console.log("Success ✅");
};

getTranslations();
