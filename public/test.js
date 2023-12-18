document.addEventListener('DOMContentLoaded', function() {
  const rows = document.querySelectorAll('.table tbody tr');
  rows.forEach(row => {
      const columns = row.getElementsByTagName('td');
      console.log(columns);
  });
  
});