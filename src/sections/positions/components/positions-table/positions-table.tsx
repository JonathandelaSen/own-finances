import { FC } from "react"

import React from "react"
import { Position } from "@modules/positions/domain/position"
import { Table } from "@sections/shared/components/table/table"

type Props = {
  positions: Position[]
}

export const PositionsTable: FC<Props> = (params: Props) => {
  const columns = React.useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Company",
      },
      {
        accessorKey: "units",
        header: "Units",
        cell: ({ getValue }) => `${getValue<number>().toFixed(4)}`,
      },
      {
        accessorKey: "totalPayedUsd",
        header: "Total payed (USD)",
        cell: ({ getValue }) => `$${getValue<number>().toFixed(2)}`,
      },
      {
        accessorKey: "averagePriceUsd",
        header: "Avg price (USD)",
        cell: ({ getValue }) => `$${getValue<number>().toFixed(2)}`,
      },
      {
        accessorKey: "weightPercentage",
        header: "Weight (spent)",
        cell: ({ getValue }) => `${getValue<number>().toFixed(2)}%`,
      },
    ],
    []
  )

  return <Table data={params.positions} columns={columns} />
}
