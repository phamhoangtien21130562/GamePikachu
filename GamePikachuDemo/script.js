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
      ];
    // Lấy thẻ div chứa bàn cờ
    const board = document.getElementById('game-board');
    
    // Khởi tạo ma trận 18x11 với tất cả các phần tử có giá trị là 0
    let matrix = new Array(18).fill(0).map(() => new Array(11).fill(0));
    
    // Gán giá trị -1 cho các ô ngoài cùng
    for (let i = 0; i < 11; i++) {
        for (let j = 0; j < 18; j++) {
            if (i === 0 || i === 17 || j === 0 || j === 10) {
                matrix[i][j] = -1;
            }
        }
    }
    // Hàm đặt các con thú từ mảng vào ma trận sao cho mỗi con xuất hiện 4 lần
    function placeAllAnimals(matrix) {
      const numRows = matrix.length;
      const numCols = matrix[0].length;
      const numAnimals = imageFiles.length * 4; // Số lần mỗi con thú xuất hiện
      
      let animalCount = {}; // Đếm số lần mỗi con thú đã được đặt
      
      // Khởi tạo số lần đặt của mỗi con thú là 0
      imageFiles.forEach((animal) => {
          animalCount[animal] = 0;
      });
      
      let count = 0;
      
      while (count < numAnimals) {
        const row = Math.floor(Math.random() * (numRows - 2)) + 1; // Tránh đặt vào lề
        const col = Math.floor(Math.random() * (numCols - 2)) + 1;
    
        if (matrix[row][col] === 0) {
            // Đảm bảo rằng hàng và cột nằm trong phạm vi của ma trận
            let animalIndex = Math.floor(Math.random() * imageFiles.length);
            let animalImage = imageFiles[animalIndex];
            let attempts = 0; // Đếm số lần thử đặt mỗi con thú
    
            while (attempts < imageFiles.length && animalCount[animalImage] >= 4) {
                animalIndex = (animalIndex + 1) % imageFiles.length; // Chuyển sang con thú tiếp theo trong mảng
                animalImage = imageFiles[animalIndex];
                attempts++;
            }
    
            if (animalCount[animalImage] < 4) {
                matrix[row][col] = animalImage;
                animalCount[animalImage]++;
                count++;
            }
        }
    }
        
    
    }
    
    // Đặt tất cả các con thú vào ma trận
    placeAllAnimals(matrix);
    
    // Xóa bỏ tất cả các phần tử con trong thẻ game-board trước khi thêm vào các hình ảnh mới
    board.innerHTML = '';
    
    // Lấy kích thước của mỗi ô từ CSS
    const cellWidth = parseFloat(getComputedStyle(board).gridTemplateColumns.split(' ')[0]);
    const cellHeight = parseFloat(getComputedStyle(board).gridTemplateRows.split(' ')[0]);
    
    
    // Đặt tất cả các con thú vào thẻ game-board với vị trí chính xác
    for (let i = 0; i < 11; i++) {
      for (let j = 0; j < 18; j++) {
          if (matrix[j][i] !== 0) {
              const img = document.createElement('img');
              img.src = matrix[j][i];
              
              // Tính toán vị trí của hình ảnh trong game-board
              const posX = j * cellWidth; // Vị trí ngang của hình ảnh
              const posY = i * cellHeight; // Vị trí dọc của hình ảnh
              
              // Đặt kích thước của hình ảnh
              img.width = cellWidth;
              img.height = cellHeight;
              
              // Đặt vị trí của hình ảnh trong game-board
              img.style.position = 'absolute';
              img.style.left = `${posX}px`;
              img.style.top = `${posY}px`;
              
              board.appendChild(img);
          }
      }
    }
    
