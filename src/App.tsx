import "./App.css";
import {
  getCoreRowModel,
  flexRender,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";

import { DividendGetter } from "./modules/dividends/application/dividend-getter";
import { CompanyDividend } from "@modules/dividends/domain/company-dividend";
import { LocalFileEtoroDividendRepository } from "@modules/dividends/infrastructure/local-file-etoro-dividend-repository";

function App() {
  const [data, setData] = useState<CompanyDividend[]>([]);
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
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <h1>Dividends</h1>
      <div className="card">
        <button onClick={() => readEToro()}>Read</button>
      </div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
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
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </>
  );

  async function readEToro() {
    const getter = new DividendGetter(new LocalFileEtoroDividendRepository());
    const dividends = await getter.run(2023);
    setData(dividends);
  }
}

export default App;
