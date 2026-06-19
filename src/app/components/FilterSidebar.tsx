import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterSidebarProps {
  filters: {
    categories: string[];
    waterRequirements: string[];
    sunlightLevels: string[];
    soilTypes: string[];
    difficulties: string[];
  };
  onFilterChange: (filterType: string, value: string) => void;
}

const categoryOptions: FilterOption[] = [
  { label: 'Fruits', value: 'Fruits' },
  { label: 'Vegetables', value: 'Vegetables' },
  { label: 'Flowers', value: 'Flowers' },
  { label: 'Herbs', value: 'Herbs' },
  { label: 'Indoor', value: 'Indoor' },
  { label: 'Outdoor', value: 'Outdoor' },
];

const waterOptions: FilterOption[] = [
  { label: 'Low', value: 'Low' },
  { label: 'Medium', value: 'Medium' },
  { label: 'High', value: 'High' },
];

const sunlightOptions: FilterOption[] = [
  { label: 'Full Sun', value: 'Full Sun' },
  { label: 'Partial Sun', value: 'Partial Sun' },
  { label: 'Shade', value: 'Shade' },
];

const soilOptions: FilterOption[] = [
  { label: 'Loamy', value: 'Loamy' },
  { label: 'Sandy', value: 'Sandy' },
  { label: 'Clay', value: 'Clay' },
  { label: 'Well-drained', value: 'Well-drained' },
];

const difficultyOptions: FilterOption[] = [
  { label: 'Easy', value: 'Easy' },
  { label: 'Medium', value: 'Medium' },
  { label: 'Advanced', value: 'Advanced' },
];

export function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle className="text-lg">Filters</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <div className="px-6 pb-6 space-y-6">
            {/* Categories */}
            <div>
              <h3 className="font-semibold mb-3 text-sm">Category</h3>
              <div className="space-y-2">
                {categoryOptions.map((option) => (
                  <div key={option.value} className="flex items-center gap-2">
                    <Checkbox
                      id={`cat-${option.value}`}
                      checked={filters.categories.includes(option.value)}
                      onCheckedChange={() => onFilterChange('categories', option.value)}
                    />
                    <Label
                      htmlFor={`cat-${option.value}`}
                      className="text-sm cursor-pointer"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Water Requirement */}
            <div>
              <h3 className="font-semibold mb-3 text-sm">Water Requirement</h3>
              <div className="space-y-2">
                {waterOptions.map((option) => (
                  <div key={option.value} className="flex items-center gap-2">
                    <Checkbox
                      id={`water-${option.value}`}
                      checked={filters.waterRequirements.includes(option.value)}
                      onCheckedChange={() => onFilterChange('waterRequirements', option.value)}
                    />
                    <Label
                      htmlFor={`water-${option.value}`}
                      className="text-sm cursor-pointer"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Sunlight Level */}
            <div>
              <h3 className="font-semibold mb-3 text-sm">Sunlight Level</h3>
              <div className="space-y-2">
                {sunlightOptions.map((option) => (
                  <div key={option.value} className="flex items-center gap-2">
                    <Checkbox
                      id={`sun-${option.value}`}
                      checked={filters.sunlightLevels.includes(option.value)}
                      onCheckedChange={() => onFilterChange('sunlightLevels', option.value)}
                    />
                    <Label
                      htmlFor={`sun-${option.value}`}
                      className="text-sm cursor-pointer"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Soil Type */}
            <div>
              <h3 className="font-semibold mb-3 text-sm">Soil Type</h3>
              <div className="space-y-2">
                {soilOptions.map((option) => (
                  <div key={option.value} className="flex items-center gap-2">
                    <Checkbox
                      id={`soil-${option.value}`}
                      checked={filters.soilTypes.includes(option.value)}
                      onCheckedChange={() => onFilterChange('soilTypes', option.value)}
                    />
                    <Label
                      htmlFor={`soil-${option.value}`}
                      className="text-sm cursor-pointer"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Difficulty */}
            <div>
              <h3 className="font-semibold mb-3 text-sm">Care Difficulty</h3>
              <div className="space-y-2">
                {difficultyOptions.map((option) => (
                  <div key={option.value} className="flex items-center gap-2">
                    <Checkbox
                      id={`diff-${option.value}`}
                      checked={filters.difficulties.includes(option.value)}
                      onCheckedChange={() => onFilterChange('difficulties', option.value)}
                    />
                    <Label
                      htmlFor={`diff-${option.value}`}
                      className="text-sm cursor-pointer"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
