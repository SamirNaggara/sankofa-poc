import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Login from './components/Login'
import Onboarding from './components/creator/Onboarding'
import CreatorLayout from './components/creator/CreatorLayout'
import SurveyDetail from './components/creator/SurveyDetail'
import SurveyEditor from './components/creator/SurveyEditor'
import Results from './components/creator/Results'
import SurveyPreview from './components/survey/SurveyPreview'
import SurveyPublic from './components/survey/SurveyPublic'
import VoyageControl from './components/creator/VoyageControl/VoyageControl'
import TravelerDashboard from './components/traveler/TravelerDashboard'
import FloatingChat from './components/shared/FloatingChat'

export default function App() {
  const [currentView, setCurrentView] = useState('login')
  const [currentSurveyId, setCurrentSurveyId] = useState(null)
  const [currentVoyageId, setCurrentVoyageId] = useState(null)
  const [currentVoyageTab, setCurrentVoyageTab] = useState(null)

  useEffect(() => {
    const hash = window.location.hash
    const match = hash.match(/^#\/s\/(.+)$/)
    if (match) {
      const id = Number(match[1]) || match[1]
      setCurrentSurveyId(id)
      setCurrentView('survey-public')
    }
  }, [])

  useEffect(() => {
    history.replaceState({ view: currentView, surveyId: currentSurveyId }, '', '')

    function handlePopState(event) {
      if (event.state) {
        setCurrentView(event.state.view)
        setCurrentSurveyId(event.state.surveyId ?? null)
        setCurrentVoyageId(event.state.voyageId ?? null)
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function navigate(view, options = {}) {
    if (options.surveyId !== undefined) {
      setCurrentSurveyId(options.surveyId)
    }
    if (options.voyageId !== undefined) {
      setCurrentVoyageId(options.voyageId)
    }
    setCurrentVoyageTab(options.tab || null)
    setCurrentView(view)
    history.pushState({ view, surveyId: options.surveyId ?? currentSurveyId, voyageId: options.voyageId ?? currentVoyageId }, '', '')
  }

  const creatorViews = ['creator-dashboard', 'creator-onboarding', 'creator-editor', 'creator-results', 'survey-detail', 'survey-preview', 'organiser-voyage', 'mes-voyages', 'voyage-control']
  const userType = creatorViews.includes(currentView) ? 'creator' : 'traveler'

  const creatorHomeViews = ['creator-dashboard', 'organiser-voyage', 'mes-voyages']
  const isCreatorHome = creatorHomeViews.includes(currentView)
  const activeSection = currentView === 'organiser-voyage' ? 'organiser-voyage'
    : currentView === 'mes-voyages' ? 'mes-voyages'
    : 'sondages'

  return (
    <>
      <AnimatePresence mode="wait">
        {currentView === 'login' && <Login key="login" navigate={navigate} />}
        {currentView === 'creator-onboarding' && <Onboarding key="onboarding" navigate={navigate} />}
        {isCreatorHome && (
          <CreatorLayout key="creator-layout" navigate={navigate} activeSection={activeSection} />
        )}
        {currentView === 'survey-detail' && <SurveyDetail key="survey-detail" navigate={navigate} surveyId={currentSurveyId} />}
        {currentView === 'creator-editor' && <SurveyEditor key="editor" navigate={navigate} surveyId={currentSurveyId} />}
        {currentView === 'creator-results' && <Results key="results" navigate={navigate} surveyId={currentSurveyId} />}
        {currentView === 'survey-preview' && <SurveyPreview key="survey-preview" navigate={navigate} surveyId={currentSurveyId} />}
        {currentView === 'survey-public' && <SurveyPublic key="survey-public" surveyId={currentSurveyId} />}
        {currentView === 'voyage-control' && <VoyageControl key="voyage-control" navigate={navigate} voyageId={currentVoyageId} initialTab={currentVoyageTab} />}
        {currentView === 'traveler-dashboard' && <TravelerDashboard key="traveler" navigate={navigate} />}
      </AnimatePresence>
      <FloatingChat userType={userType} />
    </>
  )
}
