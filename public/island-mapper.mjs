import Island from "./island.mjs";
import Point from "./point.mjs";
import Queue from "./queue.mjs";
import { randoNumber } from "./utils.mjs";

/**
 * mapper of 2d-array with 0,1 data, to Map (dictionary) with different islands colors and points
 * each island in surrounded with 0
 */
class IslandMapper {
  /**
   * constructor for the mapper
   * @param {number} width - width of the map
   * @param {number} hight - hight of the map
   */
  constructor(width, hight) {
    this.islandCount = 0;
    this.map2d = IslandMapper.initMap(width, hight);
    // console.log(this.map2d);
    this.width = this.map2d[0].length;
    this.hight = this.map2d.length;
    this.infiniteloopSafetyValve = this.width * this.hight * 1.2;
    // this will be converted to 0/1..n 2d array as islands are mapped
    this.islansdMap2d = IslandMapper.initIslandsMap(this.map2d);
    // const islandStrat = IslandCounter.copy2DArray(this.islandMap);
    // console.log(islandStrat);
    this.islandsDictionary = new Map();
  }

  /**
   * create new map - 2d arrray with random 0/1 data
   * @param {number} width of the map
   * @param {number} hight of the map
   */
  static initMap(width, hight) {
    const arr = [];
    for (let i = 0; i < hight; i += 1) {
      arr[i] = Array.from({ length: width }, () => randoNumber(0, 1));
    }
    return arr;
  }
  /**
   * initialize 2d-array which is the map of the islands,
   * create 2d-array with 0/-1 from input 2d-array of 0/1
   * -1 point symbols un-charted land, 0 symbols water
   * @param {number[][]} array - 2d array which is the original map
   */
  static initIslandsMap(array) {
    const newArray = [];
    for (let i = 0; i < array.length; i += 1) {
      newArray[i] = array[i].map((x) => (x === 1 ? -1 : 0));
    }
    return newArray;
  }

  /**
   * iterate over the input map, looking for un-charted land point
   * if found this root point, add new island and start mapping all its points
   */
  findIslends() {
    for (let y = 0; y < this.map2d.length; y += 1) {
      for (let x = 0; x < this.map2d[y].length; x += 1) {
        if (this.isUnChartedLand(x, y)) {
          const island = this.addNewIsland();
          const point = new Point(x, y);
          this.doMapIsland(point, island);
        }
      }
    }
    return this.islandCount;
  }

  /**
   * check if given x,y is un-charted land (-1)
   * 0 symbols sea, val > 1 symbols mapped land
   * @param {number} x
   * @param {number} y
   */
  isUnChartedLand(x, y) {
    return this.islansdMap2d[y][x] < 0;
  }

  /**
   * map an island - get a root - point which is un-charted land,
   * insert the root to the new island
   * find all its un-charted land neighbors. put them in a queue and map them too
   * @param {Point} root - first point in a new island
   * @param {Island} island - island with key, and points
   */
  doMapIsland(root, island) {
    let index = 0;
    // queue of new land points, which are part of this island
    // point in the queue is marked as charted (value >0 )
    // this prevent it to be added to the queue by nighbores
    const queueNewChatredLandPoints = new Queue();
    // chart the root point, add it to queue
    this.islansdMap2d[root.y][root.x] = island.key;
    queueNewChatredLandPoints.push(root);
    while (queueNewChatredLandPoints.getLength()) {
      index += 1;
      if (index > this.infiniteloopSafetyValve) {
        // todo - add msg to user
        console.log("infinite loop SafetyValve break !!");
        break;
      }
      const point = queueNewChatredLandPoints.shift();
      this.addPointToIsland(point, island);
      // add neighbor land point to queue
      const neighbors = this.getNeighbors(point.x, point.y);
      neighbors.forEach((newPoint) => {
        if (this.isUnChartedLand(newPoint.x, newPoint.y)) {
          // chart new point, add it to queue
          this.islansdMap2d[newPoint.y][newPoint.x] = island.key;
          queueNewChatredLandPoints.push(newPoint);
        }
      });
    }
  }

  /**
   * get Neighbors of given point
   * @param {number} x
   * @param {number} y
   */
  getNeighbors(x, y) {
    const neighbors = [];
    if (x > 0) {
      if (y > 0) neighbors.push(new Point(x - 1, y - 1));
      neighbors.push(new Point(x - 1, y));
      if (y + 1 < this.hight) neighbors.push(new Point(x - 1, y + 1));
    }
    if (y > 0) neighbors.push(new Point(x, y - 1));
    if (y + 1 < this.hight) neighbors.push(new Point(x, y + 1));
    if (x + 1 < this.width) {
      if (y > 0) neighbors.push(new Point(x + 1, y - 1));
      neighbors.push(new Point(x + 1, y));
      if (y + 1 < this.hight) neighbors.push(new Point(x + 1, y + 1));
    }
    return neighbors;
  }

  /**
   * careate new Island and add it to Dictionary of dictionary islands
   */
  addNewIsland() {
    this.islandCount += 1;
    const island = new Island(this.islandCount);
    this.islandsDictionary.set(this.islandCount, island);
    // console.log(`new island ${island.key}:`);
    return island;
  }

  /**
   * add new point to an island
   * @param {Point} point
   * @param {Island} island
   */
  addPointToIsland(point, island) {
    // console.log(`${island.key}: ${point.x}, ${point.y}`);
    island.addPoint(point);
  }

  /**
   * log the input (0/1) 2d-array map
   */
  printMap() {
    // eslint-disable-next-line no-console
    console.log(this.map2d);
  }

  /**
   * log the isalnds 2d-array map, 0 is ochen 1..n are islands
   */
  printIslandMap() {
    // eslint-disable-next-line no-console
    console.log(this.islansdMap2d);
  }

  /**
   * log list of islands, by key, size and color
   */
  printIslandlist() {
    this.islandsDictionary.forEach((value) => {
      const { key, color, points } = value;
      console.log(`island ${key}: ${points.size}, ${color}`);
    });
    // eslint-disable-next-line no-console
    console.log(this.islansdMap2d);
  }
}

export default IslandMapper;
