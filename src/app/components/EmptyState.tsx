import { Link } from 'react-router';
import { Button } from './ui/button';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionLink?: string;
}

export function EmptyState({
  icon = '🌱',
  title,
  description,
  actionLabel,
  actionLink,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-8xl mb-4">{icon}</div>
      <h3 className="text-2xl font-semibold mb-2 text-foreground">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
      {actionLabel && actionLink && (
        <Link to={actionLink}>
          <Button size="lg">{actionLabel}</Button>
        </Link>
      )}
    </div>
  );
}
