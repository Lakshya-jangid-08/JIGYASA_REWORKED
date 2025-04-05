import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Download } from 'lucide-react';

const SurveyResponses = () => {
  const { id } = useParams();
  const [survey, setSurvey] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSurveyAndResponses();
  }, [id]);

  const fetchSurveyAndResponses = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('No authentication token found');
        setLoading(false);
        return;
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      // Fetch survey details
      const surveyResponse = await axios.get(`/api/surveys/${id}/`, { headers });
      setSurvey(surveyResponse.data);

      // Fetch survey responses
      const responsesResponse = await axios.get(`/api/survey-responses/?survey=${id}`, { headers });
      setResponses(responsesResponse.data);
    } catch (error) {
      console.error('Error fetching survey responses:', error);
      setError(error.response?.data?.detail || 'Failed to load survey responses');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const exportToCSV = () => {
    if (!survey || !responses.length) return;

    // Create CSV header
    const headers = ['Response ID', 'Submitted At', 'Respondent'];
    const questionHeaders = survey.questions.map(q => q.text);
    const csvHeaders = [...headers, ...questionHeaders].join(',');
    
    // Create CSV rows
    const csvRows = responses.map(response => {
      const baseData = [
        response.id,
        formatDate(response.submitted_at),
        response.respondent ? response.respondent.email : 'Anonymous'
      ];
      
      // Map answers to questions
      const answerData = survey.questions.map(question => {
        const answer = response.answers.find(a => a.question === question.id);
        if (!answer) return '';
        
        if (answer.text_answer) {
          return `"${answer.text_answer.replace(/"/g, '""')}"`;
        } else if (answer.selected_choices && answer.selected_choices.length) {
          const choiceTexts = answer.selected_choices.map(choiceId => {
            const choice = question.choices.find(c => c.id === choiceId);
            return choice ? choice.text : '';
          }).filter(Boolean);
          return `"${choiceTexts.join('; ')}"`;
        }
        return '';
      });
      
      return [...baseData, ...answerData].join(',');
    });
    
    // Combine header and rows
    const csvContent = [csvHeaders, ...csvRows].join('\n');
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${survey.title.replace(/\s+/g, '_')}_responses.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="text-gray-500">Loading responses...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="text-red-700">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <Link
            to={`/dashboard/surveys/${id}`}
            className="inline-flex items-center text-indigo-600 hover:text-indigo-900"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Survey
          </Link>
          {responses.length > 0 && (
            <button
              onClick={exportToCSV}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Download className="h-4 w-4 mr-1" />
              Export to CSV
            </button>
          )}
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {survey.title} - Responses
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {responses.length} {responses.length === 1 ? 'response' : 'responses'} received
            </p>
          </div>
        </div>

        {responses.length === 0 ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <p className="text-gray-500 text-center">No responses yet for this survey.</p>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <ul className="divide-y divide-gray-200">
              {responses.map((response) => (
                <li key={response.id} className="px-4 py-5 sm:px-6">
                  <div className="mb-4">
                    <div className="flex justify-between">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Response ID: </span>
                        <span className="text-sm text-gray-900">{response.id}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Submitted: </span>
                        <span className="text-sm text-gray-900">{formatDate(response.submitted_at)}</span>
                      </div>
                    </div>
                    {response.respondent && (
                      <div className="mt-1">
                        <span className="text-sm font-medium text-gray-500">Respondent: </span>
                        <span className="text-sm text-gray-900">{response.respondent.email}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 space-y-4">
                    {survey.questions.map((question) => {
                      const answer = response.answers.find(a => a.question === question.id);
                      return (
                        <div key={question.id} className="border-t border-gray-100 pt-4">
                          <h4 className="text-sm font-medium text-gray-900">{question.text}</h4>
                          <div className="mt-1 text-sm text-gray-500">
                            {answer ? (
                              answer.text_answer ? (
                                <p>{answer.text_answer}</p>
                              ) : answer.selected_choices && answer.selected_choices.length > 0 ? (
                                <ul className="list-disc list-inside">
                                  {answer.selected_choices.map((choiceId) => {
                                    const choice = question.choices.find(c => c.id === choiceId);
                                    return choice ? <li key={choiceId}>{choice.text}</li> : null;
                                  })}
                                </ul>
                              ) : (
                                <p>No answer provided</p>
                              )
                            ) : (
                              <p>No answer provided</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SurveyResponses; 