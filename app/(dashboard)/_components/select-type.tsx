import {
   SelectItem,
   SelectContent
} from "@/components/ui/select";

export const SelectType = () => {
   const categories = ["Public", "Invite Only"]

   return (
      <SelectContent>
         {categories.map((category) => (
            <SelectItem value={category.toLowerCase()} key={category}>
               {category}
            </SelectItem>
         ))}
      </SelectContent>
   )
};