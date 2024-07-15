import {
   SelectItem,
   SelectContent
} from "@/components/ui/select";

export const SelectCategories = ({
   all,
}: { all: boolean }) => {
   let categories;
   if (all) {
      categories = ["All", "Conference", "Workshop", "Webinar", "Concert", "Meetup", "Networking", "Seminar", "Party", "Festival", "Exhibition", "Competition", "Training", "Charity", "Sports"];
   } else {
      categories = ["Conference", "Workshop", "Webinar", "Concert", "Meetup", "Networking", "Seminar", "Party", "Festival", "Exhibition", "Competition", "Training", "Charity", "Sports"];
   };

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