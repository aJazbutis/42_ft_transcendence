import { Injectable } from '@nestjs/common';
import { Match } from 'src/game/entities/match.entity';
import { MatchService } from 'src/game/service/match.service';
import { PlayerService } from 'src/game/service/player.service';
import { StatsDto } from './dto/stats.dto';

@Injectable()
export class RankingService {

    constructor(private readonly matchService: MatchService,
                private readonly playerService: PlayerService) {}


    async getMatchesByUserId(userId: string): Promise<Match[]> {
        return this.matchService.getMatchesByPlayerId(userId)
    }

    async getAllUserStats() {
        const users = await this.playerService.getPlayers()
        users.sort((a, b) => a.score - b.score)
        return users
    }

    async getUserPosition(id: string) {
		const users = await this.getAllUserStats() 
		const position = users.findIndex(user => user.id === id)
		if (position === -1) {
			return 0
		}
		return position + 1
	}

	async getUserStatsById(id: string) {
		const stats: StatsDto = {
			wins: 0,
			losses: 0
		}
		const userMatches = await this.getMatchesByUserId(id)

		if (userMatches) {
			for (const match of userMatches) {
				if (match.winner.id === id) {
					stats.wins += 1
				} else {
					stats.losses += 1
				}
			}
		}

		return stats
	}
}
