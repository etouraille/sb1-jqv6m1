import { useState } from 'react';
import { Tabs } from '../ui/Tabs';
import CategoryManager from './ContentManager/CategoryManager';
import PageManager from './ContentManager/PageManager';
import BannerManager from './ContentManager/BannerManager';
import EmailTemplateManager from './ContentManager/EmailTemplateManager';

export default function ContentManager() {
  const tabs = [
    {
      label: 'Catégories',
      content: <CategoryManager />
    },
    {
      label: 'Pages',
      content: <PageManager />
    },
    {
      label: 'Bannières',
      content: <BannerManager />
    },
    {
      label: 'Templates Email',
      content: <EmailTemplateManager />
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Gestion du contenu</h2>
      <Tabs tabs={tabs} />
    </div>
  );
}