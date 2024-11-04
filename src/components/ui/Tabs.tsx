import { Tab } from '@headlessui/react';
import { cn } from '@/utils/cn';

interface TabsProps {
  tabs: {
    label: string;
    content: React.ReactNode;
  }[];
  className?: string;
}

export function Tabs({ tabs, className }: TabsProps) {
  return (
    <Tab.Group>
      <Tab.List className="flex space-x-1 rounded-lg bg-gray-100 p-1">
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            className={({ selected }) =>
              cn(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white shadow text-red-600'
                  : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-800'
              )
            }
          >
            {tab.label}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className={cn("mt-4", className)}>
        {tabs.map((tab, index) => (
          <Tab.Panel
            key={index}
            className={cn(
              'rounded-lg bg-white p-3',
              'ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2'
            )}
          >
            {tab.content}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}