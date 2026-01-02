import {HttpClient} from '@angular/common/http';

export class BaseService<TDto, TAddDto> {
  constructor(protected http: HttpClient, protected url: string) {}

  getAll() { return this.http.get<TDto[]>(this.url); }
  getById(id: string) { return this.http.get<TDto>(`${this.url}/${id}`); }
  create(dto: TAddDto) { return this.http.post<TDto>(this.url, dto); }
  delete(id: string) { return this.http.delete(`${this.url}/${id}`); }
}
