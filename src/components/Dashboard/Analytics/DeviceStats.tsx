import { useState } from 'react';
import { Smartphone, Monitor, Tablet } from 'lucide-react';

interface DeviceData {
  mobile: number;
  desktop: number;
  tablet: number;
}

interface DeviceStatsProps {
  data: DeviceData;
}

export default function DeviceStats({ data }: DeviceStatsProps) {
  const total = data.mobile + data.desktop + data.tablet;
  
  const devices = [
    { 
      name: 'Mobile',
      value: data.mobile,
      percentage: Math.round((data.mobile / total) * 100),
      icon: Smartphone
    },
    {
      name: 'Desktop',
      value: data.desktop,
      percentage: Math.round((data.desktop / total) * 100),
      icon: Monitor
    },
    {
      name: 'Tablet',
      value: data.tablet,
      percentage: Math.round((data.tablet / total) * 100),
      icon: Tablet
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Appareils utilisés</h3>

      <div className="space-y-6">
        {devices.map((device) => (
          <div key={device.name} className="flex items-center">
            <device.icon className="w-5 h-5 text-gray-400 mr-3" />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-medium text-gray-900">{device.name}</p>
                <p className="text-sm text-gray-500">{device.percentage}%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-600 h-2 rounded-full"
                  style={{ width: `${device.percentage}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}