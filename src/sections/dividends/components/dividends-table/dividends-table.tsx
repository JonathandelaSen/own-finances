import { FC } from "react"
import {
  getCoreRowModel,
  flexRender,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table"
import React from "react"
import { CompanyDividend } from "@modules/dividends/domain/company-dividend"
import styles from "./dividends-table.module.css"
import { Table } from "@sections/shared/components/table/table"

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

  return <Table data={params.dividends} columns={columns} />
}
