// ============================================
// CAPA DE LÓGICA DE NEGOCIO
// Precios y cálculos - independiente del DOM
// ============================================
const LogicaPrecios = {
    servicios: {
        revisión: { nombre: "Revisión", precio: 10 },
        lavado: { nombre: "Lavado / Mantenimiento", precio: 20 },
        instalacion: { nombre: "Instalación", precio: 50 },
        reparacion: { nombre: "Reparación Técnica", precio: 45 },
        gas: { nombre: "Carga de Gas Refrigerante", precio: 30 }
    },

    calcularCosto(servicioKey) {
        return this.servicios[servicioKey]?.precio || 0;
    },

    obtenerMasCaro(listaPrecios) {
        if (!listaPrecios.length) return 0;
        let max = listaPrecios[0];
        for (let i = 1; i < listaPrecios.length; i++) {
            if (listaPrecios[i] > max) max = listaPrecios[i];
        }
        return max;
    }
};

// ============================================
// CAPA DE INTERFAZ (UI)
// Manejo del DOM y experiencia de usuario
// ============================================
const ui = {
    renderizarFormularios() {
        const input = document.getElementById('cantidadEquipos');
        const n = parseInt(input.value);

        // Validación
        if (!n || n < 1 || n > 10) {
            alert('Por favor, ingresa un número válido entre 1 y 10 equipos');
            input.value = '';
            input.focus();
            return;
        }

        const contenedor = document.getElementById('contenedorEquipos');
        contenedor.innerHTML = '';

        for (let i = 1; i <= n; i++) {
            contenedor.innerHTML += this.crearEquipoItem(i);
        }
        contenedor.innerHTML += `<button onclick="ui.procesarReporte()" class="btn-primary">Generar Presupuesto</button>`;
    },

    crearEquipoItem(index) {
        return `
            <div class="equipo-item">
                <span><strong>Equipo #${index}</strong></span>
                <select id="tipo${index}" class="select-type">
                    <option value="aire">Aire Acondicionado</option>
                    <option value="nevera">Nevera / Refrigerador</option>
                    <option value="vitrina">Vitrina Refrigerada</option>
                    <option value="cuarto">Cuarto Frío</option>
                    <option value="otro">Otro Equipo</option>
                </select>
                <select id="srv${index}" class="select-service">
                    <option value="revisión">Revisión ($10)</option>
                    <option value="lavado">Mantenimiento ($20)</option>
                    <option value="gas">Carga de Gas ($30)</option>
                    <option value="reparacion">Reparación ($45)</option>
                    <option value="instalacion">Instalación ($50)</option>
                </select>
            </div>
        `;
    },

    capturarDatos(n) {
        let datos = [];
        for (let i = 1; i <= n; i++) {
            datos.push({
                tipo: document.getElementById(`tipo${i}`).value,
                servicio: document.getElementById(`srv${i}`).value
            });
        }
        return datos;
    },

    procesarReporte() {
        try {
            const n = parseInt(document.getElementById('cantidadEquipos').value);
            const listaEquipos = this.capturarDatos(n);

            let total = 0;
            let listaDePrecios = [];

            listaEquipos.forEach(item => {
                let costo = LogicaPrecios.calcularCosto(item.servicio);
                total += costo;
                listaDePrecios.push(costo);
            });

            const maxCosto = LogicaPrecios.obtenerMasCaro(listaDePrecios);
            const area = document.getElementById('areaReporte');

            area.style.display = 'block';
            area.innerHTML = this.generarHTMLReporte(total, maxCosto, n);

            setTimeout(() => {
                area.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);

        } catch (error) {
            console.error('Error al generar reporte:', error);
            alert('Hubo un error al generar el presupuesto. Intenta de nuevo.');
        }
    },

    generarHTMLReporte(total, maxCosto, n) {
        const mensajeWhatsApp = encodeURIComponent(
            `Hola, quiero agendar un servicio. Presupuesto estimado: $${total}`
        );

        return `
        <h3>Presupuesto Final</h3>
        <p>Total a pagar: <strong>$${total}</strong></p>
        <p>Servicio más costoso: <strong>$${maxCosto}</strong></p>
        <p><small>Basado en ${n} equipo(s) registrados.</small></p>
        <a href="https://wa.me/584245776164?text=${mensajeWhatsApp}" 
           class="btn-primary btn-whatsapp-report" target="_blank">
            <i class="fab fa-whatsapp"></i> Agendar
        </a>
    `;
    }
};