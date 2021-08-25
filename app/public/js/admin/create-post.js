const postForm = document.getElementById('post-form')
const editorElement = document.querySelector('form textarea#content')

const editor = new SimpleMDE({
  element: editorElement,
  previewRender: plainText => marked(plainText)
})