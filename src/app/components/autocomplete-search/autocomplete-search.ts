import {Component, computed, input, model, signal} from '@angular/core';
import {FormValueControl} from "@angular/forms/signals";

import {AutocompleteMethod} from "../../shared/enums/autocomplete-method.enum";

@Component({
  selector: 'app-autocomplete-search',
  templateUrl: './autocomplete-search.html',
  styleUrl: './autocomplete-search.css',
})
export class AutocompleteSearch<T> implements FormValueControl<T | null> {
  public data = input<T[]>([]);
  public key = input.required<keyof T>();
  public method = input.required<AutocompleteMethod>();
  public label = input<string>('');

  public value = model<T | null>(null);
  public searchValue = model<string>('');

  public filteredData = signal<T[]>([]);
  public isVisible = computed<boolean>(() => !!this.filteredData().length)

  public input(searchText: string): void {
    this.filteredData.set(this.autocomplete(this.data(), searchText));
  }

  public select(item: T): void {
    this.value.set(item);
    this.searchValue.set(item[this.key()] as string);
    this.filteredData.set([]);
  }

  private autocomplete(data: T[], search: string): T[] {
    if (!search) {
      return []
    }

    if (this.method() === 'start') {
      return data.filter(item => (item[this.key()] as string).toLowerCase().startsWith(search.toLowerCase()))
    } else if (this.method() === 'middle') {
      return data.filter(item => (item[this.key()] as string).toLowerCase().includes(search.toLowerCase()))
    } else {
      return data.filter(item => (item[this.key()] as string).toLowerCase().endsWith(search.toLowerCase()))
    }
  }
}
