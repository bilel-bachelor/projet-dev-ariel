console.log("Kanban JS loaded...");

window.addEventListener("DOMContentLoaded", () => {

  // Récupération des éléments
  const addCardBtn = document.getElementById('addCardBtn');
  const searchInput = document.getElementById('searchInput');
  const sortByPriorityBtn = document.getElementById('sortByPriorityBtn');
  
  const addCardModal = document.getElementById('addCardModal');
  const closeBtn = document.querySelector('.close-btn');
  const addCardForm = document.getElementById('addCardForm');
  const todoColumn = document.querySelector('[data-status="todo"]')
  // Éventuellement, on écoute les événements
  addCardBtn.addEventListener('click', () => {
    addCardModal.style.display = "block";
  });

  closeBtn.addEventListener('click', () => {
    addCardModal.style.display = "none";
  });

  window.addEventListener('click', (event) => {
    if (event.target == addCardModal) {
      addCardModal.style.display = "none";
    }
  });

  addCardForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = document.getElementById('cardTitle').value;
    const desc = document.getElementById('cardDesc').value;
    const priority = document.getElementById('cardPriority').value;
    
    const newCard = document.createElement('div');
    newCard.classList.add('card');
    newCard.setAttribute('data-id', Date.now()); // ID unique simple
    newCard.setAttribute('data-priority', priority);
    
    newCard.innerHTML = `
      <h3>${title}</h3>
      <p>${desc}</p>
    `;
    
    // Ajout à la colonne To Do
    todoColumn.appendChild(newCard);
    
    // Reset et fermeture
    addCardForm.reset();
    addCardModal.style.display = "none";
  });

  searchInput.addEventListener('input', () => {
    // ...
  });

  // ORDRE DES PRIORITÉS
  const priorityOrder = {
    high: 1,
    medium: 2,
    low: 3
  };
 

  // TRI PAR PRIORITÉ
  sortByPriorityBtn.addEventListener('click', () => {
    console.log("Tri par priorité déclenché");

    const columns = document.querySelectorAll('.column');

    columns.forEach(column => {
      const cards = Array.from(column.querySelectorAll('.card'));

      cards.sort((a, b) => {
        return (
          priorityOrder[a.dataset.priority] -
          priorityOrder[b.dataset.priority]
        );
      });

      cards.forEach(card => {
        column.appendChild(card);
      });
    });
  });

  
  addCardBtn.addEventListener('click', () => {
    
  });

  
  searchInput.addEventListener('input', () => {
    
  });

});
