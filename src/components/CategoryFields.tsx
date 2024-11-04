import { CategoryField } from '../constants/categories';
import { cn } from '../utils/cn';

interface CategoryFieldsProps {
  fields: CategoryField[];
  values: Record<string, any>;
  onChange: (name: string, value: any) => void;
}

export default function CategoryFields({ fields, values, onChange }: CategoryFieldsProps) {
  return (
    <div className="space-y-6">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>

          {field.type === 'text' && (
            <input
              type="text"
              value={values[field.name] || ''}
              onChange={(e) => onChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              className={cn(
                "mt-1 block w-full rounded-lg",
                "border-gray-300 shadow-sm",
                "focus:ring-red-500 focus:border-red-500"
              )}
              required={field.required}
            />
          )}

          {field.type === 'number' && (
            <div className="mt-1 relative rounded-lg shadow-sm">
              <input
                type="number"
                value={values[field.name] || ''}
                onChange={(e) => onChange(field.name, e.target.value)}
                className={cn(
                  "block w-full rounded-lg",
                  "border-gray-300 shadow-sm",
                  "focus:ring-red-500 focus:border-red-500",
                  field.unit && "pr-12"
                )}
                required={field.required}
              />
              {field.unit && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">{field.unit}</span>
                </div>
              )}
            </div>
          )}

          {field.type === 'select' && field.options && (
            <select
              value={values[field.name] || ''}
              onChange={(e) => onChange(field.name, e.target.value)}
              className={cn(
                "mt-1 block w-full rounded-lg",
                "border-gray-300 shadow-sm",
                "focus:ring-red-500 focus:border-red-500"
              )}
              required={field.required}
            >
              <option value="">Sélectionner...</option>
              {field.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}

          {field.type === 'boolean' && (
            <div className="mt-1">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={values[field.name] || false}
                  onChange={(e) => onChange(field.name, e.target.checked)}
                  className="rounded border-gray-300 text-red-600 shadow-sm focus:ring-red-500"
                />
                <span className="ml-2 text-sm text-gray-600">Oui</span>
              </label>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}