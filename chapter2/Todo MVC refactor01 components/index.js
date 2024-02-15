import getTodos from './getTodos.js'
import view from './view.js'

const state = {
  todos: getTodos(),
  currentFilter: 'All'
}

const main = document.querySelector('.todoapp')

//렌더링 엔진은 requestAnimationFrame을 기반으로 한다.
//이 콜백 내에서 DOM 작업을 수행하면 더 효율적이 된다.
//메인 쓰레드를 차단하지 않으며 다음 그리기가 이벤트 루프에서 스줄링되기 직전에 실행된다.

//view에 현재 DOM모델과 state(상태)를 인자로 넘겨서
//현재 DOM모델을 수정한 새로운 DOM을 만들어서 교체한다.
window.requestAnimationFrame(() => {
  const newMain = view(main, state)
  main.replaceWith(newMain)
})