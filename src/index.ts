export type StatementTemplate = Record<string, string>;

export type Shape = {
  shapeID?: string;
  shapeLabel?: string;
  statement_templates: StatementTemplate[];
};

export type Shapes = {
  shapes: Shape[];
  namespaces: { xsd: string; dct: string; foaf: string };
};

import fs from "node:fs/promises";
import { renderToStaticMarkup } from "react-dom/server";
import { Doc } from "./Doc.js";

async function main() {
  const data = await fs.readFile("sb.json", { encoding: "utf8" });
  const layout = await fs.readFile("layout.html", { encoding: "utf8" });

  const [start, end] = layout.split("{}");

  const json = JSON.parse(data) as Shapes;

  const docs = Doc({ shapes: json });
  const body = renderToStaticMarkup(docs);

  const html = [start, body, end].join("");

  await fs.writeFile("out.html", html);
}

await main();
