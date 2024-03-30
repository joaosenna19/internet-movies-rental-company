"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormItem } from "@/components/ui/form";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const EditMovieModal = () => {
  const searchParams = useSearchParams();
  const modal = searchParams.get("editmodal");
  const id = searchParams.get("id");
  const title = searchParams.get("title") ?? undefined;
  const actors = searchParams.get("actors") ?? "";
  const year = searchParams.get("year") ?? 1;

  // const actors = actorsString ? actorsString.split(",") : undefined;
  // const year = yearString ? parseInt(yearString) : undefined;

  const movieSchema = z
    .object({
      title: z.string().min(1, { message: "Title is required" }),
      actors: z.string().min(1, { message: "At least one actor is required" }),
      year: z.coerce
        .number()
        .min(1900, { message: "Year must be after 1900" })
        .max(2024, { message: "Year must be before 2024" }),
    })
    .transform((data) => ({
      ...data,
      actors: data.actors.split(",").map((actor) => actor.trim()),
    }));

  type movieSchema = z.infer<typeof movieSchema>;

  const form = useForm<movieSchema>({
    resolver: zodResolver(movieSchema),
    defaultValues: {
      title: title,
      actors: actors,
      year: year,
    },
  });

  const { toast } = useToast();

  const onSubmit: SubmitHandler<movieSchema> = (data) => {
    form.clearErrors();
    try {
      fetch(`/api/movies?id=${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }).then((response) => response.json());
      toast({
        title: "Movie updated",
        description: "The movie was updated successfully",
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    form.reset({ title, actors, year });
  }, [title, actors, year]);

  return (
    <>
      {modal && (
        <div className="fixed left-0 top-0 w-full h-full bg-white bg-opacity-85 z-50 overflow-auto backdrop-blur flex justify-center items-center ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-4 w-full max-w-md space-y-4 shadow"
            >
              <div className="space-y-2 text-center">
                <h2 className="text-2xl font-bold">Edit a Movie</h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormItem>
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        placeholder="Movie's title"
                        {...form.register("title")}
                      />
                      {form.formState.errors.title && (
                        <p className="text-red-500 text-xs">
                          {form.formState.errors.title.message}
                        </p>
                      )}
                    </div>
                  </FormItem>
                  <FormItem>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Actors</Label>
                      <Input
                        placeholder="List of actors separated by comma"
                        {...form.register("actors")}
                      />
                      {form.formState.errors.actors && (
                        <p className="text-red-500 text-xs">
                          {form.formState.errors.actors.message}
                        </p>
                      )}
                    </div>
                  </FormItem>
                </div>
                <FormItem>
                  <div className="space-y-2">
                    <Label>Year</Label>
                    <Input
                      placeholder="Year of release"
                      
                      {...form.register("year")}
                    />
                    {form.formState.errors.year && (
                    <p className="text-red-500 text-xs">
                      {form.formState.errors.year.message}
                    </p>
                  )}
                  </div>
                </FormItem>
              </div>
              <div className="flex justify-end space-x-2">
                <Link href="/">
                  <Button variant="destructive" onClick={() => form.reset}>
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600"
                >
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </>
  );
};

export default EditMovieModal;
