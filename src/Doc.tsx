import { Shape, Shapes, StatementTemplate } from ".";

type Props = {
  shapes: Shapes;
};

let num = 0;
function renderStatement(stmt: StatementTemplate): JSX.Element {
  const entries = Object.entries(stmt);
  const keysToIgnore = ["propertyID", "propertyLabel"];

  return (
    <div key={`stmt_${num++}`}>
      <span className="property">{stmt.propertyID}</span>
      <span className="label" style={{ marginLeft: 5 }}>
        ({stmt.propertyLabel})
      </span>
      <ul>
        {entries.map(([k, v]) =>
          keysToIgnore.includes(k) ? null : (
            <li key={`key_${k}`}>
              <i>{k}</i> "{v}"
            </li>
          )
        )}
      </ul>
    </div>
  );
}

function renderShape(shape: Shape, n: number): JSX.Element {
  return (
    <div className="shapeDiv" key={`shape_${n}`}>
      <div className="shapeProperty">{shape.shapeLabel}</div>

      <div className="statementDiv">
        {shape.statement_templates.map(renderStatement)}
      </div>
    </div>
  );
}

export function Doc({ shapes }: Props): JSX.Element {
  return <div>{shapes.shapes.map((s, i) => renderShape(s, i + 1))}</div>;
}
