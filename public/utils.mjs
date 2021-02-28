function randoNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function createRandomColor() {
  const color = `rgb(${randoNumber(0, 255)},${
    randoNumber(0, 255) // G value
  },${
    randoNumber(0, 255) // B value
  })`;
  return color;
}

const COLOR_PALLATE = new Map([
  [0, "rgb(191, 0, 255)"],
  [1, "rgb(0, 255, 64)"],
  [2, "rgb(255, 0, 0)"],
  [3, "rgb(0, 255, 255)"],
  [4, "rgb(255, 128, 0)"],
  [5, "rgb(64, 0, 255)"],
  [6, "rgb(255, 64, 0)"]
]);

const getColorFromPallate = (key) => {
  const newKey = key % COLOR_PALLATE.size;
  const color = COLOR_PALLATE.get(newKey);
  return color;
};

const copy2DArray = (array) => {
  const newArray = [];
  for (let i = 0; i < array.length; i += 1) {
    newArray[i] = array[i].slice();
  }
  return newArray;
};

const covertArray2dTO1d = (array2D) => {
  let newArr = [];
  for (let i = 0; i < array2D.length; i += 1) {
    newArr = newArr.concat(array2D[i]);
  }
  return newArr;
};

export {
  createRandomColor,
  getColorFromPallate,
  randoNumber,
  copy2DArray,
  covertArray2dTO1d
};
