/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, XCircle, RotateCcw, ChevronRight, BookOpen, Quote } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizData: Question[] = [
  {
    id: 1,
    question: "この 町の <u>人口</u> は どのぐらいですか。",
    options: ["にんこう", "ひとくち", "じんこう", "いりぐち"],
    correctAnswer: 2,
    explanation: "Dân số của thị trấn này khoảng bao nhiêu? (じんこう: Dân số)"
  },
  {
    id: 2,
    question: "暑いですね。エアコンを _______ 。",
    options: ["つけましょう", "あけましょう", "おしましょう", "ひらきましょう"],
    correctAnswer: 0,
    explanation: "Nóng nhỉ! Bật điều hòa lên đi! (つけます: Bật thiết bị điện)"
  },
  {
    id: 3,
    question: "黒い ペン _______ 書いて ください。",
    options: ["を", "に", "が", "で"],
    correctAnswer: 3,
    explanation: "Hãy viết bằng bút đen! (で: Chỉ phương tiện, cách thức)"
  },
  {
    id: 4,
    question: "あの 人は <u>かいしゃいん</u> です。",
    options: ["会社人", "会社員", "社会人", "社会員"],
    correctAnswer: 1,
    explanation: "Anh ấy là nhân viên công ty. (会社員: Nhân viên công ty)"
  },
  {
    id: 5,
    question: "ああ、のどが _______ 。つめたい 水が 飲みたい。",
    options: ["いたかった", "かわいた", "すいた", "ぬれた"],
    correctAnswer: 1,
    explanation: "Ôi, khát nước. Tôi muốn uống nước. (のどがかわく: Khát nước)"
  },
  {
    id: 6,
    question: "田中さんは イギリス人 _______ 結婚しました。",
    options: ["と", "に", "を", "へ"],
    correctAnswer: 0,
    explanation: "Anh Tanaka kết hôn với người Anh. (と: Cùng với ai đó)"
  },
  {
    id: 7,
    question: "今、<u>四時</u> です。",
    options: ["よじ", "しじ", "ようじ", "よんじ"],
    correctAnswer: 0,
    explanation: "Bây giờ là 4 giờ. (四時 - よじ: 4 giờ, trường hợp đặc biệt)"
  },
  {
    id: 8,
    question: "すみません、お手洗いを _______ ください。",
    options: ["かけて", "かりて", "かえして", "かして"],
    correctAnswer: 3,
    explanation: "Xin lỗi, cho tôi đi vệ sinh nhờ cái! (貸す - かす: Cho mượn/dùng nhờ)"
  },
  {
    id: 9,
    question: "この 道 _______ まっすぐ 行って ください。",
    options: ["に", "を", "で", "が"],
    correctAnswer: 1,
    explanation: "Hãy đi thẳng con đường này! (を: Chỉ hành động đi qua một địa điểm)"
  },
  {
    id: 10,
    question: "<u>ことし</u> 日本へ 来ました。",
    options: ["来年", "去年", "本年", "今年"],
    correctAnswer: 3,
    explanation: "Năm nay tôi đã đến Nhật Bản. (今年 - ことし: Năm nay)"
  },
  {
    id: 11,
    question: "あの 先生の 授業は _______ 。",
    options: ["つまる", "つまらない", "つもる", "つもらない"],
    correctAnswer: 1,
    explanation: "Giờ giảng của thầy giáo đó buồn tẻ. (つまらない: Buồn tẻ/Chán)"
  },
  {
    id: 12,
    question: "先月 日本に 来ました。来月の 10日 _______ います。",
    options: ["まで", "から", "か", "でも"],
    correctAnswer: 0,
    explanation: "Tôi đã đến Nhật Bản vào tháng trước. Tôi ở đến ngày mùng 10 tháng sau. (まで: Đến tận lúc nào)"
  },
  {
    id: 13,
    question: "<u>今日</u> は 日曜日で、休みです。",
    options: ["きょう", "きゅう", "ほんじつ", "こにち"],
    correctAnswer: 0,
    explanation: "Hôm nay là chủ nhật, được nghỉ. (今日 - きょう: Hôm nay)"
  },
  {
    id: 14,
    question: "これは、_______ 食べられない。",
    options: ["まずくて", "おいしくて", "やすくて", "きらくて"],
    correctAnswer: 0,
    explanation: "Cái này dở không thể ăn được. (まずい: Dở/Không ngon)"
  },
  {
    id: 15,
    question: "では、土曜日 _______ 日曜日に もう 一度 電話します。",
    options: ["に", "も", "や", "か"],
    correctAnswer: 3,
    explanation: "Vậy thứ bảy hoặc chủ nhật tôi sẽ gọi điện lại một lần nữa. (か: Hoặc là)"
  }
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const question = quizData[current];
  const progress = ((current + 1) / quizData.length) * 100;

  const handleSelect = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    if (index === question.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (current + 1 < quizData.length) {
      setCurrent(prev => prev + 1);
      setSelected(null);
      setIsFlipped(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
    setIsFlipped(false);
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white w-full max-w-md p-8 rounded-3xl shadow-xl border border-gray-100 text-center"
        >
          <div className="mb-6 inline-flex p-4 rounded-full bg-blue-50 text-blue-600">
            <BookOpen size={48} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Kết quả</h1>
          <p className="text-gray-500 mb-8">Bạn đã hoàn thành bài trắc nghiệm!</p>
          
          <div className="text-5xl font-black text-blue-600 mb-2">
            {Math.round((score / quizData.length) * 100)}%
          </div>
          <p className="text-xl font-medium text-gray-700 mb-8">
            {score} / {quizData.length} câu đúng
          </p>

          <button
            onClick={resetQuiz}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200 active:scale-95"
          >
            <RotateCcw size={20} />
            Làm lại từ đầu
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 font-sans">
      <div className="bg-white w-full max-w-lg p-6 sm:p-8 rounded-[2.5rem] shadow-2xl shadow-gray-200 border border-gray-50">
        {/* Header Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-bold text-gray-400 tracking-wider">
              CÂU {current + 1} / {quizData.length}
            </span>
            <span className="text-sm font-bold text-blue-600">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="bg-blue-600 h-full rounded-full"
            />
          </div>
        </div>

        {/* Question Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="mb-8"
          >
            <div className="flex gap-3 items-start mb-4">
              <Quote className="text-blue-100 fill-blue-100 rotate-180 flex-shrink-0" size={32} />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight" dangerouslySetInnerHTML={{ __html: question.question }} />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Options */}
        <div className="grid grid-cols-1 gap-3">
          {question.options.map((opt, index) => {
            const isCorrect = index === question.correctAnswer;
            const isSelected = index === selected;
            const showFeedback = selected !== null;

            return (
              <motion.button
                key={`${current}-${index}`}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(index)}
                disabled={showFeedback}
                className={`
                  relative group flex items-center justify-between p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 text-left
                  ${!showFeedback ? "border-gray-100 hover:border-blue-400 hover:bg-blue-50/30" : ""}
                  ${showFeedback && isCorrect ? "border-green-500 bg-green-50 text-green-700" : ""}
                  ${showFeedback && isSelected && !isCorrect ? "border-red-500 bg-red-50 text-red-700" : ""}
                  ${showFeedback && !isSelected && !isCorrect ? "opacity-50 border-gray-100 grayscale-[0.5]" : ""}
                `}
              >
                <span className="text-base sm:text-lg font-medium">{opt}</span>
                {showFeedback && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex-shrink-0 ml-2"
                  >
                    {isCorrect ? (
                      <CheckCircle2 className="text-green-500" size={24} />
                    ) : isSelected ? (
                      <XCircle className="text-red-500" size={24} />
                    ) : null}
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Explanation & Next */}
        <AnimatePresence>
          {selected !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-6 border-t border-gray-100"
            >
              <div className="bg-gray-50 p-4 rounded-2xl mb-6 flex gap-3">
                <BookOpen className="text-blue-600 flex-shrink-0" size={20} />
                <p className="text-sm text-gray-600 leading-relaxed italic">
                  {question.explanation}
                </p>
              </div>
              
              <button
                onClick={handleNext}
                className="w-full py-4 bg-gray-900 hover:bg-black text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group"
              >
                {current + 1 === quizData.length ? "Xem kết quả" : "Câu tiếp theo"}
                <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

