const registry = {}

//컴포넌트를 래핑하는 고차함수(함수를 리턴하거나 인자로 받는 함수)를 생성 
//이 래퍼 함수는 원래의 컴포넌트를 가져와 동일한 이름의 새로운 컴포넌트를 반환한다.
//래퍼는 레지스트리에서 data-component 속성을 가진 모든 DOM요소를 찾고
//요소가 발견되면 자식 컴포넌트를 호출한다.
//그러나 자식 컴포넌트는 동일한 함수로 매핑된다.
//이런 방식으로 재귀함수처럼 마지막 컴포넌트까지 쉽게 탐색할 수 있다.


//renderWrapper 함수는 view컴포넌트를 매개변수로 받아서 함수를 리턴한다.
//함수는 기존 DOM과 새로운 상태를 매변수로 받아서element를 리턴한다.
const renderWrapper = component => {
  return (targetElement, state, events) => {

    //여기서 component는 todoApp DOM을 복사하는 함수
    //즉 element는 targetElement.cloneNode(true)와 동일한 역할

    //child 컴포넌트들일때는 view컴포넌트를 말함
    //(Ex) todosView(targetElement, state)
    const element = component(targetElement, state, events)

    //복사한 실제Dom에서 querySelector로 data-component속성들을 찾는다.
    const childComponents = element
      .querySelectorAll('[data-component]')

    //data-component들을 반복문을 돌면서
    Array
      .from(childComponents)
      .forEach(target => {

        //data-component의 name과 registry의 key
        const name = target
          .dataset
          .component

        //registry에서 현재 target DOM을 찾고
        const child = registry[name]
        //없으면 retrun
        if (!child) {
          return
        }

        //(ex) renderWrapper(todo-list, state)
        //renderWrapper(counter, state)
        //renderWrapper(filters, state)

        //child들은 다시 renderWrapper함수에서 리턴된 함수를 실행해 
        //새로운 DOM을 얻고 target을 교체한다.
        target.replaceWith(child(target, state, events))
      })

    return element
  }
}

//registry.add('todos', todosView)
//registry객체에 component를 add한다.
// {
// todos: renderWrapper(todosView)
//}
// registry의 키는 data-component의 속성과 일치한다. 
// 이것이 컴포넌트 기반 렌더링 엔진의 핵심 매커니즘이다.
// 이 매커니즘은 루트 컨테이너 뿐 아니라 생성할 모든 구성요소에서도 적용되어야 한다.
// 이ㅎ게 하면 모든 컴포넌트가 다른 컴포넌트 안에서도 사용될 수 있다.
const add = (name, component) => {
  registry[name] = renderWrapper(component)
}


//여기에 todoApp DOM과 상태가 매개변수로 들어옴
const renderRoot = (root, state, events) => {
  //todoApp을 복사하는 함수
  const cloneComponent = root => {
    return root.cloneNode(true)
  }

  //renderWrapper에 todoApp을 복사하는 함수를 매개변수로 전달하고
  //todoApp(root)와 상태를 renderWrapper가 리턴하는 함수에 매개변수로 전달
  return renderWrapper(cloneComponent)(root, state, events)
}

export default {
  add,
  renderRoot
}