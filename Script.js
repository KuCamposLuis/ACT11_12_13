function cambiarFormulario() {
    var figuraSeleccionada = document.getElementById("practica").value;
    document.getElementById("act11").style.display = "none";
    document.getElementById("act12").style.display = "none";
    document.getElementById("act13").style.display = "none";
    document.getElementById(figuraSeleccionada).style.display = "block";
}

class Matriz {
    constructor(filas, columnas) {
        this.filas = filas; 
        this.columnas = columnas;
        this.matriz = this.llenarMatriz();
    }

    llenarMatriz() {
        const matriz = [];
        for(let i = 0; i < this.filas; i ++) {
            matriz[i] = [];
            for(let x = 0; x < this.columnas; x++) {
                matriz[i][x] = Math.floor(Math.random() * 10) + 1;
            }
        }
        return matriz;
    }

    calcularSumaFila(fila) {
        return this.matriz[fila].reduce((a, b) => a + b, 0);
    }

    calcularPromedioFila(fila) {
        const sumaF = this.calcularSumaFila(fila);
        return sumaF / this.matriz[fila].length;
    }

    calcularSumaColumna(columna) {
        return this.matriz.reduce((a, b) => a + b[columna], 0);
    }

    calcularPromedioColumna(columna) {
        const sumaC = this.calcularSumaColumna(columna);
        return sumaC / this.matriz.length;
    }

    imprimirMatrizResultado() {
        const matrizTable = document.getElementById('matrizTable');
        for(let i = 0; i < this.matriz.length; i++) {
            const fila = document.createElement('tr');
            for(let x = 0; x < this.matriz[i].length; x++) {
                const celda = document.createElement('td');
                celda.textContent = this.matriz[i][x];
                fila.appendChild(celda);
            }
            matrizTable.appendChild(fila);
        }
        const A = [];
        const B = [];
        const C = [];
        const D = [];

        for (let i = 0; i < this.matriz.length; i++) {
            A.push(this.calcularSumaFila(i));
            B.push(this.calcularPromedioFila(i));
        }

        for (let x = 0; x < this.matriz[0].length; x++) {
            C.push(this.calcularSumaColumna(x));
            D.push(this.calcularPromedioColumna(x));
        }

        document.getElementById('resultadoA').textContent = A.join(' ');
        document.getElementById('resultadoB').textContent = B.join(' ');
        document.getElementById('resultadoC').textContent = C.join(' ');
        document.getElementById('resultadoD').textContent = D.join(' ');
    }
}

const matrizObj = new Matriz(5, 10);
document.addEventListener('DOMContentLoaded', function () {
    matrizObj.imprimirMatrizResultado(); 
});


// Arreglo con los nombres de los meses
const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

// Arreglo con los valores de ventas por día de la semana
const valoresVentas = [
    [2.00, 15.00, 12.00, 8.00, 20.00],
    [12.00, 18.00, 1.00, 9.00, 22.00],
    [9.00, 14.00, 11.00, 7.00, 18.00],
    [11.00, 16.00, 9.00, 10.00, 19.00],
    [13.00, 17.00, 13.00, 8.00, 21.00],
    [10.00, 15.00, 12.00, 9.00, 20.00],
    [11.00, 16.00, 11.00, 7.00, 22.00],
    [12.00, 17.00, 10.00, 8.00, 18.00],
    [9.00, 14.00, 11.00, 10.00, 19.00],
    [10.00, 15.00, 12.00, 8.00, 21.00],
    [11.00, 16.00, 13.00, 7.00, 20.00],
    [12.00, 18.00, 11.00, 100.00, 99.00]
];

// Función para llenar la tabla de ventas con los valores del arreglo
function llenarTablaVentas() {
    const tabla = document.getElementById("tabla-ventas");

    for (let i = 0; i < valoresVentas.length; i++) {
        const fila = document.createElement("tr");
        const nombreMes = document.createElement("th");
        nombreMes.textContent = meses[i];
        fila.appendChild(nombreMes);

        const datosMes = valoresVentas[i];

        for (let j = 0; j < datosMes.length; j++) {
            const celda = document.createElement("td");
            celda.textContent = datosMes[j];
            fila.appendChild(celda);
        }

        tabla.appendChild(fila);
    }
}

// Función para calcular las ventas
function calcularVentas() {
    const tabla = document.getElementById("tabla-ventas");
    const filas = tabla.getElementsByTagName("tr");
    const ventas = [];
    const ventasPorDia = [0, 0, 0, 0, 0]; // Lunes, Martes, Miércoles, Jueves, Viernes

    // Recorrer filas de la tabla para obtener los valores de ventas
    for (let i = 1; i < filas.length; i++) {
        const fila = filas[i];
        const celdas = fila.getElementsByTagName("td");
        const ventasMes = [];

        for (let j = 0; j < celdas.length; j++) {
            const valorVenta = parseFloat(celdas[j].textContent);
            ventasMes.push(isNaN(valorVenta) ? 0 : valorVenta);
            ventasPorDia[j] += isNaN(valorVenta) ? 0 : valorVenta;
        }

        ventas.push(ventasMes);
    }

    // Realizar cálculos de ventas aquí
    let ventaTotal = 0;
    let menorVenta = Infinity;
    let mayorVenta = -Infinity;
    let diaMenorVenta = "";
    let diaMayorVenta = "";

    for (let i = 0; i < ventas.length; i++) {
        const ventasMes = ventas[i];
        const totalMes = ventasMes.reduce((a, b) => a + b, 0);
        ventaTotal += totalMes;

        const menorMes = Math.min(...ventasMes);
        const mayorMes = Math.max(...ventasMes);

        if (menorMes < menorVenta) {
            menorVenta = menorMes;
            diaMenorVenta = obtenerDiaSemana(ventasMes.indexOf(menorMes));
        }

        if (mayorMes > mayorVenta) {
            mayorVenta = mayorMes;
            diaMayorVenta = obtenerDiaSemana(ventasMes.indexOf(mayorMes));
        }
    }

    // Mostrar resultados
    const resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = `
        <p>Venta Total: $${ventaTotal.toFixed(2)}</p>
        <p>Menor Venta: $${menorVenta.toFixed(2)} (Día: ${diaMenorVenta})</p>
        <p>Mayor Venta: $${mayorVenta.toFixed(2)} (Día: ${diaMayorVenta})</p>
        <p>Ventas por Día:</p>
        <ul>
            <li>Lunes: $${ventasPorDia[0].toFixed(2)}</li>
            <li>Martes: $${ventasPorDia[1].toFixed(2)}</li>
            <li>Miércoles: $${ventasPorDia[2].toFixed(2)}</li>
            <li>Jueves: $${ventasPorDia[3].toFixed(2)}</li>
            <li>Viernes: $${ventasPorDia[4].toFixed(2)}</li>
        </ul>
    `;
}

// Función para obtener el día de la semana a partir del índice (0 = Lunes, 1 = Martes, ...)
function obtenerDiaSemana(indice) {
    const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
    return diasSemana[indice];
}

// Llenar la tabla al cargar la página
window.addEventListener("load", llenarTablaVentas);

const calificaciones = [
            [5.5, 8.5, 9.55],
            [6.5, 8.5, 9.55],
            [1.5, 1.5, .55],
            [5.5, 8.5, 9.55],
            [3.5, 8.5, 9.55],
            [9.5, 8.5, 9.55],
            [8.5, 8.5, 9.55]
        ];

        function calcularCalificaciones() {
            const tabla = document.getElementById("tabla-calificaciones");

            // Limpiar la tabla antes de llenarla
            while (tabla.rows.length > 1) {
                tabla.deleteRow(1);
            }

            const promedios = [];
            let promedioMasAlto = 0;
            let promedioMasBajo = Infinity;
            let parcialesReprobados = 0;
            const distribucionCalificaciones = [0, 0, 0, 0, 0];

            for (let i = 0; i < calificaciones.length; i++) {
                const calificacionesAlumno = calificaciones[i];
                const fila = tabla.insertRow();

                const celdaAlumno = fila.insertCell(0);
                celdaAlumno.textContent = `Alumno ${i + 1}`;

                let sumaCalificaciones = 0;
                let reprobado = false;

                for (let j = 0; j < calificacionesAlumno.length; j++) {
                    const calificacion = calificacionesAlumno[j];
                    sumaCalificaciones += calificacion;

                    // Verificar si el parcial fue reprobado
                    if (calificacion < 7.0) {
                        reprobado = true;
                        parcialesReprobados++;
                    }

                    const celdaCalificacion = fila.insertCell(j + 1);
                    celdaCalificacion.textContent = calificacion.toFixed(2);
                }

                const promedioAlumno = sumaCalificaciones / calificacionesAlumno.length;
                promedios.push(promedioAlumno);

                promedioMasAlto = Math.max(promedioMasAlto, promedioAlumno);
                promedioMasBajo = Math.min(promedioMasBajo, promedioAlumno);

                distribuirCalificaciones(promedioAlumno, distribucionCalificaciones);

                // Agregar clase de "reprobado" a la fila si corresponde
                if (reprobado) {
                    fila.classList.add("reprobado");
                }
            }

            const promediosAlumnosUl = document.getElementById("promedios-alumnos");
            promedios.forEach((promedio, index) => {
                const li = document.createElement("li");
                li.textContent = `Alumno ${index + 1}: ${promedio.toFixed(2)}`;
                promediosAlumnosUl.appendChild(li);
            });

            document.getElementById("promedio-mas-alto").textContent = promedioMasAlto.toFixed(2);
            document.getElementById("promedio-mas-bajo").textContent = promedioMasBajo.toFixed(2);
            document.getElementById("parciales-reprobados").textContent = parcialesReprobados;

            const distribucionCalificacionesUl = document.getElementById("distribucion-calificaciones");
            for (let i = 0; i < distribucionCalificaciones.length; i++) {
                const rangoInicio = i * 2.0;
                const rangoFin = (i + 1) * 2.0 - 0.01;
                const li = document.createElement("li");
                li.textContent = `${rangoInicio.toFixed(1)} - ${rangoFin.toFixed(1)}: ${distribucionCalificaciones[i]} Alumnos`;
                distribucionCalificacionesUl.appendChild(li);
            }

            // Mostrar los resultados
            document.getElementById("resultados").style.display = "block";
        }

        function distribuirCalificaciones(promedio, distribucionCalificaciones) {
            if (promedio >= 0 && promedio < 5) {
                distribucionCalificaciones[0]++;
            } else if (promedio >= 5 && promedio < 6) {
                distribucionCalificaciones[1]++;
            } else if (promedio >= 6 && promedio < 7) {
                distribucionCalificaciones[2]++;
            } else if (promedio >= 7 && promedio < 8) {
                distribucionCalificaciones[3]++;
            } else if (promedio >= 8 && promedio <= 10) {
                distribucionCalificaciones[4]++;
            }
        }