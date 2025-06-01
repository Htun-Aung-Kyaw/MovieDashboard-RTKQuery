import MovieUI from "@/app/components/movies/MovieUI";
import {Table} from "react-bootstrap";
import {Movie} from "@/lib/features/movies/movieApiSice";

export default function MoviesTable({ movies }: { movies: Movie[] }) {
    return (
        movies.length > 0 ?
            <Table hover className="align-middle position-relative">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Movie Title</th>
                    <th>Director</th>
                    <th>Year</th>
                    <th className={"text-center"}>Rating</th>
                    <th className="text-center">Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    movies.map((movie, index) => <MovieUI key={movie?._id} movie={movie} index={++index}/>)
                }
                </tbody>
            </Table> :
            <p className="no-results">No movies found.</p>
    )
}