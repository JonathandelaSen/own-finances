import { Position } from "@modules/positions/domain/position"

export interface PositionRepository {
  getPositions(): Promise<Position[]>
}
