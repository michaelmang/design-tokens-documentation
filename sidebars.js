const fs = require("fs");

const DOCS_FOLDER = "./docs/";

let tokens = [];

fs.readdirSync(DOCS_FOLDER).forEach((file) => {
  const contents = fs.readFileSync(`${DOCS_FOLDER}${file}`, "utf-8");

  const tagsMatcher = /tags: \[.*\]/gm;
  const tags = contents.match(tagsMatcher);
  if (tags && tags[0].includes("tokens")) {
    const idMatcher = /id: .*/gm;
    const id = contents.match(idMatcher)[0].split(":")[1].trim();
    tokens.push(id);
  }
});

module.exports = {
  someSidebar: {
    Tokens: tokens,
  },
};
