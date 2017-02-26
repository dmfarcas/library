//Add a book to the database...
//The application is currently stateless by Vuex standards. State is took care of by Firebase ATM


      // removeBook (key) {
      //   itemsRef.child(key).remove();
      // },
      // addBook () {
      //   if (this.newBook.trim()) {
      //     itemsRef.push({
      //       text: this.newBook
      //     });
      //     this.newBook = "";
      //   }
      // }

const mutations = {
  addBook (state, book) {
    console.log("BOOKY BOOK", book);
    state.count++
  },
  deleteBook (state, { book }) {
    console.log(book);
    state.count++
  }
}


export default mutations

