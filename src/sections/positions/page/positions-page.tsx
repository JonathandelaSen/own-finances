import { useEffect, useState } from "react"
import { PositionsGetter } from "@modules/positions/application/positions-getter"
import { LocalFileEtoroPositionRepository } from "@modules/positions/infrastructure/local-file-etoro-position-repository"
import { Position } from "@modules/positions/domain/position"
import { PositionsTable } from "@sections/positions/components/positions-table/positions-table"

const YEARS = [2023, 2024]

function PositionsPage() {
  const [positions, setPositions] = useState<Position[]>([])

  useEffect(() => {
    readEtoroPositions()
  }, [])

  return (
    <>
      <h1>Positions</h1>
      <PositionsTable positions={positions} />
    </>
  )

  async function readEtoroPositions() {
    const positions = await new PositionsGetter(
      new LocalFileEtoroPositionRepository(YEARS)
    ).run()
    setPositions(positions)
  }
}

export default PositionsPage
