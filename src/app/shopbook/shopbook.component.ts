import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from '../service/http-client.service';
import { Book } from '../model/Book';
import { MatDialog } from '@angular/material';
import { DialogOverviewExampleDialogComponent } from '../dialog-overview-example-dialog/dialog-overview-example-dialog.component';

export interface DialogData {
  favourites: string;
  name: string;
}
@Component({
  selector: 'app-shopbook',
  templateUrl: './shopbook.component.html',
  styleUrls: ['./shopbook.component.css']
})


export class ShopbookComponent implements OnInit {

  books: Array<Book>;
  booksRecieved: Array<Book>;

  cartBooks: any;
  animal:string;
  enableFavourites:boolean=false;

  constructor(private router: Router, private httpClientService: HttpClientService,public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '250px',
      data: { animal: this.animal}});
     this.cartBooks=[];
     this.enableFavourites=false;
     localStorage.clear();
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }


  ngOnInit() {
    this.httpClientService.getBooks().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
    // this.enableFavourites=false;
    //from localstorage retrieve the cart item
    let data = localStorage.getItem('cart');
    //if this is not null convert it to JSON else initialize it as empty
    if (data !== null) {
      this.cartBooks = JSON.parse(data);
    } else {
      this.cartBooks = [];
    }

    // localStorage.clear();

  }

  // we will be taking the books response returned from the database
  // and we will be adding the retrieved   
  handleSuccessfulResponse(response) {
    this.books = new Array<Book>();
    //get books returned by the api call
    this.booksRecieved = response;
    for (const book of this.booksRecieved) {

      const bookwithRetrievedImageField = new Book();
      bookwithRetrievedImageField.id = book.id;
      bookwithRetrievedImageField.name = book.name;
      //populate retrieved image field so that book image can be displayed
      bookwithRetrievedImageField.retrievedImage = 'data:image/jpeg;base64,' + book.picByte;
      bookwithRetrievedImageField.author = book.author;
      bookwithRetrievedImageField.price = book.price;
      bookwithRetrievedImageField.picByte = book.picByte;
      this.books.push(bookwithRetrievedImageField);
    }
  }

  addToCart(bookId) {
    //retrieve book from books array using the book id
    let book = this.books.find(book => {
      return book.id === +bookId;
    });
    let cartData = [];

    //retrieve cart data from localstorage
    let data = localStorage.getItem('cart');
    //prse it to json 
    if (data !== null) {
      cartData = JSON.parse(data);
    }
    // add the selected book to cart data
    cartData.push(book);
    //updated the cartBooks
    this.updateCartData(cartData);
    //save the updated cart data in localstorage
    localStorage.setItem('cart', JSON.stringify(cartData));
    //make the isAdded field of the book added to cart as true
    book.isAdded = true;
    this.enableFavourites=true;
  }

  updateCartData(cartData) {
    this.cartBooks = cartData;
    // this.enableFavourites=false;
  }

  goToCart() {
    this.openDialog();
    this.enableFavourites=true;
    this.router.navigate(['/shop']);
  }

  emptyCart() {
    this.cartBooks = [];
    this.enableFavourites=false;
    localStorage.clear();
   
  }


}
function DialogOverviewExampleDialog(DialogOverviewExampleDialog: any, arg1: { width: string; }) {
  throw new Error('Function not implemented.');
}

