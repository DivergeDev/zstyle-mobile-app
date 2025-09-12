import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, Alert, TouchableOpacity, TextInput } from "react-native"
import { useForm, Controller } from "react-hook-form"

import { questionService } from "../../services/questionService"
import { Question, QuestionResponse } from "../../types/questionTypes"

interface QuestionFormProps {
  question: Question
  onSubmit: (response: QuestionResponse) => void
  onNext: () => void
  onPrevious?: () => void
  canGoBack?: boolean
  isLastQuestion?: boolean
  initialValue?: string | string[]
}

export const QuestionForm: React.FC<QuestionFormProps> = ({
  question,
  onSubmit,
  onNext,
  onPrevious,
  canGoBack = false,
  isLastQuestion = false,
  initialValue,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm()
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>(
    Array.isArray(initialValue) ? initialValue : [],
  )
  const [selectedRadio, setSelectedRadio] = useState<string>(
    typeof initialValue === "string" ? initialValue : "",
  )

  const watchedValue = watch("answer")

  useEffect(() => {
    if (initialValue) {
      if (question.type === "checkbox") {
        setSelectedCheckboxes(Array.isArray(initialValue) ? initialValue : [])
      } else if (question.type === "multiple-choice") {
        setSelectedRadio(typeof initialValue === "string" ? initialValue : "")
      } else {
        setValue("answer", initialValue)
      }
    }
  }, [initialValue, question.type, setValue])

  const handleFormSubmit = (data: any) => {
    let answer: string | string[]

    if (question.type === "checkbox") {
      answer = selectedCheckboxes
    } else if (question.type === "multiple-choice") {
      answer = selectedRadio
    } else {
      answer = data.answer || ""
    }

    // Validate the response
    const validationError = questionService.validateResponse(question, answer)
    if (validationError) {
      Alert.alert("Validation Error", validationError)
      return
    }

    // Submit the response
    onSubmit({
      questionId: question.id,
      answer,
    })

    // Move to next question
    onNext()
  }

  const handleCheckboxChange = (value: string) => {
    setSelectedCheckboxes((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value)
      } else {
        return [...prev, value]
      }
    })
  }

  const handleRadioChange = (value: string) => {
    setSelectedRadio(value)
  }

  const renderTextInput = () => (
    <Controller
      control={control}
      name="answer"
      rules={{
        required: question.required ? "This field is required" : false,
        minLength:
          question.type === "text" && (question as any).validation?.minLength
            ? {
                value: (question as any).validation.minLength,
                message: `Minimum length is ${(question as any).validation.minLength} characters`,
              }
            : undefined,
        maxLength:
          question.type === "text" && (question as any).validation?.maxLength
            ? {
                value: (question as any).validation.maxLength,
                message: `Maximum length is ${(question as any).validation.maxLength} characters`,
              }
            : undefined,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={(question as any).placeholder || "Enter your answer..."}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value || ""}
            multiline={question.id === "goals"}
            numberOfLines={question.id === "goals" ? 4 : 1}
            style={[styles.textInput, question.id === "goals" && styles.textArea]}
            placeholderTextColor="#9CA3AF"
          />
          {errors.answer && <Text style={styles.errorText}>{errors.answer.message as string}</Text>}
        </View>
      )}
    />
  )

  const renderMultipleChoice = () => (
    <View style={styles.optionsContainer}>
      {(question as any).options.map((option: any) => (
        <TouchableOpacity
          key={option.id}
          style={[styles.radioOption, selectedRadio === option.value && styles.selectedOption]}
          onPress={() => handleRadioChange(option.value)}
        >
          <View style={styles.radioButton}>
            {selectedRadio === option.value && <View style={styles.radioButtonSelected} />}
          </View>
          <Text style={styles.optionLabel}>{option.label}</Text>
        </TouchableOpacity>
      ))}
      {question.required && !selectedRadio && (
        <Text style={styles.errorText}>Please select an option</Text>
      )}
    </View>
  )

  const renderCheckboxes = () => (
    <View style={styles.optionsContainer}>
      {(question as any).options.map((option: any) => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.checkboxOption,
            selectedCheckboxes.includes(option.value) && styles.selectedOption,
          ]}
          onPress={() => handleCheckboxChange(option.value)}
        >
          <View style={styles.checkbox}>
            {selectedCheckboxes.includes(option.value) && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.optionLabel}>{option.label}</Text>
        </TouchableOpacity>
      ))}
      {question.required && selectedCheckboxes.length === 0 && (
        <Text style={styles.errorText}>Please select at least one option</Text>
      )}
    </View>
  )

  const renderFormContent = () => {
    switch (question.type) {
      case "text":
        return renderTextInput()
      case "multiple-choice":
        return renderMultipleChoice()
      case "checkbox":
        return renderCheckboxes()
      default:
        return null
    }
  }

  const canSubmit = () => {
    if (question.type === "checkbox") {
      return !question.required || selectedCheckboxes.length > 0
    } else if (question.type === "multiple-choice") {
      return !question.required || selectedRadio !== ""
    } else {
      return !question.required || watchedValue
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContent}>{renderFormContent()}</View>

      <View style={styles.buttonContainer}>
        {canGoBack && (
          <TouchableOpacity style={styles.backButton} onPress={onPrevious}>
            <Text style={styles.backButtonText}>Previous</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.nextButton, !canSubmit() && styles.disabledButton]}
          onPress={
            question.type === "text"
              ? handleSubmit(handleFormSubmit)
              : () => {
                  if (canSubmit()) {
                    handleFormSubmit({})
                  }
                }
          }
          disabled={!canSubmit()}
        >
          <Text style={styles.nextButtonText}>{isLastQuestion ? "Complete" : "Next"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  backButton: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#D1D5DB",
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  backButtonText: {
    color: "#374151",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
    paddingTop: 20,
  },
  checkbox: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#D1D5DB",
    borderRadius: 4,
    borderWidth: 2,
    height: 20,
    justifyContent: "center",
    marginRight: 12,
    width: 20,
  },
  checkboxOption: {
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderColor: "#E5E7EB",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    padding: 16,
  },
  checkmark: {
    color: "#4F46E5",
    fontSize: 14,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  disabledButton: {
    backgroundColor: "#9CA3AF",
  },
  errorText: {
    color: "#EF4444",
    fontSize: 14,
    marginTop: 8,
  },
  formContent: {
    flex: 1,
    justifyContent: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  nextButton: {
    alignItems: "center",
    backgroundColor: "#4F46E5",
    borderRadius: 8,
    flex: 2,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  optionLabel: {
    color: "#374151",
    flex: 1,
    fontSize: 16,
  },
  optionsContainer: {
    gap: 12,
  },
  radioButton: {
    alignItems: "center",
    borderColor: "#D1D5DB",
    borderRadius: 10,
    borderWidth: 2,
    height: 20,
    justifyContent: "center",
    marginRight: 12,
    width: 20,
  },
  radioButtonSelected: {
    backgroundColor: "#4F46E5",
    borderRadius: 5,
    height: 10,
    width: 10,
  },
  radioOption: {
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderColor: "#E5E7EB",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    padding: 16,
  },
  selectedOption: {
    backgroundColor: "#EEF2FF",
    borderColor: "#4F46E5",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    borderColor: "#D1D5DB",
    borderRadius: 8,
    borderWidth: 1,
    color: "#374151",
    fontSize: 16,
    padding: 12,
  },
})
