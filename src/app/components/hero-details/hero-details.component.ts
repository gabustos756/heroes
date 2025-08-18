import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hero } from '../../models/hero.interface';

@Component({
  selector: 'app-hero-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-details.component.html',
  styleUrl: './hero-details.component.scss'
})
export class HeroDetailsComponent {
  @Input() hero: Hero | null = null;

  trackByIndex(index: number): number {
    return index;
  }
}
