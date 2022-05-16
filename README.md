# Google Docs Translate Tool

Get translations dictionaries from Google Spreadsheets with i18n-friendly structure

## Features

- Handle all your translations in one place: A Google SpreadSheet
- Use the `=GOOGLETRANSLATE(string_to_translate;input_lang;output_lang)` formula in your spreadsheet to translate your content it's fast and reliable – it uses the same servers that [translate.google.com](https://translate.google.com) uses

## Install

**npm**

```
npm install --save google-docs-translate
```

**yarn**

```
yarn add google-docs-translate
```

## Usage

### 1. Create your translations SpreadSheet

First you need to create your own spreadsheet with the right structure. You can duplicate [this template](https://docs.google.com/spreadsheets/d/1LI9EmmidDE4ycu3H2zHJzgLD5yf8680O9nlj3_Df_Uo/edit?usp=sharing)

Besides the ID column (which will be covered below this section) there are one column for each language. The first one is intended to be the original language and the other onse uses the `=GOOGLETRANSLATE` formula (so it means it's Google Translate Powered). You can add as many records and this formula works for all languages supported by Google Translate. You’ll just need to know the 2-letter code for the language, which you can find in [this list](https://www.loc.gov/standards/iso639-2/php/code_list.php).

For the ID column, as you can see, it represents the key in the nested structure that the string is going to be at inside the generated JSON. i.e:

For this content:
| id | en | es |
| ----------- | ----------- |
| common.welcome | Welcome | Bienvenido |
| common.help | Help | Ayuda |
| homepage.title | Amazing Website | Sitio web increíble |
| homepage.description | We're the best company | Somos la mejor empresa |

The generated json files will look like:

```json
// en.json
{
    "common": {
        "welcome": "Welcome",
        "help": "Help",
    },
    "homepage": {
        "title": "Amazing Website",
        "description": "We're the best company",
    },
}

// es.json
{
    "common": {
        "welcome": "Bienvenido",
        "help": "Ayuda",
    },
    "homepage": {
        "title": "Sitio web increíble",
        "description": "Somos la mejor empresa",
    },
}
```

## License

MIT © [zimoo354](mailto:zimoo354@gmail.com)
