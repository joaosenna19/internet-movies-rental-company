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

const AddMovieModal = () => {
  const searchParams = useSearchParams();
  const modal = searchParams.get("addmodal");

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
  });

  const onSubmit: SubmitHandler<movieSchema> = (data) => {
    form.clearErrors();
    console.log(data);
  };

  return (
    <>
      {modal && (
        <div className="fixed left-0 top-0 w-full h-full bg-white bg-opacity-85 z-50 overflow-auto backdrop-blur flex justify-center items-center ">
          <div className="p-4 w-full max-w-md space-y-4 shadow">
            <Form {...form}>
              <div className="space-y-2 text-center">
                <h2 className="text-2xl font-bold">Add a Movie</h2>
              </div>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="grid grid-cols-2 gap-4">
                  <FormItem>
                    <div className="space-y-2">
                      <Label htmlFor="first-name">Title</Label>

                      <Input
                        {...form.register("title")}
                        placeholder="Movie's title"
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
                      <Label htmlFor="actors">Actors</Label>

                      <Input
                        {...form.register("actors")}
                        placeholder="Actors separted by comma"
                      />
                      {form.formState.errors.actors && (
                        <p className="text-red-500 text-xs">
                          {form.formState.errors.actors.message}
                        </p>
                      )}
                    </div>
                  </FormItem>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
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
                <div className="flex justify-end space-x-2">
                  <Link href="/">
                    <Button
                      variant="destructive"
                      onClick={() => form.clearErrors()}
                    >
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600"
                  >
                    Add
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddMovieModal;
