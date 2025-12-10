// script.js
// Manejo simple de navegación 

document.addEventListener('DOMContentLoaded', function () {
    const menuItems = Array.from(document.querySelectorAll('.menu-item'));
    const sections = Array.from(document.querySelectorAll('.section'));

    function showSection(slug) {
        // Oculta todas las secciones y remueve clase active en menú
        sections.forEach(s => s.classList.remove('active'));
        menuItems.forEach(mi => mi.classList.remove('active'));

        // Busca la sección con id igual al slug y la muestra
        const target = document.getElementById(slug);
        if (target) {
            target.classList.add('active');
        }

        // Marca el menú correspondiente como activo
        const menuFor = menuItems.find(mi => mi.dataset.section === slug);
        if (menuFor) menuFor.classList.add('active');
    }

    // Asignar eventos click a todos los enlaces del menú
    menuItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const section = item.dataset.section;
            showSection(section);
            // Manejar foco para accesibilidad
            item.focus();
            // Actualizar hash URL (opcional, no recarga)
            history.replaceState(null, '', '#' + section);
        });
    });

    // Carga por defecto: primera sección (resumen) si existe
    const defaultSection = 'resumen';
    // Si hay hash en la URL y corresponde a una sección, mostrarla
    const hash = location.hash ? location.hash.replace('#', '') : '';
    const initial = document.getElementById(hash) ? hash : defaultSection;
    showSection(initial);

    // Soporte para navegación por historial (back/forward)
    window.addEventListener('popstate', function () {
        const currentHash = location.hash ? location.hash.replace('#', '') : defaultSection;
        showSection(document.getElementById(currentHash) ? currentHash : defaultSection);
    });
});
