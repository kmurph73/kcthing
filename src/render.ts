import { Shape, Shapes, StatementTemplate } from ".";

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

  ${
    stmt.valueDataType
      ? `
    <tr>
      <td>
        valueType "${stmt.valueDataType}"
      </td>
    </tr>`
      : ""
  }

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
      <strong>shapeID</strong> "${shape.shapeID}"
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

export const renderBody = (shapes: Shapes) => {
  return shapes.shapes.map((s, i) => renderShape(s, i + 1)).join("");
};
