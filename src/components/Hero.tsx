import './styles/Hero.css'
import { useState } from 'react';
import { searchRepositories, getRandomRepository } from '../services/githubService';
import type { Repository } from '../services/githubService';

function Hero() {
    const [language, setLanguage] = useState('javascript');
    const [repo, setRepo] = useState<Repository | null>(null);
    const [loading, setLoading] = useState(false);

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
                <input 
                    type="text"
                    placeholder="Lenguaje de programación (ej: javascript, python, rust)"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                />
                <button onClick={handleSearch} disabled={loading}>{loading ? 'Buscando...' : 'Buscar Repositorio Aleatorio'}</button>
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