"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams,  } from "next/navigation";
import { useRouter } from "next/navigation";
const DeleteMovieModal = () => {
  const searchParams = useSearchParams();
  const modal = searchParams.get("deletemodal");
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/movies?id=${searchParams.get("id")}`, {
        method: "DELETE",
      });
      console.log(response);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      {modal && (
        <div className="fixed left-0 top-0 w-full h-full bg-white bg-opacity-85 z-50 overflow-auto backdrop-blur flex justify-center items-center ">
          <div className="p-4 w-full max-w-md space-y-4 shadow">
            <div className="flex justify-end space-x-2">
              <p>Are you sure you want to delete it?</p>
              <Link href="/">
                <Button variant="destructive">Cancel</Button>
              </Link>
              <Button variant="outline" onClick={handleDelete}>Delete</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteMovieModal;
