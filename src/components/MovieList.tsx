import { Button } from "@/components/ui/button";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
} from "@/components/ui/table";
import { CardContent, Card } from "@/components/ui/card";
import MovieRow from "./MovieRow";

const movies = [
  {
    title: "The Shawshank Redemption",
    actors: "Tim Robbins, Morgan Freeman",
    year: 1994,
  },
  { title: "The Godfather", actors: "Marlon Brando, Al Pacino", year: 1972 },
  { title: "Pulp Fiction", actors: "John Travolta, Uma Thurman", year: 1994 },
  {
    title: "The Dark Knight",
    actors: "Christian Bale, Heath Ledger",
    year: 2008,
  },
];

const MovieList = () => {
  return (
    <div className="flex  items-start py-4  lg:py-10">
      <div className="w-full grid max-w-4xl gap-4 px-4 mx-auto lg:px-6">
        <div className="flex items-center gap-4">
          <h1 className="flex-1 font-semibold text-xl">Movies</h1>
          <Button
            size="sm"
            className="bg-green-500 text-white hover:bg-green-400"
          >
            Add movie
          </Button>
        </div>
        <div className="grid gap-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Actors</TableHead>
                    <TableHead className="w-24">Year</TableHead>
                    <TableHead className="w-12" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {movies.map((movie, index) => (
                    <MovieRow key={index} movie={movie} />
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
