import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class PtBrMatPaginatorIntl extends MatPaginatorIntl {

  constructor() {
    super();

    this.getAndInitTranslations();
  }

  getAndInitTranslations() {

      this.itemsPerPageLabel = "Qt. por página";
      this.nextPageLabel = "Próxima";
      this.previousPageLabel = "Anterior";
      this.firstPageLabel = "Primeira Página";
      this.lastPageLabel = "Última página"
      this.changes.next();

  }

  override getRangeLabel = (page: number, pageSize: number, length: number) =>  {
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} de ${length}`;
  }

}
