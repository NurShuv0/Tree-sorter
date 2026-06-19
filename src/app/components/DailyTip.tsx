import { Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { gardenTips } from '../../data/plants';

export function DailyTip() {
  // Get a random tip based on the current day
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const tip = gardenTips[dayOfYear % gardenTips.length];

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <div className="p-2 bg-primary rounded-full">
            <Lightbulb className="size-4 text-primary-foreground" />
          </div>
          Daily Gardening Tip
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground">{tip}</p>
      </CardContent>
    </Card>
  );
}
