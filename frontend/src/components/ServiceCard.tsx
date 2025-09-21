import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Clock, DollarSign } from 'lucide-react';

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  price: string;
  rating: number;
  reviewCount: number;
  duration: string;
  category: string;
  image?: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  price,
  rating,
  reviewCount,
  duration,
  category,
  icon: Icon,
}) => {
  return (
    <Card className="group hover-lift bg-card shadow-custom-md hover:shadow-custom-lg transition-all cursor-pointer animate-scale-in">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <Badge variant="secondary" className="mb-2">
                {category}
              </Badge>
              <CardTitle className="text-lg leading-none">{title}</CardTitle>
            </div>
          </div>
        </div>
        <CardDescription className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Metrics */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1 text-amber-500">
              <Star className="h-4 w-4 fill-current" />
              <span className="font-medium">{rating}</span>
              <span className="text-muted-foreground">({reviewCount})</span>
            </div>
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>
          </div>

          {/* Price and Action */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <DollarSign className="h-4 w-4 text-success" />
              <span className="text-lg font-semibold text-success">{price}</span>
              <span className="text-sm text-muted-foreground">starting</span>
            </div>
            <Button size="sm" className="bg-gradient-primary hover:bg-gradient-primary hover:opacity-90 shadow-glow">
              Book Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;