class ModalComponent {

  constructor(parentNode, modalContent) {
      this.parentNode = parentNode
      this.modalContent = modalContent
      this.isModalOpen = false
  }

  addCloseModalEvent() {
    document.getElementById('modalBackdrop').addEventListener('click', () =>  {
      if(event.target === document.getElementById('modalBackdrop')) {
        this.closeModal()
        this.triggerButton()
      }
    })
    return this
  }

  openModal() {
    document.getElementById('modalBackdrop').classList.add('active')
    document.getElementById('modalWindow').classList.add('active')
    this.addCloseModalEvent()
    this.isModalOpen = true
    this.triggerButton()
    return this
  }

  closeModal() {
    document.getElementById('modalBackdrop').classList.remove('active')
    document.getElementById('modalWindow').classList.remove('active')
    this.isModalOpen = false
    this.triggerButton()
    return this
  }

  triggerButton() {
    if(this.isModalOpen) {
      document.getElementById(this.triggerOpenModal).style.display = 'none'
    } else {
      document.getElementById(this.triggerOpenModal).style.display = 'block'
    }
  }

  render() {
    const modalTriggerButton = document.createElement('button')
    modalTriggerButton.id = this.triggerOpenModal
    modalTriggerButton.innerHTML = 'Open Modal'
    modalTriggerButton.addEventListener('click', () => this.openModal())

    const modalWindowNode = document.createElement('div')
    modalWindowNode.id = 'modalWindow'
    modalWindowNode.classList.add('modal-window')
    modalWindowNode.innerHTML = this.modalContent

    const modalBackdropNode = document.createElement('div')
    modalBackdropNode.id = 'modalBackdrop'
    modalBackdropNode.classList.add('modal-backdrop')

    modalBackdropNode.appendChild(modalWindowNode)

    document.getElementById(this.parentNode).appendChild(modalTriggerButton)
    document.getElementById(this.parentNode).appendChild(modalBackdropNode)

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
