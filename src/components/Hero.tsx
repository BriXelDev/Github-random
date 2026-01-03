import './styles/Hero.css'
import { useEffect, useState } from 'react';
import { searchRepositories, getRandomRepository, AVAILABLE_LANGUAGES, loadLanguages } from '../services/githubService';
import type { Repository } from '../services/githubService';

function Hero() {
    const [language, setLanguage] = useState('javascript');
    const [repo, setRepo] = useState<Repository | null>(null);
    const [loading, setLoading] = useState(false);
    const [languagesLoaded, setLanguagesLoaded] = useState(false);

    useEffect(() => {
        loadLanguages().then(() => setLanguagesLoaded(true));
    }, []);

    const handleSearch = async () => {
        setLoading(true);
        try{
            const repos = await searchRepositories(language);
            const random = getRandomRepository(repos);
            setRepo(random);
        } catch (error){
            console.error('Error: ', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="hero"> 
            <h1>Github Random</h1>
            <div className="search-container"> 
                <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    disabled={!languagesLoaded}
                >
                    {Object.entries(AVAILABLE_LANGUAGES).map(([key, value]) => (
                        <option key={key} value={key}>
                            {value}
                        </option>
                    ))}
                </select>
                <button onClick={handleSearch} disabled={loading || !languagesLoaded}>{loading ? 'Buscando...' : 'Buscar Repositorio Aleatorio'}</button>
            </div>

            {repo && (
                <div className="repo-card">
                    <h2>{repo.name}</h2>
                    <p>{repo.description}</p>
                    <div className="repo-stats">
                        <span>Stars: {repo.stars} </span>
                        <span>Forks: {repo.forks_count} </span>
                        <span>Language: {repo.language} </span>
                    </div>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">Ver en Github
                    </a>
                </div>
            )}
        </section>
    );
}

export default Hero;