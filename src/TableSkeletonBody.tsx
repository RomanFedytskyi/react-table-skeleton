import * as React from "react";

type ColumnInput = number | string | { width?: number | string };

export type TableSkeletonBodyProps = {
  rows?: number;
  columns?: number | ColumnInput[];
  rowHeight?: number | string;
  cellPadding?: number | string;
  shimmer?: boolean;
  randomize?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

const toColumns = (columns: number | ColumnInput[]) => {
  if (typeof columns === "number")
    return Array.from({ length: columns }).map(() => ({ width: undefined }));
  return columns.map((c) => {
    if (typeof c === "number" || typeof c === "string") return { width: c };
    return { width: c.width };
  });
};

const seededPct = (i: number) => {
  const x = (i * 9301 + 49297) % 233280;
  return 60 + Math.floor((x / 233280) * 40);
};

export const TableSkeletonBody: React.FC<TableSkeletonBodyProps> = ({
  rows = 5,
  columns = 3,
  rowHeight = "48px",
  cellPadding = "8px",
  shimmer = true,
  randomize = false,
  className,
  style,
}) => {
  const cols = React.useMemo(() => toColumns(columns), [columns]);

  const columnWidths = React.useMemo(() => {
    return cols.map((c, i) => {
      const w = (c as any).width;
      if (randomize && (w === undefined || w === "auto"))
        return `${seededPct(i)}%`;
      if (typeof w === "number") return `${w}px`;
      if (!w) return undefined;
      return String(w);
    });
  }, [cols, randomize]);

  const rowStyle: React.CSSProperties = {
    height: typeof rowHeight === "number" ? `${rowHeight}px` : rowHeight,
  };
  const tdBase: React.CSSProperties = {
    padding: typeof cellPadding === "number" ? `${cellPadding}px` : cellPadding,
    boxSizing: "border-box",
    verticalAlign: "middle",
  };

  return (
    <tbody aria-busy="true" className={className} style={style}>
      {Array.from({ length: rows }).map((_, r) => (
        <tr key={r} style={rowStyle}>
          {cols.map((_, cIdx) => {
            const width = columnWidths[cIdx];
            const tdStyle = width ? { ...tdBase, width } : tdBase;
            return (
              <td key={cIdx} style={tdStyle} role="cell" aria-hidden="true">
                <div
                  role="presentation"
                  className={`rts-bar ${shimmer ? "rts-shimmer" : ""}`}
                />
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default TableSkeletonBody;
