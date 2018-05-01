class ModalComponent {

  constructor(parentNodeId, modalContent) {
      this._parentNodeId = parentNodeId
      this._modalContent = modalContent
      this._isModalOpen = false
      this._parentNode = null
      this._modalBackdropNode = null
  }

  _addCloseModalEvent() {
    this._modalBackdropNode.addEventListener('click', () => {
      if(event.target === this._modalBackdropNode) {
        this._closeModal()
        this._triggerButton()
      }
    })
    return this
  }

  _openModal() {
    this._modalBackdropNode.classList.add('active')
    this._modalBackdropNode.firstChild.classList.add('active')
    this._addCloseModalEvent()
    this._isModalOpen = true
    this._triggerButton()
    return this
  }

  _closeModal() {
    this._modalBackdropNode.classList.remove('active')
    this._modalBackdropNode.firstChild.classList.remove('active')
    this._isModalOpen = false
    this._triggerButton()
    return this
  }

  _triggerButton() {
    if(this._isModalOpen) {
      this._parentNode.firstElementChild.style.display = 'none'
    } else {
      this._parentNode.firstElementChild.style.display = 'block'
    }
  }

  render() {
    const modalTriggerButton = document.createElement('button')
    modalTriggerButton.id = 'triggerOpenModal'
    modalTriggerButton.innerHTML = 'Open Modal'
    modalTriggerButton.addEventListener('click', () => this._openModal())

    const modalWindowNode = document.createElement('div')
    modalWindowNode.id = 'modalWindow'
    modalWindowNode.classList.add('modal-window')
    modalWindowNode.innerHTML = this._modalContent

    const modalBackdropNode = document.createElement('div')
    modalBackdropNode.id = 'modalBackdrop'
    modalBackdropNode.classList.add('modal-backdrop')

    modalBackdropNode.appendChild(modalWindowNode)

    this._modalBackdropNode = modalBackdropNode
    this._parentNode = document.getElementById(this._parentNodeId)
    this._parentNode.appendChild(modalTriggerButton)
    this._parentNode.appendChild(modalBackdropNode)

    return this
  }
}

window.addEventListener('load', () => {
  const Modal = new ModalComponent(
    'body',
    '<div class="modal-window-container"><p>Hello world from modal class.</p></div>'
  )
  .render()
})
