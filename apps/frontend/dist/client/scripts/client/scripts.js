
function initFAQ() {
  const faqContainer = document.querySelector('.faq-container');
  if (!faqContainer) return;

  const toggleAnswer = (button) => {
      const isActive = button.classList.toggle('active');
      const answer = button.nextElementSibling;
      answer.style.maxHeight = isActive ? `${answer.scrollHeight}px` : null;
  };

  faqContainer.addEventListener('click', (e) => {
      const button = e.target.closest('.faq-question');
      if (!button) return;
      
      document.querySelectorAll('.faq-question').forEach(otherButton => {
          if (otherButton !== button) {
              otherButton.classList.remove('active');
              otherButton.nextElementSibling.style.maxHeight = null;
          }
      });
      
      toggleAnswer(button);
  });
}

function initCurrencyFilter() {
  const search = document.getElementById('searchBar');
  const continent = document.getElementById('continentSelect');
  const currencyGroups = document.querySelectorAll('.currency-group');

  const filterCurrencies = () => {
      const searchTerm = search.value.toLowerCase();
      const selectedContinent = continent.value;

      currencyGroups.forEach(group => {
          let hasVisibleItems = false;
          const currencyItems = group.querySelectorAll('p');
          const groupId = group.id;

          currencyItems.forEach(item => {
              const matchesSearch = item.textContent.toLowerCase().includes(searchTerm);
              const matchesContinent = !selectedContinent || groupId === selectedContinent;
              
              if (matchesSearch && matchesContinent) {
                  item.style.display = 'block';
                  hasVisibleItems = true;
              } else {
                  item.style.display = 'none';
              }
          });

          group.style.display = hasVisibleItems ? 'block' : 'none';
      });
  };

  
  search.addEventListener('input', filterCurrencies);
  continent.addEventListener('change', filterCurrencies);
}


document.addEventListener('DOMContentLoaded', initCurrencyFilter);

function initNotificationBanner() {
  const banner = document.getElementById('notificationBanner');
  const closeBtn = document.getElementById('closeBtn');
  if (!banner || !closeBtn) return;

  const storageKey = 'neureal-banner-closed'; 

  
  const isBannerClosed = localStorage.getItem(storageKey) === 'true'; 

  
  if (isBannerClosed) {
      banner.style.display = 'none';
      return;
  } else {
      banner.style.display = 'flex'; 
  }

  
  const closeBanner = () => {
      banner.style.display = 'none';
      localStorage.setItem(storageKey, 'true'); 
  };

  closeBtn.addEventListener('click', closeBanner);
}


// Footer Logo Handler
function initFooterLogo() {
  const footerLogo = document.querySelector('.footer-logo img');
  if (footerLogo) {
      footerLogo.addEventListener('click', () => {
          window.location.href = 'index.html';
      });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  initFAQ();
  initNotificationBanner();
  initPayButton();
  initFooterLogo();
});