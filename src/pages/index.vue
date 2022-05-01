<script setup lang="ts">
  import useSudoku from '@/hooks/useSudoku'

  const { board, boardRecord, undo, reset, solve, setVal, getVal } = useSudoku()

  const selectAll = (i: number, j: number) => {
    let curX = i
    let curY = j
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
        if (i == 8 && j == 8) {
          // button foucs
        } else {
        }
    }

    window.setTimeout(function () {
      var target = document.getElementById(`board-${curX}-${curY}`) as HTMLFormElement
      target.focus()
      target.select()
    }, 0)
  }
</script>
<template>
  <div>
    <div class="relative" style="height: 600px; width: 600px">
      <div class="inline-grid absolute pointer-events-none grid-rows-3 grid-cols-3 h-full w-full">
        <div class="h-full w-full border border-black" />
        <div class="h-full w-full border border-black" />
        <div class="h-full w-full border border-black" />
        <div class="h-full w-full border border-black" />
        <div class="h-full w-full border border-black" />
        <div class="h-full w-full border border-black" />
        <div class="h-full w-full border border-black" />
        <div class="h-full w-full border border-black" />
        <div class="h-full w-full border border-black" />
      </div>
      <div id="userBoard" class="inline-grid grid-rows-9 grid-cols-9 h-full w-full">
        <template v-for="(col, y) in board">
          <template v-for="(item, x) in col">
            <input
              name="board-cell"
              class="h-full w-full p-2.5 text-base outline-1 outline text-center text-4xl board-cell"
              :data-x="x"
              :data-y="y"
              :value="item"
              :id="`board-${x}-${y}`"
              :class="{ 'is-init': boardRecord[y][x] !== '' }"
              @input="(event: Event) => inputChange(y,x,event)"
              @keydown="(event: KeyboardEvent) =>focusNext(x, y,event)"
              @click="selectAll(x, y)"
            />
          </template>
        </template>
      </div>
    </div>
    <button
      class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ml-20 mt-5"
      @click="solve()"
      >solve</button
    >
    <button
      class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ml-20 mt-5"
      @click="undo()"
      >undo solve</button
    >

    <button
      class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ml-20 mt-5"
      @click="reset()"
      >reset</button
    >
  </div>
</template>

<style lang="scss" scoped>
  .board-cell {
    cursor: pointer;
    outline-color: #bec6d4;
    color: #0072e3;
    &.is-init {
      color: #344861;
    }
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
</style>
