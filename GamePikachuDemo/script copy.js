// Định nghĩa một class để biểu diễn một điểm trên bàn cờ
class Point {
  constructor(x, y) {
      this.x = x;
      this.y = y;
  }
}

// Định nghĩa một class để biểu diễn một đoạn thẳng
class MyLine {
  constructor(p1, p2) {
      this.p1 = p1;
      this.p2 = p2;
  }
}

// // Hàm kiểm tra xem hai điểm có trên cùng một hàng hay không

function checkLineX(y1, y2, x) {
  // Kiểm tra xem y1 và y2 có cùng nằm trên cột x hay không
  return y1 === y2 && Math.abs(y1 - x) > 1;
}

// Hàm kiểm tra xem hai điểm có trên cùng một cột hay không

function checkLineY(x1, x2, y) {
  // Kiểm tra xem x1 và x2 có cùng nằm trên hàng y hay không
  return x1 === x2 && Math.abs(x1 - y) > 1;
}

// Hàm kiểm tra xem có đường đi giữa hai điểm trong phạm vi hình chữ nhật theo chiều ngang không

function checkRectX(p1, p2) {
  const minY = Math.min(p1.y, p2.y);
  const maxY = Math.max(p1.y, p2.y);

  for (let y = minY + 1; y < maxY; y++) {
      if (checkLineX(p1.y, p2.y, y)) {
          return y;
      }
  }

  return -1;
}

// Hàm kiểm tra xem có đường đi giữa hai điểm trong phạm vi hình chữ nhật theo chiều dọc không

function checkRectY(p1, p2) {
  const minX = Math.min(p1.x, p2.x);
  const maxX = Math.max(p1.x, p2.x);

  for (let x = minX + 1; x < maxX; x++) {
      if (checkLineY(p1.x, p2.x, x)) {
          return x;
      }
  }

  return -1;
}

// Hàm kiểm tra và tìm đường đi giữa hai điểm bất kỳ

function checkTwoPoint(p1, p2) {
  // Kiểm tra xem hai điểm có trên cùng một hàng hoặc cột không
  if (checkLineX(p1.y, p2.y, p1.x) || checkLineY(p1.x, p2.x, p1.y)) {
      return new MyLine(p1, p2);
  }

   // Kiểm tra xem có đường đi giữa hai điểm trong phạm vi hình chữ nhật không

  let rectX = checkRectX(p1, p2);
  if (rectX !== -1) {
      return new MyLine(new Point(p1.x, rectX), new Point(p2.x, rectX));
  }

  let rectY = checkRectY(p1, p2);
  if (rectY !== -1) {
      return new MyLine(new Point(rectY, p1.y), new Point(rectY, p2.y));
  }

  // Nếu không tìm thấy đường đi trong phạm vi hình chữ nhật, trả về null
  return null;
}
// Hàm đặt lại trạng thái của các ô đã chọn sau khi bỏ chọn

function resetSelectedCells() {
  const selectedCells = document.querySelectorAll('.selected');
  selectedCells.forEach(selectedCell => {
      selectedCell.classList.remove('selected');
      selectedCell.classList.add('initial');
  });
}



// Hàm xử lý khi click vào ô trên bàn cờ
function handleClick(event) {
  const cell = event.target;
  if (!cell.classList.contains('cell')) return;

  // Kiểm tra nếu ô đã được chọn trước đó, nếu có thì bỏ chọn
  if (cell.classList.contains('selected')) {
      resetSelectedCells(); // Đặt lại trạng thái của các ô đã chọn
      return;
  }

  // Nếu chưa có ô nào được chọn trước đó
  const selectedCells = document.querySelectorAll('.selected');
  if (selectedCells.length < 2) { // Nếu chưa có đủ 2 ô được chọn
      cell.classList.add('selected');
      cell.classList.remove('initial');
  } else { // Nếu đã có đủ 2 ô được chọn
      resetSelectedCells(); // Đặt lại trạng thái của các ô đã chọn
      // Đánh dấu ô hiện tại là đã chọn
      cell.classList.add('selected');
      cell.classList.remove('initial');
  }
}



// Hàm kiểm tra xem đường đi có hợp lệ không (không quá 3 đoạn)

// function isLineValid(line) {
//   const dx = Math.abs(line.p1.x - line.p2.x);
//   const dy = Math.abs(line.p1.y - line.p2.y);
//   return dx + dy <= 4;
// }

// Lắng nghe sự kiện click trên phần tử chứa bàn cờ

// document.getElementById('game-board').addEventListener('click', function(event) {
//   const cell = event.target.closest('.cell');
//   if (cell) {
//       handleClick(event);
//       cell.classList.toggle('clicked');
//   }
// });

// Hàm loại bỏ đường đi trên bàn cờ

// function removeLine(line) {
//   // Thay đổi cách loại bỏ ô trên bàn cờ
//   const cells = document.querySelectorAll('.cell');
//   cells.forEach(cell => {
//       const cellX = parseInt(cell.dataset.x);
//       const cellY = parseInt(cell.dataset.y);
//       if ((cellX === line.p1.x && cellY === line.p1.y) || (cellX === line.p2.x && cellY === line.p2.y)) {
//           cell.remove();
//       }
//   });
// }

// Kiểm tra tính hợp lệ của danh sách hình ảnh
// if (imageFiles.length < 16 * 9 / 2) {
//   console.error('Not enough image files for the game board.');
// }




  
// Tạo ma trận 16x9 và đặt hình ảnh của các con thú vào từng ô
for (let i = 0; i < 18; i++) {
  for (let j = 0; j < 11; j++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    

    // Chọn ngẫu nhiên một con thú từ danh sách
    const randomIndex = Math.floor(Math.random() * imagesRepeated.length);
    const imageName = imagesRepeated[randomIndex];
    imagesRepeated.splice(randomIndex, 1); // Loại bỏ con thú đã được chọn

    const image = document.createElement('img');
    image.src = imageName;
    image.alt = 'Piece';
    cell.appendChild(image);
    board.appendChild(cell);
  }
}
 // Tạo mảng mới chứa tên tệp hình ảnh của các con thú với mỗi con thú xuất hiện 4 lần
 const imagesRepeated = [];
 imageFiles.forEach(image => {
   for (let i = 0; i < 4; i++) {
     imagesRepeated.push(image);
   }
 });