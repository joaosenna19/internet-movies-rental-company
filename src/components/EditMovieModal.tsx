"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const EditMovieModal = () => {
  const searchParams = useSearchParams();
  const modal = searchParams.get("editmodal");

  return (
    <>
      {modal && (
        <div className="fixed left-0 top-0 w-full h-full bg-white bg-opacity-85 z-50 overflow-auto backdrop-blur flex justify-center items-center ">
          <div className="p-4 w-full max-w-md space-y-4 shadow">
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-bold">Edit a Movie</h2>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">Title</Label>
                  <Input id="first-name" placeholder="Movie's title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Actors</Label>
                  <Input
                    id="last-name"
                    placeholder="List of actors separated by comma"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Year</Label>
                <Input id="phone" placeholder="Year of release" type="tel" />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Link href="/">
                <Button variant="destructive">Cancel</Button>
              </Link>
              <Button className="bg-green-500 hover:bg-green-600">Save</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditMovieModal;
