export interface BaseQuestion {
  id: string
  type: "text" | "multiple-choice" | "checkbox"
  question: string
  required?: boolean
}

export interface TextQuestion extends BaseQuestion {
  type: "text"
  placeholder?: string
  validation?: {
    minLength?: number
    maxLength?: number
    pattern?: string
  }
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: "multiple-choice"
  options: {
    id: string
    label: string
    value: string
  }[]
}

export interface CheckboxQuestion extends BaseQuestion {
  type: "checkbox"
  options: {
    id: string
    label: string
    value: string
  }[]
  minSelections?: number
  maxSelections?: number
}

export type Question = TextQuestion | MultipleChoiceQuestion | CheckboxQuestion

export interface QuestionResponse {
  questionId: string
  answer: string | string[]
}

export interface QuestionFlow {
  questions: Question[]
  currentQuestionIndex: number
  responses: QuestionResponse[]
  isComplete: boolean
}
