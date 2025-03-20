
import { ReactNode } from "react";
import { NeumorphCard } from "./NeumorphCard";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <NeumorphCard className="h-full flex flex-col items-start p-6 hover:translate-y-[-5px]">
      <div className="p-3 neumorph rounded-full bg-primary/10 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </NeumorphCard>
  );
};

export default FeatureCard;
