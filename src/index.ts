export type StatementTemplate = {
  propertyID: string;
  propertyLabel: string;
  valueDataType: string;
  valueShape?: string;
  mandatory?: "true" | "false";
  repeatable?: "true" | "false";
};

export type Shape = {
  shapeId: string;
  shapeLabel: string;
  statement_templates: StatementTemplate[];
};

export type Shapes = {
  shapes: Shape[];
  namespaces: { xsd: string; dct: string; foaf: string };
};

import fs from "node:fs/promises";
import { render } from "./render.js";

async function main() {
  const data = await fs.readFile("sb.json", { encoding: "utf8" });
  const json = JSON.parse(data) as Shapes;

  const html = render(json);

  await fs.writeFile("out.html", html);
}

await main();
