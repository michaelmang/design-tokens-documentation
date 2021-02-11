const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

const DOCS_FOLDER = "./docs/";
const TOKENS_FOLDER = "./tokens/";

fs.readdirSync(TOKENS_FOLDER).forEach((file) => {
  const extension = path.parse(file).ext;
  const docName = extension.replace(".", "").toUpperCase();

  const contents = fs.readFileSync(`${TOKENS_FOLDER}${file}`, "utf-8");

  const cssVariableMatcher = /--.+: .+(?=;)/gm;
  const variables = contents.match(cssVariableMatcher);

  const keyValueRows = variables.map((variable) => {
    const [key, value] = variable.split(":");
    return `| ${key} | ${value} |`;
  });

  const markdown = `
  ---
  id: ${docName}
  slug: /
  sidebar_label: ${docName}
  title: ${docName} Tokens
  tags: [tokens]
  ---
  | Key | Value |
  | ------------- | ------------- |
  ${keyValueRows.join("\n")}
  `;

  const data = prettier.format(markdown, {
    parser: "markdown",
  });

  fs.writeFileSync(`${DOCS_FOLDER}${docName}.md`, data);
});
