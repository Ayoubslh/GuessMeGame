import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function CategorySelect({ selectedCategory, setSelectedCategory }) {
  return (
    <Select onValueChange={setSelectedCategory}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Category</SelectLabel>
          <SelectItem value="footballers">Football</SelectItem>
          <SelectItem value="others">Other</SelectItem>
          <SelectItem value="gamechar">Game characters</SelectItem>
          <SelectItem value="animechar">Anime characters</SelectItem>
          <SelectItem value="cars">Cars</SelectItem>
          
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
