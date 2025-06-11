<script lang="ts" setup>
import { useHead } from "#imports";

definePageMeta({
	layout: false,
});

interface Cell {
	value: string;
	x: number;
	y: number;
	isVisible: boolean;
	isNew: boolean; // Для анимации новых клеток
}

const gameBoard = ref<Map<string, Cell>>(new Map());
const currentPlayer = ref<"X" | "O">("X");
const winner = ref<string | null>(null);
const boardPosition = ref({ x: 0, y: 0 });
const isDragging = ref(false);
const startDragPos = ref({ x: 0, y: 0 });
const dragStartTime = ref(0);
const hasMoved = ref(false);

// Размер клетки
const CELL_SIZE = ref(window?.innerWidth && window.innerWidth < 768 ? 40 : 60);

useBackButton(() => navigateTo("/"));
useHead({
	bodyAttrs: {
		class: "bg-[#282C34] text-white",
	},
});

onMounted(() => {
	// Центрируем начальную клетку
	const centerX = window?.innerWidth ? window.innerWidth / 2 : 0;
	const centerY = window?.innerHeight ? window.innerHeight / 2 : 0;
	boardPosition.value = {
		x: centerX - CELL_SIZE.value / 2,
		y: centerY - CELL_SIZE.value / 2,
	};

	// Создаем начальную клетку
	const initialCell: Cell = {
		x: 0,
		y: 0,
		value: "",
		isVisible: true,
		isNew: true,
	};
	gameBoard.value.set("0,0", initialCell);

	// Убираем флаг новой клетки после анимации
	setTimeout(() => {
		const cell = gameBoard.value.get("0,0");
		if (cell) {
			cell.isNew = false;
			gameBoard.value.set("0,0", cell);
		}
	}, 300);
});

const handleDragStart = (event: MouseEvent | TouchEvent) => {
	isDragging.value = true;
	hasMoved.value = false;
	dragStartTime.value = Date.now();
	const pos = "touches" in event ? event.touches[0] : event;
	startDragPos.value = {
		x: pos.clientX - boardPosition.value.x,
		y: pos.clientY - boardPosition.value.y,
	};
	if ("touches" in event) event.preventDefault();
};

const handleDrag = (event: MouseEvent | TouchEvent) => {
	if (!isDragging.value) return;
	const pos = "touches" in event ? event.touches[0] : event;

	const newX = pos.clientX - startDragPos.value.x;
	const newY = pos.clientY - startDragPos.value.y;

	// Определяем, было ли реальное движение
	const deltaX = Math.abs(newX - boardPosition.value.x);
	const deltaY = Math.abs(newY - boardPosition.value.y);
	if (deltaX > 5 || deltaY > 5) {
		hasMoved.value = true;
	}

	boardPosition.value = { x: newX, y: newY };

	if ("touches" in event) event.preventDefault();
};

const handleDragEnd = (event: MouseEvent | TouchEvent) => {
	const dragDuration = Date.now() - dragStartTime.value;

	// Если это был короткий клик без движения, обрабатываем как клик
	if (dragDuration < 200 && !hasMoved.value) {
		const target = event.target as HTMLElement;
		if (target.classList.contains("cell")) {
			const cellKey = target.getAttribute("data-cell-key");
			if (cellKey) {
				const cell = gameBoard.value.get(cellKey);
				if (cell) {
					makeMove(cell);
				}
			}
		}
	}

	isDragging.value = false;
	hasMoved.value = false;
};

const getCellKey = (x: number, y: number): string => `${x},${y}`;

const makeMove = (cell: Cell) => {
	if (!cell.isVisible || cell.value !== "" || winner.value || isDragging.value)
		return;

	// Обновляем значение клетки
	const updatedCell = { ...cell, value: currentPlayer.value, isNew: false };
	gameBoard.value.set(getCellKey(cell.x, cell.y), updatedCell);

	// Добавляем новые клетки вокруг с задержкой
	const newCells: Cell[] = [];
	for (let dy = -2; dy <= 2; dy++) {
		for (let dx = -2; dx <= 2; dx++) {
			const newX = cell.x + dx;
			const newY = cell.y + dy;
			const key = getCellKey(newX, newY);

			if (!gameBoard.value.has(key)) {
				newCells.push({
					x: newX,
					y: newY,
					value: "",
					isVisible: true,
					isNew: true,
				});
			}
		}
	}

	// Добавляем клетки с анимацией
	newCells.forEach((newCell, index) => {
		const key = getCellKey(newCell.x, newCell.y);
		setTimeout(() => {
			gameBoard.value.set(key, newCell);
			setTimeout(() => {
				const cell = gameBoard.value.get(key);
				if (cell) {
					cell.isNew = false;
					gameBoard.value.set(key, cell);
				}
			}, 300);
		}, index * 50);
	});

	checkWinner();
	currentPlayer.value = currentPlayer.value === "X" ? "O" : "X";
};

const checkWinner = () => {
	const directions = [
		[1, 0],
		[0, 1],
		[1, 1],
		[1, -1],
	];

	for (const cell of gameBoard.value.values()) {
		if (!cell.value) continue;

		for (const [dx, dy] of directions) {
			let count = 1;

			for (const multiplier of [-1, 1]) {
				for (let step = 1; step < 5; step++) {
					const x = cell.x + dx * step * multiplier;
					const y = cell.y + dy * step * multiplier;
					const key = getCellKey(x, y);
					const nextCell = gameBoard.value.get(key);

					if (!nextCell || nextCell.value !== cell.value) break;
					count++;
				}
			}

			if (count >= 5) {
				winner.value = cell.value;
				return;
			}
		}
	}
};

const resetGame = () => {
	gameBoard.value = new Map();
	const initialCell: Cell = {
		x: 0,
		y: 0,
		value: "",
		isVisible: true,
		isNew: true,
	};
	gameBoard.value.set("0,0", initialCell);
	currentPlayer.value = "X";
	winner.value = null;

	setTimeout(() => {
		const cell = gameBoard.value.get("0,0");
		if (cell) {
			cell.isNew = false;
			gameBoard.value.set("0,0", cell);
		}
	}, 300);
};

const visibleBoard = computed(() => {
	const cells = Array.from(gameBoard.value.values());
	if (cells.length === 0) return [];

	const minX = Math.min(...cells.map((c) => c.x));
	const maxX = Math.max(...cells.map((c) => c.x));
	const minY = Math.min(...cells.map((c) => c.y));
	const maxY = Math.max(...cells.map((c) => c.y));

	const board: Cell[][] = [];
	for (let y = minY; y <= maxY; y++) {
		const row: Cell[] = [];
		for (let x = minX; x <= maxX; x++) {
			const cell = gameBoard.value.get(getCellKey(x, y)) || {
				x,
				y,
				value: "",
				isVisible: false,
				isNew: false,
			};
			row.push(cell);
		}
		board.push(row);
	}
	return board;
});
</script>

<template>
	<div class="game-container">
		<h1 class="title">Крестики-нолики ∞</h1>

		<div class="status">
			<template v-if="!winner"> Ход игрока: {{ currentPlayer }} </template>
			<template v-else>
				{{ winner === "draw" ? "Ничья!" : `Победитель: ${winner}!` }}
			</template>
		</div>

		<div class="game-board-wrapper">
			<!-- Прозрачная область для перетаскивания -->
			<div
				class="drag-area"
				@touchstart.prevent="handleDragStart"
				@touchmove.prevent="handleDrag"
				@touchend.prevent="handleDragEnd"
				@mousedown="handleDragStart"
				@mousemove="handleDrag"
				@mouseup="handleDragEnd"
				@mouseleave="handleDragEnd"
			></div>

			<!-- Игровое поле -->
			<div
				class="game-board"
				:style="{
					transform: `translate3d(${boardPosition.x}px, ${boardPosition.y}px, 0)`,
				}"
			>
				<div
					v-for="(row, rowIndex) in visibleBoard"
					:key="rowIndex"
					class="board-row"
				>
					<button
						v-for="cell in row"
						:key="`${cell.x},${cell.y}`"
						class="cell"
						:class="{
							'cell-visible': cell.isVisible,
							'cell-filled': cell.value !== '',
							'cell-new': cell.isNew,
						}"
						@click="makeMove(cell)"
						:disabled="Boolean(!cell.isVisible || cell.value !== '' || winner)"
					>
						<span class="cell-content" :class="{ appear: cell.value }">
							{{ cell.value }}
						</span>
					</button>
				</div>
			</div>
		</div>

		<button class="reset-button" @click="resetGame">Начать заново</button>
	</div>
</template>

<style scoped>
.game-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	box-sizing: border-box;
}

.game-board-wrapper {
	position: relative;
	flex: 1;
	width: 100%;
	overflow: hidden;
}

.drag-area {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 1;
	cursor: grab;
	touch-action: none;
}

.drag-area:active {
	cursor: grabbing;
}

.game-board {
	position: absolute;
	display: flex;
	flex-direction: column;
	gap: 5px;
	will-change: transform;
	z-index: 2;
	pointer-events: none;
}

.board-row {
	display: flex;
	gap: 5px;
}

.cell {
	width: v-bind("`${CELL_SIZE}px`");
	height: v-bind("`${CELL_SIZE}px`");
	font-size: clamp(1rem, 4vw, 1.5rem);
	font-weight: bold;
	background: transparent;
	border: none;
	padding: 0;
	position: relative;
	transform: scale(0);
	opacity: 0;
	transition: none;
	pointer-events: auto;
	cursor: pointer;
	color: black;
}

.cell-visible {
	border: 2px solid #333;
	border-radius: 8px;
	transform: scale(1);
	opacity: 1;
	transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	background: white;
}

.cell-new {
	animation: appearWithPop 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.cell-content {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%) scale(0);
	opacity: 0;
	transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	pointer-events: none;
}

.cell-content.appear {
	transform: translate(-50%, -50%) scale(1);
	opacity: 1;
}

.cell-visible:hover:not(:disabled) {
	background-color: #f0f0f0;
}

.cell-filled {
	background-color: #e8e8e8;
}

.reset-button {
	padding: clamp(8px, 2vw, 10px) clamp(16px, 4vw, 20px);
	font-size: clamp(0.9rem, 3vw, 1.1rem);
	background-color: #4caf50;
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.reset-button:hover {
	background-color: #45a049;
	transform: scale(1.05);
}

@keyframes appearWithPop {
	0% {
		transform: scale(0);
		opacity: 0;
	}
	50% {
		transform: scale(1.1);
		opacity: 0.5;
	}
	100% {
		transform: scale(1);
		opacity: 1;
	}
}

@media (max-width: 768px) {
	.game-board {
		padding: 10px;
		gap: 3px;
	}

	.board-row {
		gap: 3px;
	}
}
</style>
