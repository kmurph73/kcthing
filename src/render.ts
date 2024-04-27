import { Shape, Shapes, StatementTemplate } from ".";

const html = `<!DOCTYPE html>
<html>
  <head>
    <style>
      td {
      	margin: 25px;
      } 
      .shapeTable {
      	border-style: solid;
      	border-width: 2px;
      	width: 100%;
      }  
      .statementTable {
      	border-style: dotted;
      	border-width: 2px;
      	background: none;
      	margin-left: 25px;
      	width: 100%;
      }
      </style>
      <title></title>
 </head>
 <body>`;

export const renderStatement = (stmt: StatementTemplate): string => {
  return `
<table class="statementTable">
  <tr>
    <td>
      <strong>propertyID</strong> ${stmt.propertyID}
    </td>
  </tr>
  <tr>
    <td>
      propertyLabel "${stmt.propertyLabel}"
    </td>
  </tr>
  <tr>
    <td>
      valueType "${stmt.valueDataType}"
    </td>
  </tr>
  ${
    stmt.valueShape
      ? `
    <tr>
      <td>
        valueShape "${stmt.valueShape}"
      </td>
    </tr>`
      : ""
  }

  ${
    stmt.mandatory
      ? `<tr>
          <td>mandatory? "${stmt.mandatory}"</td>
        </tr>`
      : ""
  }

  ${
    stmt.repeatable
      ? `<tr>
          <td>repeatable? "${stmt.repeatable}"</td>
         </tr>`
      : ""
  }
</table>
	`.trim();
};
export const renderShape = (shape: Shape, n: number): string => {
  const statementTemplateHtml = shape.statement_templates
    .map(renderStatement)
    .join("");

  return `
<h2>Shape ${n}</h2>
<table class="shapeTable">
  <tr>
    <td>
      <strong>shapeID</strong> "${shape.shapeId}"
    </td>
  </tr>
  <tr>
    <td>
      shapeLabel "${shape.shapeLabel}"
    </td>
  </tr>
  <tr>
    <td>${statementTemplateHtml}</td>
  </tr>
</table>`.trim();
};

export const render = (shapes: Shapes) => {
  const shapeHtml = shapes.shapes.map((s, i) => renderShape(s, i + 1)).join("");
  const finalHtml = html + shapeHtml + "</body></html>";

  return finalHtml;
};
