import { useState } from 'react';
import { SUBSCRIPTION_PLANS } from '../constants/subscriptions';
import SubscriptionCard from './SubscriptionCard';

interface SubscriptionSelectorProps {
  onSelect: (type: keyof typeof SUBSCRIPTION_PLANS) => void;
  initialType?: keyof typeof SUBSCRIPTION_PLANS;
}

export default function SubscriptionSelector({ onSelect, initialType = 'free' }: SubscriptionSelectorProps) {
  const [selectedType, setSelectedType] = useState<keyof typeof SUBSCRIPTION_PLANS>(initialType);

  const handleSelect = (type: keyof typeof SUBSCRIPTION_PLANS) => {
    setSelectedType(type);
    onSelect(type);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {(Object.keys(SUBSCRIPTION_PLANS) as Array<keyof typeof SUBSCRIPTION_PLANS>).map((type) => (
        <SubscriptionCard
          key={type}
          type={type}
          selected={selectedType === type}
          onSelect={() => handleSelect(type)}
        />
      ))}
    </div>
  );
}