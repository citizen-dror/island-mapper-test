import IslandMapper from './island-mapper.mjs';
import {drawArr2dBinary, drawMapWithColors} from './canvas-utils.mjs';

let width = 200;
let hight = 200;
let islandMapper = null;

const showControl= (id, isShow) => {
  const x = document.getElementById(id);
  if (isShow) {
    x.style.visibility = 'visible';
  } else {
    x.style.visibility = 'hidden';
  }
}

const setLebelAndValue = (id, label, value) => {
  document.getElementById(id).innerHTML = `<b>${label}:</b> ${value}`;
} 

const runRandomizeMap = () => {
  console.log('start runRandomizeMap');
  width = parseInt(document.getElementById('inputWidth').value, 10);
  hight = parseInt(document.getElementById('inputHight').value, 10);
  islandMapper = new IslandMapper(width, hight);
  // islandMapper.printMap();
  drawArr2dBinary('islandsCanavas', islandMapper.map2d, width, hight);
  showControl('noticeDiv',false);
  showControl('btnSolve',true);
 
};

const runSolveMap = () => {
  console.log('start count');
  const start = new Date().getTime();
  // islandMapper.printMap();
  const count = islandMapper.findIslends();
  // islandMapper.printIslandMap();
  const timeDiff = new Date().getTime() - start;
  // islandMapper.printIslandlist();
  setLebelAndValue('spanIslandCount', 'Island count ', count); 
  setLebelAndValue('spanTime','Time (ms)', timeDiff);
  showControl('noticeDiv',true);
  drawMapWithColors('islandsCanavas', islandMapper.islandsDictionary, width, hight);
  showControl('btnSolve',false);
};

const validateMapSize = (e) => {
  const number = e.target.value;
  if (number > 1200) {
    e.target.value = 1200;
  }
  if (number < 1) {
    e.target.value = 1;
  }
};



const changeCnavasSize = (e) => {
  let number = e.target.value;
  if (number > 1000) {
    e.target.value = 1000;
    number = 1000;
  }
  if (number < 100) {
    e.target.value = 100;
    number = 100;
  }
  const canvas = document.getElementById('islandsCanavas');
  canvas.width = number;
  canvas.height = number;
  showControl('btnSolve', false);
};

document.getElementById('btnRandomize').addEventListener('click', runRandomizeMap, false);
document.getElementById('btnSolve').addEventListener('click', runSolveMap, false);
document.getElementById('inputWidth').addEventListener('input', validateMapSize);
document.getElementById('inputHight').addEventListener('input', validateMapSize);
document.getElementById('inputCanvasSize').addEventListener('input', changeCnavasSize);
