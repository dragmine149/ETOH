/*eslint no-unused-vars: "error"*/
/*exported GenericManager */

class GenericManager {
  /** @type {T[]} */
  #items = [];
  /** @type {Object.<string, (item: any) => any>} */
  #filters = {};

  /**
  * Get an item from a map. Returns the map keys if no item is defined.
  * @param {Map<any, number[]>} map
  * @param {any} item
  * @returns {any[]|T[]} A list of keys or the items that have been mapped.
  */
  #mapGetter(map, item) {
    if (item == null || item == undefined) {
      // No item? Return the keys to allow us to view what we can use.
      // Not sorted, we'll let the user deal with sorting.
      return Array.from(map.keys());
    }

    /** @type {number[]} */
    let indexes = map.get(item);
    if (indexes == undefined) return []; // couldn't be found.
    return indexes.map((index) => this.#items[index]); // got to return the items (hence the map). No use otherwise.
  }

  /**
  * Add an item to the map.
  * @param {Map<any, number[]>} map The map to change.
  * @param {any|any[]} key The key of the value to store. Will store the same value under multiple keys if an array is provided.
  * @param {number} value The value to store.
  */
  #mapSetter(map, key, value) {
    if (!Array.isArray(key)) {
      key = [key];
    }

    key.forEach(k => {
      // got to have a valid key before it can be inserted.
      if (k == undefined || k == null || Number.isNaN(k)) return;

      if (!map.has(k)) {
        // if we don't have anything, make a new one.
        map.set(k, [value]);
        return;
      }
      map.get(k).push(value);
    });
  }

  /**
  * Process a filter.
  * @param {String} filter The filter to process.
  * @param {T} item The item to store.
  * @param {number} index The position in the array where the item is stored.
  */
  #processFilter(filter, item, index) {
    let filterFunc = this.#filters[filter];
    let key = filterFunc(item);
    this.#mapSetter(this[`#${filter}`], key, index);
  }

  /**
  * Add an item to the manager of items.
  * @param {T} item The item to add.
  */
  addItem(item) {
    let index = this.#items.push(item);

    // no point in adding an item if we don't also filter said item.
    Object.keys(this.#filters).forEach((key) => this.#processFilter(key, item, index - 1));
  }

  /**
  * Makes a new map to have a shortcut way of getting data. Data can now be retrieved using `class['filter']('test')`
  * @param {String} filter The thing to store in order to filter items
  * @param {(item: T) => any} callback What gets stored in the map for quick access to the items
  */
  addFilter(filter, callback) {
    if (filter.includes(" ")) {
      throw new Error("Filter should not contain spaces for code readability reasons!");
    }

    this.#filters[filter] = callback;

    this[`#${filter}`] = new Map();
    this[filter] = this.#mapGetter.bind(this, this[`#${filter}`]);

    this.#items.forEach((item, index) => this.#processFilter(filter, item, index));
  }

  /**
  * Returns a list of badges that are 'instanceof' the provided type.
  * @param {T} type The type to compare against.
  * @returns
  */
  type(type) {
    return this.#items.filter((item) => item instanceof type);
  }
}
