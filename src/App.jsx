import React, { useState, useEffect, useRef, useMemo } from 'react';

// 輕量化 SVG 圖標集
const Icons = {
  Upload: () => (
    <svg className="w-12 h-12 text-indigo-400 mb-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
  ),
  FileText: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Chat: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  Sparkles: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  Send: () => (
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  ),
  Info: () => (
    <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Download: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  ),
  Trash: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  Sliders: () => (
    <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
    </svg>
  ),
  Link: () => (
    <svg className="w-3 h-3 mr-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  ),
  ChevronDown: () => (
    <svg className="w-3 h-3 ml-1 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  )
};

const BACKUP_DEMO_PAPER = {
  title: "Attention Is All You Need",
  authors: ["Ashish Vaswani", "Noam Shazeer", "Niki Parmar", "Jakob Uszkoreit", "Llion Jones", "Aidan N. Gomez", "Łukasz Kaiser", "Illia Polosukhin"],
  abstract: "我們提出了一種新的簡單網絡架構，即 Transformer，它完全基於自注意力機制（Self-Attention），完全放棄了循環（Recurrent）和卷積（Convolutional）結構。在兩個機器翻譯任務的實驗中表明，這些模型在質量上更具優越性，同時更加並行化，所需的訓練時間顯著減少。我們的模型在 WMT 2014 英語轉德語翻譯任務上達到了 28.4 BLEU，比現有的最佳結果提高了 2 BLEU 以上。在 WMT 2014 英語轉法語翻譯任務中，我們的模型在八個 GPU 上訓練 3.5 天后，創下了 41.8 BLEU 的新紀錄，這僅僅是文獻中最佳模型訓練成本的一小部分。",
  keyTakeaways: [
    "完全揚棄了傳統的 RNN 和 CNN 架構，改用全自注意力機制（Self-Attention）來捕捉全局依賴關係。",
    "極大地提升了並行運算能力，大幅縮短神經網絡翻譯模型的訓練時間。",
    "引入了「多頭注意力（Multi-Head Attention）」機制，允許模型同時關注來自不同位置的多個表示子空間的資訊。",
    "奠定了當今大語言模型（如 GPT、Gemini、Claude 等）的核心底層架構 Transformer。"
  ],
  recommendedQuestions: [
    "請用通俗易懂的語言解釋什麼是『自注意力機制 (Self-Attention)』？",
    "Transformer 架構相比於傳統的 LSTM 有哪些核心優勢？",
    "論文中的 Positional Encoding（位置編碼）是用來解決什麼問題的？"
  ],
  pages: [
    {
      pageNum: 1,
      text: `Attention Is All You Need\n\nAshish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Lukasz Kaiser, Illia Polosukhin\n\n1. Abstract\nThe dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely. Experiments on machine translation tasks show these models to be superior in quality while being more parallelizable.`
    },
    {
      pageNum: 2,
      text: `2. Introduction\nRecurrent models, such as long short-term memory (LSTM) and gated recurrent (GRU) neural networks, have been firmly established as state-of-the-art approaches. However, the sequential nature of recurrent models precludes parallelization within training examples, which becomes critical at longer sequence lengths.`
    },
    {
      pageNum: 3,
      text: `3. Background\nThe goal of reducing sequential computation also forms the foundation of Extended Neural GPU, ByteNet and ConvS2S, all of which use convolutional neural networks as basic building blocks. In the Transformer, the number of operations required to relate signals from two arbitrary positions is reduced to a constant number of operations.`
    },
    {
      pageNum: 4,
      text: `4. Model Architecture\nMost competitive neural sequence transduction models have an encoder-decoder structure. The Transformer follows this overall architecture using stacked self-attention and point-wise, fully connected layers for both the encoder and decoder.\n\n4.1 Encoder Stack\nThe encoder is composed of a stack of N = 6 identical layers. Each layer has two sub-layers: multi-head self-attention, and a position-wise fully connected feed-forward network.`
    },
    {
      pageNum: 5,
      text: `4.2 Decoder Stack\nThe decoder is also composed of a stack of N = 6 identical layers. In addition to the two sub-layers in each encoder layer, the decoder inserts a third sub-layer, which performs multi-head attention over the output of the encoder stack.`
    },
    {
      pageNum: 6,
      text: `5. Self-Attention Mechanics\nAn attention function can be described as mapping a query and a set of key-value pairs to an output. We compute the matrix of outputs as:\n\nAttention(Q, K, V) = Softmax( (Q * K^T) / sqrt(d_k) ) * V\n\nDot-product attention is much faster and more space-efficient in practice, since it can be implemented using highly optimized matrix multiplication code.`
    },
    {
      pageNum: 7,
      text: `5.2 Multi-Head Attention\nInstead of performing a single attention function, we found it beneficial to linearly project the queries, keys and values h times. Multi-head attention allows the model to jointly attend to information from different representation subspaces at different positions.\n\nMultiHead(Q, K, V) = Concat(head_1, ..., head_h) * W^O`
    },
    {
      pageNum: 8,
      text: `6. Positional Encoding\nSince our model contains no recurrence and no convolution, we must inject some information about the relative or absolute position of the tokens in the sequence.\n\nPE(pos, 2i) = sin(pos / 10000^(2i/d_model))\nPE(pos, 2i+1) = cos(pos / 10000^(2i/d_model))`
    }
  ]
};

export default function App() {
  const [pages, setPages] = useState([]);
  const [paperAnalysis, setPaperAnalysis] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatting, setIsChatting] = useState(false);
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'viewer'
  const [pdfjsLoaded, setPdfjsLoaded] = useState(false);
  const [customApiKey, setCustomApiKey] = useState('');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [selectedText, setSelectedText] = useState('');

  // RAG 切片與彈出視窗設定
  const [chunkSize, setChunkSize] = useState(500);
  const [chunkOverlap, setChunkOverlap] = useState(50);
  const [isRagSettingsOpen, setIsRagSettingsOpen] = useState(false);
  const [highlightedChunk, setHighlightedChunk] = useState(null);

  // 3 個動態產生的推薦問題
  const [dynamicQuestions, setDynamicQuestions] = useState([]);

  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const ragRef = useRef(null);

  useEffect(() => {
    // 1. 載入 PDF.js
    const loadPdfJS = async () => {
      if (window.pdfjsLib) {
        setPdfjsLoaded(true);
        return;
      }
      try {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js';
        script.onload = () => {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
          setPdfjsLoaded(true);
        };
        document.head.appendChild(script);
      } catch (err) {
        console.error("無法載入 PDF.js 插件:", err);
      }
    };

    // 2. 載入 Marked (支援 Markdown)
    const loadMarked = () => {
      if (window.marked) return;
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
      script.onload = () => {
        window.marked.setOptions({
          breaks: true,
          gfm: true
        });
      };
      document.head.appendChild(script);
    };

    loadPdfJS();
    loadMarked();

    // 點擊外部自動關閉 RAG 面板
    const handleOutsideClick = (e) => {
      if (ragRef.current && !ragRef.current.contains(e.target)) {
        setIsRagSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isChatting]);

  const paperChunks = useMemo(() => {
    if (!pages || pages.length === 0) return [];
    const chunks = [];
    pages.forEach(page => {
      const text = page.text;
      let startIndex = 0;
      let chunkIdx = 0;
      while (startIndex < text.length) {
        const endIndex = Math.min(startIndex + chunkSize, text.length);
        const chunkText = text.substring(startIndex, endIndex);
        chunks.push({
          id: `chunk-${page.pageNum}-${chunkIdx}`,
          pageNum: page.pageNum,
          text: chunkText,
          startIndex,
          endIndex
        });
        if (endIndex === text.length) break;
        startIndex += (chunkSize - chunkOverlap);
        if (startIndex >= text.length) break;
        chunkIdx++;
      }
    });
    return chunks;
  }, [pages, chunkSize, chunkOverlap]);

  const indexedChunks = useMemo(() => {
    if (!paperChunks || paperChunks.length === 0) return null;

    const tokenize = (text) => {
      if (!text) return [];
      const cleanText = text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, " ");
      const words = cleanText.split(/\s+/).filter(w => w.length > 1);

      const cjkRegex = /[\u4e00-\u9fa5]/;
      const tokens = [...words];
      for (let i = 0; i < text.length - 1; i++) {
        if (cjkRegex.test(text[i]) && cjkRegex.test(text[i + 1])) {
          tokens.push(text[i] + text[i + 1]);
        }
      }
      return tokens;
    };

    const df = {};
    const numDocs = paperChunks.length;

    paperChunks.forEach(chunk => {
      const tokens = new Set(tokenize(chunk.text));
      tokens.forEach(t => {
        df[t] = (df[t] || 0) + 1;
      });
    });

    const chunkVectors = paperChunks.map(chunk => {
      const tokens = tokenize(chunk.text);
      const tf = {};
      tokens.forEach(t => { tf[t] = (tf[t] || 0) + 1; });

      const vector = {};
      Object.keys(tf).forEach(t => {
        const idf = Math.log(1 + (numDocs - (df[t] || 0) + 0.5) / ((df[t] || 0) + 0.5));
        vector[t] = tf[t] * idf;
      });

      return { chunk, vector };
    });

    return { chunkVectors, df, numDocs, tokenize };
  }, [paperChunks]);

  const retrieveRelevantChunks = (query, topK = 3) => {
    if (!indexedChunks) return [];
    const { chunkVectors, df, numDocs, tokenize } = indexedChunks;
    const queryTokens = tokenize(query);
    const queryVector = {};
    const queryTf = {};
    queryTokens.forEach(t => { queryTf[t] = (queryTf[t] || 0) + 1; });

    Object.keys(queryTf).forEach(t => {
      const docFreq = df[t] || 0;
      const idf = Math.log(1 + (numDocs - docFreq + 0.5) / (docFreq + 0.5));
      queryVector[t] = queryTf[t] * idf;
    });

    const scores = chunkVectors.map(({ chunk, vector }) => {
      let dotProduct = 0;
      let queryMag = 0;
      let docMag = 0;

      Object.keys(queryVector).forEach(t => {
        dotProduct += (queryVector[t] || 0) * (vector[t] || 0);
        queryMag += Math.pow(queryVector[t], 2);
      });

      Object.keys(vector).forEach(t => {
        docMag += Math.pow(vector[t], 2);
      });

      queryMag = Math.sqrt(queryMag);
      docMag = Math.sqrt(docMag);

      const score = (queryMag && docMag) ? dotProduct / (queryMag * docMag) : 0;
      return { chunk, score };
    });

    return scores
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, topK)
      .map(item => item.chunk);
  };

  const handlePdfUpload = async (file) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      alert("請上傳 PDF 格式的論文！");
      return;
    }

    setIsLoading(true);
    setUploadProgress("正在讀取檔案中...");

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const typedarray = new Uint8Array(e.target.result);
          if (!window.pdfjsLib) {
            throw new Error("PDF.js 尚未加載完成，請稍候再試。");
          }

          setUploadProgress("正在解析 PDF 結構...");
          const pdf = await window.pdfjsLib.getDocument({ data: typedarray }).promise;
          let fullText = "";
          let tempPages = [];

          for (let i = 1; i <= pdf.numPages; i++) {
            setUploadProgress(`正在讀取第 ${i} / ${pdf.numPages} 頁內容...`);
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += `--- Page ${i} ---\n${pageText}\n\n`;
            tempPages.push({ pageNum: i, text: pageText });
          }

          setPages(tempPages);
          await analyzePaper(fullText, tempPages);
        } catch (error) {
          console.error("PDF 解析錯誤:", error);
          alert(`PDF 解析失敗: ${error.message}`);
          setIsLoading(false);
        }
      };
      reader.readAsArrayBuffer(file);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  const loadDemoPaperFromArxiv = async () => {
    setIsLoading(true);
    setUploadProgress("正在從 arXiv 下載原始論文 (1706.03762)...");

    // 使用高可用、快速的 CORS 代理服務直連 arXiv PDF
    const originalArxivUrl = "https://arxiv.org/pdf/1706.03762";
    const proxiedUrl = `https://corsproxy.io/?url=${encodeURIComponent(originalArxivUrl)}`;

    try {
      if (!window.pdfjsLib) {
        throw new Error("PDF.js 尚未加載完成，請重試。");
      }

      setUploadProgress("連接 arXiv 伺服器下載 PDF...");
      const pdf = await window.pdfjsLib.getDocument({ url: proxiedUrl }).promise;
      let fullText = "";
      let tempPages = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        // 更新當前解析頁數 (共 15 頁)
        setUploadProgress(`正在讀取第 ${i} / ${pdf.numPages} 頁內容...`);
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += `--- Page ${i} ---\n${pageText}\n\n`;
        tempPages.push({ pageNum: i, text: pageText });
      }

      setPages(tempPages);
      await analyzePaper(fullText, tempPages);
    } catch (err) {
      console.warn("直連 arXiv 下載失敗，改為本地極速還原模式...", err);
      loadDemoPaperFallback();
    }
  };

  // 備用還原模式
  const loadDemoPaperFallback = () => {
    setIsLoading(true);
    setUploadProgress("正在加載經典還原結構...");
    setTimeout(() => {
      setPages(BACKUP_DEMO_PAPER.pages);
      setPaperAnalysis({
        title: BACKUP_DEMO_PAPER.title,
        authors: BACKUP_DEMO_PAPER.authors,
        abstract: BACKUP_DEMO_PAPER.abstract,
        keyTakeaways: BACKUP_DEMO_PAPER.keyTakeaways,
      });
      setDynamicQuestions(BACKUP_DEMO_PAPER.recommendedQuestions);
      setChatHistory([
        {
          role: 'model',
          text: `👋 **您好！已為您加載《${BACKUP_DEMO_PAPER.title}》還原導讀版！**\n\n系統已準備好 **RAG 前端檢索與定位系統**，您可以對著左邊任何字句劃詞提問，或者點擊下方自動推薦的問題展開對話。`,
          sources: []
        }
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const handleTextInput = async (text) => {
    if (!text.trim()) return;
    setIsLoading(true);
    setUploadProgress("正在分析您輸入的論文內容...");
    const mockPages = [{ pageNum: 1, text: text }];
    setPages(mockPages);
    await analyzePaper(text, mockPages);
  };

  const analyzePaper = async (text, paperPages) => {
    const truncatedText = text.substring(0, 15000);
    const apiKey = customApiKey || "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

    const systemPrompt = `你是一個世界頂尖的學術論文分析大師。你的任務是閱讀以下論文內容，並輸出極其精確的論文大綱與分析。
    請務必使用 JSON 格式回覆，JSON 結構必須嚴格符合以下架構：
    {
      "title": "論文的繁體中文或原創標題",
      "authors": ["作者1", "作者2"],
      "abstract": "對論文摘要的精準繁體中文編譯與濃縮（約200-300字）",
      "keyTakeaways": ["關鍵發現 1", "關鍵發現 2", "關鍵發現 3", "關鍵發現 4"],
      "recommendedQuestions": ["問題1", "問題2", "問題3"]
    }
    
    注意：
    1. 必須完全使用「繁體中文（台灣）」進行摘要、關鍵發現與推薦問題的撰寫。
    2. 推薦問題必須精準剛好是 3 個。`;

    const userQuery = `以下是論文的部分文本：\n\n${truncatedText}`;

    try {
      const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              title: { type: "STRING" },
              authors: { type: "ARRAY", items: { type: "STRING" } },
              abstract: { type: "STRING" },
              keyTakeaways: { type: "ARRAY", items: { type: "STRING" } },
              recommendedQuestions: { type: "ARRAY", items: { type: "STRING" } }
            },
            required: ["title", "authors", "abstract", "keyTakeaways", "recommendedQuestions"]
          }
        },
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        }
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Gemini API 請求失敗，狀態碼: ${response.status}`);
      }

      const result = await response.json();
      const parsedData = JSON.parse(result.candidates[0].content.parts[0].text);

      setPaperAnalysis({
        title: parsedData.title,
        authors: parsedData.authors,
        abstract: parsedData.abstract,
        keyTakeaways: parsedData.keyTakeaways,
      });
      setDynamicQuestions(parsedData.recommendedQuestions.slice(0, 3));
      setChatHistory([
        {
          role: 'model',
          text: `🎉 **《${parsedData.title}》** 已成功讀取並解析完畢！\n\n我已經自動為這篇文獻切分了 **${paperChunks.length} 個檢索段落**。\n\n現在，您可以點選推薦問題或自行發問，系統將會透過 RAG 智能抽取最匹配的論文片段！`,
          sources: []
        }
      ]);
    } catch (error) {
      console.error("論文分析失敗:", error);
      const fallbackAnalysis = {
        title: "已上傳的論文文件",
        authors: ["未能自動偵測"],
        abstract: "大綱抽取服務因網路或 API 金鑰限制暫時略過。但 RAG 檢索系統已完美就緒！您可直接進行對話與定位原文。",
        keyTakeaways: [
          "論文已完整載入至前端 RAG 檢索資料庫。",
          "您可隨時調整上方導覽列的 RAG 設定進行實時切片。",
          "點擊引用來源可直接追隨、高亮並定位至原文頁面。"
        ]
      };
      setPaperAnalysis(fallbackAnalysis);
      setDynamicQuestions([
        "請幫我總結這篇論文的核心創新點。",
        "這篇論文採用了什麼樣的研究方法或系統設計？",
        "這項研究有什麼局限性與未來的改進方向？"
      ]);
      setChatHistory([
        {
          role: 'model',
          text: `⚠️ **提醒**：自動摘要提取略有延遲，但我已將論文完全進行高密度切片囉！您可以立刻開始提問。`,
          sources: []
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (messageText) => {
    const textToSend = messageText || currentInput;
    if (!textToSend.trim() || isChatting) return;

    // 1. RAG 檢索：找出與 Query 最匹配的 3 個段落
    const retrieved = retrieveRelevantChunks(textToSend, 3);

    const newHistory = [...chatHistory, { role: 'user', text: textToSend }];
    setChatHistory(newHistory);
    setCurrentInput('');
    setIsChatting(true);

    const apiKey = customApiKey || "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

    // 2. 將檢索到的段落注入 System Prompt 中作為 Context
    const retrievedContextText = retrieved.map((chunk, i) => `[Source ${i + 1} | Page ${chunk.pageNum}]:\n${chunk.text}`).join("\n\n---\n\n");

    const systemPrompt = `你是一個專業、嚴謹的學術論文導讀助手。
    請**完全基於下方由 RAG 檢索模組為你篩選出的最相關論文段落**來回答用戶的問題。
    
    如果你在提供的 RAG 檢索內容中找不到任何可以推論的答案，請委婉誠實地告知使用者「根據檢索到的论文段落，無法找到直接答案」。

    ### 被檢索出的高關聯原文段落 (RAG Context)：
    ${retrievedContextText}
    
    ### 導讀回答與 Markdown 格式排版規則：
    1. 當你引用某個觀點時，請指出是來自哪一頁 (例如：參見第 3 頁)。
    2. 請善用 Markdown 表格（| 欄位 | 欄位 |）、無序清單、**粗體強調**、區塊引用、以及行內 \`code\` / 區塊代碼來將學術理論完美整理。
    3. 必須使用「繁體中文（台灣）」進行回覆。`;

    const chatPayload = {
      contents: newHistory.map(chat => ({
        role: chat.role,
        parts: [{ text: chat.text }]
      })),
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      }
    };

    const fetchWithRetry = async (url, options, retries = 3, delay = 1000) => {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          if (response.status === 429 && retries > 0) {
            await new Promise(res => setTimeout(res, delay));
            return fetchWithRetry(url, options, retries - 1, delay * 2);
          }
          throw new Error(`API 錯誤: ${response.status}`);
        }
        return response;
      } catch (error) {
        if (retries > 0) {
          await new Promise(res => setTimeout(res, delay));
          return fetchWithRetry(url, options, retries - 1, delay * 2);
        }
        throw error;
      }
    };

    try {
      const response = await fetchWithRetry(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(chatPayload)
      });

      const result = await response.json();
      const replyText = result.candidates[0].content.parts[0].text;

      // 保存本次回答並將檢索出來的來源 (sources) 一起記下來
      const updatedHistory = [...newHistory, { role: 'model', text: replyText, sources: retrieved }];
      setChatHistory(updatedHistory);

      // 動態更新 3 個推薦問題 (非同步背景生成)
      generateDynamicFollowUpQuestions(updatedHistory, apiKey);

    } catch (error) {
      console.error("對話失敗:", error);
      setChatHistory([...newHistory, {
        role: 'model',
        text: `❌ 抱歉，檢索或回答生成時發生問題。(錯誤詳情: ${error.message})`,
        sources: []
      }]);
    } finally {
      setIsChatting(false);
    }
  };

  const generateDynamicFollowUpQuestions = async (history, apiKey) => {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;
    const slicedHistory = history.slice(-6).map(chat => `${chat.role === 'user' ? 'User' : 'Assistant'}: ${chat.text}`).join('\n');

    const generatorPrompt = `你是一位深度學術論文研究導師。請根據以下的對話歷史，針對這篇論文為使用者推薦「接下來最適合追問的 3 個深入研究與探討問題」。
    
    ### 對話歷史：
    ${slicedHistory}
    
    請務必以繁體中文（台灣）撰寫。請以 JSON 陣列格式回覆，格式必須嚴格符合：
    {
      "questions": ["高價值追問問題1", "高價值追問問題2", "高價值追問問題3"]
    }`;

    try {
      const payload = {
        contents: [{ parts: [{ text: generatorPrompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              questions: {
                type: "ARRAY",
                items: { type: "STRING" }
              }
            },
            required: ["questions"]
          }
        }
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const result = await response.json();
        const parsed = JSON.parse(result.candidates[0].content.parts[0].text);
        if (parsed.questions && parsed.questions.length > 0) {
          setDynamicQuestions(parsed.questions.slice(0, 3));
        }
      }
    } catch (e) {
      console.warn("無法動態產生推薦問題，保留原推薦:", e);
    }
  };

  const navigateToSourceChunk = (chunk) => {
    setActiveTab('viewer');
    setHighlightedChunk(chunk);

    setTimeout(() => {
      const element = document.getElementById(`page-container-${chunk.pageNum}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);

    // 取消高亮
    setTimeout(() => {
      setHighlightedChunk(null);
    }, 6000);
  };

  const handleTextSelection = () => {
    const selection = window.getSelection().toString();
    if (selection && selection.trim().length > 5) {
      setSelectedText(selection.trim());
    } else {
      setSelectedText('');
    }
  };

  const askSelectedText = () => {
    if (!selectedText) return;
    const question = `在論文原文中看到這段話：\n「${selectedText}」\n請幫我詳細翻譯並用淺顯易懂的話解釋它的意思，以及它在論文中的主要作用。`;
    handleSendMessage(question);
    setSelectedText('');
  };

  const exportChat = () => {
    if (chatHistory.length === 0) return;
    let mdContent = `# Chat Paper 對話記錄 - 《${paperAnalysis?.title || '未命名論文'}》\n\n`;
    chatHistory.forEach(chat => {
      const roleName = chat.role === 'user' ? '🙋 我' : '🤖 AI 助手';
      mdContent += `### ${roleName}\n${chat.text}\n\n`;
      if (chat.sources && chat.sources.length > 0) {
        mdContent += `*引用 RAG 來源：*\n`;
        chat.sources.forEach((src, i) => {
          mdContent += `> **[Source ${i + 1} | Page ${src.pageNum}]** ${src.text}\n\n`;
        });
      }
      mdContent += `---\n\n`;
    });

    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${paperAnalysis?.title || 'Paper'}_Chat_History.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearChat = () => {
    setChatHistory([
      {
        role: 'model',
        text: `對話記錄已清空。您可以繼續提問關於《${paperAnalysis?.title || '此論文'}》的問題！`,
        sources: []
      }
    ]);
  };

  // 渲染分頁原文
  const renderPageText = (page) => {
    const rawText = page.text;
    if (highlightedChunk && highlightedChunk.pageNum === page.pageNum) {
      const targetText = highlightedChunk.text;
      const index = rawText.indexOf(targetText);
      if (index !== -1) {
        const before = rawText.substring(0, index);
        const highlighted = rawText.substring(index, index + targetText.length);
        const after = rawText.substring(index + targetText.length);
        return (
          <p className="whitespace-pre-wrap">
            {before}
            <mark className="bg-yellow-400 text-slate-950 px-1 py-0.5 rounded shadow-md border border-yellow-500 font-semibold animate-pulse inline">
              {highlighted}
            </mark>
            {after}
          </p>
        );
      }
    }
    return <p className="whitespace-pre-wrap">{rawText}</p>;
  };

  const renderMarkdownMessage = (text) => {
    if (window.marked) {
      try {
        const parsedHtml = window.marked.parse(text);
        return (
          <div
            className="prose-custom max-w-none text-xs leading-relaxed break-words"
            dangerouslySetInnerHTML={{ __html: parsedHtml }}
          />
        );
      } catch (e) {
        console.error("Marked parsing error:", e);
      }
    }
    return <p className="whitespace-pre-wrap break-words">{text}</p>;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">

      {/* 載入自訂 Markdown & 排版 CSS */}
      <style>{`
        .prose-custom table {
          width: 100%;
          border-collapse: collapse;
          margin: 12px 0;
          font-size: 11px;
        }
        .prose-custom th, .prose-custom td {
          border: 1px solid #334155;
          padding: 6px 10px;
          text-align: left;
        }
        .prose-custom th {
          background-color: #1e293b;
          color: #f1f5f9;
        }
        .prose-custom ul {
          list-style-type: disc;
          padding-left: 18px;
          margin: 8px 0;
        }
        .prose-custom ol {
          list-style-type: decimal;
          padding-left: 18px;
          margin: 8px 0;
        }
        .prose-custom li {
          margin: 4px 0;
        }
        .prose-custom blockquote {
          border-left: 3px solid #6366f1;
          padding-left: 12px;
          color: #94a3b8;
          font-style: italic;
          margin: 8px 0;
        }
        .prose-custom code {
          background-color: #1e293b;
          color: #ec4899;
          padding: 1.5px 4px;
          border-radius: 4px;
          font-family: monospace;
          font-size: 11px;
        }
        .prose-custom pre {
          background-color: #0f172a;
          border: 1px solid #1e293b;
          padding: 10px;
          border-radius: 8px;
          overflow-x: auto;
          margin: 10px 0;
        }
        .prose-custom pre code {
          background-color: transparent;
          color: inherit;
          padding: 0;
          font-size: 11px;
        }
        .prose-custom h1, .prose-custom h2, .prose-custom h3, .prose-custom h4 {
          font-weight: 700;
          color: #f8fafc;
          margin-top: 14px;
          margin-bottom: 6px;
        }
        .prose-custom h1 { font-size: 1.25rem; }
        .prose-custom h2 { font-size: 1.1rem; }
        .prose-custom h3 { font-size: 1rem; }
      `}</style>

      { }
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-tr from-indigo-500 to-emerald-400 p-2 rounded-xl shadow-lg shadow-indigo-500/10">
            <Icons.Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="font-bold bg-gradient-to-r from-white via-indigo-200 to-emerald-300 bg-clip-text text-transparent">
              Chat Paper <span className="text-[10px] bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-1.5 py-0.5 rounded-full ml-1">v1.0</span>
            </h1>
            {/* <p className="text-[10px] text-slate-400 hidden sm:block">論文聊天系統</p> */}
          </div>
        </div>

        {/* 導覽列右側按鈕群組 */}
        <div className="flex items-center space-x-2.5 relative" ref={ragRef}>

          {/* 自訂 RAG 參數設定按鈕 (放置於免費金鑰左側) */}
          {paperAnalysis && (
            <div className="relative">
              <button
                onClick={() => setIsRagSettingsOpen(!isRagSettingsOpen)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg border flex items-center space-x-1.5 transition-all ${isRagSettingsOpen
                    ? 'bg-indigo-600/25 border-indigo-500 text-white'
                    : 'bg-slate-850 border-slate-750 text-slate-300 hover:bg-slate-800'
                  }`}
              >
                <Icons.Sliders />
                <span>RAG 設定</span>
                {/* <Icons.ChevronDown /> */}
              </button>

              {/* RAG 切片懸浮下拉面板 */}
              {isRagSettingsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-750 rounded-xl p-4 shadow-2xl z-50 animate-fadeIn">
                  <h4 className="text-xs font-bold text-indigo-400 flex items-center space-x-1.5 mb-3">
                    <Icons.Sliders />
                    <span>RAG 檢索段落設定（即時重組）</span>
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                        <span>段落長度 (Chunk Size)</span>
                        <span className="font-bold text-indigo-300">{chunkSize} 字</span>
                      </div>
                      <input
                        type="range"
                        min="100"
                        max="1000"
                        step="100"
                        value={chunkSize}
                        onChange={(e) => setChunkSize(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                        <span>重疊字數 (Overlap)</span>
                        <span className="font-bold text-indigo-300">{chunkOverlap} 字</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="90"
                        step="10"
                        value={chunkOverlap}
                        onChange={(e) => setChunkOverlap(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                      />
                    </div>
                  </div>
                  <div className="border-t border-slate-800 mt-3 pt-2.5 flex justify-between items-center text-[10px] text-slate-500">
                    <span>* 將重塑倒排索引</span>
                    <span className="text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 rounded-full">
                      已切分 {paperChunks.length} 段
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 金鑰與管理 */}
          <button
            onClick={() => setShowApiKeyModal(true)}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-750 transition-all flex items-center space-x-1.5 text-slate-200"
          >
            <span>🔑 {customApiKey ? "自訂金鑰已啟用" : "使用預設免費金鑰"}</span>
          </button>

          {paperAnalysis && (
            <button
              onClick={() => {
                setPaperAnalysis(null);
                setPages([]);
                setChatHistory([]);
              }}
              className="px-3 py-2 text-xs font-semibold text-rose-400 rounded-lg border border-rose-950/40 bg-rose-950/10 hover:bg-rose-950/30 transition-all flex items-center space-x-1.5"
            >
              <Icons.Trash />
              <span className="hidden sm:inline">更換論文</span>
            </button>
          )}
        </div>
      </header>

      { }
      <main className="flex-1 flex flex-col justify-center max-w-[1440px] w-full mx-auto p-4 lg:p-6 overflow-hidden">

        {/* 未上傳首頁狀態 */}
        {!paperAnalysis && !isLoading && (
          <div className="flex-1 flex flex-col items-center justify-center max-w-3xl mx-auto py-12 px-4 w-full">
            <div className="text-center mb-8">
              <span className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-xs font-semibold tracking-wide border border-indigo-500/20 mb-3 animate-pulse">
                AI RAG 論文聊天系統
              </span>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-3 bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent">
                開始您的 AI RAG 論文閱讀
              </h2>
              <p className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">
                提供多種輸入方式，支援 RAG 分塊切片與關鍵詞檢索，讓 AI 引導您的學術思維。
              </p>
            </div>

            {/* 上傳卡片 */}
            <div
              className="w-full bg-slate-900 border-2 border-dashed border-slate-800 hover:border-indigo-500/50 rounded-2xl p-8 lg:p-12 text-center transition-all duration-300 cursor-pointer shadow-xl shadow-indigo-950/10 group mb-8"
              onClick={() => fileInputRef.current.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files?.[0]) handlePdfUpload(e.dataTransfer.files[0]);
              }}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => handlePdfUpload(e.target.files[0])}
                className="hidden"
                accept=".pdf"
              />
              <div className="flex flex-col items-center">
                <Icons.Upload />
                <h3 className="text-base font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors">
                  拖曳 PDF 論文到此處，或 <span className="text-indigo-400 underline">點擊瀏覽檔案</span>
                </h3>
                <p className="text-xs text-slate-500 mt-2">
                  完全在瀏覽器端單機解析，隱私安全無虞
                </p>
              </div>
            </div>

            {/* 分割線 */}
            <div className="flex items-center w-full mb-8 text-slate-600">
              <div className="flex-1 border-t border-slate-800"></div>
              <span className="px-4 text-xs tracking-wider">或</span>
              <div className="flex-1 border-t border-slate-800"></div>
            </div>

            {/* 文字貼上與範例區 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {/* 貼上純文字 */}
              <div className="bg-slate-900 p-5 rounded-xl border-2 border-dashed border-slate-800 hover:border-indigo-500/50 transition-all duration-300 flex flex-col justify-between">
                <h4 className="text-sm font-semibold text-slate-300 mb-2 flex items-center space-x-1.5">
                  <Icons.FileText className="w-4 h-4 text-indigo-400" />
                  <span>貼上論文文字</span>
                </h4>
                <textarea
                  placeholder="請在此貼上論文的 Title, Abstract 或整篇文獻內容..."
                  className="w-full h-24 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleTextInput(e.target.value);
                    }
                  }}
                />
                <p className="text-[10px] text-slate-500 mt-1">按下 Enter 即可送出分析</p>
              </div>

              {/* 直連 arXiv 讀取原始論文 */}
              <div className="bg-slate-900 p-5 rounded-xl border-2 border-dashed border-slate-800 hover:border-indigo-500/50 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-slate-300 mb-2 flex items-center space-x-1.5">
                    <Icons.Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>範例論文《Attention Is All You Need》</span>
                  </h4>
                  <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                    使用經典論文《Attention Is All You Need》作為範例，展示如何讀取論文並進行 RAG 分析。
                  </p>
                </div>
                <button
                  onClick={loadDemoPaperFromArxiv}
                  className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white rounded-lg text-xs font-semibold shadow-lg shadow-indigo-950/50 transition-all transform active:scale-95"
                >
                  🚀 無需上傳，立即體驗！
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 正在加載論文時的頁數與進度計數 */}
        {isLoading && (
          <div className="flex-1 flex flex-col items-center justify-center py-24">
            <div className="relative mb-6">
              <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Icons.Sparkles className="w-6 h-6 text-indigo-400 animate-pulse" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-slate-200">{uploadProgress}</h3>
            <p className="text-xs text-slate-500 mt-2">我們正在為您下載、解讀並配置 RAG 高維度切塊資料庫...</p>
          </div>
        )}

        { }
        {paperAnalysis && !isLoading && (
          <div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-6 h-[calc(100vh-120px)] min-h-[500px] w-full overflow-hidden">

            {/* 左側：核心分析導讀、論文分頁原文 */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden h-full">

              {/* 頁籤導覽 */}
              <div className="flex border-b border-slate-800 bg-slate-950/50 p-2">
                <button
                  onClick={() => setActiveTab('summary')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${activeTab === 'summary'
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200'
                    }`}
                >
                  <Icons.FileText className="w-4 h-4" />
                  <span>論文重點分析</span>
                </button>
                <button
                  onClick={() => setActiveTab('viewer')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${activeTab === 'viewer'
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200'
                    }`}
                >
                  <Icons.Chat className="w-4 h-4" />
                  <span>論文完整原文 ({pages.length} 頁)</span>
                </button>
              </div>

              {/* 內容區 */}
              <div className="flex-1 p-6 overflow-y-auto">
                {activeTab === 'summary' ? (
                  <div className="space-y-6">
                    {/* 論文標題 */}
                    <div>
                      <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
                        論文標題
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-snug">
                        {paperAnalysis.title}
                      </h2>
                      <p className="text-xs text-slate-400">
                        👨‍💻 作者團隊：{paperAnalysis.authors ? paperAnalysis.authors.join(', ') : '未知'}
                      </p>
                    </div>

                    <hr className="border-slate-800" />

                    {/* 論文摘要 */}
                    <div>
                      <h3 className="text-xs font-bold text-slate-200 mb-2.5 flex items-center space-x-1.5 tracking-wide">
                        <span className="w-1.5 h-3.5 bg-indigo-500 rounded-full"></span>
                        <span>論文摘要簡介 (Abstract)</span>
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/30 p-4 rounded-xl border border-slate-850">
                        {paperAnalysis.abstract}
                      </p>
                    </div>

                    {/* 核心發現 */}
                    {paperAnalysis.keyTakeaways && (
                      <div>
                        <h3 className="text-xs font-bold text-slate-200 mb-3 flex items-center space-x-1.5 tracking-wide">
                          <span className="w-1.5 h-3.5 bg-emerald-400 rounded-full"></span>
                          <span>四大核心發現 (Key Takeaways)</span>
                        </h3>
                        <div className="grid grid-cols-1 gap-3">
                          {paperAnalysis.keyTakeaways.map((takeaway, idx) => (
                            <div
                              key={idx}
                              className="bg-slate-950/20 border border-slate-850 hover:border-slate-800 p-3.5 rounded-xl flex items-start space-x-3 transition-colors"
                            >
                              <span className="flex-shrink-0 bg-indigo-500/10 text-indigo-400 w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center">
                                {idx + 1}
                              </span>
                              <p className="text-xs text-slate-300 leading-relaxed pt-0.5">{takeaway}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-full flex flex-col">
                    {/* 劃詞提示 */}
                    <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-850 mb-4 flex items-start space-x-2">
                      <Icons.Info />
                      <div className="text-[10px] text-slate-400 leading-relaxed">
                        <strong className="text-indigo-400">劃詞問答提示</strong>：您可以在下方原文中選取任何一段文字，系統將彈出「提問」按鈕。當您在右側對話中點選引用來源時，系統也會在此頁為您高亮閃爍！
                      </div>
                    </div>

                    {/* 劃詞發問懸浮工具列 */}
                    {selectedText && (
                      <div className="mb-4 p-3 bg-indigo-950/40 border border-indigo-500/30 rounded-xl flex items-center justify-between animate-fadeIn">
                        <div className="flex-1 mr-4">
                          <p className="text-[10px] text-indigo-400 font-bold uppercase mb-1">已選取原文：</p>
                          <p className="text-xs text-slate-300 line-clamp-2 italic">"{selectedText}"</p>
                        </div>
                        <button
                          onClick={askSelectedText}
                          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all flex items-center space-x-1 flex-shrink-0"
                        >
                          <Icons.Sparkles className="w-3.5 h-3.5 text-white" />
                          <span>一鍵提問</span>
                        </button>
                      </div>
                    )}

                    {/* 原文內容 */}
                    <div
                      className="flex-1 bg-slate-950/40 border border-slate-850 rounded-xl p-4 font-mono text-xs leading-relaxed text-slate-300 overflow-y-auto selection:bg-indigo-500"
                      onMouseUp={handleTextSelection}
                    >
                      {pages.map((p) => (
                        <div
                          key={p.pageNum}
                          id={`page-container-${p.pageNum}`}
                          className={`mb-8 last:mb-0 p-4 rounded-xl border transition-all ${highlightedChunk && highlightedChunk.pageNum === p.pageNum
                              ? 'border-indigo-500 bg-indigo-950/10'
                              : 'border-transparent'
                            }`}
                        >
                          <div className="text-[10px] font-bold text-indigo-400 border-b border-slate-900 pb-1 mb-2 tracking-wider flex justify-between items-center">
                            <span>PAGE {p.pageNum}</span>
                            {highlightedChunk && highlightedChunk.pageNum === p.pageNum && (
                              <span className="text-[10px] text-emerald-400 font-bold animate-pulse">● 引用定位中</span>
                            )}
                          </div>
                          {renderPageText(p)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            { }
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden h-full">

              {/* 對話頭部 */}
              <div className="bg-slate-950/50 px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>
                  <span className="text-xs font-bold text-slate-200">正在與論文對話中</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={exportChat}
                    title="匯出 Markdown 對話"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <Icons.Download />
                  </button>
                  <button
                    onClick={clearChat}
                    title="清除對話"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                  >
                    <Icons.Trash />
                  </button>
                </div>
              </div>

              {/* 對話記錄 */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/10">
                {chatHistory.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6">
                    <div className="p-4 rounded-full bg-slate-800/50 mb-3">
                      <Icons.Chat className="w-8 h-8 text-indigo-400" />
                    </div>
                    <p className="text-xs text-slate-400">目前還沒有任何對話</p>
                    <p className="text-[10px] text-slate-500 mt-1">
                      試著點擊下方為您精選的推薦問題，或者手動輸入。
                    </p>
                  </div>
                )}
                {chatHistory.map((chat, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${chat.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <span className="text-[10px] text-slate-500 mb-1 px-1">
                      {chat.role === 'user' ? '🙋 You' : '🤖 AI'}
                    </span>
                    <div
                      className={`max-w-[90%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${chat.role === 'user'
                          ? 'bg-indigo-600 text-white rounded-tr-none'
                          : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-750'
                        }`}
                    >
                      {/* 支援 Markdown 渲染的區域 */}
                      {chat.role === 'model' ? renderMarkdownMessage(chat.text) : <p className="whitespace-pre-wrap break-words">{chat.text}</p>}

                      {/* RAG 來源連結區 (僅在 AI 助手回答下顯示) */}
                      {chat.role === 'model' && chat.sources && chat.sources.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-slate-700/50 text-[10px]">
                          <p className="text-indigo-400 font-bold mb-1 flex items-center">
                            <Icons.Link /> RAG 檢索來源（點擊跳轉）：
                          </p>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {chat.sources.map((src, srcIdx) => (
                              <button
                                key={srcIdx}
                                onClick={() => navigateToSourceChunk(src)}
                                className="bg-slate-950/60 hover:bg-indigo-500 hover:text-white text-slate-300 border border-slate-850 px-2 py-1 rounded transition-colors text-left text-[9px] block truncate max-w-[130px]"
                                title={`Page ${src.pageNum}: ${src.text.substring(0, 50)}...`}
                              >
                                📄 Source {srcIdx + 1} (Page {src.pageNum})
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isChatting && (
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] text-indigo-400 mb-1 px-1 animate-pulse">🤖 AI 正在檢索並生成回答中...</span>
                    <div className="bg-slate-850 text-slate-400 rounded-2xl rounded-tl-none px-4 py-3 text-xs border border-slate-800 flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* 智慧動態推薦問題：固定剛好 3 個 */}
              {dynamicQuestions.length > 0 && (
                <div className="p-4 border-t border-slate-850 bg-slate-900/50">
                  <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-2 flex items-center space-x-1">
                    <Icons.Sparkles className="w-3 h-3 text-emerald-400" />
                    <span>推薦延伸問題 (3 個)：</span>
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {dynamicQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(q)}
                        disabled={isChatting}
                        className="text-left px-3 py-1.5 rounded-lg bg-slate-950/40 border border-slate-850 text-[11px] text-slate-300 hover:text-white hover:bg-indigo-600/35 hover:border-indigo-500 transition-all truncate"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 對話輸入框 */}
              <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center space-x-2">
                <input
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  placeholder="輸入關於論文的問題 (RAG 系統會自動檢索)..."
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                  disabled={isChatting}
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={isChatting || !currentInput.trim()}
                  className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 p-3 rounded-xl transition-all shadow-lg shadow-indigo-950/50 flex-shrink-0"
                >
                  <Icons.Send />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* API Key Modal */}
      {showApiKeyModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-2 flex items-center space-x-2">
              <span>🔑 配置 Gemini API 金鑰</span>
            </h3>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              預設情況下系統會使用內置金鑰。如果您需要更高速的回答體驗，可以配置自己的 Google Gemini API 金鑰。
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">您的 API 金鑰</label>
                <input
                  type="password"
                  value={customApiKey}
                  onChange={(e) => setCustomApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setCustomApiKey('');
                  setShowApiKeyModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-850 text-xs font-semibold text-slate-300 transition-all"
              >
                重置為預設
              </button>
              <button
                onClick={() => setShowApiKeyModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition-all shadow-lg shadow-indigo-950/50"
              >
                儲存並返回
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}