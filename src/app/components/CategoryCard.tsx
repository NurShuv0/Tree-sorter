import { Link } from 'react-router';
import { Card, CardContent } from './ui/card';
import { motion } from 'motion/react';

interface CategoryCardProps {
  title: string;
  emoji: string;
  count: number;
  category: string;
}

export function CategoryCard({ title, emoji, count, category }: CategoryCardProps) {
  return (
    <Link to={`/plants?category=${category}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <Card className="border-2 hover:border-primary transition-all cursor-pointer bg-gradient-to-br from-card to-muted/30">
          <CardContent className="p-6 text-center">
            <div className="text-5xl mb-3">{emoji}</div>
            <h3 className="font-semibold text-lg mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{count} plants</p>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
