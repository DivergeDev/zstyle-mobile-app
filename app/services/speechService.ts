import * as Speech from "expo-speech"

export interface SpeechOptions {
  text: string
  language?: string
  pitch?: number
  rate?: number
  onStart?: () => void
  onDone?: () => void
  onStopped?: () => void
  onError?: (error: any) => void
}

class SpeechService {
  private isSpeaking = false

  async speak(options: SpeechOptions): Promise<void> {
    const {
      text,
      language = "en-US",
      pitch = 1.0,
      rate = 0.8,
      onStart,
      onDone,
      onStopped,
      onError,
    } = options

    try {
      // Stop any current speech
      if (this.isSpeaking) {
        await this.stop()
      }

      this.isSpeaking = true
      onStart?.()

      await Speech.speak(text, {
        language,
        pitch,
        rate,
        onStart: () => {
          this.isSpeaking = true
        },
        onDone: () => {
          this.isSpeaking = false
          onDone?.()
        },
        onStopped: () => {
          this.isSpeaking = false
          onStopped?.()
        },
        onError: (error) => {
          this.isSpeaking = false
          onError?.(error)
        },
      })
    } catch (error) {
      this.isSpeaking = false
      onError?.(error)
    }
  }

  async stop(): Promise<void> {
    try {
      await Speech.stop()
      this.isSpeaking = false
    } catch (error) {
      console.warn("Error stopping speech:", error)
    }
  }

  getIsSpeaking(): boolean {
    return this.isSpeaking
  }

  async getAvailableVoices() {
    try {
      return await Speech.getAvailableVoicesAsync()
    } catch (error) {
      console.warn("Error getting available voices:", error)
      return []
    }
  }
}

export const speechService = new SpeechService()
