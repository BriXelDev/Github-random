// Interfaz que define la estructura de un repositorio de GitHub
// Esto garantiza que cada repositorio tenga estos datos específicos
export interface Repository {
    id: number;              // ID único del repositorio en GitHub
    name: string;            // Nombre del repositorio
    html_url: string;        // URL para acceder al repositorio en GitHub
    description: string;     // Descripción del repositorio
    stars: number;           // Cantidad de estrellas (favoritos) que tiene
    language: string;        // Lenguaje de programación principal
    forks_count: number;     // Cantidad de veces que fue copiado (forked)
}


export let AVAILABLE_LANGUAGES: {[key: string]: string} = {};

export async function loadLanguages() {
    try{
        const response = await fetch('/languages.json');
        if(!response.ok) throw new Error('Error loading languages');
        const data = await response.json();
        // Convierte el array de objetos {title, value} a un objeto {value: title}
        AVAILABLE_LANGUAGES = data.reduce((acc: {[key: string]: string}, item: any) => {
            acc[item.value] = item.title;
            return acc;
        }, {});
    } catch (error) {
        console.error("Failed to load languages:", error);
    }
}

// Función asincrónica que busca repositorios en GitHub
// Parámetros:
//   - language: el lenguaje de programación a buscar (ej: "javascript", "python")
//   - perPage: cuántos repositorios traer (por defecto 10, máximo 100)
// Retorna: una promesa con un array de repositorios
export async function searchRepositories(language: string, perPage: number = 10): Promise<Repository[]> {
    // Crea la consulta para buscar por lenguaje
    // Ejemplo: si language es "javascript", query será "language:javascript"
    const query = `language:${language}`;
    
    // Realiza la llamada a la API de GitHub
    // encodeURIComponent() convierte caracteres especiales para que funcione en la URL
    // &sort=stars ordena por cantidad de estrellas
    // &order=desc muestra los más populares primero (orden descendente)
    // &per_page=${perPage} limita cuántos resultados traer
    const response = await fetch(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=${perPage}`
    );

    // Verifica si la respuesta fue exitosa (código 200)
    // Si algo falló, lanza un error
    if(!response.ok) throw new Error('Error fetching repositories');

    // Convierte la respuesta JSON a un objeto JavaScript
    const data = await response.json();
    
    // Transforma cada repositorio de la API al formato que definimos en la interfaz
    // data.items es el array de repositorios que devuelve la API
    // .map() recorre cada repositorio y extrae solo los datos que necesitamos
    return data.items.map((item:any) => ({
        id: item.id,
        name: item.name,
        html_url: item.html_url,
        description: item.description,
        stars: item.stargazers_count,  // En la API se llama "stargazers_count", lo renombramos a "stars"
        language: item.language,
        forks_count: item.forks_count,
    }));
}

// Función que selecciona un repositorio al azar del array de repositorios
// Parámetro:
//   - repos: array de repositorios de donde elegir
// Retorna: un repositorio elegido aleatoriamente
export function getRandomRepository(repos: Repository[]): Repository {
    // Math.random() genera un número entre 0 y 1 (ej: 0.456)
    // Math.random() * repos.length lo multiplica por el tamaño del array
    //   Si hay 10 repos: 0.456 * 10 = 4.56
    // Math.floor() redondea hacia abajo (4.56 se convierte en 4)
    // repos[4] accede al repositorio en la posición 4
    return repos[Math.floor(Math.random() * repos.length)];
}