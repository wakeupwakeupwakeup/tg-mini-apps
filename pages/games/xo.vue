<script setup lang="ts">
interface Position {
	x: number;
	y: number;
}

interface SquareData {
	position: Position;
	hasFigure: boolean;
	figure: "cross" | "circle" | null;
	isNew?: boolean;
}

interface LineData {
	position: Position;
	isVertical: boolean;
}

interface WinLine {
	start: Position;
	end: Position;
	direction: "horizontal" | "vertical" | "diagonal" | "antiDiagonal";
}

const WINLINE = 5;

// Состояния
const squares = ref<SquareData[]>([]);
const lines = ref<LineData[]>([]);
const currentPlayer = ref<"cross" | "circle">("cross");
const winLine = ref<WinLine | null>(null);
const showWinLine = ref(false);

// Инициализация начального состояния
onMounted(() => {
	const initialSquare: SquareData = {
		position: { x: 0, y: 0 },
		hasFigure: false,
		figure: null,
	};
	squares.value = [initialSquare];
});

// Проверка, занята ли позиция
const isPositionOccupied = (position: Position): boolean => {
	return squares.value.some(
		(square) =>
			square.position.x === position.x && square.position.y === position.y,
	);
};

// Проверка наличия соседа в указанной позиции
const hasNeighbor = (position: Position): boolean => {
	return isPositionOccupied(position);
};

// Перемешивание массива
const shuffleArray = <T,>(array: T[]): T[] => {
	const newArray = [...array];
	for (let i = newArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
	}
	return newArray;
};

// Добавление новых Square вокруг установленной фигуры
const addNewSquaresAround = (centerPosition: Position) => {
	const newSquares: SquareData[] = [];

	for (let y = -2; y <= 2; y++) {
		for (let x = -2; x <= 2; x++) {
			if (x === 0 && y === 0) continue;

			const newPosition = {
				x: centerPosition.x + x,
				y: centerPosition.y + y,
			};

			if (!isPositionOccupied(newPosition)) {
				newSquares.push({
					position: newPosition,
					hasFigure: false,
					figure: null,
					isNew: true,
				});
			}
		}
	}

	const shuffledSquares = shuffleArray(newSquares);

	shuffledSquares.forEach((square, index) => {
		setTimeout(() => {
			squares.value = [...squares.value, square];
		}, index * 15);
	});

	setTimeout(
		() => {
			squares.value = squares.value.map((square) => ({
				...square,
				isNew: false,
			}));
		},
		shuffledSquares.length * 15 + 25,
	);
};

// Проверка линии на победу
const checkWinLine = (
	squares: SquareData[],
	lastMove: Position,
	player: "cross" | "circle",
): WinLine | null => {
	const directions = [
		{ dx: 1, dy: 0, type: "horizontal" },
		{ dx: 0, dy: 1, type: "vertical" },
		{ dx: 1, dy: 1, type: "diagonal" },
		{ dx: 1, dy: -1, type: "antiDiagonal" },
	];

	for (const dir of directions) {
		let count = 1;
		let start = { ...lastMove };
		let end = { ...lastMove };

		// Проверяем в прямом направлении
		for (let i = 1; i < WINLINE; i++) {
			const pos = {
				x: lastMove.x + dir.dx * i,
				y: lastMove.y + dir.dy * i,
			};
			const square = squares.find(
				(s) =>
					s.position.x === pos.x &&
					s.position.y === pos.y &&
					s.figure === player,
			);
			if (square) {
				count++;
				end = pos;
			} else {
				break;
			}
		}

		// Проверяем в обратном направлении
		for (let i = 1; i < WINLINE; i++) {
			const pos = {
				x: lastMove.x - dir.dx * i,
				y: lastMove.y - dir.dy * i,
			};
			const square = squares.find(
				(s) =>
					s.position.x === pos.x &&
					s.position.y === pos.y &&
					s.figure === player,
			);
			if (square) {
				count++;
				start = pos;
			} else {
				break;
			}
		}

		if (count >= WINLINE) {
			return { start, end, direction: dir.type as WinLine["direction"] };
		}
	}

	return null;
};

// Обработчик клика по квадрату
const handleSquareClick = (position: Position) => {
	if (winLine.value) return;

	squares.value = squares.value.map((square) =>
		square.position.x === position.x && square.position.y === position.y
			? { ...square, hasFigure: true, figure: currentPlayer.value }
			: square,
	);

	const winLineData = checkWinLine(
		squares.value,
		position,
		currentPlayer.value,
	);
	if (winLineData) {
		winLine.value = winLineData;
		setTimeout(() => {
			showWinLine.value = true;
		}, 300);
	}

	setTimeout(() => {
		addNewSquaresAround(position);
		currentPlayer.value = currentPlayer.value === "cross" ? "circle" : "cross";
	}, 300);
};

// Обновление линий при изменении квадратов
watch(
	squares,
	() => {
		const newLines: LineData[] = [];

		squares.value.forEach((square) => {
			const { x, y } = square.position;

			if (!hasNeighbor({ x, y: y + 1 })) {
				newLines.push({ position: { x, y }, isVertical: false });
			}
			if (!hasNeighbor({ x, y: y - 1 })) {
				newLines.push({ position: { x, y: y - 1 }, isVertical: false });
			}
			if (!hasNeighbor({ x: x - 1, y })) {
				newLines.push({ position: { x, y }, isVertical: true });
			}
			if (!hasNeighbor({ x: x + 1, y })) {
				newLines.push({ position: { x: x + 1, y }, isVertical: true });
			}
		});

		lines.value = newLines;
	},
	{ deep: true },
);

// Получение размеров окна
const windowWidth = ref(window.innerWidth);
const windowHeight = ref(window.innerHeight);

// Обновление размеров окна
const updateWindowSize = () => {
	windowWidth.value = window.innerWidth;
	windowHeight.value = window.innerHeight;
};

onMounted(() => {
	window.addEventListener("resize", updateWindowSize);
});

onUnmounted(() => {
	window.removeEventListener("resize", updateWindowSize);
});
</script>

<template>
	<div class="game-container">
		<!-- Здесь будет игра XO -->
		<svg width="100%" height="100%" style="overflow: visible">
			<g :transform="`translate(${windowWidth / 2}, ${windowHeight / 2})`">
				<!-- Отрисовка квадратов (только прозрачные области для кликов) -->
				<g
					v-for="(square, index) in squares"
					:key="index"
					:transform="`translate(${square.position.x * SHAPE_SIZE}, ${-square.position.y * SHAPE_SIZE})`"
				>
					<ShapeSquare :size="SHAPE_SIZE" />
					<rect
						v-if="!square.hasFigure"
						:x="-SHAPE_SIZE / 2"
						:y="-SHAPE_SIZE / 2"
						:width="SHAPE_SIZE"
						:height="SHAPE_SIZE"
						fill="rgba(0, 255, 0, 0)"
						style="cursor: pointer"
						@click="handleSquareClick(square.position)"
					/>
				</g>

				<!-- Отрисовка фигур -->
				<g
					v-for="(square, index) in squares"
					:key="`figure-${index}`"
					:transform="`translate(${square.position.x * SHAPE_SIZE}, ${-square.position.y * SHAPE_SIZE})`"
				>
					<g
						v-if="square.figure === 'cross'"
						:transform="`translate(${SHAPE_SIZE / 2}, ${SHAPE_SIZE / 2})`"
					>
						<ShapeCross :stroke="BLUE_COLOR" :stroke-width="SHAPE_STROKE" />
					</g>
					<g
						v-if="square.figure === 'circle'"
						:transform="`translate(${SHAPE_SIZE / 2}, ${SHAPE_SIZE / 2})`"
					>
						<ShapeCircle
							:stroke="RED_COLOR"
							:stroke-width="SHAPE_STROKE"
							fill="none"
						/>
					</g>
				</g>

				<!-- Отрисовка линий (теперь они будут поверх квадратов) -->
				<g
					v-for="(line, index) in lines"
					:key="`line-${index}`"
					:transform="`translate(${line.position.x * SHAPE_SIZE}, ${-line.position.y * SHAPE_SIZE})`"
					style="stroke-width: 1.5; pointer-events: none"
				>
					<component
						:is="line.isVertical ? 'ShapeVerticalLine' : 'ShapeHorizontalLine'"
						:size="SHAPE_SIZE"
						:on-click="() => {}"
					/>
				</g>
			</g>

			<!-- Выигрышная линия (остается поверх всего) -->
			<g
				v-if="winLine && showWinLine"
				:transform="`translate(${windowWidth / 2}, ${windowHeight / 2})`"
			>
				<ShapeWinLine
					:x="winLine.start.x * SHAPE_SIZE"
					:y="-winLine.start.y * SHAPE_SIZE"
					:size="winLine.end.x * SHAPE_SIZE"
					:stroke-width="-winLine.end.y * SHAPE_SIZE"
				/>
			</g>
		</svg>
	</div>
</template>

<style scoped>
.game-container {
	width: 100vw;
	height: 100vh;
	background-color: rgb(40, 44, 52);
	overflow: auto;
	position: fixed;
	top: 0;
	left: 0;
}
</style>
