import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Hero } from '../../models/hero.interface';

@Component({
  selector: 'app-hero-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.scss'
})
export class HeroFormComponent implements OnInit, OnChanges {
  @Input() isOpen = false;
  @Input() hero: Hero | null = null;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<Omit<Hero, 'id'>>();

  name = '';
  alias = '';
  nationality = '';
  team = '';
  description = '';
  image = '';
  powers: string[] = [];
  currentPower = '';

  ngOnInit(): void {
    this.resetForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hero'] || changes['isOpen']) {
      this.resetForm();
    }
  }

  resetForm(): void {
    if (this.hero) {
      this.name = this.hero.name;
      this.alias = this.hero.alias || '';
      this.nationality = this.hero.nationality;
      this.team = this.hero.team || '';
      this.description = this.hero.description;
      this.image = this.hero.image;
      this.powers = [...this.hero.powers];
    } else {
      this.name = '';
      this.alias = '';
      this.nationality = '';
      this.team = '';
      this.description = '';
      this.image = '';
      this.powers = [];
    }
    this.currentPower = '';
  }

  addPower(): void {
    if (this.currentPower.trim() && !this.powers.includes(this.currentPower.trim())) {
      this.powers.push(this.currentPower.trim());
      this.currentPower = '';
    }
  }

  removePower(powerToRemove: string): void {
    this.powers = this.powers.filter(power => power !== powerToRemove);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addPower();
    }
  }

  handleSubmit(): void {
    if (this.isFormValid()) {
      const heroData: Omit<Hero, 'id'> = {
        name: this.name,
        alias: this.alias || '',
        nationality: this.nationality,
        team: this.team || '',
        description: this.description,
        image: this.image,
        powers: this.powers
      };

      this.onSubmit.emit(heroData);
      this.closeForm();
    }
  }

  closeForm(): void {
    this.onClose.emit();
  }

  isFormValid(): boolean {
    return !!this.name && !!this.nationality && !!this.image && this.powers.length > 0 && !!this.description;
  }

  trackByIndex(index: number): number {
    return index;
  }
}
