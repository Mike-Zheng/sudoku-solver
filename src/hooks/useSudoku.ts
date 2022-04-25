import { ref } from 'vue'
import Sudoku from '@/utils/sudoku.js'
const genInitialBoard = () => {
  return [...new Array(9)].map(() => [...new Array(9).fill('')])
}
export default function useSudoku(initValue = false) {
  const board = ref(genInitialBoard())
  const boardRecord = ref(genInitialBoard())

  const undo = () => {
    board.value = boardRecord.value
  }

  const reset = () => {
    board.value = genInitialBoard()
    boardRecord.value = genInitialBoard()
  }

  const solve = () => {
    boardRecord.value = [...board.value.map((item) => [...item])]
    let boardProcessed = board.value.map((row) => row.map((item) => item || '.'))
    console.log(boardProcessed)
    let boardString = Sudoku.board_grid_to_string(boardProcessed)
    console.log(boardString)
    try {
      let slove = Sudoku.solve(boardString)
      if (!slove) {
        throw new Error('wrong')
      }
      console.log(slove)
      let sloveGrid = Sudoku.board_string_to_grid(slove)
      console.log(sloveGrid)
      board.value = sloveGrid
    } catch (e) {
      console.log(e)
      reset()
    }
  }

  return {
    board,
    boardRecord,
    undo,
    reset,
    solve,
  }
}
