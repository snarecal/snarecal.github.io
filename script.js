// BASIC INTERACTIVITY FOR LOW-FIDELITY WIREFRAME
// Demonstrates user flow and interaction patterns

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.backgroundColor = '#e0e0e0';
            navMenu.style.padding = '20px';
            navMenu.style.borderTop = '2px solid #333';
        });
    }
    
    // Accordion functionality for Plan Your Visit page
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            const content = item.querySelector('.accordion-content');
            const isExpanded = item.classList.contains('expanded');
            
            if (isExpanded) {
                item.classList.remove('expanded');
                item.classList.add('collapsed');
                content.style.display = 'none';
                this.querySelector('h2').textContent = this.querySelector('h2').textContent.replace('▼', '▶');
            } else {
                item.classList.remove('collapsed');
                item.classList.add('expanded');
                content.style.display = 'block';
                this.querySelector('h2').textContent = this.querySelector('h2').textContent.replace('▶', '▼');
            }
        });
    });
    
    // FUNCTIONAL FILTERING FOR THINGS TO DO PAGE
    const activityCategoryFilter = document.getElementById('activityCategoryFilter');
    const familyFriendlyFilter = document.getElementById('familyFriendlyFilter');
    const adventureFilter = document.getElementById('adventureFilter');
    const relaxationFilter = document.getElementById('relaxationFilter');
    
    function filterActivities() {
        const activityCards = document.querySelectorAll('.activity-card');
        const categoryValue = activityCategoryFilter ? activityCategoryFilter.value : 'all';
        const familyChecked = familyFriendlyFilter ? familyFriendlyFilter.checked : false;
        const adventureChecked = adventureFilter ? adventureFilter.checked : false;
        const relaxationChecked = relaxationFilter ? relaxationFilter.checked : false;
        
        activityCards.forEach(card => {
            let show = true;
            
            // Category filter
            if (categoryValue !== 'all' && card.dataset.category !== categoryValue) {
                show = false;
            }
            
            // Checkbox filters (OR logic - show if any checkbox is checked and matches)
            if (familyChecked || adventureChecked || relaxationChecked) {
                const matchesFamily = familyChecked && card.dataset.familyFriendly === 'true';
                const matchesAdventure = adventureChecked && card.dataset.adventure === 'true';
                const matchesRelaxation = relaxationChecked && card.dataset.relaxation === 'true';
                
                if (!matchesFamily && !matchesAdventure && !matchesRelaxation) {
                    show = false;
                }
            }
            
            card.style.display = show ? 'block' : 'none';
        });
    }
    
    if (activityCategoryFilter) {
        activityCategoryFilter.addEventListener('change', filterActivities);
    }
    if (familyFriendlyFilter) {
        familyFriendlyFilter.addEventListener('change', filterActivities);
    }
    if (adventureFilter) {
        adventureFilter.addEventListener('change', filterActivities);
    }
    if (relaxationFilter) {
        relaxationFilter.addEventListener('change', filterActivities);
    }

    // FUNCTIONAL FILTERING FOR ACCOMMODATIONS PAGE
    const priceFilter = document.getElementById('priceFilter');
    const locationFilter = document.getElementById('locationFilter');
    const amenitiesFilter = document.getElementById('amenitiesFilter');
    const ratingFilter = document.getElementById('ratingFilter');
    
    function filterAccommodations() {
        const accommodationCards = document.querySelectorAll('.accommodation-card, .featured-card');
        const priceValue = priceFilter ? priceFilter.value : 'all';
        const locationValue = locationFilter ? locationFilter.value : 'all';
        const amenitiesValue = amenitiesFilter ? amenitiesFilter.value : 'all';
        const ratingValue = ratingFilter ? ratingFilter.value : 'all';
        
        accommodationCards.forEach(card => {
            let show = true;
            
            // Price filter
            if (priceValue !== 'all') {
                const price = parseInt(card.dataset.price);
                if (priceValue === 'under-100' && price >= 100) show = false;
                if (priceValue === '100-200' && (price < 100 || price > 200)) show = false;
                if (priceValue === '200-plus' && price < 200) show = false;
            }
            
            // Location filter
            if (locationValue !== 'all' && card.dataset.location !== locationValue) {
                show = false;
            }
            
            // Amenities filter
            if (amenitiesValue !== 'all') {
                const amenities = card.dataset.amenities || '';
                if (!amenities.includes(amenitiesValue)) {
                    show = false;
                }
            }
            
            // Rating filter
            if (ratingValue !== 'all') {
                const rating = parseInt(card.dataset.rating);
                if (ratingValue === '4-plus' && rating < 4) show = false;
                if (ratingValue === '3-plus' && rating < 3) show = false;
            }
            
            card.style.display = show ? 'block' : 'none';
        });
    }
    
    if (priceFilter) {
        priceFilter.addEventListener('change', filterAccommodations);
    }
    if (locationFilter) {
        locationFilter.addEventListener('change', filterAccommodations);
    }
    if (amenitiesFilter) {
        amenitiesFilter.addEventListener('change', filterAccommodations);
    }
    if (ratingFilter) {
        ratingFilter.addEventListener('change', filterAccommodations);
    }
    
    // Tab functionality for accommodation types
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter by accommodation type
            const typeValue = this.dataset.type;
            const accommodationCards = document.querySelectorAll('.accommodation-card, .featured-card');
            
            accommodationCards.forEach(card => {
                const cardTypes = card.dataset.type || '';
                if (typeValue === 'all' || cardTypes.includes(typeValue)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Button click feedback (demonstrates booking flow)
    const bookButtons = document.querySelectorAll('.btn-primary');
    
    bookButtons.forEach(button => {
        if (button.textContent.includes('BOOK') || button.textContent.includes('Book')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                alert('WIREFRAME DEMO: In the final prototype, this would open a booking form or redirect to a booking partner site. This demonstrates the direct booking functionality requested in the requirements.');
            });
        }
    });
    
    // Filter change demonstration
    const filterSelects = document.querySelectorAll('.filter-select');
    
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            console.log('Filter changed:', this.value);
            // In a real prototype, this would filter the displayed cards
        });
    });
    
    // Checkbox filter demonstration
    const filterCheckboxes = document.querySelectorAll('.filters input[type="checkbox"]');
    
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            console.log('Filter checkbox:', this.parentElement.textContent.trim(), this.checked);
            // In a real prototype, this would filter the displayed activities
        });
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Log user interactions for usability testing reference
function logInteraction(action, element) {
    console.log('User Interaction:', {
        action: action,
        element: element,
        timestamp: new Date().toISOString()
    });
}

// Add interaction logging to all clickable elements
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
        logInteraction('click', e.target.textContent);
    }
});
