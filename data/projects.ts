export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  featured?: boolean;
  highlights: string[];
}

export const projects: Project[] = [
  {
    id: "edu-smart-bot",
    title: "Edu Smart Bot",
    description: "AI-powered Educational Assistant with OCR, summarization, and Q&A systems",
    longDescription: "An intelligent AI assistant integrating OCR, content summarization, and context-based Q&A systems for educational purposes.",
    technologies: ["Python", "NLP", "Flask", "React.js", "PostgreSQL", "BERT", "T5"],
    githubUrl: "https://github.com/SHYAM140305/EduSmartBot",
    image: "https://opengraph.githubassets.com/1/SHYAM140305/EduSmartBot",
    featured: true,
    highlights: [
      "Built intelligent AI assistant integrating OCR, content summarization, and context-based Q&A systems",
      "Developed NLP pipeline using transformer models (BERT, T5) for topic extraction and summarization",
      "Designed Flask API backend and React-based dashboard with integrated analytics",
      "Achieved 94% accuracy and 87% user satisfaction from test deployment",
    ],
  },
  {
    id: "self-driving-car",
    title: "Self-Driving Car AI Simulation",
    description: "Autonomous Driving Simulator using Reinforcement Learning",
    longDescription: "Implemented reinforcement learning (Deep Q-Learning) for autonomous vehicle control with CNN-based vision input.",
    technologies: ["PyTorch", "OpenAI Gym", "Unity3D", "CUDA", "Deep Q-Learning", "CNN"],
    githubUrl: "https://github.com/SHYAM140305/Self-driving-car",
    image: "https://opengraph.githubassets.com/1/SHYAM140305/Self-driving-car",
    featured: true,
    highlights: [
      "Implemented reinforcement learning (Deep Q-Learning) for autonomous vehicle control",
      "Integrated OpenCV lane detection, real-time collision avoidance, and continuous track simulation",
      "Optimized training performance with GPU acceleration and adaptive reward shaping",
    ],
  },
  {
    id: "image-captioning",
    title: "Image Captioning System",
    description: "Deep Learning-based Vision-Language Model for semantic image captioning",
    longDescription: "Designed CNN–RNN encoder–decoder with attention mechanism for semantic image captioning.",
    technologies: ["PyTorch", "CNN", "RNN", "LSTM", "MS COCO Dataset", "ResNet"],
    githubUrl: "https://github.com/SHYAM140305/image-captioning",
    image: "https://opengraph.githubassets.com/1/SHYAM140305/image-captioning",
    featured: true,
    highlights: [
      "Designed CNN–RNN encoder–decoder with attention mechanism",
      "Used ResNet as feature extractor and LSTM decoder for sequential caption generation",
      "Implemented beam search for caption optimization, achieving BLEU-4 score of 0.32",
    ],
  },
  {
    id: "genai-chatbot",
    title: "GenAI Chatbot",
    description: "Custom LLM Chatbot with fine-tuning capabilities",
    longDescription: "Intel Unnati Industrial Training Programme - Introduction to GenAI and Simple LLM Inference on CPU and finetuning of LLM Model to create a Custom Chatbot.",
    technologies: ["Python", "LLMs", "HuggingFace", "Transformers", "Streamlit"],
    githubUrl: "https://github.com/SHYAM140305/GenAI-CHATBOT",
    image: "https://opengraph.githubassets.com/1/SHYAM140305/GenAI-CHATBOT",
    featured: true,
    highlights: [
      "Implemented LLM inference on CPU for cost-effective deployment",
      "Fine-tuned LLM models for custom chatbot applications",
      "Built interactive Streamlit interface for chatbot interactions",
      "Created custom chatbot with Intel Unnati Industrial Training Programme",
    ],
  },
  {
    id: "rag-system",
    title: "High Efficiency RAG System",
    description: "Dual Phase Path Optimization based Retrieval Augmented Generation",
    longDescription: "Developed advanced RAG system with dual-phase path optimization for high efficiency retrieval and generation.",
    technologies: ["Python", "RAG", "LLMs", "FAISS", "HuggingFace"],
    githubUrl: "https://github.com/SHYAM140305/RAG-X",
    image: "https://opengraph.githubassets.com/1/SHYAM140305/RAG-X",
    featured: true,
    highlights: [
      "Implemented dual-phase path optimization for efficient retrieval",
      "Enhanced RAG performance with optimized vector search",
      "Integrated with HuggingFace models for generation",
      "Built scalable architecture for production deployment",
    ],
  },
  {
    id: "smart-parking",
    title: "Smart Parking System using YOLO",
    description: "AI-powered parking space monitoring using Object Detection with YOLO models",
    longDescription: "Leveraging Object Detection for Efficient Parking Space Monitoring: A Benchmark of YOLO Models for real-time parking space detection and management.",
    technologies: ["Python", "YOLO", "Computer Vision", "OpenCV", "PyTorch", "Deep Learning"],
    githubUrl: "https://github.com/SHYAM140305/Smart-Parking-using-YOLO-models",
    image: "https://opengraph.githubassets.com/1/SHYAM140305/Smart-Parking-using-YOLO-models",
    featured: true,
    highlights: [
      "Implemented real-time parking space detection using YOLO object detection models",
      "Benchmarked multiple YOLO variants for optimal performance and accuracy",
      "Built efficient parking monitoring system with computer vision",
      "Achieved high accuracy in parking space occupancy detection",
    ],
  },
];

