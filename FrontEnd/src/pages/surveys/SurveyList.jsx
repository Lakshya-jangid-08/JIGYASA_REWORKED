import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList, Users, Calendar, PlusCircle, Search, Filter } from 'lucide-react';

const SurveyList = () => {
  const surveys = [
    {
      id: '1',
      title: 'Customer Satisfaction Q1 2024',
      status: 'active',
      responses: 245,
      createdAt: '2024-01-01',
    },
    {
      id: '2',
      title: 'Employee Engagement Survey',
      status: 'draft',
      responses: 0,
      createdAt: '2024-02-15',
    },
    {
      id: '3',
      title: 'Product Feedback',
      status: 'closed',
      responses: 532,
      createdAt: '2024-01-20',
    },
  ];

  return (
    <div className="p-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Surveys</h1>
        <Link
          to="/surveys/create"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Survey
        </Link>
      </div>
      <div className="mt-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            <li className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">No surveys yet</h3>
                  <p className="mt-1 text-sm text-gray-500">Create your first survey to get started</p>
                </div>
                <Link
                  to="/surveys/create"
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Create Survey
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SurveyList;