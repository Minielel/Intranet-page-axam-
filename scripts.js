document.addEventListener('DOMContentLoaded', function() {
    const cpuSelect = document.getElementById('cpu');
    const motherboardSelect = document.getElementById('motherboard');
    const ramSelect = document.getElementById('ram');
    const gpuSelect = document.getElementById('gpu');

    const intelMotherboards = [
        { value: 'asus-b660m', text: 'ASUS PRIME B660M-A (€129) - Businesstauglich' },
        { value: 'gigabyte-b660m', text: 'Gigabyte B660M DS3H (€99) - Preis-Leistungs-Tipp' },
        { value: 'msi-h610m', text: 'MSI PRO H610M-B (€79) - Grundsolide' },
        { value: 'asrock-h610m', text: 'ASRock H610M-HDV (€69) - Budget' }
    ];

    const amdMotherboards = [
        { value: 'asus-b550m', text: 'ASUS PRIME B550M-A (€109) - Office-Optimal' },
        { value: 'msi-b550m', text: 'MSI B550M PRO-VDH (€89) - Empfehlung' },
        { value: 'gigabyte-a520m', text: 'Gigabyte A520M DS3H (€69) - Basis' },
        { value: 'asrock-a520m', text: 'ASRock A520M-HDV (€59) - Minimalist' }
    ];

    const compatibilityMap = {
        // Intel 13th Gen
        'intel-13500': {
            motherboards: ['asus-b660m', 'gigabyte-b660m', 'msi-h610m', 'asrock-h610m'],
            ram: ['ddr4-32gb-3200', 'ddr4-16gb-3200', 'ddr4-8gb-3200'],
            maxRamSpeed: 3200
        },
        'intel-13400': {
            motherboards: ['asus-b660m', 'gigabyte-b660m', 'msi-h610m', 'asrock-h610m'],
            ram: ['ddr4-32gb-3200', 'ddr4-16gb-3200', 'ddr4-8gb-3200'],
            maxRamSpeed: 3200
        },
        'intel-13100': {
            motherboards: ['msi-h610m', 'asrock-h610m'],
            ram: ['ddr4-16gb-3200', 'ddr4-8gb-3200'],
            maxRamSpeed: 3200
        },
        // AMD AM4
        'amd-5600': {
            motherboards: ['asus-b550m', 'msi-b550m', 'gigabyte-a520m', 'asrock-a520m'],
            ram: ['ddr4-32gb-3200', 'ddr4-16gb-3200', 'ddr4-8gb-3200'],
            maxRamSpeed: 3200
        },
        'amd-4600g': {
            motherboards: ['gigabyte-a520m', 'asrock-a520m'],
            ram: ['ddr4-16gb-3200', 'ddr4-8gb-3200'],
            maxRamSpeed: 3200
        }
    };

    // Update compatible components when CPU changes
    cpuSelect.addEventListener('change', function() {
        const selectedCpu = cpuSelect.value;
        updateCompatibleComponents(selectedCpu);
    });

    function updateCompatibleComponents(selectedCpu) {
        const compatibility = compatibilityMap[selectedCpu];
        
        // Clear existing options
        motherboardSelect.innerHTML = '<option value="">Bitte wählen Sie ein Motherboard</option>';
        ramSelect.innerHTML = '<option value="">Bitte wählen Sie RAM</option>';

        if (!compatibility) return;

        // Update motherboard options
        const motherboards = selectedCpu.startsWith('intel') ? intelMotherboards : amdMotherboards;
        motherboards.forEach(mb => {
            if (compatibility.motherboards.includes(mb.value)) {
                const option = document.createElement('option');
                option.value = mb.value;
                option.text = mb.text;
                motherboardSelect.add(option);
            }
        });

        // Update RAM options
        const ramOptions = [
            { value: 'ddr4-32gb-3200', text: '32GB DDR4-3200 (€109) - Zukunftssicher' },
            { value: 'ddr4-16gb-3200', text: '16GB DDR4-3200 (€59) - Standard-Empfehlung' },
            { value: 'ddr4-8gb-3200', text: '8GB DDR4-3200 (€35) - Minimum' }
        ];

        ramOptions.forEach(ram => {
            if (compatibility.ram.includes(ram.value)) {
                const option = document.createElement('option');
                option.value = ram.value;
                option.text = ram.text;
                ramSelect.add(option);
            }
        });

        // Update GPU compatibility message
        if (selectedCpu.includes('g') || selectedCpu.includes('G')) {
            gpuSelect.insertAdjacentHTML('beforebegin', 
                '<div class="compatibility-notice">Diese CPU hat bereits eine integrierte Grafik</div>');
        }
    }

    // Add command line functionality
    const commandInputs = document.querySelectorAll('.command-input');
    const tryButtons = document.querySelectorAll('.try-command');

    tryButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const input = commandInputs[index];
            const command = input.value.trim();
            const expectedCommand = input.getAttribute('placeholder');

            if (!command) {
                alert('Bitte geben Sie einen Befehl ein');
                return;
            }

            if (command !== expectedCommand) {
                alert(`Tipp: Versuchen Sie "${expectedCommand}"`);
                return;
            }

            alert('Richtig! Der Befehl wurde korrekt eingegeben.');
        });
    });

    const searchButton = document.querySelector('.search-bar button');
    const searchInput = document.querySelector('.search-bar input');

    searchButton.addEventListener('click', function() {
        const query = searchInput.value.toLowerCase();
        const pages = [
            { name: 'start', url: 'start.html' },
            { name: 'personliches', url: 'personliches.html' },
            { name: 'workstation', url: 'workstation.html' },
            { name: 'ticketsystem', url: 'ticketsystem.html' },
            { name: 'mitarbeiter', url: 'mitarbeiter.html' },
            { name: 'entwickler', url: 'entwickler.html' },
            { name: 'software', url: 'software.html' },
            { name: 'linux', url: 'linux.html' }
        ];

        const page = pages.find(p => p.name.includes(query));
        if (page) {
            window.location.href = page.url;
        } else {
            alert('Keine Ergebnisse gefunden');
        }
    });

    const navLinks = document.querySelectorAll('.header nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetUrl = this.getAttribute('href');
            window.location.href = targetUrl;
        });
    });

    const workstationForm = document.querySelector('#workstation form');
    const ticketForm = document.querySelector('#ticketsystem form');

    if (workstationForm) {
        workstationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const selectedCpu = cpuSelect.value;
            const selectedMotherboard = motherboardSelect.value;
            const selectedRam = ramSelect.value;

            const compatibility = compatibilityMap[selectedCpu];
            
            if (!compatibility) {
                alert('Bitte wählen Sie eine CPU aus.');
                return false;
            }

            if (!compatibility.motherboards.includes(selectedMotherboard)) {
                alert('Das gewählte Motherboard ist nicht kompatibel mit der CPU.');
                return false;
            }

            if (!compatibility.ram.includes(selectedRam)) {
                alert('Der gewählte RAM ist nicht kompatibel mit der CPU und dem Motherboard.');
                return false;
            }

            // If all validations pass, submit the form
            const formData = new FormData(this);
            const queryString = new URLSearchParams(formData).toString();
            fetch(`https://intranet.bib.de/screen/web/testmail_get.php?${queryString}`)
                .then(response => response.text())
                .then(data => {
                    alert('Workstation-Konfiguration erfolgreich gespeichert!');
                })
                .catch(error => {
                    console.error('Fehler:', error);
                });
        });
    }

    if (ticketForm) {
        ticketForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = document.getElementById('title').value.trim();
            const text = document.getElementById('text').value.trim();

            if (!title) {
                alert('Bitte geben Sie einen Titel ein.');
                document.getElementById('title').focus();
                return false;
            }

            if (!text) {
                alert('Bitte geben Sie einen Text ein.');
                document.getElementById('text').focus();
                return false;
            }

            // If validation passes, send the form data
            const formData = new FormData(ticketForm);
            const queryString = new URLSearchParams(formData).toString();
            
            window.location.href = `https://intranet.bib.de/screen/web/testmail_get.php?${queryString}`;
        });
    }

    
    function validateForm(event) {
        event.preventDefault();
        
        const title = document.getElementById('title').value;
        const text = document.getElementById('text').value;
        const status = document.getElementById('status').value;
        const type = document.getElementById('type').value;

        if (!title || !text || !status || !type) {
            alert('Bitte füllen Sie alle Felder aus.');
            return false;
        }

        // Submit the form
        event.target.submit();
        return true;
    }

    document.querySelector('.logo').addEventListener('click', function() {
        window.location.href = 'start.html';
    });
});