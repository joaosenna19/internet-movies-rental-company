'use client';
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
import Link from "next/link";
import { useEffect, useState } from "react";
import {  useSearchParams } from "next/navigation";


const MovieList = () => {

  const params = useSearchParams();
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    fetch("/api/movies").then((response) => response.json()).then((data) => setMovies(data))};

  useEffect(() => {
    fetchMovies();

  }, []);

  useEffect(() => {
    if(!params.get("addmodal") && !params.get("editmodal") && !params.get("deletemodal"))
    fetchMovies();
  }, [params]);

  return (
    <div className="flex items-start ">
      <div className="w-full grid gap-4 px-4 mx-auto ">
        <div className="flex  gap-4">
          <h1 className="flex-1 font-semibold text-xl">Movies</h1>
          <Link href="/?addmodal=true">
            <Button
              size="sm"
              className="bg-green-500 text-white hover:bg-green-400"
            >
              Add movie
            </Button>
          </Link>
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
                    <MovieRow key={index} movie={movie}/>
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
