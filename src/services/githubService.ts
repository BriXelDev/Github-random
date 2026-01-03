// ============================================
// INTERFAZ REPOSITORY
// ============================================

// Interfaz que define la estructura de un repositorio de GitHub
// TypeScript usa esto para verificar que los datos sean correctos
// Garantiza que cada repositorio tenga exactamente estos campos
export interface Repository {
    id: number;              // ID único del repositorio en GitHub (no se muestra, pero identifica el repo)
    name: string;            // Nombre del repositorio (ej: "react", "vscode")
    html_url: string;        // URL directa al repositorio en GitHub (ej: "https://github.com/facebook/react")
    description: string;     // Descripción del repositorio (ej: "A JavaScript library for building user interfaces")
    stars: number;           // Cantidad de estrellas (favoritos) que tiene (ej: 200000)
    language: string;        // Lenguaje de programación principal (ej: "JavaScript", "TypeScript")
    forks_count: number;     // Cantidad de veces que fue copiado/forked (ej: 45000)
}


// ============================================
// CARGAR LENGUAJES DISPONIBLES
// ============================================

// Variable global que almacena todos los lenguajes de programación disponibles
// Formato: { "JavaScript": "JavaScript", "Python": "Python", "C": "C", ... }
// Se inicializa vacía y se llena cuando loadLanguages() termina
export let AVAILABLE_LANGUAGES: {[key: string]: string} = {};

// Función asincrónica que carga los lenguajes desde el archivo public/languages.json
// Esta función se ejecuta una sola vez cuando el componente se monta
// async: permite usar await para esperar a que termine el fetch
export async function loadLanguages() {
    try{
        // fetch() hace una petición HTTP GET al servidor para obtener el archivo languages.json
        // '/languages.json' es la ruta pública (Vite sirve automáticamente archivos de la carpeta public)
        const response = await fetch('/languages.json');
        
        // Verifica si la petición fue exitosa (código HTTP 200)
        // Si falla (404, 500, etc.), lanza un error
        if(!response.ok) throw new Error('Error loading languages');
        
        // response.json() convierte el texto JSON a un objeto JavaScript
        // El archivo contiene un array de objetos con {title: nombre, value: código}
        const data = await response.json();
        
        // .reduce() es una función que itera sobre el array y construye un objeto
        // Convierte: [{title: "JavaScript", value: "JavaScript"}, ...] 
        // En: {"JavaScript": "JavaScript", ...}
        AVAILABLE_LANGUAGES = data.reduce((acc: {[key: string]: string}, item: any) => {
            // acc es el acumulador (el objeto que estamos construyendo)
            // item es cada elemento del array
            // acc[item.value] = item.title crea una entrada en el objeto
            // Ejemplo: acc["JavaScript"] = "JavaScript"
            acc[item.value] = item.title;
            // return acc devuelve el objeto actualizado para la siguiente iteración
            return acc;
        }, {});  // {} es el valor inicial del acumulador (objeto vacío)
        
    } catch (error) {
        // Si hay algún error (archivo no existe, JSON inválido, etc.), lo muestra en la consola
        // console.error() es como console.log() pero para errores
        console.error("Failed to load languages:", error);
    }
}

// ============================================
// BUSCAR REPOSITORIOS EN GITHUB
// ============================================

// Función asincrónica que busca repositorios en la API de GitHub
// Parámetros:
//   - language: el lenguaje de programación a buscar (ej: "JavaScript", "Python")
//   - perPage: cuántos repositorios traer (por defecto 10, máximo 100 de la API)
// Retorna: una promesa que devuelve un array de repositorios filtrados
export async function searchRepositories(language: string, perPage: number = 10): Promise<Repository[]> {
    // Crea la consulta para buscar por lenguaje
    // La API de GitHub entiende queries como "language:javascript"
    // Ejemplo: si language es "JavaScript", query será "language:JavaScript"
    const query = `language:${language}`;
    
    // Construye la URL completa para la API de GitHub
    // https://api.github.com/search/repositories es el endpoint (dirección) de búsqueda
    // encodeURIComponent(query) convierte caracteres especiales para que funcione en la URL
    //   (ejemplo: espacios se convierten a %20)
    // &sort=stars ordena los resultados por cantidad de estrellas (de más a menos populares)
    // &order=desc muestra primero los más populares (orden descendente)
    // &per_page=${perPage} especifica cuántos resultados traer (10 por defecto)
    const response = await fetch(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=${perPage}`
    );

    // Verifica si la respuesta fue exitosa (código 200)
    // Si algo falló (límite de API alcanzado, error del servidor, etc.), lanza un error
    if(!response.ok) throw new Error('Error fetching repositories');

    // response.json() convierte el texto JSON a un objeto JavaScript
    // La API devuelve un objeto con una propiedad "items" que contiene el array de repositorios
    const data = await response.json();
    
    // Transforma cada repositorio de la API al formato que definimos en la interfaz Repository
    // data.items es el array de repositorios que devuelve la API
    // .map() itera sobre cada repositorio y extrae solo los datos que necesitamos
    return data.items.map((item:any) => ({
        // Copia el ID del repositorio tal cual viene de la API
        id: item.id,
        // Copia el nombre del repositorio
        name: item.name,
        // Copia la URL del repositorio en GitHub
        html_url: item.html_url,
        // Copia la descripción (puede ser null si no tiene descripción)
        description: item.description,
        // En la API se llama "stargazers_count", pero nosotros lo renombramos a "stars" para simplificar
        // Esto hace que el código sea más fácil de entender
        stars: item.stargazers_count,
        // Copia el lenguaje de programación principal del repositorio
        language: item.language,
        // Copia la cantidad de forks
        forks_count: item.forks_count,
    }));
}

// ============================================
// SELECCIONAR REPOSITORIO ALEATORIO
// ============================================

// Función que selecciona un repositorio al azar del array de repositorios
// Parámetro:
//   - repos: array de repositorios de donde elegir (ejemplo: 10 repositorios)
// Retorna: un repositorio elegido aleatoriamente
export function getRandomRepository(repos: Repository[]): Repository {
    // Math.random() genera un número decimal entre 0 (incluido) y 1 (excluido)
    // Ejemplo: 0.456, 0.789, 0.123, etc.
    
    // repos.length es la cantidad de repositorios en el array
    // Si hay 10 repositorios, repos.length = 10
    
    // Math.random() * repos.length multiplica el número aleatorio por la cantidad de repos
    // Ejemplo: 0.456 * 10 = 4.56, 0.789 * 10 = 7.89
    // Esto da un número entre 0 (incluido) y repos.length (excluido)
    
    // Math.floor() redondea hacia abajo al número entero más cercano
    // Ejemplo: 4.56 se convierte en 4, 7.89 se convierte en 7
    // Esto da un índice válido para el array (0 a repos.length - 1)
    
    // repos[índice] accede al repositorio en esa posición del array
    // Ejemplo: si el índice es 4, devuelve el repositorio en la posición 4
    return repos[Math.floor(Math.random() * repos.length)];
}