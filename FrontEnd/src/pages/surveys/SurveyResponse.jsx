import React from 'react';
import { useParams } from 'react-router-dom';

const SurveyResponse = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Survey Response</h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Survey #{id}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              View and respond to the survey
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <p className="text-gray-500">Survey response form will be implemented here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyResponse;