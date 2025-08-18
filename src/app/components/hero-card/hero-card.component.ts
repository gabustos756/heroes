import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hero } from '../../models/hero.interface';

@Component({
  selector: 'app-hero-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss'
})
export class HeroCardComponent {
  @Input() hero!: Hero;
  @Input() isSelected = false;
  @Output() onSelect = new EventEmitter<Hero>();
  @Output() onEdit = new EventEmitter<Hero>();
  @Output() onDelete = new EventEmitter<string>();

  onCardClick(): void {
    this.onSelect.emit(this.hero);
  }

  onEditClick(event: Event): void {
    event.stopPropagation();
    this.onEdit.emit(this.hero);
  }

  onDeleteClick(event: Event): void {
    event.stopPropagation();
    this.onDelete.emit(this.hero.id);
  }
}
