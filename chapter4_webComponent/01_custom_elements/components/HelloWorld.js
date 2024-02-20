import applyDiff from './applyDiff.js';

const DEFAULT_COLOR = 'black';

const createDomElement = (color) => {
  const div = document.createElement('div');
  div.textContent = 'Hello World!';
  div.style.color = color;
  return div;
};

export default class HelloWorld extends HTMLElement {
  static get observedAttributes() {
    return ['color'];
  }

  get color() {
    return this.getAttribute('color') || DEFAULT_COLOR;
  }

  set color(value) {
    this.setAttribute('color', value);
  }
 //속성이 변경 될 때마다 호출되는 라이프사이클
  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.hasChildNodes()) {
      return;
    }

    applyDiff(this, this.firstElementChild, createDomElement(newValue));
  }

   //custom elements의 라이프사이클 메서드중 하나로
  //elements가 DOM에 연결될 때 호출 된다. 
  //리액트의 componentDidMount와 매우 유사하다.
  connectedCallback() {
    window.requestAnimationFrame(() => {
      this.appendChild(createDomElement(this.color));
    });
  }
}