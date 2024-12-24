export class Book {
  id: number;
  name: string;
  author: string;
  pages: number;
  category: string;
  availableExemplars: number;

  constructor(bookData) {
    if (bookData.pages < 1) {
      throw new Error('The number of pages must be at least 1');
    }

    if (bookData.availableExemplars < 0) {
      throw new Error('Available exemplars cannot be negative');
    }

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
    if (quantity <= 0) {
      throw new Error('Quantity to decrease must be greater than zero');
    }
    if (quantity > this.availableExemplars) {
      throw new Error('Cannot decrease by more than available exemplars');
    }
    this.availableExemplars -= quantity;
  }

  increaseAvailableExemplarsBy(quantity: number): void {
    if (quantity <= 0) {
      throw new Error('Quantity to increase must be greater than zero');
    }
    this.availableExemplars += quantity;
  }
}
