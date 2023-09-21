import { Component, Input } from '@angular/core';
import { Match } from 'src/app/entities.interface';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent {
  @Input() match?: Match
}
