import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
const MovieRow = (props) => {
  const { title, actors, year } = props.movie;

  return (
    <TableRow>
      <TableCell className="font-medium">{title}</TableCell>
      <TableCell>{actors}</TableCell>
      <TableCell>{year}</TableCell>
      <TableCell className="text-right">
        <div className="flex gap-2">
          <Button size="icon" className="px-6" variant="outline">
            Edit
          </Button>
          <Button size="icon" className="px-6" variant="destructive">
            Delete
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default MovieRow;
