import { Schema,InferSchemaType,model, PaginateModel } from "mongoose";
import paginate from "mongoose-paginate-v2"
import { CategoryProps } from "../types/category.types.ts";

 const categorySchema = new Schema<CategoryProps>(
    {
        name: { type: String, required: true, unique: true },
        products: [{ type: Schema.Types.ObjectId, ref: "Product" }],

    },{
        timestamps: true
    }
);

type categoryCollectionType = InferSchemaType<typeof categorySchema>;
categorySchema.plugin(paginate);
const categoryCollection = model<categoryCollectionType,PaginateModel<categoryCollectionType>>("Category", categorySchema);
export default categoryCollection;


