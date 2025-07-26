import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient ) { }


  getAllProduct():Observable<any>{
return this.httpClient.get('https://fakestoreapi.com/products')
  }


    getProductById(id:any):Observable<any>{
    return this.httpClient.get(`https://fakestoreapi.com/products/${id}`)
  }
}
