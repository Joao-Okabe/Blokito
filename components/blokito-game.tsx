import { styles } from '@/components/styles/styles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  useColorScheme,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BOARD_SIZE = 8;
const CELL_GAP = 5;

type Coord = {
  row: number;
  col: number;
};

type Board = (string | null)[][];

type Piece = {
  id: string;
  label: string;
  cells: Coord[];
  color: string;
  glow: string;
};

type Shape = {
  label: string;
  cells: Coord[];
};

const SHAPES: Shape[] = [
  { label: 'Solo', cells: [{ row: 0, col: 0 }] },
  {
    label: 'Linha 2',
    cells: [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
    ],
  },
  {
    label: 'Linha 3',
    cells: [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },
    ],
  },
  {
    label: 'Linha 4',
    cells: [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },
      { row: 0, col: 3 },
    ],
  },
  {
    label: 'Linha 5',
    cells: [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },
      { row: 0, col: 3 },
      { row: 0, col: 4 },
    ],
  },
  {
    label: 'Coluna 2',
    cells: [
      { row: 0, col: 0 },
      { row: 1, col: 0 },
    ],
  },
  {
    label: 'Coluna 3',
    cells: [
      { row: 0, col: 0 },
      { row: 1, col: 0 },
      { row: 2, col: 0 },
    ],
  },
  {
    label: 'Coluna 4',
    cells: [
      { row: 0, col: 0 },
      { row: 1, col: 0 },
      { row: 2, col: 0 },
      { row: 3, col: 0 },
    ],
  },
  {
    label: 'Quadrado',
    cells: [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 1, col: 0 },
      { row: 1, col: 1 },
    ],
  },
  {
    label: 'L curto',
    cells: [
      { row: 0, col: 0 },
      { row: 1, col: 0 },
      { row: 1, col: 1 },
    ],
  },
  {
    label: 'L',
    cells: [
      { row: 0, col: 0 },
      { row: 1, col: 0 },
      { row: 2, col: 0 },
      { row: 2, col: 1 },
    ],
  },
  {
    label: 'T',
    cells: [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },
      { row: 1, col: 1 },
    ],
  },
  {
    label: 'Z',
    cells: [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 1, col: 1 },
      { row: 1, col: 2 },
    ],
  },
  {
    label: 'Cruz',
    cells: [
      { row: 0, col: 1 },
      { row: 1, col: 0 },
      { row: 1, col: 1 },
      { row: 1, col: 2 },
      { row: 2, col: 1 },
    ],
  },
];

const PALETTE = [
  { color: '#31D6C4', glow: '#B9FFF5' },
  { color: '#FF6B6B', glow: '#FFD0D0' },
  { color: '#FFCE52', glow: '#FFF1B7' },
  { color: '#74D65F', glow: '#D9FFD0' },
  { color: '#A87CFF', glow: '#E7DAFF' },
  { color: '#F35BB2', glow: '#FFD3ED' },
  { color: '#4D9BFF', glow: '#D2E8FF' },
];

function createBoard(): Board {
  return Array.from({ length: BOARD_SIZE }, () => Array.from({ length: BOARD_SIZE }, () => null));
}

function randomFrom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function createPiece(index: number): Piece {
  const shape = randomFrom(SHAPES);
  const tone = randomFrom(PALETTE);

  return {
    id: `${Date.now()}-${index}-${Math.random().toString(16).slice(2)}`,
    label: shape.label,
    cells: shape.cells,
    color: tone.color,
    glow: tone.glow,
  };
}

function createTray() {
  return [createPiece(0), createPiece(1), createPiece(2)];
}

function cloneBoard(board: Board): Board {
  return board.map((row) => [...row]);
}

function canPlacePiece(board: Board, piece: Piece, origin: Coord) {
  return piece.cells.every(({ row, col }) => {
    const targetRow = origin.row + row;
    const targetCol = origin.col + col;

    return (
      targetRow >= 0 &&
      targetRow < BOARD_SIZE &&
      targetCol >= 0 &&
      targetCol < BOARD_SIZE &&
      board[targetRow][targetCol] === null
    );
  });
}

function placePiece(board: Board, piece: Piece, origin: Coord) {
  const nextBoard = cloneBoard(board);

  piece.cells.forEach(({ row, col }) => {
    nextBoard[origin.row + row][origin.col + col] = piece.color;
  });

  return nextBoard;
}

function clearCompletedLines(board: Board) {
  const rowsToClear = new Set<number>();
  const colsToClear = new Set<number>();

  board.forEach((row, rowIndex) => {
    if (row.every(Boolean)) {
      rowsToClear.add(rowIndex);
    }
  });

  for (let col = 0; col < BOARD_SIZE; col += 1) {
    let filled = true;

    for (let row = 0; row < BOARD_SIZE; row += 1) {
      if (!board[row][col]) {
        filled = false;
        break;
      }
    }

    if (filled) {
      colsToClear.add(col);
    }
  }

  if (rowsToClear.size === 0 && colsToClear.size === 0) {
    return { board, lines: 0 };
  }

  const nextBoard = board.map((row, rowIndex) =>
    row.map((cell, colIndex) => {
      if (rowsToClear.has(rowIndex) || colsToClear.has(colIndex)) {
        return null;
      }

      return cell;
    })
  );

  return { board: nextBoard, lines: rowsToClear.size + colsToClear.size };
}

function hasAvailableMove(board: Board, pieces: (Piece | null)[]) {
  return pieces.some((piece) => {
    if (!piece) {
      return false;
    }

    for (let row = 0; row < BOARD_SIZE; row += 1) {
      for (let col = 0; col < BOARD_SIZE; col += 1) {
        if (canPlacePiece(board, piece, { row, col })) {
          return true;
        }
      }
    }

    return false;
  });
}

function countFilledCells(board: Board) {
  return board.flat().filter(Boolean).length;
}

function getPieceBounds(piece: Piece) {
  const width = Math.max(...piece.cells.map((cell) => cell.col)) + 1;
  const height = Math.max(...piece.cells.map((cell) => cell.row)) + 1;

  return { width, height };
}

function MiniPiece({
  piece,
  cellSize,
  ghost = false,
}: {
  piece: Piece;
  cellSize: number;
  ghost?: boolean;
}) {
  const bounds = getPieceBounds(piece);
  const activeCells = new Set(piece.cells.map(({ row, col }) => `${row}:${col}`));

  return (
    <View
      style={[
        styles.miniPiece,
        {
          width: bounds.width * cellSize + (bounds.width - 1) * 3,
          height: bounds.height * cellSize + (bounds.height - 1) * 3,
        },
      ]}>
      {Array.from({ length: bounds.height }).map((_, row) => (
        <View key={row} style={styles.miniPieceRow}>
          {Array.from({ length: bounds.width }).map((__, col) => {
            const isActive = activeCells.has(`${row}:${col}`);

            return (
              <View
                key={`${row}:${col}`}
                style={[
                  styles.miniCell,
                  {
                    width: cellSize,
                    height: cellSize,
                    opacity: isActive ? (ghost ? 0.28 : 1) : 0,
                    backgroundColor: piece.color,
                    borderColor: piece.glow,
                  },
                ]}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
}

// Home screen 
export function BlokitoGame() {
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();
  const boardCellSize = Math.floor((Math.min(width - 28, 430) - CELL_GAP * 7) / BOARD_SIZE);
  const boardSize = boardCellSize * BOARD_SIZE + CELL_GAP * 7;
  const trayCardWidth = Math.max(96, Math.floor((boardSize - 16) / 3));
  const miniCellSize = Math.max(13, Math.min(20, Math.floor(trayCardWidth / 5.4)));
  const [board, setBoard] = useState<Board>(() => createBoard());
  const [pieces, setPieces] = useState<(Piece | null)[]>(() => createTray());
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const selectedPiece = pieces[selectedIndex] ?? null;
  const filledCells = countFilledCells(board);
  const isDark = colorScheme === 'dark';

  function resetGame() {
    const nextPieces = createTray();

    setBoard(createBoard());
    setPieces(nextPieces);
    setSelectedIndex(0);
    setScore(0);
    setCombo(0);
    setGameOver(false);
    Haptics.selectionAsync();
  }

  function selectPiece(index: number) {
    if (!pieces[index] || gameOver) {
      return;
    }

    setSelectedIndex(index);
    Haptics.selectionAsync();
  }

  function handleCellPress(row: number, col: number) {
    if (!selectedPiece || gameOver) {
      return;
    }

    const origin = { row, col };

    if (!canPlacePiece(board, selectedPiece, origin)) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      return;
    }

    const placedBoard = placePiece(board, selectedPiece, origin);
    const cleared = clearCompletedLines(placedBoard);
    const nextCombo = cleared.lines > 0 ? combo + 1 : 0;
    const moveScore =
      selectedPiece.cells.length * 10 + cleared.lines * 120 + Math.max(0, nextCombo - 1) * 45;
    let nextPieces = pieces.map((piece, index) => (index === selectedIndex ? null : piece));

    if (nextPieces.every((piece) => piece === null)) {
      nextPieces = createTray();
    }

    const firstAvailableIndex = nextPieces.findIndex(Boolean);
    const nextScore = score + moveScore;

    setBoard(cleared.board);
    setPieces(nextPieces);
    setSelectedIndex(firstAvailableIndex >= 0 ? firstAvailableIndex : 0);
    setScore(nextScore);
    setBestScore((currentBest) => Math.max(currentBest, nextScore));
    setCombo(nextCombo);
    setGameOver(!hasAvailableMove(cleared.board, nextPieces));
    Haptics.impactAsync(
      cleared.lines > 0 ? Haptics.ImpactFeedbackStyle.Medium : Haptics.ImpactFeedbackStyle.Light
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, isDark && styles.safeAreaDark]}>
      <ScrollView
        contentContainerStyle={styles.screen}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <View>
            <Text style={[styles.appName, isDark && styles.textLight]}>Blokito</Text>
            <Text style={[styles.caption, isDark && styles.captionDark]}>Puzzle de blocos</Text>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Novo jogo"
            onPress={resetGame}
            style={({ pressed }) => [styles.resetButton, pressed && styles.pressed]}>
            <MaterialIcons name="refresh" size={28} color="#FFFFFF" />
          </Pressable>
        </View>

        <View style={styles.scoreRow}>
          <View style={[styles.scorePanel, isDark && styles.panelDark]}>
            <Text style={[styles.scoreLabel, isDark && styles.captionDark]}>Pontos</Text>
            <Text style={[styles.scoreValue, isDark && styles.textLight]}>{score}</Text>
          </View>
          <View style={[styles.scorePanel, isDark && styles.panelDark]}>
            <Text style={[styles.scoreLabel, isDark && styles.captionDark]}>Recorde</Text>
            <Text style={[styles.scoreValue, isDark && styles.textLight]}>{bestScore}</Text>
          </View>
          <View style={[styles.scorePanel, isDark && styles.panelDark]}>
            <Text style={[styles.scoreLabel, isDark && styles.captionDark]}>Cheio</Text>
            <Text style={[styles.scoreValue, isDark && styles.textLight]}>{filledCells}/64</Text>
          </View>
        </View>

        <View style={[styles.boardShell, isDark && styles.boardShellDark, { width: boardSize }]}>
          <View style={[styles.board, { width: boardSize, height: boardSize }]}>
            {board.map((row, rowIndex) =>
              row.map((cell, colIndex) => {
                return (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`Casa ${rowIndex + 1}, ${colIndex + 1}`}
                    key={`${rowIndex}:${colIndex}`}
                    onPress={() => handleCellPress(rowIndex, colIndex)}
                    style={({ pressed }) => [
                      styles.cell,
                      {
                        width: boardCellSize,
                        height: boardCellSize,
                        left: colIndex * (boardCellSize + CELL_GAP),
                        top: rowIndex * (boardCellSize + CELL_GAP),
                        backgroundColor: cell ?? (isDark ? '#222832' : '#E8EDF4'),
                        borderColor: cell ? '#FFFFFF55' : isDark ? '#303946' : '#D8E0EA',
                        transform: [{ scale: pressed && selectedPiece ? 0.95 : 1 }],
                      },
                    ]}
                  />
                );
              })
            )}
          </View>

{/* AVISO DE GAMER OVER */}  
          {gameOver && (
            <View style={styles.gameOverLayer}>
              <View style={styles.gameOverPanel}>
                <Text style={styles.gameOverTitle}>Fim de jogo</Text>
                <Text style={styles.gameOverScore}>{score} pts</Text>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Jogar novamente"
                  onPress={resetGame}
                  style={({ pressed }) => [styles.playAgainButton, pressed && styles.pressed]}>
                  <Text style={styles.playAgainText}>Jogar novamente</Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>

        <View style={[styles.tray, { width: boardSize }]}>
          {pieces.map((piece, index) => {
            const selected = index === selectedIndex && Boolean(piece);
            const disabled = !piece || gameOver;

            return (
              <Pressable
                key={piece?.id ?? `empty-${index}`}
                accessibilityRole="button"
                accessibilityLabel={piece ? `Peça ${piece.label}` : 'Espaço vazio'}
                disabled={disabled}
                onPress={() => selectPiece(index)}
                style={({ pressed }) => [
                  styles.pieceCard,
                  isDark && styles.pieceCardDark,
                  {
                    width: trayCardWidth,
                    borderColor: selected ? piece?.color : isDark ? '#2E3642' : '#DDE5EE',
                    transform: [{ translateY: selected ? -8 : 0 }, { scale: pressed ? 0.98 : 1 }],
                  },
                  !piece && styles.emptyPieceCard,
                ]}>
                {piece ? (
                  <MiniPiece piece={piece} cellSize={miniCellSize} />
                ) : (
                  <View style={styles.emptyPieceDot} />
                )}
              </Pressable>
            );
          })}
        </View>

        <View style={[styles.statusBar, isDark && styles.panelDark, { width: boardSize }]}>
          <Text style={[styles.statusText, isDark && styles.captionDark]}>
            {gameOver
              ? 'Sem movimentos'
              : combo > 1
                ? `Combo x${combo}`
                : selectedPiece
                  ? selectedPiece.label
                  : 'Nova rodada'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Lista de Peças
export function PieceGallery() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const samples = SHAPES.slice(1).map((shape, index) => ({
    id: shape.label,
    label: shape.label,
    cells: shape.cells,
    ...PALETTE[index % PALETTE.length],
  }));

  return (
    <SafeAreaView style={[styles.safeArea, isDark && styles.safeAreaDark]}>
      <ScrollView contentContainerStyle={styles.galleryScreen} showsVerticalScrollIndicator={false}>
        <Text style={[styles.appName, isDark && styles.textLight]}>Peças</Text>
        <Text style={[styles.caption, isDark && styles.captionDark]}>Conjunto atual</Text>

        <View style={styles.galleryGrid}>
          {samples.map((piece) => (
            <View key={piece.id} style={[styles.galleryCard, isDark && styles.pieceCardDark]}>
              <MiniPiece piece={piece} cellSize={18} />
              <Text style={[styles.galleryLabel, isDark && styles.textLight]}>{piece.label}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
