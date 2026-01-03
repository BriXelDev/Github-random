// Importa los estilos CSS específicos para este componente
import './styles/Hero.css'

// Importa los hooks de React necesarios:
// - useEffect: ejecuta código cuando el componente se monta o cuando sus dependencias cambian
// - useState: crea variables de estado que React monitorea y actualiza
import { useEffect, useState } from 'react';

// Importa las funciones y datos del servicio de GitHub:
// - searchRepositories: busca repositorios en GitHub por lenguaje
// - getRandomRepository: selecciona un repositorio aleatorio de una lista
// - AVAILABLE_LANGUAGES: objeto con los lenguajes disponibles {clave: nombre}
// - loadLanguages: función que carga el JSON de lenguajes desde la carpeta public
import { searchRepositories, getRandomRepository, AVAILABLE_LANGUAGES, loadLanguages } from '../services/githubService';

// Importa el tipo TypeScript Repository para asegurar que los datos tengan la estructura correcta
import type { Repository } from '../services/githubService';

// Define el componente Hero (la sección principal de la aplicación)
function Hero() {
    // Estado que almacena el lenguaje seleccionado actualmente
    // Valor inicial: 'javascript'
    // setLanguage: función para cambiar el lenguaje
    const [language, setLanguage] = useState('javascript');
    
    // Estado que almacena el repositorio que se mostró en pantalla
    // Valor inicial: null (sin repositorio seleccionado)
    // setRepo: función para actualizar el repositorio mostrado
    const [repo, setRepo] = useState<Repository | null>(null);
    
    // Estado booleano que indica si se está buscando un repositorio
    // true = buscando, false = búsqueda terminada
    // Se usa para mostrar "Buscando..." en el botón y deshabilitarlo mientras carga
    const [loading, setLoading] = useState(false);
    
    // Estado booleano que indica si los lenguajes ya se cargaron del JSON
    // true = lenguajes cargados, false = aún cargándose
    // Se usa para deshabilitar el select y botón hasta que estén listos
    const [languagesLoaded, setLanguagesLoaded] = useState(false);

    // Hook que se ejecuta cuando el componente se monta (aparece por primera vez)
    // El array [] vacío significa que solo se ejecuta una vez, no cuando otras cosas cambian
    useEffect(() => {
        // Llama a loadLanguages() para obtener el JSON de lenguajes desde public/languages.json
        // .then() espera a que la promesa se resuelva (que termine la carga)
        // Una vez que termina, setLanguagesLoaded(true) actualiza el estado para habilitar los controles
        loadLanguages().then(() => setLanguagesLoaded(true));
    }, []);

    // Función que se ejecuta cuando el usuario hace clic en "Buscar Repositorio Aleatorio"
    const handleSearch = async () => {
        // Marca que se está cargando (muestra "Buscando..." en el botón)
        setLoading(true);
        try{
            // Llama a searchRepositories() pasando el lenguaje seleccionado
            // Espera a que la API de GitHub devuelva una lista de repositorios
            const repos = await searchRepositories(language);
            
            // De la lista de repositorios obtenidos, elige uno al azar
            const random = getRandomRepository(repos);
            
            // Actualiza el estado 'repo' con el repositorio elegido
            // Esto hace que aparezca la tarjeta con la información del repositorio
            setRepo(random);
        } catch (error){
            // Si hay un error en la búsqueda o selección, lo muestra en la consola
            console.error('Error: ', error);
        } finally {
            // Siempre que termine (éxito o error), marca que terminó de cargar
            // Esto muestra el texto normal del botón nuevamente
            setLoading(false);
        }
    };

    return (
        // Retorna la estructura JSX (HTML + JavaScript) que se renderiza en pantalla
        <section className="hero"> 
            {/* Título principal de la aplicación */}
            <h1>Github Random</h1>
            
            {/* Contenedor del select de lenguajes y botón de búsqueda */}
            <div className="search-container"> 
                {/* 
                    Select (desplegable) para elegir el lenguaje de programación
                    - value={language}: muestra el lenguaje seleccionado actualmente
                    - onChange={(e) => setLanguage(e.target.value)}: actualiza el estado cuando el usuario elige otro lenguaje
                    - disabled={!languagesLoaded}: deshabilita el select hasta que se carguen los lenguajes
                */}
                <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    disabled={!languagesLoaded}
                >
                    {/* 
                        Mapea (itera) sobre el objeto AVAILABLE_LANGUAGES
                        Object.entries() convierte {clave: valor} en [[clave, valor], [clave, valor], ...]
                        Para cada lenguaje, crea una opción (<option>) en el select
                    */}
                    {Object.entries(AVAILABLE_LANGUAGES).map(([key, value]) => (
                        // Cada opción tiene:
                        // - key: identificador único para React (la clave del lenguaje)
                        // - value: el valor que se guardará en el estado (la clave del lenguaje)
                        // El texto visible es el nombre del lenguaje (value)
                        <option key={key} value={key}>
                            {value}
                        </option>
                    ))}
                </select>
                
                {/* 
                    Botón para buscar un repositorio aleatorio
                    - onClick={handleSearch}: ejecuta la búsqueda cuando se hace clic
                    - disabled={loading || !languagesLoaded}: se deshabilita si está cargando o si los lenguajes no están listos
                    - El texto cambia según el estado: "Buscando..." mientras carga, "Buscar Repositorio Aleatorio" cuando está listo
                */}
                <button onClick={handleSearch} disabled={loading || !languagesLoaded}>
                    {loading ? 'Buscando...' : 'Buscar Repositorio Aleatorio'}
                </button>
            </div>

            {/* 
                Tarjeta del repositorio (solo se muestra si hay un repositorio seleccionado)
                repo && ... significa: solo renderiza si repo NO es null
            */}
            {repo && (
                <div className="repo-card">
                    {/* Nombre del repositorio */}
                    <h2>{repo.name}</h2>
                    
                    {/* Descripción del repositorio */}
                    <p>{repo.description}</p>
                    
                    {/* Estadísticas del repositorio */}
                    <div className="repo-stats">
                        {/* Cantidad de estrellas (favoritos) */}
                        <span>Stars: {repo.stars} </span>
                        {/* Cantidad de veces que fue copiado (forked) */}
                        <span>Forks: {repo.forks_count} </span>
                        {/* Lenguaje principal del repositorio */}
                        <span>Language: {repo.language} </span>
                    </div>
                    
                    {/* 
                        Link que lleva al repositorio en GitHub
                        - href={repo.html_url}: la URL del repositorio
                        - target="_blank": abre en una pestaña nueva
                        - rel="noopener noreferrer": medida de seguridad para proteger la privacidad
                    */}
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                        Ver en Github
                    </a>
                </div>
            )}
        </section>
    );
}
export default Hero;