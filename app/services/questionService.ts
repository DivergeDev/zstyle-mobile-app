import { Question, QuestionFlow, QuestionResponse } from "../types/questionTypes"

// Sample questions for the welcome flow
const sampleQuestions: Question[] = [
  {
    id: "name",
    type: "text",
    question: "Hi there! I'm your virtual assistant. What's your name?",
    placeholder: "Enter your name",
    required: true,
    validation: {
      minLength: 2,
      maxLength: 50,
    },
  },
  {
    id: "interests",
    type: "checkbox",
    question: "Great to meet you! What are you interested in? Select all that apply.",
    options: [
      { id: "tech", label: "Technology", value: "technology" },
      { id: "design", label: "Design", value: "design" },
      { id: "business", label: "Business", value: "business" },
      { id: "health", label: "Health & Fitness", value: "health" },
      { id: "travel", label: "Travel", value: "travel" },
      { id: "education", label: "Education", value: "education" },
    ],
    required: true,
    minSelections: 1,
    maxSelections: 3,
  },
  {
    id: "experience",
    type: "multiple-choice",
    question: "How would you describe your experience level with mobile apps?",
    options: [
      { id: "beginner", label: "Beginner - Just getting started", value: "beginner" },
      { id: "intermediate", label: "Intermediate - Some experience", value: "intermediate" },
      { id: "advanced", label: "Advanced - Very experienced", value: "advanced" },
      { id: "expert", label: "Expert - Professional level", value: "expert" },
    ],
    required: true,
  },
  {
    id: "goals",
    type: "text",
    question: "What's your main goal for using this app?",
    placeholder: "Tell us about your goals...",
    required: false,
    validation: {
      maxLength: 200,
    },
  },
]

class QuestionService {
  private questions: Question[] = sampleQuestions

  getQuestions(): Question[] {
    return this.questions
  }

  createQuestionFlow(): QuestionFlow {
    return {
      questions: this.questions,
      currentQuestionIndex: 0,
      responses: [],
      isComplete: false,
    }
  }

  getCurrentQuestion(flow: QuestionFlow): Question | null {
    if (flow.currentQuestionIndex >= flow.questions.length) {
      return null
    }
    return flow.questions[flow.currentQuestionIndex]
  }

  submitResponse(flow: QuestionFlow, response: QuestionResponse): QuestionFlow {
    // Update or add the response
    const existingResponseIndex = flow.responses.findIndex(
      (r) => r.questionId === response.questionId,
    )

    const updatedResponses = [...flow.responses]
    if (existingResponseIndex >= 0) {
      updatedResponses[existingResponseIndex] = response
    } else {
      updatedResponses.push(response)
    }

    return {
      ...flow,
      responses: updatedResponses,
    }
  }

  goToNextQuestion(flow: QuestionFlow): QuestionFlow {
    const nextIndex = flow.currentQuestionIndex + 1
    const isComplete = nextIndex >= flow.questions.length

    return {
      ...flow,
      currentQuestionIndex: nextIndex,
      isComplete,
    }
  }

  goToPreviousQuestion(flow: QuestionFlow): QuestionFlow {
    const prevIndex = Math.max(0, flow.currentQuestionIndex - 1)

    return {
      ...flow,
      currentQuestionIndex: prevIndex,
      isComplete: false,
    }
  }

  validateResponse(question: Question, answer: string | string[]): string | null {
    if (question.required && (!answer || (Array.isArray(answer) && answer.length === 0))) {
      return "This field is required"
    }

    if (question.type === "text" && typeof answer === "string") {
      const validation = (question as any).validation
      if (validation) {
        if (validation.minLength && answer.length < validation.minLength) {
          return `Minimum length is ${validation.minLength} characters`
        }
        if (validation.maxLength && answer.length > validation.maxLength) {
          return `Maximum length is ${validation.maxLength} characters`
        }
        if (validation.pattern && !new RegExp(validation.pattern).test(answer)) {
          return "Invalid format"
        }
      }
    }

    if (question.type === "checkbox" && Array.isArray(answer)) {
      const checkboxQuestion = question as any
      if (checkboxQuestion.minSelections && answer.length < checkboxQuestion.minSelections) {
        return `Please select at least ${checkboxQuestion.minSelections} option(s)`
      }
      if (checkboxQuestion.maxSelections && answer.length > checkboxQuestion.maxSelections) {
        return `Please select no more than ${checkboxQuestion.maxSelections} option(s)`
      }
    }

    return null
  }

  getProgressPercentage(flow: QuestionFlow): number {
    if (flow.questions.length === 0) return 0
    return Math.round((flow.currentQuestionIndex / flow.questions.length) * 100)
  }

  getResponseByQuestionId(flow: QuestionFlow, questionId: string): QuestionResponse | null {
    return flow.responses.find((r) => r.questionId === questionId) || null
  }
}

export const questionService = new QuestionService()
