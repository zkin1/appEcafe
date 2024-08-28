import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AuthService } from '../services/auth.service';

interface Product {
  name: string;
  description: string;
  price: number;
  image: string;
  showOptions: boolean;
  selectedSize: string;
  selectedMilk: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterLink],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(100%)' }),
        animate('200ms ease-out', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(100%)' }))
      ])
    ])
  ]
})
export class MainPage implements OnInit {
  products: Product[] = [
    {
      name: 'Latte',
      description: 'Espresso con leche cremosa.',
      price: 6000,
      image: 'assets/latte.jpg',
      showOptions: false,
      selectedSize: 'medium',
      selectedMilk: 'regular'
    },
    {
      name: 'Capuchino',
      description: 'Espresso con leche espumosa.',
      price: 7000,
      image: 'assets/cappuccino.jpg',
      showOptions: false,
      selectedSize: 'medium',
      selectedMilk: 'regular'
    },
    {
      name: 'Americano',
      description: 'Espresso diluido con agua caliente',
      price: 4000,
      image: 'assets/americano.jpg',
      showOptions: false,
      selectedSize: 'medium',
      selectedMilk: 'regular'
    }
  ];

  constructor(
    private toastController: ToastController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    console.log('MainPage ngOnInit');
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get currentUserName(): string | null {
    return this.authService.getCurrentUserName();
  }

  toggleOptions(index: number) {
    this.products[index].showOptions = !this.products[index].showOptions;
  }

  calculatePrice(product: Product): number {
    let adjustedPrice = product.price;
    if (product.selectedSize === 'small') {
      adjustedPrice -= 1000;
    } else if (product.selectedSize === 'large') {
      adjustedPrice += 1000;
    }
    return adjustedPrice;
  }

  updatePrice(product: Product) {
  }

  async addToCart(product: Product) {
    if (!this.isLoggedIn) {
      const toast = await this.toastController.create({
        message: 'Por favor, inicia sesión para añadir productos al carrito',
        duration: 2000,
        position: 'bottom',
        color: 'warning'
      });
      toast.present();
      return;
    }

    console.log('Producto añadido al carrito:', {
      ...product,
      finalPrice: this.calculatePrice(product)
    });
    product.showOptions = false;

    const toast = await this.toastController.create({
      message: `${product.name} (${product.selectedSize}, ${product.selectedMilk}) añadido al carrito`,
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    toast.present();
  }

  ionViewWillEnter() {
    console.log('MainPage ionViewWillEnter');
  }

  ionViewDidEnter() {
    console.log('MainPage ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.log('MainPage ionViewWillLeave');
  }

  ionViewDidLeave() {
    console.log('MainPage ionViewDidLeave');
  }
}