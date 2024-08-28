import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-carro-compras',
  templateUrl: './carro-compras.page.html',
  styleUrls: ['./carro-compras.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CarroComprasPage {
  items = [
    { name: 'Café Latte', price: 6000, quantity: 2 },
    { name: 'Cappuccino', price: 7000, quantity: 1 },
  ];

  constructor() { }

  getTotalPrice() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0 );
  }
}