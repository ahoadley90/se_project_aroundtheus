export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = Array.isArray(items) ? items : [];
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach(item => {
      if (item && typeof item === 'object') {
        this._renderer(item);
      } else {
        console.error("Invalid item in Section:", item);
      }
    });
  }

  addItem(element) {
    if (element) {
      this._container.prepend(element);
    }
  }
}
