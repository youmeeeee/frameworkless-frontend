import getTodos from './getTodos.js'
import todosView from './view/todos.js'
import counterView from './view/counter.js'
import filtersView from './view/filters.js'
import appView from './view/app.js';
import applyDiff from './applyDiff.js'
import registry from './registry.js'

// registry의 키는 data-component의 속성과 일치한다. 
// 이것이 컴포넌트 기반 렌더링 엔진의 핵심 매커니즘이다.
// 이 매커니즘은 루트 컨테이너 뿐 아니라 생성할 모든 구성요소에서도 적용되어야 한다.
// 이렇게 하면 모든 컴포넌트가 다른 컴포넌트 안에서도 사용될 수 있다.
registry.add('app', appView)
registry.add('todos', todosView)
registry.add('counter', counterView)
registry.add('filters', filtersView)

const state = {
  todos: getTodos(),
  currentFilter: 'All'
}

const events = {
  deleteItem: (index) => {
    state.todos.splice(index, 1);
    render()
  },
  addItem: text => {
    state.todos.push({
      text,
      complete: false,
    })
    render();
  }
}

// 렌더링 엔진은 requestAnimationFrame을 기반으로 한다.
// 이 콜백 내에서 DOM 작업을 수행하면 더 효율적이 된다.
// 메인 쓰레드를 차단하지 않으며 다음 그리기가 이벤트 루프에서 스줄링되기 직전에 실행된다.

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector('#root')
    //registry에 인자로 기존 DOM모델과  상태를 넘겨서 새로운 DOM 을 만들어 교체한다.
    const newMain = registry.renderRoot(main, state, events)
    // applyDiff(현재 DOM 노드, 실제 DOM 노드, 새로운 가상 DOM 노드의 부모)
    applyDiff(document.body, main, newMain)
  })
}

render()