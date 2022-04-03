/**
 * A represntation of enities as a map and a list of ids.
 * @typedef EntityTable
 * @template T
 */
class EntityTable {
  /**
   * Create a new entity table instance
   * @param {Array<T>} collection - the collection of entities
   * @param {function} identifier - a function to return a unique identifier from an entity
   */
  constructor(collection = [], identifier = (o) => o.id) {
    this.allIds = [];
    this.byId = {};
    this.identifier = identifier;

    collection.forEach((o) => {
      const id = identifier(o);
      this.allIds.push(id);
      this.byId[id] = o;
    });
  }

  /**
   * Return the item by it's id
   * @param {*} id
   * @return {T}
   */
  get(id) {
    return this.byId[id];
  }

  /**
   * Add or replace an item in the table
   * @param {T} o - the entity to store
   */
  add(o) {
    const id = this.identifier(o);
    const index = this.allIds.indexOf(id);
    if (index === -1) this.allIds.push(id);
    this.byId[id] = o;
  }

  remove(id) {
    const index = this.allIds.findIndex(id);
    if (index !== -1) {
      this.allIds.splice(index, index + 1);
    }
    delete this.byId[id];
  }

  /**
   * Return all entites
   * @return {T[]}
   */
  all() {
    return this.allIds.map((id) => this.byId[id]);
  }

  /**
   * Sort the entities in this table
   * @param {funtion} sorter - the sorting function
   */
  sort(sorter) {
    this.allIds.sort(sorter);
  }

  /**
   * Return the size of the table
   * @return {number}
   */
  get size() {
    return this.allIds.length;
  }

  /**
   * Return the size of the table
   * @return {number}
   */
  get length() {
    return this.allIds.length;
  }

  /**
   * Returns the next element in the table or null
   * @param {*} id - the id of the current element
   * @return {T|null}
   */
  next(id) {
    const index = this.allIds.indexOf(id);
    if (index === -1) return null;
    if (index === this.allIds.length - 1) return null;
    const next = this.byId[this.allIds[index + 1]];
    return next;
  }

  /**
   * Returns the previous element in the table or null
   * @param {*} id - the id of the current element
   * @return {T|null}
   */
  prev(id) {
    const index = this.allIds.indexOf(id);
    if (index === -1) return null;
    if (index === 0) return null;
    const next = this.byId[this.allIds[index - 1]];
    return next;
  }

  /**
   *
   * @return {{byId: Object.<T>, allIds: []}}
   */
  toJSON() {
    return {
      allIds: this.allIds,
      byId: this.byId,
    };
  }
}

export default EntityTable;
