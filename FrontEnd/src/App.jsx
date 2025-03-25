import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import SurveyList from './pages/surveys/SurveyList';
import SurveyBuilder from './pages/surveys/SurveyBuilder';
import SurveyResponse from './pages/surveys/SurveyResponse';
import Analytics from './pages/Analytics';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="surveys" element={<SurveyList />} />
          <Route path="surveys/new" element={<SurveyBuilder />} />
          <Route path="surveys/:id" element={<SurveyResponse />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;