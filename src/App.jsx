import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import PasswordGate from './components/PasswordGate'
import Login from './components/Login'
import Onboarding from './components/creator/Onboarding'
import CreatorLayout from './components/creator/CreatorLayout'
import SurveyDetail from './components/creator/SurveyDetail'
import SurveyEditor from './components/creator/SurveyEditor'
import Results from './components/creator/Results'
import SurveyPreview from './components/survey/SurveyPreview'
import SurveyPublic from './components/survey/SurveyPublic'
import VoyageControl from './components/creator/VoyageControl/VoyageControl'
import TravelerAdventureHub from './components/traveler/TravelerAdventureHub'

import VoyageSalesPage from './components/sales/VoyageSalesPage'
import FloatingChat from './components/shared/FloatingChat'

function hasAccessCookie() {
  return document.cookie.split('; ').some(c => c.startsWith('sankofa_access='))
}

export default function App() {
  const [authenticated, setAuthenticated] = useState(hasAccessCookie)
  const [currentView, setCurrentView] = useState('login')
  const [currentSurveyId, setCurrentSurveyId] = useState(null)
  const [currentVoyageId, setCurrentVoyageId] = useState(null)
  const [currentVoyageTab, setCurrentVoyageTab] = useState(null)
  const [currentVoyageSubTab, setCurrentVoyageSubTab] = useState(null)
  const [currentTravelerId, setCurrentTravelerId] = useState(null)
  const [isAdminMode, setIsAdminMode] = useState(false)

  useEffect(() => {
    if (!authenticated) return
    const hash = window.location.hash
    const match = hash.match(/^#\/s\/(.+)$/)
    if (match) {
      const id = Number(match[1]) || match[1]
      setCurrentSurveyId(id)
      setCurrentView('survey-public')
    }
  }, [authenticated])

  useEffect(() => {
    if (!authenticated) return
    history.replaceState({ view: currentView, surveyId: currentSurveyId }, '', '')

    function handlePopState(event) {
      if (event.state) {
        setCurrentView(event.state.view)
        setCurrentSurveyId(event.state.surveyId ?? null)
        setCurrentVoyageId(event.state.voyageId ?? null)
        setCurrentTravelerId(event.state.travelerId ?? null)
        setIsAdminMode(event.state.isAdmin || false)
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [authenticated]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!authenticated) {
    return <PasswordGate onSuccess={() => setAuthenticated(true)} />
  }

  function navigate(view, options = {}) {
    if (options.surveyId !== undefined) {
      setCurrentSurveyId(options.surveyId)
    }
    if (options.voyageId !== undefined) {
      setCurrentVoyageId(options.voyageId)
    }
    if (options.travelerId !== undefined) {
      setCurrentTravelerId(options.travelerId)
    }
    setIsAdminMode(options.isAdmin || false)
    setCurrentVoyageTab(options.tab || null)
    setCurrentVoyageSubTab(options.subTab || null)
    setCurrentView(view)
    history.pushState({ view, surveyId: options.surveyId ?? currentSurveyId, voyageId: options.voyageId ?? currentVoyageId, travelerId: options.travelerId ?? currentTravelerId, isAdmin: options.isAdmin || false }, '', '')
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
        {currentView === 'voyage-control' && <VoyageControl key="voyage-control" navigate={navigate} voyageId={currentVoyageId} initialTab={currentVoyageTab} initialSubTab={currentVoyageSubTab} />}
        {currentView === 'traveler-dashboard' && <TravelerAdventureHub key="traveler" navigate={navigate} travelerId={currentTravelerId} />}

        {currentView === 'voyage-sales' && <VoyageSalesPage key="voyage-sales" navigate={navigate} voyageId={currentVoyageId} isAdmin={isAdminMode} />}
      </AnimatePresence>
      {currentView !== 'traveler-dashboard' && (
        <FloatingChat userType={userType} navigate={navigate} voyageId={currentVoyageId} />
      )}
    </>
  )
}
