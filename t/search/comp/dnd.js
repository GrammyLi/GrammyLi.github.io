/*
 * @Author: your name
 * @Date: 2021-11-06 13:36:07
 * @LastEditTime: 2021-11-26 09:29:11
 * @LastEditors: Please set LastEditors
 * @Description: 拖拽功能
 * @FilePath: /grammyli/comp/dnd.js
 */
var dragSrcEl = null;

function handleDragStart(e) {
  // Target (this) element is the source node.
  dragSrcEl = this;

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.outerHTML);

  this.classList.add('dragElem');
}
function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }
  this.classList.add('over');

  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

  return false;
}

function handleDragEnter(e) {
  // this / e.target is the current hover target.
}

function handleDragLeave(e) {
  this.classList.remove('over');  // this / e.target is previous target element.
}

function handleDrop(e) {
  // this/e.target is current target element.

  if (e.stopPropagation) {
    e.stopPropagation(); // Stops some browsers from redirecting.
  }

  // Don't do anything if dropping the same column we're dragging.
  if (dragSrcEl != this) {
    // Set the source column's HTML to the HTML of the column we dropped on.
    //alert(this.outerHTML);
    //dragSrcEl.innerHTML = this.innerHTML;
    //this.innerHTML = e.dataTransfer.getData('text/html');
    this.parentNode.removeChild(dragSrcEl);
    var dropHTML = e.dataTransfer.getData('text/html');
    this.insertAdjacentHTML('beforebegin',dropHTML);
    var dropElem = this.previousSibling;
    addDnDHandlers(dropElem);
    
  }
  this.classList.remove('over');
  return false;
}

function handleDragEnd(e) {
  log('over')
  // 更新 engines
  const eles = es('.g-engines .g-engine')
  const ids = []
  eles.forEach((ele, i) => {
    let id = Number(ele.dataset.id);
    ids.push(id)
  })
  enginesIds = ids
 
  renderLogo()
  // this/e.target is the source node.
  this.classList.remove('over');
  /*[].forEach.call(cols, function (col) {
    col.classList.remove('over');
  });*/
  
}

function addDnDHandlers(elem) {
  elem.addEventListener('dragstart', handleDragStart, false);
  elem.addEventListener('dragenter', handleDragEnter, false)
  elem.addEventListener('dragover', handleDragOver, false);
  elem.addEventListener('dragleave', handleDragLeave, false);
  elem.addEventListener('drop', handleDrop, false);
  elem.addEventListener('dragend', handleDragEnd, false);

}

const bindEventDnd = () => {
  var cols = document.querySelectorAll('.g-engines .g-engine');
  [].forEach.call(cols, addDnDHandlers);
}