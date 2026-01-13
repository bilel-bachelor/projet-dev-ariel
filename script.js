console.log("Kanban JS loaded...");

// Exemple éventuel de structure
window.addEventListener("DOMContentLoaded", () => {
  // Ici, on récupère les éléments du DOM
  const addCardBtn = document.getElementById('addCardBtn');
  const searchInput = document.getElementById('searchInput');
  const sortByPriorityBtn = document.getElementById('sortByPriorityBtn');
  
  const addCardModal = document.getElementById('addCardModal');
  const closeBtn = document.querySelector('.close-btn');
  const addCardForm = document.getElementById('addCardForm');
  const todoColumn = document.querySelector('[data-status="todo"]');
  const allColumns = document.querySelectorAll('.column');
  let draggedCard = null;

  // Fonction pour attacher les écouteurs de drag & drop à une carte
  const attachDragEvents = (card) => {
    card.addEventListener('dragstart', () => {
      draggedCard = card;
      card.classList.add('dragging');
      setTimeout(() => {
        card.style.display = 'none';
      }, 0);
    });

    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
      setTimeout(() => {
        if (draggedCard) {
            draggedCard.style.display = 'block';
            draggedCard = null;
        }
      }, 0);
    });
  };

  // Attacher les événements aux cartes existantes
  document.querySelectorAll('.card').forEach(card => {
    attachDragEvents(card);
  });

  // Gestion du drop sur les colonnes
  allColumns.forEach(column => {
    column.addEventListener('dragover', (e) => {
      e.preventDefault();
      column.classList.add('drag-over');
    });

    column.addEventListener('dragleave', (e) => {
      column.classList.remove('drag-over');
    });

    column.addEventListener('drop', (e) => {
      e.preventDefault();
      column.classList.remove('drag-over');
      if (draggedCard) {
        column.appendChild(draggedCard);
        
        // Mise à jour du status de la carte
        const newStatus = column.getAttribute('data-status');
        draggedCard.setAttribute('data-status', newStatus);
        
        console.log(`Card ${draggedCard.getAttribute('data-id')} moved to ${newStatus}`);
      }
    });
  });

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
    newCard.setAttribute('draggable', 'true');
    
    newCard.innerHTML = `
      <h3>${title}</h3>
      <p>${desc}</p>
    `;
    
    // Attacher les événements de drag
    attachDragEvents(newCard);

    // Ajout à la colonne To Do
    todoColumn.appendChild(newCard);
    
    // Reset et fermeture
    addCardForm.reset();
    addCardModal.style.display = "none";
  });

  searchInput.addEventListener('input', () => {
    // ...
  });

  sortByPriorityBtn.addEventListener('click', () => {
    // ...
  });
});
