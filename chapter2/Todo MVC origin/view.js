// 예제 2-5
const getTodoElement = todo => {
  const {
    text,
    completed
  } = todo

  return `
  <li ${completed ? 'class="completed"' : ''}>
    <div class="view">
      <input 
        ${completed ? 'checked' : ''}
        class="toggle" 
        type="checkbox">
      <label>${text}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${text}">
  </li>`
}

const getTodoCount = todos => {
  const notCompleted = todos
    .filter(todo => !todo.completed)

  const { length } = notCompleted
  if (length === 1) {
    return '1 Item left'
  }

  return `${length} Items left`
}

//기존 DOM과 상태를 매개변수로 받는다.
export default (targetElement, state) => {
  const {
    currentFilter,
    todos
  } = state

  //기존 DOM을 복제해 새로운 DOM를 받는다.
  const element = targetElement.cloneNode(true)

  //새로운 DOM에서 각각 원하는 요소를 select한다.
  const list = element.querySelector('.todo-list')
  const counter = element.querySelector('.todo-count')
  const filters = element.querySelector('.filters')

  //list에 상태로 받은  Todos 데이터를 이용해 TODO 엘리먼트를 그려준다.
  list.innerHTML = todos.map(getTodoElement).join('')

  //counter역시 새로운 text를 입력한다.
  counter.textContent = getTodoCount(todos)

  //li 안의 a태그들을 셀렉터로 선택한후 Array.from으로 Array처럼 사용
  //반복물을 돌면서 a태그 내의 text가  currentFilter와 일치하는 겨우 a 태그의 클래스에 selected를 추가
  //일치하지 않는 경우는 selected  클래스를 제거함
  Array
    .from(filters.querySelectorAll('li a'))
    .forEach(a => {
      if (a.textContent === currentFilter) {
        a.classList.add('selected')
      } else {
        a.classList.remove('selected')
      }
    })

  return element
}