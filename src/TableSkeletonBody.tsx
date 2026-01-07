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
  // Theming props (v0.2.0)
  backgroundColor?: string;
  shimmerColor?: string;
  barHeight?: number | string;
  barBorderRadius?: number | string;
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
  backgroundColor,
  shimmerColor,
  barHeight,
  barBorderRadius,
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

  // Build CSS variables for theming
  const themeVars: React.CSSProperties = {
    ...(backgroundColor && { "--rts-bg-color": backgroundColor } as any),
    ...(shimmerColor && { "--rts-shimmer-color": shimmerColor } as any),
    ...(barHeight && {
      "--rts-bar-height":
        typeof barHeight === "number" ? `${barHeight}px` : barHeight,
    } as any),
    ...(barBorderRadius && {
      "--rts-bar-radius":
        typeof barBorderRadius === "number"
          ? `${barBorderRadius}px`
          : barBorderRadius,
    } as any),
  };

  const tbodyStyle: React.CSSProperties = {
    ...themeVars,
    ...style,
  };

  return (
    <tbody aria-busy="true" className={className} style={tbodyStyle}>
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
