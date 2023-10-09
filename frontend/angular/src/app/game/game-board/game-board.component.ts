import { Component, HostListener, Injectable, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Game } from '../../entities.interface';
import { GameSocket } from 'src/app/app.module';



@Injectable({
  providedIn: 'root'
})  

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent {

  constructor(private gameDataService: GameService,
              private socket: GameSocket ) {}
   
    // const
    ballWidth = 3;
    ballHeight = 4;
    racketWidth = 3;
    racketHeight = 20;
    racketMargin = 3;
    racketSpeed = 1;
  
    score0 = 0;
    score1 = 0;
    racket0Y = 40;
    racket1Y = 40;
    racket0X = this.racketMargin;
    racket1X = 100 - this.racketMargin - this.racketWidth;
    // ballX = -1 * this.ballWidth;
    // ballY = -1 * this.ballHeight;
    ballX = 0
    ballY = 0
    canMoveBall = false;
    canMoveRackets = true;
    racket0Increment = 0;
    racket1Increment = 0;

    game?:Game;
    testValues: number[] = [0, 0];
  
    @HostListener('window:keydown', ['$event'])
    onKeyDown(e: any) {
      if (e.code === 'KeyW') {
        // this.racket0Increment = -this.racketSpeed;
        this.socket.emit('key', '10');
        console.log("hello up");
      }
      if (e.code === 'KeyS') {
        // this.racket0Increment = this.racketSpeed;
        this.socket.emit('key', '-10');
        console.log("hello down");

      }
      if (e.code === 'ArrowUp') {
        this.racket1Increment = -this.racketSpeed;
      }
      if (e.code === 'ArrowDown') {
        this.racket1Increment = this.racketSpeed;
      }
    }
  
    @HostListener('window:keyup', ['$event'])
    onKeyUp(e: any) {
      if (e.code === 'KeyW' || e.code === 'KeyS') {
        this.racket0Increment = 0;
      }
      if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
        this.racket1Increment = 0;
      }
    }
  
    resetAll(): void {
      this.score0 = 0;
      this.score1 = 0;
      this.resetBallAndRackets();
    }
  
    resetBallAndRackets(): void {
      this.racket0Y = 40;
      this.racket1Y = 40;
      // this.ballX = -1 * this.ballWidth;
      // this.ballY = -1 * this.ballHeight;
      this.ballX = 0;
      this.ballY = 0;
      this.canMoveBall = false;
    }

    valueConversion(game: Game) {
      const maxHeight = 500;
      const maxWidth = 1000;
      game.ball.position.x = (100 / maxWidth) * game.ball.position.x;
      game.ball.position.y = ( 100/ maxHeight ) * game.ball.position.y;
      game.leftPaddle.position.y  = ( 100/ maxHeight) * game.leftPaddle.position.y;
      game.rightPaddle.position.y  = ( 100/ maxHeight) * game.rightPaddle.position.y;
      return game;
    }

    ngOnInit(){
      this.gameDataService.getTestObservable().subscribe((test: Game) => {
        this.game = test;
        console.log(this.testValues[0]);
        this.game = this.valueConversion(this.game);
        const positionX = this.game.ball.position.x;
        const positionY = this.game.ball.position.y;
        window.requestAnimationFrame(() => this.moveBall(positionX, positionY));
        console.log(this.game.leftPaddle.position.y);
        var positionPaddle = this.game.leftPaddle.position.y
        window.requestAnimationFrame(() => this.moveLeftRacket(positionPaddle));
        window.requestAnimationFrame(() => this.moveRacket1(this.racket1Increment));
        this.resetAll();
      })
    }

    newGame(): void {
      this.startRound();
      this.resetAll();
      
    }
  
    moveLeftRacket(yIncrement: number): void {
      // if (!this.canMoveRackets) {
      //   return;
      // }
      let newY = yIncrement;
      // this check to be sure that the racket don't disappear on borders:
      newY = Math.min(newY, 100 - this.racketHeight);
      newY = Math.max(newY, 0);
      this.racket0Y = newY;
      // window.requestAnimationFrame(() => this.moveLeftRacket(this.racket0Increment));
    }

    startRound(): void {
      // this.setBall();
      // const xIncrement = this.getRandomIncrement();
      // const yIncrement = this.getRandomIncrement();
      this.canMoveBall = true;
      this.canMoveRackets = true;
      window.requestAnimationFrame(() => this.moveRacket0(this.racket0Increment));
      window.requestAnimationFrame(() => this.moveRacket1(this.racket1Increment));
      // window.requestAnimationFrame(() => this.moveBall(xIncrement, yIncrement));
      var value = this.gameDataService.returnValue()
      console.log(value[0]);
      console.log(value[1]);
    }
  
     getRandomIncrement(): number {
      const randomValue = Math.random() * (0.6 + 0.6) - 0.6; // (max - min ) - min
      return parseFloat(randomValue.toFixed(1));
    }
  
    setBall(): void {
      // this.ballX = 48.5;
      // this.ballY = Math.floor(Math.random() * (100 - this.ballHeight + 1));
      this.ballX = 0;
      this.ballY = 0;
    }
  
    async moveBall(xIncrement: number, yIncrement: number): Promise<void> {
      this.ballX = xIncrement;
      this.ballY = yIncrement;
      // window.requestAnimationFrame(() => this.moveBall(xIncrement, yIncrement));
    }
  
    moveRacket0(yIncrement: number): void {
      if (!this.canMoveRackets) {
        return;
      }
      let newY = this.racket0Y + yIncrement;
      newY = Math.min(newY, 100 - this.racketHeight);
      newY = Math.max(newY, 0);
      this.racket0Y = newY;
      window.requestAnimationFrame(() => this.moveRacket0(this.racket0Increment));
    }
  
    moveRacket1(yIncrement: number): void {
      if (!this.canMoveRackets) {
        return;
      }
      let newY = this.racket1Y + yIncrement;
      newY = Math.min(newY, 100 - this.racketHeight);
      newY = Math.max(newY, 0);
      this.racket1Y = newY;
      window.requestAnimationFrame(() => this.moveRacket1(this.racket1Increment));
    }
  
    applyCollisionWithRackets(xIncrement: number): number {
      if (
        this.ballX <= this.racketMargin + this.racketWidth ||
        this.ballX + this.ballWidth >= 100 - this.racketMargin - this.racketWidth
      ) {
        return -1 * xIncrement;
      } else {
        return xIncrement;
      }
    }
  
    isBallCollidedWithRacket0(): boolean {
      const racket0RightX = this.racket0X + this.racketWidth;
      const ballCenterY = this.ballY + this.ballHeight / 2;
      return (
        this.ballX <= racket0RightX &&
        this.ballX > this.racket0X &&
        ballCenterY >= this.racket0Y &&
        ballCenterY <= this.racket0Y + this.racketHeight
      );
    }
  
    isBallCollidedWithRacket1(): boolean {
      const ballRightX = this.ballX + this.ballWidth;
      const racket1RightX = this.racket1X + this.racketWidth;
      const ballCenterY = this.ballY + this.ballHeight / 2;
      return (
        ballRightX >= this.racket1X &&
        ballRightX < racket1RightX &&
        ballCenterY >= this.racket1Y &&
        ballCenterY <= this.racket1Y + this.racketHeight
      );
    }
  
    isBallCollidedWithWalls(): boolean {
      return this.ballY <= 0 || this.ballY + this.ballHeight >= 100;
    }
  
    isPlayer0Scored(): boolean {
      return this.ballX >= 100;
    }
  
    isPlayer1Scored(): boolean {
      return this.ballX + this.ballWidth <= 0;
    }
  
    isPlayer0Win(): boolean {
      return this.score0 === 10;
    }
  
    isPlayer1Win(): boolean {
      return this.score1 === 10;
    }
  
    delay(ms: number): Promise<void> {
      return new Promise((f) => setTimeout(f, ms));
    }
}
