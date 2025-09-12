import { useState, useEffect, useCallback } from "react"
import { View, StyleSheet, Dimensions } from "react-native"
import { Text } from "@/components/Text"

import { VideoAvatar } from "@/components/Avatar/VideoAvatar"
import { QuestionForm } from "@/components/Forms/QuestionForm"
import { Screen } from "@/components/Screen"
import type { AppStackScreenProps } from "@/navigators/AppNavigator"
import { questionService } from "@/services/questionService"
import { speechService } from "@/services/speechService" // Temporarily disabled
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import { QuestionFlow, QuestionResponse } from "@/types/questionTypes"
import { useHeader } from "@/utils/useHeader"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"

const { width: _screenWidth, height: _screenHeight } = Dimensions.get("window")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = function WelcomeScreen(_props) {
  const { themed: _themed } = useAppTheme()
  const { navigation } = _props

  const [questionFlow, setQuestionFlow] = useState<QuestionFlow>(() =>
    questionService.createQuestionFlow(),
  )
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isListening, _setIsListening] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(() =>
    questionService.getCurrentQuestion(questionFlow),
  )

  const { logout } = { logout: () => {} } // TODO: Get from auth context

  useHeader(
    {
      rightTx: "common:logOut",
      onRightPress: logout,
    },
    [logout],
  )

  const _bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  // Speak the current question when it changes
  useEffect(() => {
    if (currentQuestion) {
      speakQuestion(currentQuestion.question)
    }
  }, [currentQuestion])

  const speakQuestion = useCallback(async (text: string) => {
    try {
      setIsSpeaking(true)
      // Temporarily disable speech to get app running
      // await speechService.speak({
      //   text,
      //   onStart: () => setIsSpeaking(true),
      //   onDone: () => setIsSpeaking(false),
      //   onError: (error) => {
      //     console.error("Speech error:", error)
      //     setIsSpeaking(false)
      //   },
      // })
      // Simulate speech delay
      setTimeout(() => {
        setIsSpeaking(false)
      }, 2000)
    } catch (error) {
      console.error("Failed to speak question:", error)
      setIsSpeaking(false)
    }
  }, [])

  const handleResponseSubmit = useCallback(
    (response: QuestionResponse) => {
      const updatedFlow = questionService.submitResponse(questionFlow, response)
      setQuestionFlow(updatedFlow)
    },
    [questionFlow],
  )

  const handleNextQuestion = useCallback(() => {
    const updatedFlow = questionService.goToNextQuestion(questionFlow)
    setQuestionFlow(updatedFlow)

    if (updatedFlow.isComplete) {
      // All questions completed - navigate to next screen
      handleComplete()
    } else {
      // Move to next question
      const nextQuestion = questionService.getCurrentQuestion(updatedFlow)
      setCurrentQuestion(nextQuestion)
    }
  }, [questionFlow])

  const handlePreviousQuestion = useCallback(() => {
    const updatedFlow = questionService.goToPreviousQuestion(questionFlow)
    setQuestionFlow(updatedFlow)
    const prevQuestion = questionService.getCurrentQuestion(updatedFlow)
    setCurrentQuestion(prevQuestion)
  }, [questionFlow])

  const handleComplete = useCallback(() => {
    // Save responses to storage or send to backend
    console.log("Survey completed with responses:", questionFlow.responses)

    // Navigate to the next screen
    navigation.navigate("Demo", { screen: "DemoShowroom", params: {} })
  }, [questionFlow.responses, navigation])

  const getProgressPercentage = () => {
    return questionService.getProgressPercentage(questionFlow)
  }

  const canGoBack = questionFlow.currentQuestionIndex > 0
  const isLastQuestion = questionFlow.currentQuestionIndex === questionFlow.questions.length - 1

  if (!currentQuestion) {
    return (
      <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </Screen>
    )
  }

  return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      <View style={styles.container}>
        {/* Header with progress */}
        <View style={styles.header}>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${getProgressPercentage()}%` }]} />
            </View>
            <Text style={styles.progressText}>
              {questionFlow.currentQuestionIndex + 1} of {questionFlow.questions.length}
            </Text>
          </View>
        </View>

        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <VideoAvatar
            isIdle={!isSpeaking && !isListening}
            isSpeaking={isSpeaking}
            isListening={isListening}
          />
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
          </View>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          <QuestionForm
            question={currentQuestion}
            onSubmit={handleResponseSubmit}
            onNext={handleNextQuestion}
            onPrevious={canGoBack ? handlePreviousQuestion : undefined}
            canGoBack={canGoBack}
            isLastQuestion={isLastQuestion}
            initialValue={
              questionService.getResponseByQuestionId(questionFlow, currentQuestion.id)?.answer
            }
          />
        </View>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  avatarSection: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  formSection: {
    backgroundColor: "#F9FAFB",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flex: 1,
    paddingTop: 20,
  },
  header: {
    paddingBottom: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  loadingContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  loadingText: {
    color: "#6B7280",
    fontSize: 18,
  },
  progressBar: {
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
    height: 4,
    marginBottom: 8,
    width: "100%",
  },
  progressContainer: {
    alignItems: "center",
  },
  progressFill: {
    backgroundColor: "#4F46E5",
    borderRadius: 2,
    height: "100%",
  },
  progressText: {
    color: "#6B7280",
    fontSize: 14,
    fontWeight: "500",
  },
  questionContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  questionText: {
    color: "#111827",
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 28,
    textAlign: "center",
  },
})
