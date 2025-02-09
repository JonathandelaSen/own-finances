import * as XLSX from "xlsx"
import { PositionRepository } from "@modules/positions/domain/position-repository"
import { Position } from "@modules/positions/domain/position"
import {
  EToroAccountActivity,
  EToroAccountActivityRaw,
  fromEToroAccountActivityRaw,
  TransactionType,
} from "@modules/positions/domain/e-toro-account-activity"

const ALMOST_ZERO = 1e-10

export class LocalFileEtoroPositionRepository implements PositionRepository {
  constructor(private readonly years: number[]) {}

  async getPositions(): Promise<Position[]> {
    const files = await this.getFiles()
    const accountActivities = files
      .map((file) => this.getAccountActivityFromFile(file))
      .flat()
    return this.getPositionsFromAccountActivity(accountActivities)
  }

  private getAccountActivityFromFile(
    file: XLSX.WorkBook
  ): EToroAccountActivity[] {
    const worksheet = file.Sheets["Actividad de la cuenta"]
    const etoroJsonData = XLSX.utils.sheet_to_json(
      worksheet
    ) as EToroAccountActivityRaw[]
    return fromEToroAccountActivityRaw(etoroJsonData)
  }

  private getPositionsFromAccountActivity(
    accountActivities: EToroAccountActivity[]
  ): Position[] {
    const positions: Map<string, Position> = new Map()
    //Activities should be sorted from oldest to newest
    for (const activity of accountActivities) {
      const { type, details, units, amount } = activity

      if (
        type !== TransactionType.POSICION_ABIERTA &&
        type !== TransactionType.GANANCIAS_PERDIDAS_OPERACION
      ) {
        continue
      }

      if (!positions.has(details)) {
        positions.set(details, {
          name: details, // Assuming `details` contains the stock ID
          ticket: details,
          units: 0,
          totalPayedUsd: 0,
          averagePriceUsd: 0,
          weightPercentage: undefined, // Optional field, leave as undefined
        })
      }

      const position = positions.get(details)!

      if (type === TransactionType.POSICION_ABIERTA) {
        position.units = position.units + units
        position.totalPayedUsd = position.totalPayedUsd + amount
        position.averagePriceUsd = position.totalPayedUsd / position.units
        continue
      }

      if (type === TransactionType.GANANCIAS_PERDIDAS_OPERACION) {
        const sellUnits = Math.min(units, position.units)

        position.units = position.units - sellUnits
        position.totalPayedUsd -= amount

        position.averagePriceUsd =
          position.units > 0 ? position.totalPayedUsd / position.units : 0

        if (position.units <= ALMOST_ZERO) {
          positions.delete(details)
        }
      }
    }
    return this.addWeightPercentage(Array.from(positions.values()))
  }

  private async getFiles(): Promise<XLSX.WorkBook[]> {
    const filePromises = this.years.map(async (year) => {
      const response = await fetch(`../eToro/etoro-${year}.xlsx`)
      const blob = await response.blob()
      const reader = new FileReader()

      return new Promise<XLSX.WorkBook>((resolve) => {
        reader.onload = (e) => {
          const data = new Uint8Array(e.target!.result as ArrayBuffer)
          const workbook = XLSX.read(data, { type: "array" })
          resolve(workbook)
        }
        reader.readAsArrayBuffer(blob)
      })
    })

    return Promise.all(filePromises)
  }

  private addWeightPercentage(positions: Position[]): Position[] {
    const totalSpent = positions.reduce(
      (accumulator, current) => accumulator + current.totalPayedUsd,
      0
    )
    return positions.map((position) => {
      position.weightPercentage = (position.totalPayedUsd / totalSpent) * 100
      return position
    })
  }
}
