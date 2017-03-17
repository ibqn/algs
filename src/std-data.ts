export class StdData {
  private i = 0;
  private data: string[];

  constructor(content: string) {
    this.data = content.match(/[^\s]+/g);
  }

  get(): string {
    return this.data[this.i++];
  }

  get_all(): string[] {
    return this.data;
  }

  empty(): boolean {
    return this.i === this.data.length;
  }

  size(): number {
    return this.data.length - this.i;
  }

  reset(): void {
    this.i = 0;
  }
}
