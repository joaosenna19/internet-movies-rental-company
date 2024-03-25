import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import Link from "next/link";
const MovieRow = (props) => {
  const { title, actors, year } = props.movie;

  return (
    <TableRow>
      <TableCell className="font-medium">{title}</TableCell>
      <TableCell>{actors}</TableCell>
      <TableCell>{year}</TableCell>
      <TableCell className="text-right">
        <div className="flex gap-2">
          <Link href={`/?editmodal=true`}>
            <Button size="icon" className="px-6" variant="outline">
              Edit
            </Button>
          </Link>
          <Link href={`/?deletemodal=true`}>
            <Button size="icon" className="px-6" variant="destructive">
              Delete
            </Button>
          </Link>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default MovieRow;
