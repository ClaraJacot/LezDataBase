import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <div>
            <nav className="flex justify-between items-center mb-6">
                <NavLink to="/">
                    <img alt="Logo" className="h-10 inline" src="./images/dna6.png"></img>
                </NavLink>
                <h1 className="text-2xl font-bold tracking-wide underline decoration-4 decoration-purple-500">LezMoviesDatabase</h1>
                <NavLink className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-fuchsia-400 h-9 rounded-md px-3" 
                        to="/create">
                Add Movie
                </NavLink>
            </nav>
        </div>
    );
}