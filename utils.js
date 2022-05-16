const request = require("request");
const fse = require("fs-extra");
const { StringStream } = require("scramjet");

const readCsv = async (SPREADSHEET_URL) => {
  const data = [];
  await request
    .get(SPREADSHEET_URL)
    .pipe(new StringStream())
    .CSVParse()
    .consume((object) => {
      if (object[0].includes("!DOCTYPE html")) {
        throw new Error("Invalid spreadsheet");
      }
      if (object[0] && object[1]) {
        // if there's no id and original language, it's not going to be considered
        data.push(object);
      }
    });

  return data;
};

const unflattenJSON = (data) => {
  if (Object(data) !== data || Array.isArray(data)) return data;
  var regex = /\.?([^.\[\]]+)|\[(\d+)\]/g,
    resultholder = {};
  for (var p in data) {
    var cur = resultholder,
      prop = "",
      m;
    while ((m = regex.exec(p))) {
      cur = cur[prop] || (cur[prop] = m[2] ? [] : {});
      prop = m[2] || m[1];
    }
    cur[prop] = data[p];
  }
  return resultholder[""] || resultholder;
};

const formatData = (data) => {
  const headers = data.shift();
  const formattedData = {};
  for (let i = 1; i < headers.length; i++) {
    const currentLang = {};
    const lang = headers[i];
    if (lang) {
      for (const row of data) {
        currentLang[row[0]] = row[i];
      }

      formattedData[lang] = unflattenJSON(currentLang);
    }
  }
  const final = unflattenJSON(formattedData);
  return final;
};

const saveToFile = async (data) => {
  const path = process.env.TRANSLATE_PATH || "./src/locales/";

  const languages = Object.keys(data);
  for (const lang of languages) {
    await fse.outputFile(
      `${path}${lang}.json`,
      JSON.stringify(data[lang], null, 2)
    );
  }
};

module.exports = {
  readCsv,
  formatData,
  saveToFile,
};
