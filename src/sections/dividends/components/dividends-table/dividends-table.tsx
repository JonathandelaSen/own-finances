import { FC } from "react"
import {
  getCoreRowModel,
  flexRender,
  useReactTable,
} from "@tanstack/react-table"
import React from "react"
import { CompanyDividend } from "@modules/dividends/domain/company-dividend"
import styles from "./dividends-table.module.css"

type Props = {
  dividends: CompanyDividend[]
}

export const DividendsTable: FC<Props> = (params: Props) => {
  const columns = React.useMemo(
    () => [
      {
        accessorKey: "companyName",
        header: "Company Name",
      },
      {
        accessorKey: "netDividendUSD",
        header: "Net Dividend (USD)",
        cell: ({ getValue }) => `$${getValue<number>().toFixed(2)}`,
      },
      {
        accessorKey: "netDividendEUR",
        header: "Net Dividend (EUR)",
        cell: ({ getValue }) => `€${getValue<number>().toFixed(2)}`,
      },
      {
        accessorKey: "withholdingTaxRate",
        header: "Withholding Tax Rate",
      },
      {
        accessorKey: "withholdingTaxAmountUSD",
        header: "Withholding Tax (USD)",
        cell: ({ getValue }) => `$${getValue<number>().toFixed(2)}`,
      },
      {
        accessorKey: "withholdingTaxAmountEUR",
        header: "Withholding Tax (EUR)",
        cell: ({ getValue }) => `€${getValue<number>().toFixed(2)}`,
      },
    ],
    []
  )
  const table = useReactTable({
    data: params.dividends,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className={styles.columnHeader}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row, index) => (
          <tr
            className={`${styles.row} ${
              index % 2 === 0 ? null : styles.oddRow
            }`}
            key={row.id}
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className={styles.cell}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
