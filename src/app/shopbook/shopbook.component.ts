import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from '../service/http-client.service';
import { Book } from '../model/Book';
import { MatDialog } from '@angular/material';
import { DialogOverviewExampleDialogComponent } from '../dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { Favorite } from '../model/favorite';

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
  favorites:Array<Favorite>;
  fav :Favorite;
  favData:Array<Favorite>;

  cartBooks: any;
  animal:string;
  favb=[];
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

    // this.httpClientService.getUserFavorites();
    // this.enableFavourites=false;
    //from localstorage retrieve the cart item
    let data = localStorage.getItem('cart');
    //if this is not null convert it to JSON else initialize it as empty
    if (data !== null) {
      this.cartBooks = JSON.parse(data);
    } else {
      this.cartBooks = [];
    }
    this.httpClientService.getUserFavorites().subscribe(response => this.response(response),);
    // console.log("1"+this.favb[0].bookId)




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
    this.favMethod(this.books);
  }

  // cartData = [];

  addToCart(bookId) {
    //retrieve book from books array using the book id
    // this.cartData=[];
    let cartData = [];
  

    console.log("len"+this.books.length);
    let fav=new Favorite();
    let name=sessionStorage.getItem('username');
    fav.bookId=bookId;
    fav.userName=name;
    console.log("fav"+name);
    // this.favorites.push(this.fav);
    let js=JSON.stringify(fav);
    console.log("fav-js"+js);
    this.httpClientService.addFavorites(fav).subscribe((response)=>{
      if(response! ==null){
        console.log("added");
      }else{
        console.log("not added");
      }
    })
    
    let book = this.books.find(book => {
      return book.id === +bookId;
    });
    //retrieve cart data from localstorage
    let data = localStorage.getItem('cart');
    //prse it to json 
    if (data !== null) {
      cartData = JSON.parse(data);
    }


    console.log("2"+this.favb.length);
    // for(var i=0;i<this.favb.length;i++){
    //   if(name == this.favb[i].userName){
    //     break;
    //   }
    // }
    cartData.push(book);
    this.httpClientService.getUserFavorites().subscribe(response => this.response(response),);


    // add the selected book to cart data
    console.log("cart"+cartData);
   
  
    //updated the cartBooks
    this.updateCartData(cartData);
    //save the updated cart data in localstorage
    localStorage.setItem('cart', JSON.stringify(cartData));
    //make the isAdded field of the book added to cart as true
    book.isAdded = true;
    this.enableFavourites=true;

  }
 
  response(response){

   
    this.httpClientService.getBooks().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
    
    this.favb = [];
    let cartData=[];
    //get books returned by the api call
    this.favData = response;
    // console.log("len"+this.books.length);
    let data = localStorage.getItem('cart');
    //prse it to json 
    if (data !== null) {
      cartData = JSON.parse(data);
    }       
    for (const book of this.favData) {

      const bookwithRetrievedImageField = new Favorite();
      bookwithRetrievedImageField.bookId = book.bookId;
      //populate retrieved image field so that book image can be displayed
      bookwithRetrievedImageField.userName = book.userName;
      this.favb.push(bookwithRetrievedImageField);
    } 
  }

  favMethod(books){
    let cartData=[];
    console.log(this.books.length);
    let name=sessionStorage.getItem('username');
    for(var i=0;i<this.favb.length;i++){
      if(name === this.favb[i].userName){
        console.log("username matched");
        let book = books.find(book => {
          return book.id === +this.favb[i].bookId;
        });
        console.log("book"+book);
        cartData.push(book);
        console.log("cart"+cartData);
        book.isAdded=true;
        this.enableFavourites=true;
        // console.log("nameeeeeeee");
        // this.addToCart(this.favData[i].bookId);
        console.log("id"+this.favData[i].bookId);
      }
    }
    this.updateCartData(cartData);
  }

  updateCartData(cartData) {
    this.cartBooks = cartData;
    // this.enableFavourites=false;
  }

  goToCart() {
    this.openDialog();
    this.enableFavourites=true;
    this.router.navigate(['/books']);
  }

  emptyCart() {
    this.cartBooks = [];
    this.enableFavourites=false;
    this.cartBooks=[];
    this.httpClientService.deleteFavourites().subscribe(data=>{
      console.log('deleted');
    })
    localStorage.clear();
   
  }

  deleteFavorite(bookId){
    let book = this.books.find(book => {
      return book.id === +bookId;
    });
    let name=sessionStorage.getItem('username');
    this.httpClientService.deleteFavouritesById(bookId,name).subscribe((res =>{
       console.log("hello");
    }))
    // this.favMethod(this.books);
    this.enableFavourites=false;
    book.isAdded=false;
    console.log(this.cartBooks);
    this.httpClientService.getUserFavorites().subscribe(response => this.response(response),);

    // this.cartBooks.pop(bookId);
   this.cartBooks= this.cartBooks.filter(id => id !== bookId);
    console.log(this.cartBooks);

  }
}

function DialogOverviewExampleDialog(DialogOverviewExampleDialog: any, arg1: { width: string; }) {
  throw new Error('Function not implemented.');
}

