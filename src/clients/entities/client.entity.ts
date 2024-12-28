export default class Client {
  cpf: string;
  name: string;
  books: number[];

  constructor({
    cpf,
    name,
    books,
  }: {
    cpf: string;
    name: string;
    books?: number[];
  }) {
    this.cpf = cpf;
    this.name = name;
    books ? (this.books = books) : (this.books = []);
  }

  borrowBook(bookId: number): void {
    if (this.books.includes(bookId)) {
      throw new Error(
        `Book with ID ${bookId} is already borrowed by this client.`,
      );
    }
    if (this.books.length >= 5) {
      throw new Error('Client cannot borrow more than 5 books.');
    }
    this.books.push(bookId);
  }

  returnBorrowedBook(bookId: number): void {
    if (!this.books.includes(bookId)) {
      throw new Error(
        `Book with ID ${bookId} was not borrowed by this client.`,
      );
    }
    this.books = this.books.filter((id) => id !== bookId);
  }
}
