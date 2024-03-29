import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    const movies = await prisma.movie.findMany();
    console.log(movies);
    return Response.json(movies);
    
}

export async function POST(req: NextRequest) {
    try{
    const { title, actors, year } = await req.json();
    const newMovie = await prisma.movie.create({
        data: {
            title,
            actors,
            year,
        },
    });
    return Response.json(newMovie); } catch (error) {   
        return Response.json({ error: error.message });
}
}
