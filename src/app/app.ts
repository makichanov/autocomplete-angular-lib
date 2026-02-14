import { Component, signal } from '@angular/core';
import {form,FormField} from "@angular/forms/signals";

import {AutocompleteSearch} from "./components/autocomplete-search/autocomplete-search";
import {NewsModel} from "./shared/models/news.model";
import {AutocompleteMethod} from "./shared/enums/autocomplete-method.enum";
import {httpResource} from "@angular/common/http";

@Component({
  selector: 'app-root',
  imports: [AutocompleteSearch, FormField],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('autocomplete-angular-lib');

  public selectedMethod = signal<AutocompleteMethod>(AutocompleteMethod.START);
  public autoMethods = signal<{ label: string; value: AutocompleteMethod }[]>([
    {
      label: 'Start',
      value: AutocompleteMethod.START,
    },
    {
      label: 'Middle',
      value: AutocompleteMethod.MIDDLE,
    },
    {
      label: 'End',
      value: AutocompleteMethod.END,
    },

  ]);
  public readonly news = httpResource<NewsModel[]>(() => 'http://localhost:3000/api/todos');

  public autocompleteFormModel = signal<{ search: NewsModel | null }>({ search: null });
  public autocompleteForm = form(this.autocompleteFormModel);
  // todo: fix
  logSelection() {
    console.log(this.autocompleteFormModel())
  }
}
