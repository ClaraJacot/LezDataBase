import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Movie = (props) => (
    <tr className="border-b transition-colors hover:bg-purple-200 data-[state=selected]:bg-muted">
    <td className="p-4 align-middle font-semibold [&amp;:has([role=checkbox])]:pr-0">
      {props.movie.titre}
    </td>
    <td className="text-xs p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      {props.movie.resume}
    </td>
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      {props.movie.real}
    </td>
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      {props.movie.year}
    </td>
    <td className="p-4 align-middle hover:text-purple-500 [&amp;:has([role=checkbox])]:pr-0">
      <a href={props.movie.stream}>{props.movie.stream}</a>
    </td>
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
    <div className="flex gap-2">
        <Link
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-purple-300 h-9 rounded-md px-3"
          to={`/edit/${props.movie._id}`}
        >
          Modifier
        </Link>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-purple-800 hover:text-accent-foreground hover:text-slate-100 h-9 rounded-md px-3"
          color="red"
          type="button"
          onClick={() => {
            props.deleteMovie(props.movie._id);
          }}
        >
          Effacer
        </button>
    </div>
    </td>
</tr>
);

export default function MovieList() {
    const [movies, setMovies] = useState([]);

    useEffect(()=> {
        async function getMovies() {
            const response = await fetch(`http://localhost:5050/movie/`);
            if (!response.ok) {
                const message = `An error occured: ${response.statusText}`;
                console.error(message);
                return;
            }
            const movies = await response.json();
            setMovies(movies);
        }
        getMovies();
        return;
    }, [movies.length]);

      async function getSortedMoviesByYear() {
          const response = await fetch(`http://localhost:5050/movie/sortByYear`);
          if (!response.ok) {
              const message = `An error occured: ${response.statusText}`;
              console.error(message);
              return;
          }
          const movies = await response.json();
          setMovies(movies);
      }

      async function getSortedMoviesByDecreasingYear() {
        const response = await fetch(`http://localhost:5050/movie/sortByYearDec`);
        if (!response.ok) {
            const message = `An error occured: ${response.statusText}`;
            console.error(message);
            return;
        }
        const movies = await response.json();
        setMovies(movies);
    }

      async function getSortedMoviesByTitle() {
        const response = await fetch(`http://localhost:5050/movie/sortByTitle`);
        if (!response.ok) {
            const message = `An error occured: ${response.statusText}`;
            console.error(message);
            return;
        }
        const movies = await response.json();
        setMovies(movies);
    }
     

    async function deleteMovie(id) {
        await fetch(`http://localhost:5050/movie/${id}`, {
          method: "DELETE",
        });
        const newMovies = movies.filter((el) => el._id !== id);
        setMovies(newMovies);
      }
      //const sortByYear = () => {
      //  let mySort= {year: 1};
      //}
      function movieList() {
        return movies.map((movie) => {
          return (
            <Movie
              movie={movie}
              deleteMovie={() => deleteMovie(movie._id)}
              key={movie._id}
            />
          );
        });
      }

    return (
        <>
      
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&amp;_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted" >
                <th onClick={getSortedMoviesByTitle} className="h-12 px-4 text-left align-middle font-bold text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Title     
                  <button class="text-xs bg-pink-300 hover:bg-fuchsia-700 text-white font-light py-0.5 px-2 rounded">ordre alphabétique</button>
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Plot
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Director
                </th>
                <th  className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Year 
                  <button onClick={getSortedMoviesByDecreasingYear} class="text-xs bg-pink-300 hover:bg-fuchsia-700 text-white font-light py-0.5 px-1 rounded">v</button>
                  <button onClick={getSortedMoviesByYear} class="text-xs bg-pink-300 hover:bg-fuchsia-700 text-white font-light py-0.5 px-1 rounded">^</button>
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Link
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Action
                </th>
                </tr>
                </thead>
            <tbody className="[&amp;_tr:last-child]:border-0">
              {movieList()}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
    