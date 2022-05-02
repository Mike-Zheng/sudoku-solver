<script setup lang="ts">
  import useSudoku from '@/hooks/useSudoku'

  const cur = ref([0, 0])

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
    }, 200)
  }
</script>
<template>
  <div style="max-width: 400px" class="mx-auto disable-dbl-tap-zoom">
    <div class="pt-5 mx-auto text-center text-slate-300 text-2xl"> Sudoku Solver</div>
    <div
      class="relative sm:h-600 sm:w-600 h-screen w-screen mx-auto mt-8 max-w-[400px] max-h-[400px]"
    >
      <div class="inline-grid absolute pointer-events-none grid-rows-3 grid-cols-3 h-full w-full">
        <div class="h-full w-full border border-[#222222] border-t-2 border-l-2 rounded-tl-3xl" />
        <div class="h-full w-full border border-[#222222] border-t-2 border-l-2" />
        <div
          class="h-full w-full border border-[#222222] border-t-2 border-l-2 border-r-2 rounded-tr-3xl"
        />
        <div class="h-full w-full border border-[#222222] border-t-2 border-l-2" />
        <div class="h-full w-full border border-[#222222] border-t-2 border-l-2" />
        <div class="h-full w-full border border-[#222222] border-t-2 border-l-2 border-r-2" />
        <div
          class="h-full w-full border border-[#222222] border-t-2 border-l-2 border-b-2 rounded-bl-3xl"
        />
        <div class="h-full w-full border border-[#222222] border-t-2 border-l-2 border-b-2" />
        <div class="h-full w-full border border-[#222222] border-2 rounded-br-3xl" />
      </div>
      <div id="userBoard" class="inline-grid grid-rows-9 grid-cols-9 h-full w-full">
        <template v-for="(col, y) in board">
          <template v-for="(item, x) in col">
            <input
              inputmode="none"
              name="board-cell"
              class="h-full font-semibold w-full text-base outline-1 outline text-center text-2xl sm:text-4xl board-cell"
              :data-x="x"
              :data-y="y"
              :value="item"
              :id="`board-${x}-${y}`"
              :class="{
                'board-cell--focus': x === cur[0] && y === cur[1],
                'is-init': boardRecord[y][x] !== '',
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
    <div class="buttons">
      <button class="tool-button bg-blue-500 shadow-lg shadow-blue-500/50" @click="undo()">
        <SvgIcon name="svg-undo" size="48" />
      </button>
      <!-- <button class="tool-button bg-blue-500 shadow-lg shadow-blue-500/50">
        <SvgIcon name="svg-redo" size="48" />
      </button> -->
      <button class="tool-button bg-blue-500 shadow-lg shadow-blue-500/50" @click="reset()">
        <SvgIcon name="svg-trash" size="48" />
      </button>
    </div>
    <div class="keyboard">
      <ul>
        <li v-for="(val, y) in 9">
          <button @click="inputKeyboard(val.toString())">{{ val }}</button>
        </li>

        <li>
          <button @click="inputKeyboard('')">-</button>
        </li>
      </ul>
    </div>
    <div class="w-[90%] mx-auto">
      <button
        class="bg-blue-500 shadow-lg shadow-blue-500/50 rounded-2xl text-white w-full text-2xl p-2"
        @click="solve()"
        >Solve</button
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .board-cell {
    cursor: pointer;
    outline-color: #e7e7e7;
    color: #0072e3;
    outline-width: 2px;
    outline-offset: -1px;
    font-size: 1.875rem;
    line-height: 2rem;

    &.is-init {
      color: #344861;
    }
    &.board-cell--focus,
    &:focus {
      background-color: #bbdefb;
      caret-color: #bbdefb;
    }
    &::selection {
      background: #bbdefb;
    }

    &::-moz-selection {
      background: #bbdefb;
    }
  }

  .buttons {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .tool-button {
    text-align: center;
    font-size: 40px;
    color: #3a4b62;
    background-color: #f0f5f9;
    border-radius: 10px;
    box-shadow: 0 25px 50px -12px rgb(0 0 0 / 25%);
    padding: 0 25px;
  }

  .keyboard {
    ul {
      li {
        display: inline-block;
        width: 20%;
        text-align: center;
        padding: 10px;
        button {
          background-color: #f0f5f9;
          width: 80%;
          font-size: 30px;
          font-weight: 600;
          border-radius: 5px;
          color: #3a4b62;
        }
      }
    }
  }
  .disable-dbl-tap-zoom {
    touch-action: manipulation;
  }
</style>
