import { Card, CardContent } from "../../components/ui/card";
import { Trash, Pencil } from "lucide-react";
import { Button } from "../../components/ui/button";

interface Category {
  _id: string;
  name: string;
  description?: string;
}

interface CategoryListProps {
  categories: Category[];
  onEdit?: (category: Category) => void;
  onDelete: (id: string) => void;
}

export default function CategoryList({ categories, onEdit, onDelete }: CategoryListProps) {
  if (categories.length === 0) {
    return (
      <Card>
        <CardContent className="p-4 text-center">
          <p className="text-muted-foreground mb-2">No categories found</p>
          <p className="text-sm text-gray-500">Try creating a new category</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li
              key={category._id}
              className="border rounded p-4 shadow-sm bg-muted/30 flex justify-between items-start"
            >
              <div>
                <strong>{category.name}</strong>
                <p className="text-sm text-muted-foreground">
                  Description: {category.description || "Sem descrição"}
                </p>
              </div>
              <div className="flex gap-2">
                {onEdit && (
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => onEdit(category)}
                    title="Editar categoria"
                  >
                    <Pencil size={16} />
                  </Button>
                )}
                <Button className="bg-red-700"
                  size="icon"
                  variant ="destructive"
                  onClick={() => onDelete(category._id)}
                  title="Eliminar categoria"
                >
                  <Trash size={16} />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
