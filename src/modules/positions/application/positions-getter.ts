import { Position } from "@modules/positions/domain/position"
import { PositionRepository } from "@modules/positions/domain/position-repository"

export class PositionsGetter {
  constructor(private readonly positionRepository: PositionRepository) {}

  async run(): Promise<Position[]> {
    return await this.positionRepository.getPositions()
  }
}
