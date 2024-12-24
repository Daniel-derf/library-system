export class Book {
  id: number;
  name: string;
  author: string;
  pages: number;
  category: string;
  availableExemplars: number;

  constructor(bookData) {
    this.id = bookData.id;
    this.name = bookData.name;
    this.author = bookData.author;
    this.pages = bookData.pages;
    this.category = bookData.category;
    this.availableExemplars = bookData.availableExemplars;
  }

  isAvailable(): boolean {
    return this.availableExemplars > 0;
  }

  decreaseAvailableExemplarsBy(quantity: number): void {
    this.availableExemplars -= quantity;
  }

  increaseAvailableExemplarsBy(quantity: number): void {
    this.availableExemplars += quantity;
  }
}
