<script setup lang="ts">
import { io } from "socket.io-client";

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

interface GameState {
	squares: SquareData[];
	currentPlayer: "cross" | "circle";
	winLine: WinLine | null;
}

const squares = ref<SquareData[]>([]);
const lines = ref<LineData[]>([]);
const currentPlayer = ref<"cross" | "circle">("cross");
const winLine = ref<WinLine | null>(null);
const showWinLine = ref(false);
// const roomId = ref<string | null>(null);

const socket = io("http://localhost:8080");

socket.on("connect", () => {
	console.log("✅ Connected!", socket.id);
});

socket.on("connect_error", (error) => {
	console.log("🚫 Connection error:", error);
});

socket.on("disconnect", (reason) => {
	console.log("❌ Disconnected:", reason);
});

const roomId = useId();

// Подключение к игре
const joinGame = (gameRoomId: string) => {
	// roomId.value = gameRoomId;
	console.log("🎮 Sending joinGame for room:", gameRoomId);

	socket.emit("joinGame", gameRoomId, (response: unknown) => {
		console.log("📥 joinGame response:", response);
	});
};

socket.on("gameStarted", (gameState: GameState) => {
	squares.value = gameState.squares;
	currentPlayer.value = gameState.currentPlayer;
});

socket.on("gameStateUpdate", (gameState: GameState) => {
	squares.value = gameState.squares;
	currentPlayer.value = gameState.currentPlayer;
	if (gameState.winLine) {
		winLine.value = gameState.winLine;
		setTimeout(() => {
			showWinLine.value = true;
		}, 300);
	}
});

// Обработчик клика по квадрату
const handleSquareClick = (position: Position) => {
	if (winLine.value || !roomId) return;

	socket.emit("makeMove", {
		roomId: roomId,
		move: {
			position,
			player: currentPlayer.value,
		},
	});
};

// Инициализация
onMounted(() => {
	const gameRoomId = roomId;
	joinGame(gameRoomId);
	window.addEventListener("resize", updateWindowSize);
});

onUnmounted(() => {
	socket.disconnect();
	window.removeEventListener("resize", updateWindowSize);
});

// Получение размеров окна
const windowWidth = ref(window.innerWidth);
const windowHeight = ref(window.innerHeight);

// Обновление размеров окна
const updateWindowSize = () => {
	windowWidth.value = window.innerWidth;
	windowHeight.value = window.innerHeight;
};
</script>

<template>
	<div class="fixed inset-0 bg-[#282c34] w-screen h-screen overflow-auto">
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
