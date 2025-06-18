function puntoMapaDistance(latitudAlerta, longitudAlerta, latitudPI, longitudPI) { //PI: Punto de Interés
    try {
        const R = 6371000; // Radio de la Tierra en m
        const dLat = (latitudPI - latitudAlerta) * (Math.PI / 180);
        const dLon = (longitudPI - longitudAlerta) * (Math.PI / 180);
        
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(latitudAlerta * (Math.PI / 180)) * Math.cos(latitudPI * (Math.PI / 180)) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distancia en m 

    } catch (error) {
        console.error("Error al calcular la distancia entre puntos:", error.message);
    }
}

function formatDistance(distancia) {
    if (distancia > 999) {
        return `${(distancia / 1000).toFixed(2)} km`;
    } 
    return `${distancia.toFixed(0)} m`;

}

export { puntoMapaDistance, formatDistance };

