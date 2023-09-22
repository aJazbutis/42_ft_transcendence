import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { MatchService } from './service/match.service';
import { Match } from './entities/match.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { PlayerService } from './service/player.service';
import { Queue } from './entities/queue.entity';
import { QueueService } from './service/queue.service';
import { GameService } from './service/game.service';

@Module({
    imports: [TypeOrmModule.forFeature([Match, Player, Queue]), UserModule, AuthModule],
    providers: [GameGateway, MatchService, PlayerService, QueueService, GameService],
})

export class GameModule {}
