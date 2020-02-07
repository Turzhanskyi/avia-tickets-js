class TicketUI {
  constructor() {
    this.container = document.querySelector(".tickets-sections .row");
  }

  renderTickets(tickets) {
    this.clearContainer();

    if (!tickets.length) {
      this.showEmptyMsg();
      return;
    }
  }

  clearContainer() {
    this.container.innerHTML = "";
  }

  showEmptyMsg() {
    const template = TicketUI.emptyMsgTemplate();
    this.container.insertAdjacentHTML(template);
  }

  static emptyMsgTemplate() {
    return `
    <div className="tickets-empty-res-msg">
      По вашому запиту квитків не знайдено.
    </div>
    `;
  }

  static ticketTemplate(ticket) {}
}

const ticketUI = new TicketUI();

export default ticketUI;
