import { useState } from 'react';
import { Tabs } from '../../../components/ui/Tabs';
import CategoryManager from '../../../components/Dashboard/ContentManager/CategoryManager';
import PageManager from '../../../components/Dashboard/ContentManager/PageManager';
import BannerManager from '../../../components/Dashboard/ContentManager/BannerManager';
import EmailTemplateManager from '../../../components/Dashboard/ContentManager/EmailTemplateManager';

export default function AdminContent() {
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
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Gestion du contenu</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gérez le contenu du site
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
}