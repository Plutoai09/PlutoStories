import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play, Book, Youtube, Users, Briefcase, Heart, Sparkles } from 'lucide-react';

const OnboardingFlow = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showPersonaQuestions, setShowPersonaQuestions] = useState(false);


  useEffect(() => {
    const authCode = localStorage.getItem('authCode');
    const plutoemail = localStorage.getItem('plutoemail');
    
    if (authCode !== 'pluto_success' && !plutoemail) {
      navigate('/login');
    }
  }, []);


  const categories = [
    {
      id: 'conversation',
      title: 'Conversation',
      icon: Users,
      path: null,
      image: '/images/artof.png'
    },
    {
      id: 'sleep',
      title: 'Sleep',
      icon: Book,
      path: '/deepsleep',
      image: '/images/sleepstory.png'
    },
    {
      id: 'youtube',
      title: 'Youtube',
      icon: Youtube,
      path: '/youtube',
      image: '/images/ytsecret.png'
    }
  ];

  const personaOptions = [
    {
      id: 'jobs',
      title: 'I want to learn for Jobs interview',
      icon: Briefcase,
      category: 'Category 3'
    },
    {
      id: 'professional',
      title: 'I am a working professional looking to improve formal conversation',
      icon: Users,
      category: 'Category 4'
    },
    {
      id: 'personal',
      title: 'I want to improve my personal relationships',
      icon: Heart,
      category: 'Category 2'
    },
    {
      id: 'general',
      title: 'I want general self improvement of conversation skills',
      icon: Sparkles,
      category: 'Category 1'
    }
  ];

  const handleCategorySelect = (category) => {
    console.log("category HERE")
    localStorage.setItem('firstLoad', 'true');
    setSelectedCategory(category);
    if (category.path) {
      navigate(category.path);
    } else {
      setShowPersonaQuestions(true);
    }
  };

  const handlePersonaSelect = (persona) => {
    localStorage.setItem('persona', persona.category);
    navigate('/artofconversation');
  };

  return (
    <div className="h-[100vh] flex items-center justify-center bg-gradient-to-br from-gray-950 to-gray-900">
      <div className="w-full max-w-3xl p-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
        
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {showPersonaQuestions 
              ? "What describes you the best?"
              : "Choose your Category"
            }
          </h1>
          <p className="text-gray-400 text-sm">
            {showPersonaQuestions 
              ? "Select the option that best matches your goals"
              : "Select a category to begin your journey"
            }
          </p>
        </div>

        {/* Main Content */}
        <div className={`grid ${showPersonaQuestions ? 'grid-cols-1 gap-4' : 'grid-cols-3 gap-6'}`}>
          {showPersonaQuestions ? (
            // Persona Options
            personaOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handlePersonaSelect(option)}
                className="flex items-center p-6 bg-gray-800 rounded-xl border border-gray-700 hover:border-gray-600 hover:bg-gray-700 hover:shadow-lg hover:shadow-gray-900/50 transition-all group"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className="bg-gray-700 p-3 rounded-lg group-hover:bg-gray-600 transition-colors">
                    <option.icon className="w-6 h-6 text-gray-300" />
                  </div>
                  <span className="text-base font-medium text-gray-200 text-left">
                    {option.title}
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-300 transition-colors" />
              </button>
            ))
          ) : (
            // Category Cards
            categories.map((category) => (
              <div key={category.id} className="flex flex-col items-center space-y-3">
                <button
                  onClick={() => handleCategorySelect(category)}
                  className="group relative aspect-square w-full overflow-hidden rounded-xl bg-gray-800 border border-gray-700 hover:border-gray-600 shadow-md shadow-gray-900/50 hover:shadow-xl hover:shadow-gray-900/70 transition-all"
                >
                  <div className="relative h-full w-full">
                    <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-900">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105 opacity-90 group-hover:opacity-100"
                      />
                    </div>
                  </div>
                </button>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-300 text-xs">{category.title}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Back Button when showing persona questions */}
        {showPersonaQuestions && (
          <button
            onClick={() => setShowPersonaQuestions(false)}
            className="mx-auto mt-6 flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-gray-200 transition-colors"
          >
            ← Back to categories
          </button>
        )}
      </div>
    </div>
  );
};

export default OnboardingFlow;