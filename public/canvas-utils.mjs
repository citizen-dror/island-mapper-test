/**
 * drow rectangles in canvas, data from 2d-array with 0/1 values
 * @param {string} cnnvasName 
 * @param {number[][]} array2D 
 * @param {number} mapWidth 
 * @param {number} mapHight 
 */
const drawArr2dBinary = (cnnvasName, array2D, mapWidth, mapHight) => {
  const canvas = document.getElementById(cnnvasName);
  const rectWidth = (canvas.width / mapWidth);
  const rectHight = (canvas.height / mapHight);
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgb(0, 0, 0)';
    for (let y = 0; y < array2D.length; y += 1) {
      for (let x = 0; x < array2D[y].length; x += 1) {
        if (array2D[y][x] === 1) {
          ctx.fillRect(x * rectWidth, y * rectHight, rectWidth, rectHight);
        }
      }
    }
  }
};

/**
 * drow rectangles in canvas, data from Map(dictionary) with colors and map of points
 * @param {string} cnnvasName 
 * @param {Map} map - dictionary with colors and map of points  
 * @param {number} mapWidth 
 * @param {number} mapHight 
 */
const drawMapWithColors = (cnnvasName, map, mapWidth, mapHight) => {
  const canvas = document.getElementById(cnnvasName);
  if (canvas) {
    const rectWidth = (canvas.width / mapWidth);
    const rectHight = (canvas.height / mapHight);
    if (canvas.getContext) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      map.forEach((value) => {
        const { color, points } = value;
        ctx.fillStyle = color;
        points.forEach((point) => {
          ctx.fillRect(point.x * rectWidth, point.y * rectHight, rectWidth, rectHight);
        });
      });
    }
  }
};

export {
  drawArr2dBinary,
  drawMapWithColors,
}