<script setup lang="ts">
  import useSudoku from '@/hooks/useSudoku'

  const cur = ref([0, 0])
  const toast = inject('$toast') as (arg: string) => void
  const { board, boardRecord, undo, reset, solve, setVal, getVal } = useSudoku()

  const inputKeyboard = (val: string) => {
    setVal(cur.value[1], cur.value[0], val)
    focusNext(cur.value[0], cur.value[1], new KeyboardEvent('keydown'))
  }

  const selectAll = (i: number, j: number) => {
    let curX = i
    let curY = j
    cur.value = [i, j]
    window.setTimeout(function () {
      var target = document.getElementById(`board-${curX}-${curY}`) as HTMLFormElement
      target.select()
    }, 0)
  }

  const inputChange = (i: number, j: number, event: Event) => {
    var target = event.target as HTMLInputElement
    let value = (target.value.replace(/[^0-9]/g, '').split('')[0] || '').toString()
    setVal(i, j, value)
    target.value = value
  }

  const focusNext = (i: number, j: number, event: KeyboardEvent) => {
    let curX = i
    let curY = j
    console.log(event.key)

    switch (event.key) {
      case 'Backspace':
        if (getVal(j, i) !== '') {
          setVal(j, i, '')
        } else {
          if (curX > 0) {
            curX--
          } else if (curY > 0) {
            curX = 8
            curY--
          } else {
            curX = 8
            curY = 8
          }
        }

        break

      case 'ArrowLeft':
        // Left pressed
        if (curX > 0) {
          curX--
        } else if (curY > 0) {
          curX = 8
          curY--
        } else {
          curX = 8
          curY = 8
        }
        break
      case 'ArrowRight':
        // Right pressed
        if (curX < 8) {
          curX++
        } else if (curY < 8) {
          curX = 0
          curY++
        } else {
          curX = 0
          curY = 0
        }
        break
      case 'ArrowUp':
        // Up pressed
        if (curY > 0) {
          curY--
        } else {
          curY = 8
        }
        break
      case 'ArrowDown':
        // Down pressed
        if (curY < 8) {
          curY++
        } else {
          curY = 0
        }
        break
      default:
        if (i < 8) {
          curX++
        }
        if (i >= 8 && j < 8) {
          curX = 0
          curY++
        }
    }
    focus(curX, curY)
  }

  const focus = (curX: number, curY: number): void => {
    cur.value = [curX, curY]
    window.setTimeout(function () {
      var target = document.getElementById(`board-${curX}-${curY}`) as HTMLFormElement
      target.focus()
      target.select()
    }, 10)
  }

  const solveSudoku = (): void => {
    const res = solve()
    toast("I'm a toast!")
    console.log(res)
  }
</script>
<template>
  <div style="max-width: 400px" class="mx-auto touch-manipulation select-none">
    <div class="pt-5 mx-auto text-center text-slate-300 text-2xl hidden sm:block">
      Sudoku Solver</div
    >
    <div
      class="relative sm:h-600 sm:w-600 h-screen w-screen mx-auto mt-8 max-w-[400px] max-h-[400px]"
    >
      <div class="inline-grid absolute pointer-events-none grid-rows-3 grid-cols-3 h-full w-full">
        <div class="h-full w-full border-2 border-[#222222] border-t-4 border-l-4 rounded-tl-3xl" />
        <div class="h-full w-full border-2 border-[#222222] border-t-4" />
        <div class="h-full w-full border-2 border-[#222222] border-t-4 border-r-4 rounded-tr-3xl" />
        <div class="h-full w-full border-2 border-[#222222] border-l-4" />
        <div class="h-full w-full border-2 border-[#222222]" />
        <div class="h-full w-full border-2 border-[#222222] border-r-4" />
        <div class="h-full w-full border-2 border-[#222222] border-l-4 border-b-4 rounded-bl-3xl" />
        <div class="h-full w-full border-2 border-[#222222] border-b-4" />
        <div class="h-full w-full border-2 border-[#222222] border-r-4 border-b-4 rounded-br-3xl" />
      </div>
      <div id="userBoard" class="inline-grid grid-rows-9 grid-cols-9 h-full w-full">
        <template v-for="(col, y) in board">
          <template v-for="(item, x) in col">
            <input
              inputmode="none"
              name="board-cell"
              class="select-none h-full w-full cursor-pointer caret-transparent font-semibold outline-none rounded-none text-center text-sm sm:text-4xl board-cell"
              :data-x="x"
              :data-y="y"
              :value="item"
              :id="`board-${x}-${y}`"
              :class="{
                'board-cell--focus': x === cur[0] && y === cur[1],
                'board-cell--inital-state': boardRecord[y][x] !== '',
                'rounded-tl-3xl': y === 0 && x === 0,
                'rounded-tr-3xl': y === 0 && x === 8,
                'rounded-bl-3xl': y === 8 && x === 0,
                'rounded-br-3xl': y === 8 && x === 8,
              }"
              @input="(event: Event) => inputChange(y,x,event)"
              @keydown="(event: KeyboardEvent) =>focusNext(x, y,event)"
              @click="selectAll(x, y)"
            />
          </template>
        </template>
      </div>
    </div>

    <div class="keyboard mt-5">
      <ul>
        <li v-for="(val, y) in 9" class="inline-block text-center p-2 w-1/5">
          <button
            class="bg-[#f0f5f9] w-4/5 text-3xl leading-normal font-semibold rounded-md text-[#3a4b62] transition-all hover:text-[#0072e3] hover:scale-110"
            @click="inputKeyboard(val.toString())"
            >{{ val }}</button
          >
        </li>

        <li class="inline-block text-center p-2 w-1/5">
          <button
            class="bg-[#f0f5f9] w-4/5 text-3xl leading-normal font-semibold rounded-md text-[#3a4b62] transition-all hover:text-[#0072e3] hover:scale-110"
            @click="inputKeyboard('')"
            >-</button
          >
        </li>
      </ul>
    </div>

    <div class="flex my-5 place-content-around">
      <button
        class="text-center text-4xl rounded-lg bg-[#f0f5f9] shadow-2xl px-16 transition-all hover:text-[#0072e3] hover:scale-110"
        @click="undo()"
      >
        <SvgIcon name="svg-undo" />
      </button>
      <button
        class="text-center text-4xl rounded-lg bg-[#f0f5f9] shadow-2xl px-16 transition-all hover:text-[#0072e3] hover:scale-110"
        @click="reset()"
      >
        <SvgIcon name="svg-trash" />
      </button>
    </div>
    <div class="w-[90%] mx-auto">
      <button
        class="bg-blue-500 shadow-lg shadow-blue-500/50 rounded-2xl text-white w-full text-2xl mt-2 p-2 transition-all hover:scale-110"
        @click="solveSudoku()"
        >Solve</button
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .board-cell {
    border: solid 1px #e7e7e7;
    color: #344861;
    &.board-cell--inital-state {
      color: #0072e3;
    }
    &.board-cell--focus,
    &:focus {
      background-color: #bbdefb;
      border-color: #bbdefb;
    }
    &::selection {
      background: #bbdefb;
    }

    &::-moz-selection {
      background: #bbdefb;
    }
  }
</style>
