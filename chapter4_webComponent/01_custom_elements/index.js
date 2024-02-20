import HelloWorld from './components/HelloWorld.js'

window.customElements.define('hello-world', HelloWorld);

const changeColor = color => {
  document.querySelectorAll('hello-world').forEach(helloWorld => {
    helloWorld.color = color;
  })
}

document.querySelector('button').addEventListener('click', () => {
  changeColor('blue')
})





