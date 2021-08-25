class SwitchInput extends HTMLElement {
  constructor() {
    super()
    this.inputId = this.getAttribute('name')
    this.inputLabel = this.getAttribute('label')
    this.inputValue = parseInt(this.getAttribute('value'))
    this.element = this.createElement()
    this.append(this.createStyle(), this.element)
  }

  createElement() {
    const element = document.createElement('label')
    element.setAttribute('id', 'switch-input-wrapper')
    element.setAttribute('for', this.inputId)
    element.classList.add('switch')
    console.log('INPUT_VALUE', this.inputValue)
    element.innerHTML = 
      `<span>${this.inputLabel}</span>
      <input type="checkbox" id="${this.inputId}" name="${this.inputId}"` + (this.inputValue === 1 ? ' checked' : '') + `/>
      <span class="slider"></span>`
    
    return element
  }

  createStyle() {
    const styleElement = document.createElement("style")
    styleElement.textContent = `
    .switch {
      display: flex;
      height: 1.3em;
      margin: .5rem 0;
    }
    
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    
    .slider {
      margin-left: 1rem;
      width: 2.5em;
      position: relative;
      height: 100%;
      display: block;
      cursor: pointer;
      background-color: #ccc;
      -webkit-transition: .4s;
      transition: .4s;
      border-radius: 1.3em;
    }
    
    .slider:before {
      position: absolute;
      content: "";
      height: 1em;
      width: 1em;
      left: 3px;
      bottom: 3px;
      background-color: white;
      -webkit-transition: .4s;
      transition: .4s;
      border-radius: 50%;
    }
    
    input:checked + .slider {
      background-color: #2196F3;
    }
    
    input:focus + .slider {
      box-shadow: 0 0 1px #2196F3;
    }
    
    input:checked + .slider:before {
      -webkit-transform: translateX(1em);
      -ms-transform: translateX(1em);
      transform: translateX(1.1em);
    }`

    return styleElement
  }
}

export default SwitchInput
