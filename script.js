document.addEventListener('DOMContentLoaded', () => {
    const navBar = document.querySelector('.horizontal-nav');
    let openMenu = null; // Track the currently open menu

    // Function to close all menus and remove all checkmarks
    function closeAllMenusAndClearChecks() {
        document.querySelectorAll('.child-menu.show').forEach(menu => {
            menu.classList.remove('show');
        });
        document.querySelectorAll('.child-menu li a.selected').forEach(item => {
            item.classList.remove('selected');
        });
        openMenu = null;
    }
  // Handle click on center links 
    document.querySelectorAll('.centers-parent li a').forEach(link => {
      link.addEventListener('click', (event) => {
        console.log(link);
        event.preventDefault();
        
        // Remove any checkmark
        document.querySelectorAll('a.selected').forEach(item => {
          item.classList.remove('selected');
        })

        link.classList.add('selected');
      });

    });


    // Handle clicks on parent links
    document.querySelectorAll('.parent-link').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const childMenu = link.nextElementSibling;
            if (link.tagName === "BUTTON") {
              link.setAttribute('aria-expanded', true);
            }
            
            // If another menu is open, close it first and clear its checks
            if (openMenu && openMenu !== childMenu) {
                openMenu.classList.remove('show');
                openMenu.previousElementSibling.setAttribute('aria-expanded', false);
                openMenu.querySelectorAll('li a.selected').forEach(item => {
                    item.classList.remove('selected');
                });
            }

          // Remove check from any parent-only items
          document.querySelectorAll('.parent-only a').forEach(single => {
            single.classList.remove('selected');
          });

          // for single item links, add selected class,
            if (!childMenu) {
              link.classList.toggle('selected');
              return;
            }

            // Toggle the clicked menu's visibility
            childMenu.classList.toggle('show');
            openMenu = childMenu.classList.contains('show') ? childMenu : null;
        });
    });

    // Handle clicks on child items
    document.querySelectorAll('.child-menu li a').forEach(childLink => {
        childLink.addEventListener('click', (event) => {
            event.preventDefault();
            const currentMenu = childLink.closest('.child-menu');

            // Remove 'selected' from any other item in the same menu
            currentMenu.querySelectorAll('li a.selected').forEach(item => {
                item.classList.remove('selected');
            });

            // Add 'selected' to the clicked item
            childLink.classList.add('selected');
        });
    });

    // Handle clicks outside the nav bar to close menus and clear all checks
    document.addEventListener('click', (event) => {
        if (!navBar.contains(event.target)) {
            closeAllMenusAndClearChecks();
        }
    });

    // Prevent clicks inside the menu from propagating to the document listener and closing the menu immediately
    navBar.addEventListener('click', (event) => {
        event.stopPropagation();
    });
});

