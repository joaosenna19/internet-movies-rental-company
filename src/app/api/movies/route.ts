import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    const movies = await prisma.movie.findMany();
    console.log(movies);
    return Response.json(movies);
    
}

export async function POST(req: NextRequest) {
    try {
        const { title, actors, year } = await req.json();
        const newMovie = await prisma.movie.create({
            data: {
                title,
                actors,
                year,
            },
        });
        return Response.json(newMovie);
    } catch (error: any) {
        return Response.json({ error: error.message });
    }
}

export async function DELETE(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("id");
    const movie = await prisma.movie.delete({
        where: {
            id: query ?? undefined,
        },
    });
    return Response.json(movie);
}

export async function PUT(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("id");
    const { title, actors, year } = await req.json();
    const movie = await prisma.movie.update({
        where: {
            id: query ?? undefined,
        },
        data: {
            title,
            actors,
            year,
        },
    });
    return Response.json(movie);
}
