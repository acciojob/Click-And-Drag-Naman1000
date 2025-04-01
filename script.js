const container = document.querySelector('.items');
const cubes = document.querySelectorAll('.item');
let selectedCube = null;
let offsetX = 0, offsetY = 0;

cubes.forEach(cube => {
    cube.addEventListener('mousedown', (e) => {
        selectedCube = cube;
        offsetX = e.clientX - cube.getBoundingClientRect().left;
        offsetY = e.clientY - cube.getBoundingClientRect().top;
        cube.style.position = 'absolute';
        cube.style.zIndex = 1000;
    });
});

document.addEventListener('mousemove', (e) => {
    if (!selectedCube) return;
    
    let x = e.clientX - offsetX;
    let y = e.clientY - offsetY;
    
    // Boundary constraints
    const containerRect = container.getBoundingClientRect();
    const cubeRect = selectedCube.getBoundingClientRect();
    
    if (x < containerRect.left) x = containerRect.left;
    if (y < containerRect.top) y = containerRect.top;
    if (x + cubeRect.width > containerRect.right) x = containerRect.right - cubeRect.width;
    if (y + cubeRect.height > containerRect.bottom) y = containerRect.bottom - cubeRect.height;
    
    selectedCube.style.left = `${x}px`;
    selectedCube.style.top = `${y}px`;
});

document.addEventListener('mouseup', () => {
    if (selectedCube) {
        selectedCube.style.zIndex = '';
        selectedCube = null;
    }
});