import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      welcome: "Welcome to GenAI Virtual Lab",
      subtitle: "Learn Generative AI through simulation-driven exploration",
      labs: {
        text: "Text Generation (LLMs)",
        numeric: "Numeric Data Generation",
        image: "Image Generation",
        audio: "Audio Generation",
        video: "Video Generation"
      },
      rag: "Retrieval-Augmented Generation",
      rl: "Reinforcement Learning",
      train: "Train Your Own AI",
      resourcePerson: "Resource Person"
    }
  },
  hi: {
    translation: {
      welcome: "GenAI वर्चुअल लैब में आपका स्वागत है",
      subtitle: "सिमुलेशन-आधारित अन्वेषण के माध्यम से जनरेटिव एआई सीखें",
      labs: {
        text: "टेक्स्ट जेनरेशन (LLMs)",
        numeric: "संख्यात्मक डेटा जेनरेशन",
        image: "इमेज जेनरेशन",
        audio: "ऑडियो जेनरेशन",
        video: "वीडियो जेनरेशन"
      },
      rag: "रिट्रीवल-एगमेंटेड जेनरेशन",
      rl: "रीइन्फोर्समेंट लर्निंग",
      train: "अपना स्वयं का एआई प्रशिक्षित करें",
      resourcePerson: "संसाधन व्यक्ति"
    }
  },
  kn: {
    translation: {
      welcome: "GenAI ವರ್ಚುವಲ್ ಲ್ಯಾಬ್‌ಗೆ ಸ್ವಾಗತ",
      subtitle: "ಸಿಮ್ಯುಲೇಶನ್-ಚಾಲಿತ ಅನ್ವೇಷಣೆಯ ಮೂಲಕ ಜೆನೆರೇಟಿವ್ AI ಕಲಿಯಿರಿ",
      labs: {
        text: "ಪಠ್ಯ ಉತ್ಪಾದನೆ (LLMs)",
        numeric: "ಸಂಖ್ಯಾತ್ಮಕ ಡೇಟಾ ಉತ್ಪಾದನೆ",
        image: "ಚಿತ್ರ ಉತ್ಪಾದನೆ",
        audio: "ಆಡಿಯೋ ಉತ್ಪಾದನೆ",
        video: "ವಿಡಿಯೋ ಉತ್ಪಾದನೆ"
      },
      rag: "ರಿಟ್ರೈವಲ್-ಆಗ್ಮೆಂಟೆಡ್ ಜನರೇಷನ್",
      rl: "ರಿಇನ್ಫೋರ್ಸ್‌ಮೆಂಟ್ ಲರ್ನಿಂಗ್",
      train: "ನಿಮ್ಮ ಸ್ವಂತ AI ಅನ್ನು ತರಬೇತಿ ಮಾಡಿ",
      resourcePerson: "ಸಂಪನ್ಮೂಲ ವ್ಯಕ್ತಿ"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
