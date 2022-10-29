export class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._section = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach((element) => {
      this._addItem(this._renderer(element));
    });
  }

  renderItem(item) {
    this._addItem(this._renderer(item));
  }

  _addItem(element) {
    this._section.prepend(element);
  }

  clearSection() {
    this._section.innerHTML = '';
  }
}