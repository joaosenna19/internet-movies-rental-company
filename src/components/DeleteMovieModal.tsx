"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { Suspense } from "react";

const DeleteMovieModal = () => {
  const searchParams = useSearchParams();
  const modal = searchParams.get("deletemodal");
  const router = useRouter();
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      await fetch(`/api/movies?id=${searchParams.get("id")}`, {
        method: "DELETE",
      });
      toast({
        title: "Movie deleted",
        description: "The movie was deleted successfully",
      });
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Suspense>
      {modal && (
        <div className="fixed left-0 top-0 w-full h-full bg-white bg-opacity-85 z-50 overflow-auto backdrop-blur flex justify-center items-center ">
          <div className="p-4 w-full max-w-md space-y-4 shadow">
            <div className="flex justify-end space-x-2">
              <p>Are you sure you want to delete it?</p>
              <Link href="/">
                <Button variant="destructive">Cancel</Button>
              </Link>
              <Button variant="outline" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </Suspense>
  );
};

export default DeleteMovieModal;
