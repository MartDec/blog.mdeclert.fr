class ThumbnailInput extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode: "open"})
    this.previewElement = this.createPreview()
    this.inputElement = this.createInput()
    this.wrapper = this.createWrapper()
    this.shadowRoot.append(this.createStyle(), this.wrapper)
  }

  connectedCallback() {
    this.inputElement.addEventListener("change", event => {
      const previewSrc = URL.createObjectURL(event.target.files[0])
      this.previewElement.setAttribute("src", previewSrc)
    })
  }

  createWrapper() {
    const element = document.createElement("div")
    element.appendChild(this.previewElement)
    element.appendChild(this.inputElement)

    return element
  }

  createPreview() {
    const preview = document.createElement("img")
    preview.setAttribute("alt", "")
    preview.setAttribute("src", this.hasAttribute("img") ? this.getAttribute("img") : "")

    return preview
  }

  createInput() {
    const input = document.createElement("input")
    input.setAttribute("type", "file")
    input.setAttribute("name", this.hasAttribute("name") ? this.getAttribute("name") : "thumbnail")
    input.setAttribute("id", this.hasAttribute("id") ? this.getAttribute("id") : "thumbnail")
    input.setAttribute("accept", "image/png, image/jpeg")

    return input
  }

  createStyle() {
    const styleElement = document.createElement("style")
    styleElement.textContent = `
    div {
      display: flex;
      align-items: center;
      margin-top: .5rem;
      margin-bottom: .5rem;
    }

    img {
      height: 60px;
      min-width: 60px;
      object-fit: cover;
      margin-right: .5rem;
      border: dashed 1px black;
      background: #F4F4F4;
    }`

    return styleElement
  }
}

customElements.define("thumbnail-input", ThumbnailInput)
