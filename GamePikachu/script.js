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

// Hàm kiểm tra xem hai điểm có trên cùng một hàng hay không
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

// Hàm kiểm tra xem đường đi có hợp lệ không (không quá 3 đoạn)
function isLineValid(line) {
  const dx = Math.abs(line.p1.x - line.p2.x);
  const dy = Math.abs(line.p1.y - line.p2.y);
  return dx + dy <= 4;
}

// Hàm xử lý khi click vào ô trên bàn cờ
function handleClick(event) {
  const cell = event.target.closest('.cell');
  if (!cell || cell.classList.contains('selected')) return;

  cell.classList.add('selected');

  const selectedCells = document.querySelectorAll('.selected');
  if (selectedCells.length === 2) {
      const p1 = new Point(parseInt(selectedCells[0].dataset.x), parseInt(selectedCells[0].dataset.y));
      const p2 = new Point(parseInt(selectedCells[1].dataset.x), parseInt(selectedCells[1].dataset.y));
      const line = checkTwoPoint(p1, p2);
      if (line !== null && isLineValid(line)) {
          // Loại bỏ cả hai ô được chọn trước đó
          selectedCells.forEach(cell => cell.remove());
      } else {
          // Khôi phục trạng thái ban đầu của các ô không hợp lệ
          setTimeout(() => {
              selectedCells.forEach(cell => cell.classList.remove('selected'));
          }, 500);
      }
  }
}

// Lắng nghe sự kiện click trên phần tử chứa bàn cờ
document.getElementById('game-board').addEventListener('click', function(event) {
  const cell = event.target.closest('.cell');
  if (cell) {
      handleClick(event);
      cell.classList.toggle('clicked');
  }
});

// Tạo mảng lưu trữ các loại hình ảnh
const imageFiles = [
  `pieces1.png`,
`pieces2.png`,
`pieces3.png`,
`pieces4.png`,
`pieces5.png`,
`pieces6.png`,
`pieces7.png`,
`pieces8.png`,
`pieces9.png`,
`pieces10.png`,
`pieces11.png`,
`pieces12.png`,
`pieces13.png`,
`pieces14.png`,
`pieces15.png`,
`pieces16.png`,
`pieces17.png`,
`pieces18.png`,
`pieces19.png`,
`pieces20.png`,
`pieces21.png`,
`pieces22.png`,
`pieces23.png`,
`pieces24.png`,
`pieces25.png`,
`pieces26.png`,
`pieces27.png`,
`pieces28.png`,
`pieces29.png`,
`pieces30.png`,
`pieces31.png`,
`pieces32.png`,
`pieces33.png`,
`pieces34.png`,
`pieces35.png`,
`pieces36.png`,
  // Thêm các tên hình ảnh khác vào đây
];

// Tạo mảng lưu trữ tất cả các hình ảnh
let allImages = [];

// Tạo ma trận 16x9 và đặt hình ảnh cho mỗi ô
const board = document.getElementById('game-board');
for (let i = 0; i < 16; i++) {
  for (let j = 0; j < 9; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.x = i;
      cell.dataset.y = j;

      // Chọn ngẫu nhiên một hình ảnh từ mảng các loại hình ảnh
      const randomIndex = Math.floor(Math.random() * imageFiles.length);
      const imageName = imageFiles[randomIndex];
      allImages.push(imageName);
      imageFiles.splice(randomIndex, 1); // Loại bỏ hình ảnh đã được chọn để tránh lặp lại

      const image = document.createElement('img');
      image.src = imageName;
      image.alt = 'Piece';
      cell.appendChild(image);
      board.appendChild(cell);
  }
}

// Lặp lại quá trình chọn hình ảnh cho các ô còn lại bằng cách sử dụng các hình ảnh đã chọn
while (imageFiles.length < 144) {
  const randomIndex = Math.floor(Math.random() * allImages.length);
  const imageName = allImages[randomIndex];

  const emptyCells = document.querySelectorAll('.cell:not(:has(img))');
  if (emptyCells.length === 0) break; // Kiểm tra xem còn ô trống không
  const cellIndex = Math.floor(Math.random() * emptyCells.length);
  const cell = emptyCells[cellIndex];
  const image = document.createElement('img');
  image.src = imageName;
  image.alt = 'Piece';
  cell.appendChild(image);

  allImages.splice(randomIndex, 1); // Loại bỏ hình ảnh đã được sử dụng để tránh lặp lại
}
