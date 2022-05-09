import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { Product } from 'src/app/interfaces/Product';
import { ProductsAPIService } from 'src/app/services/products-api.service';
import { UserAPIService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {  

  products!: Product[];
  userInfo!: any;
  stop = new BehaviorSubject(true);
  stop$ = this.stop.asObservable();

  constructor(private productService: ProductsAPIService, private userInfoService: UserAPIService) { }
  
  ngOnInit(): void {
    this.productService.getProducts().pipe(takeUntil(this.stop$)).subscribe( data => this.products = data.products )
    this.userInfoService.getUserInfo().pipe(takeUntil(this.stop$)).subscribe( data => this.userInfoService.userInfo.next(data) )
  }
  
  ngOnDestroy(): void {
    this.stop.next(true);
  }
  
}
