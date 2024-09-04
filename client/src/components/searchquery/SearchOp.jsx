import { useState } from "react";
import { getSearchQuery } from "./searchApi";
import { Link } from "react-router-dom";

export default function SearchOp() {
    const truncateTitle = (title, wordsLimit) => {
        const words = title.split(' ');
        return words.length > wordsLimit ? words.slice(0, wordsLimit).join(' ') + '...' : title;
    };

    const [key, setKey] = useState('');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const searchSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await getSearchQuery(key);
            const info = await response.data.data.organic_results;
            setData(info);
        } catch (error) {
            console.error("Error fetching search results:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-gray-100">
            {/* Background Image */}
            <div 
                style={{ 
                    backgroundImage: "url('https://img.freepik.com/free-vector/vintage-science-education-background_23-2148483429.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1722211200&semt=ais_user')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                }} 
                className="absolute inset-0 z-0 opacity-50"
            ></div>

            <div className="relative p-4">
                <div className="z-10 flex items-center max-w-md p-4 mx-auto mb-6 bg-white rounded-md shadow-md">
                    <form onSubmit={searchSubmit} className="flex flex-grow">
                        <input
                            type='text'
                            placeholder='Search a Product...'
                            onChange={(e) => setKey(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-l-md"
                        />
                        <button 
                            type='submit' 
                            className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-r-md hover:bg-blue-700"
                        >
                            Search
                        </button>
                    </form>
                    <Link 
                        to={'/dashboard'} 
                        className="px-4 py-2 ml-4 text-white transition-colors bg-gray-800 rounded-md hover:bg-gray-900"
                    >
                        Dashboard
                    </Link>
                </div>

                {loading && (
                    <div className="z-10 flex items-center justify-center mt-8">
                        <div className="w-8 h-8 border-4 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
                        <span className="ml-3 text-gray-600">Loading...</span>
                    </div>
                )}

                {!loading && data && (
                    <div className="z-10 max-w-4xl mx-auto mt-6">
                        {data.map((info, index) => (
                            <div key={index} className="p-4 mb-6 bg-white rounded-md shadow-md">
                                <h2 className="mb-2 text-xl font-bold">{truncateTitle(info.title, 5)}</h2>
                                <p className="mb-3 text-gray-700">{info.snippet}</p>
                                <a 
                                    className="text-blue-600 underline transition-colors hover:text-blue-800" 
                                    href={info.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    Read more
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
