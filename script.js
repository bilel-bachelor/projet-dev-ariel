console.log("Kanban JS loaded...");

window.addEventListener("DOMContentLoaded", () => {

  // Récupération des éléments
  const addCardBtn = document.getElementById('addCardBtn');
  const searchInput = document.getElementById('searchInput');
  const sortByPriorityBtn = document.getElementById('sortByPriorityBtn');

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
