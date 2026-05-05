/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, XCircle, RotateCcw, ChevronRight, BookOpen } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizData1: Question[] = [
  {
    id: 1,
    question: "この <ruby>町<rt>まち</rt></ruby>の <u>人口</u> は どのぐらいですか。",
    options: ["にんこう", "ひとくち", "じんこう", "いりぐち"],
    correctAnswer: 2,
    explanation: "Dân số của thị trấn này khoảng bao nhiêu? (じんこう: Dân số)"
  },
  {
    id: 2,
    question: "<ruby>暑<rt>あつ</rt></ruby>いですね。エアコンを _______ 。",
    options: ["つけましょう", "あけましょう", "おしましょう", "ひらきましょう"],
    correctAnswer: 0,
    explanation: "Nóng nhỉ! Bật điều hòa lên đi! (つけます: Bật thiết bị điện)"
  },
  {
    id: 3,
    question: "<ruby>黒<rt>くろ</rt></ruby>い ペン _______ <ruby>書<rt>か</rt></ruby>いて ください。",
    options: ["を", "に", "が", "で"],
    correctAnswer: 3,
    explanation: "Hãy viết bằng bút đen! (で: Chỉ phương tiện, cách thức)"
  },
  {
    id: 4,
    question: "あの <ruby>人<rt>ひと</rt></ruby>は <u>かいしゃいん</u> です。",
    options: ["会社人", "会社員", "社会人", "社会員"],
    correctAnswer: 1,
    explanation: "Anh ấy là nhân viên công ty. (会社員: Nhân viên công ty)"
  },
  {
    id: 5,
    question: "ああ、のどが _______ 。つめたい <ruby>水<rt>みず</rt></ruby>が <ruby>飲<rt>の</rt></ruby>みたい。",
    options: ["いたかった", "かわいた", "すいた", "ぬれた"],
    correctAnswer: 1,
    explanation: "Ôi, khát nước. Tôi muốn uống nước. (のどがかわく: Khát nước)"
  },
  {
    id: 6,
    question: "<ruby>田中<rt>たなか</rt></ruby>さんは イギリス<ruby>人<rt>じん</rt></ruby> _______ <ruby>結婚<rt>けっこん</rt></ruby>しました。",
    options: ["と", "に", "を", "へ"],
    correctAnswer: 0,
    explanation: "Anh Tanaka kết hôn với người Anh. (と: Cùng với ai đó)"
  },
  {
    id: 7,
    question: "<ruby>今<rt>いま</rt></ruby>、<u>四時</u> です。",
    options: ["よじ", "しじ", "ようじ", "よんじ"],
    correctAnswer: 0,
    explanation: "Bây giờ là 4 giờ. (四時 - よじ: 4 giờ, trường hợp đặc biệt)"
  },
  {
    id: 8,
    question: "すみません、お<ruby>手洗<rt>てあら</rt></ruby>いを _______ ください。",
    options: ["かけて", "かりて", "かえして", "かして"],
    correctAnswer: 3,
    explanation: "Xin lỗi, cho tôi đi vệ sinh nhờ cái! (貸す - かす: Cho mượn/dùng nhờ)"
  },
  {
    id: 9,
    question: "この <ruby>道<rt>みち</rt></ruby> _______ まっすぐ <ruby>行<rt>い</rt></ruby>って ください。",
    options: ["に", "を", "で", "が"],
    correctAnswer: 1,
    explanation: "Hãy đi thẳng con đường này! (を: Chỉ hành động đi qua một địa điểm)"
  },
  {
    id: 10,
    question: "<u>ことし</u> <ruby>日本<rt>にほん</rt></ruby>へ <ruby>来<rt>き</rt></ruby>ました。",
    options: ["来年", "去年", "本年", "今年"],
    correctAnswer: 3,
    explanation: "Năm nay tôi đã đến Nhật Bản. (今年 - ことし: Năm nay)"
  },
  {
    id: 11,
    question: "あの <ruby>先生<rt>せんせい</rt></ruby>の <ruby>授業<rt>じゅぎょう</rt></ruby>は _______ 。",
    options: ["つまる", "つまらない", "つもる", "つもらない"],
    correctAnswer: 1,
    explanation: "Giờ giảng của thầy giáo đó buồn tẻ. (つまらない: Buồn tẻ/Chán)"
  },
  {
    id: 12,
    question: "<ruby>先月<rt>せんげつ</rt></ruby> <ruby>日本<rt>にほん</rt></ruby>に <ruby>来<rt>き</rt></ruby>ました. <ruby>来月<rt>らいげつ</rt></ruby>の <ruby>10日<rt>とおか</rt></ruby> _______ います。",
    options: ["まで", "から", "か", "でも"],
    correctAnswer: 0,
    explanation: "Tôi đã đến Nhật Bản vào tháng trước. Tôi ở đến ngày mùng 10 tháng sau. (まで: Đến tận lúc nào)"
  },
  {
    id: 13,
    question: "<u>今日</u> は <ruby>日曜日<rt>にちようび</rt></ruby>で、<ruby>休<rt>やす</rt></ruby>みです。",
    options: ["きょう", "きゅう", "ほんじつ", "こにち"],
    correctAnswer: 0,
    explanation: "Hôm nay là chủ nhật, được nghỉ. (今日 - きょう: Hôm nay)"
  },
  {
    id: 14,
    question: "これは、_______ <ruby>食<rt>た</rt></ruby>べられない。",
    options: ["まずくて", "おいしくて", "やすくて", "きらくて"],
    correctAnswer: 0,
    explanation: "Cái này dở không thể ăn được. (まずい: Dở/Không ngon)"
  },
  {
    id: 15,
    question: "では、<ruby>土曜日<rt>どようび</rt></ruby> _______ <ruby>日曜日<rt>にちようび</rt></ruby>に もう <ruby>一度<rt>いちど</rt></ruby> <ruby>電話<rt>でんわ</rt></ruby>します。",
    options: ["に", "も", "や", "か"],
    correctAnswer: 3,
    explanation: "Vậy thứ bảy hoặc chủ nhật tôi sẽ gọi điện lại một lần nữa. (か: Hoặc là)"
  }
];

const quizData2: Question[] = [
  {
    id: 16,
    question: "これから <ruby>日本語<rt>にほんご</rt></ruby>を <u>勉強</u> します。",
    options: ["ばんきゅう", "べんきょう", "べんきゅう", "ばんきょう"],
    correctAnswer: 1,
    explanation: "Từ giờ tôi sẽ học tiếng Nhật. (勉強 - べんきょう: Học tập)"
  },
  {
    id: 17,
    question: "<ruby>今日<rt>きょう</rt></ruby>が _______ で、<ruby>明日<rt>あした</rt></ruby>が <ruby>三日<rt>みっか</rt></ruby>です。",
    options: ["はつか", "ふつか", "よっか", "はたち"],
    correctAnswer: 1,
    explanation: "Hôm nay là mùng hai, ngày mai là mùng ba. (二日 - ふつか: Mùng 2)"
  },
  {
    id: 18,
    question: "_______ フランス<ruby>語<rt>ご</rt></ruby>が できる <ruby>人<rt>ひと</rt></ruby>は いませんか。",
    options: ["だれが", "だれか", "だれでも", "だれも"],
    correctAnswer: 1,
    explanation: "Có ai nói được tiếng Pháp không? (だれか: Ai đó)"
  },
  {
    id: 19,
    question: "<ruby>父<rt>ちち</rt></ruby>は フランス<ruby>語<rt>ご</rt></ruby>が <u>じょうず</u> です。",
    options: ["下手", "手上", "手下", "上手"],
    correctAnswer: 3,
    explanation: "Bố tôi giỏi tiếng Pháp. (上手 - じょうず: Giỏi)"
  },
  {
    id: 20,
    question: "A「<ruby>東京<rt>とうきょう</rt></ruby>まで あと どのくらい かかりますか。」 B「もうすぐ _______ よ。」",
    options: ["つきます", "でます", "うごきます", "かえります"],
    correctAnswer: 0,
    explanation: "A: 'Còn bao lâu nữa thì tới Tokyo?' B: 'Sắp tới nơi rồi.' (つきます: Đến nơi)"
  },
  {
    id: 21,
    question: "これは <ruby>日本語<rt>にほんご</rt></ruby>で _______ <ruby>言<rt>い</rt></ruby>いますか。",
    options: ["なに", "どう", "どうやって", "なぜ"],
    correctAnswer: 1,
    explanation: "Cái này Tiếng Nhật nói như thế nào? (どう: Như thế nào)"
  },
  {
    id: 22,
    question: "<u>駅</u> まで、タクシーで <ruby>十分<rt>じゅっぷん</rt></ruby>です。",
    options: ["いき", "あき", "うき", "えき"],
    correctAnswer: 3,
    explanation: "Đến ga mất 10 phút đi bằng taxi. (駅 - えき: Nhà ga)"
  },
  {
    id: 23,
    question: "_______ 、<ruby>失礼<rt>しつれい</rt></ruby>ですが、<ruby>田中<rt>たなか</rt></ruby>さんでは ありませんか。",
    options: ["ええ", "あのう", "ああ", "じゃあ"],
    correctAnswer: 1,
    explanation: "Xin lỗi anh cho tôi hỏi. Anh có phải là anh Tanaka không ạ? (あのう: Xin lỗi... dùng để bắt chuyện)"
  },
  {
    id: 24,
    question: "きのうは、そんなに _______ ね。",
    options: ["<ruby>寒<rt>さむ</rt></ruby>く ないでした", "<ruby>寒<rt>さむ</rt></ruby>く なかったです", "<ruby>寒<rt>さむ</rt></ruby>く なかったでした", "<ruby>寒<rt>さむ</rt></ruby>かった では ないです"],
    correctAnswer: 1,
    explanation: "Hôm qua không đến mức lạnh lắm nhỉ! (寒くなかったです: Quá khứ phủ định của tính từ i)"
  },
  {
    id: 25,
    question: "<u>けさ</u> は <ruby>七時<rt>しちじ</rt></ruby>に <ruby>起<rt>お</rt></ruby>きて ジョギングしました。",
    options: ["本朝", "分朝", "会朝", "今朝"],
    correctAnswer: 3,
    explanation: "Sáng nay, tôi dậy lúc 7 giờ rồi đi bộ. (今朝 - けさ: Sáng nay)"
  },
  {
    id: 26,
    question: "チャンネルを かえるから、テレビの _______ を <ruby>取<rt>と</rt></ruby>って ください。",
    options: ["リモコン", "パソコン", "エアコン", "コンピューター"],
    correctAnswer: 0,
    explanation: "Tôi muốn chuyển kênh nên lấy cho tôi cái điều khiển ti vi nào! (リモコン: Remote control)"
  },
  {
    id: 27,
    question: "<ruby>私<rt>わたし</rt></ruby>は テニスが <ruby>好<rt>す</rt></ruby>きですが、<ruby>上手<rt>じょうず</rt></ruby> _______ 。",
    options: ["ありませ ん", "ないです", "なりません", "じゃ ありません"],
    correctAnswer: 3,
    explanation: "Tôi thích chơi tenis nhưng không giỏi. (～じゃありません: Phủ định của danh từ/tính từ na)"
  },
  {
    id: 28,
    question: "<ruby>休<rt>やす</rt></ruby>みの <ruby>日<rt>ひ</rt></ruby>は <u>母</u> に <ruby>電話<rt>でんわ</rt></ruby>を します。",
    options: ["はは", "ちち", "まま", "かか"],
    correctAnswer: 0,
    explanation: "Vào ngày nghỉ, tôi gọi điện thoại cho mẹ. (母 - はは: Mẹ của mình)"
  },
  {
    id: 29,
    question: "A「ただいま。」 B「_______ 。」",
    options: ["いってきます", "いただきます", "いらっしゃいませ", "おかえりなさい"],
    correctAnswer: 3,
    explanation: "A: 'Anh về rồi đây!' B: 'Mừng anh đã về!' (おかえりなさい: Chào mừng về nhà)"
  },
  {
    id: 30,
    question: "<ruby>田中<rt>たなか</rt></ruby>さんは _______ やさしい <ruby>人<rt>ひと</rt></ruby>です。",
    options: ["きれいで", "きれくて", "きれいと", "きれい"],
    correctAnswer: 0,
    explanation: "Chị Tanaka là một người đẹp và tốt bụng. (きれい: Tính từ na -> kirei de)"
  }
];

const quizData3: Question[] = [
  {
    id: 31,
    question: "<ruby>先生<rt>せんせい</rt></ruby>が <u>学生</u> に <ruby>話<rt>はな</rt></ruby>を します。",
    options: ["がせい", "がくせい", "がくせん", "がっせい"],
    correctAnswer: 1,
    explanation: "Thầy giáo nói chuyện với sinh viên. (学生 - がくせい: Sinh viên)"
  },
  {
    id: 32,
    question: "いい <ruby>天気<rt>てんき</rt></ruby>だから、どこかへ _______ か。",
    options: ["でかけませんか", "でません", "あそびませんか", "きませんか"],
    correctAnswer: 0,
    explanation: "Trời đẹp, vì vậy đi đâu đó chơi không? (出かける - でかける: Đi ra ngoài chơi/du ngoạn)"
  },
  {
    id: 33,
    question: "A「あなたの コーヒーカップは どれですか。」 B「いちばん _______ です。」",
    options: ["<ruby>大<rt>おお</rt></ruby>きかった", "<ruby>大<rt>おお</rt></ruby>きもの", "<ruby>大<rt>おお</rt></ruby>きいの", "<ruby>大<rt>おお</rt></ruby>きい"],
    correctAnswer: 2,
    explanation: "A: 'Cốc cà phê của bạn là cái nào?' B: 'Cái to nhất.' (大きい - おおきい: To/Lớn. 'no' là đại từ thay thế cho cốc)"
  },
  {
    id: 34,
    question: "<u>ほんや</u> は <ruby>駅<rt>えき</rt></ruby>の <ruby>前<rt>まえ</rt></ruby>に あります。",
    options: ["書店", "書屋", "本店", "本屋"],
    correctAnswer: 3,
    explanation: "Hiệu sách nằm ở trước nhà ga. (本屋 - ほんや: Hiệu sách)"
  },
  {
    id: 35,
    question: "<ruby>毎朝<rt>まいあさ</rt></ruby>、<ruby>6時<rt>ろくじ</rt></ruby>に _______ <ruby>仕事<rt>しごと</rt></ruby>に <ruby>行<rt>い</rt></ruby>きます。",
    options: ["おいて", "おきて", "おこして", "おして"],
    correctAnswer: 1,
    explanation: "Hàng sáng, tôi dậy lúc 6 giờ và đi làm. (起きる - おきる: Thức dậy)"
  },
  {
    id: 36,
    question: "あの _______ <ruby>人<rt>ひと</rt></ruby>は だれですか。",
    options: ["かみは <ruby>長<rt>なが</rt></ruby>いの", "かみは <ruby>長<rt>なが</rt></ruby>い", "かみの <ruby>長<rt>なが</rt></ruby>いの", "かみの <ruby>長<rt>なが</rt></ruby>い"],
    correctAnswer: 3,
    explanation: "Người tóc dài kia là ai đấy? (髪の長い人 hoặc 髪が長い人)"
  },
  {
    id: 37,
    question: "<ruby>田中<rt>たなか</rt></ruby>さんは <u>明るい</u> 人です。",
    options: ["あかるい", "あきるい", "あくるい", "あけるい"],
    correctAnswer: 0,
    explanation: "Anh Tanaka là người vui vẻ. (明るい - あかるい: Sáng sủa/Vui vẻ)"
  },
  {
    id: 38,
    question: "この <ruby>紙<rt>かみ</rt></ruby>は _______ ですが、とても じょうぶです。",
    options: ["うすい", "あつい", "こい", "すずしい"],
    correctAnswer: 0,
    explanation: "Giấy này mỏng nhưng rất chắc chắn. (薄い - うすい: Mỏng)"
  },
  {
    id: 39,
    question: "<ruby>私<rt>わたし</rt></ruby>は あの <ruby>人<rt>ひと</rt></ruby>を _______ 。",
    options: ["しません", "していません", "しりません", "しって いません"],
    correctAnswer: 2,
    explanation: "Tôi không biết người đó. (知りません - しりません: Không biết)"
  },
  {
    id: 40,
    question: "<ruby>明日<rt>あした</rt></ruby>の <u>ごご</u> は <ruby>雨<rt>あめ</rt></ruby>でしょう。",
    options: ["牛後", "午後", "牛前", "午前"],
    correctAnswer: 1,
    explanation: "Có lẽ chiều mai trời sẽ mưa. (午後 - ごご: Buổi chiều)"
  },
  {
    id: 41,
    question: "<ruby>赤ちゃん<rt>あかちゃん</rt></ruby>の <ruby>泣<rt>な</rt></ruby>き<ruby>声<rt>ごえ</rt></ruby>が _______ 、ねられなかった。",
    options: ["げんきで", "うるさくて", "にぎやかで", "いそがしくて"],
    correctAnswer: 1,
    explanation: "Tiếng trẻ nhỏ khóc ầm ĩ, không tài nào ngủ được. (うるさい: Ồn ào/Phiền phức)"
  },
  {
    id: 42,
    question: "<ruby>近<rt>ちか</rt></ruby>くの スーパーは <ruby>夜<rt>よる</rt></ruby> <ruby>10時<rt>じゅうじ</rt></ruby>まで _______ 。",
    options: ["あいて います", "あけて います", "あきます", "あけます"],
    correctAnswer: 0,
    explanation: "Siêu thị ở gần đây mở cửa đến 10 giờ đêm. (開いています - あいています: Đang mở cửa)"
  },
  {
    id: 43,
    question: "ガソリンが <ruby>高<rt>たか</rt></ruby>くても <u>車</u> に のります。",
    options: ["しゃ", "ちゃ", "かるま", "くるま"],
    correctAnswer: 3,
    explanation: "Cho dù xăng đắt, tôi cũng vẫn đi ô tô. (車 - くるま: Ô tô)"
  },
  {
    id: 44,
    question: "<ruby>明日<rt>あした</rt></ruby>は <ruby>雪<rt>ゆき</rt></ruby>が _______ そうですよ。",
    options: ["おりる", "ふる", "おちる", "とまる"],
    correctAnswer: 1,
    explanation: "Nghe nói ngày mai tuyết rơi đấy. (降る - ふる: Rơi (tuyết, mưa))"
  },
  {
    id: 45,
    question: "A「すてきな シャツですね。」 B「ありがとうございます。<ruby>兄<rt>あに</rt></ruby>に _______ 。」",
    options: ["もらったんです", "あげたんです", "くれたんです", "やったんです"],
    correctAnswer: 0,
    explanation: "A: 'Áo đẹp thế nhỉ!' B: 'Cảm ơn! Anh tôi cho đấy.' (Nghĩa đen: Tôi đã nhận từ anh trai - もらう)"
  }
];

const quizData4: Question[] = [
  {
    id: 46,
    question: "<u>先月</u>、<ruby>花見<rt>はなみ</rt></ruby>を しました。",
    options: ["せんげつ", "せんがつ", "さんがつ", "さんげつ"],
    correctAnswer: 0,
    explanation: "Tháng trước tôi đã đi ngắm hoa. (先月 - せんげつ: Tháng trước)"
  },
  {
    id: 47,
    question: "この へやは、だんぼうが <ruby>入<rt>はい</rt></ruby>って いて _______ です。",
    options: ["さむい", "つめたい", "あたたかい", "すずしい"],
    correctAnswer: 2,
    explanation: "Phòng này có điều hòa nóng nên ấm. (あたたかい: Ấm áp. だんぼう: Thiết bị sưởi)"
  },
  {
    id: 48,
    question: "<ruby>私<rt>わたし</rt></ruby>は、<ruby>先月<rt>せんげつ</rt></ruby>から <ruby>子<rt>こ</rt></ruby>どもに <ruby>英語<rt>えいご</rt></ruby>を _______ 。",
    options: ["<ruby>教<rt>おし</rt></ruby>えます", "<ruby>教<rt>おし</rt></ruby>えました", "<ruby>教<rt>おし</rt></ruby>えたんです", "<ruby>教<rt>おし</rt></ruby>えています"],
    correctAnswer: 3,
    explanation: "Tôi đang dạy tiếng Anh cho trẻ con từ tháng trước. (～ている: Diễn tả hành động kéo dài từ quá khứ đến hiện tại)"
  },
  {
    id: 49,
    question: "<ruby>一<rt>いっ</rt></ruby>か<ruby>月<rt>げつ</rt></ruby>に <u>いっかい</u>, <ruby>友<rt>とも</rt></ruby>だちと <ruby>会<rt>あ</rt></ruby>います。",
    options: ["一度", "一回", "一会", "一目"],
    correctAnswer: 1,
    explanation: "Tôi gặp bạn bè một tháng một lần. (一回 - いっかい: 1 lần)"
  },
  {
    id: 50,
    question: "ここから <ruby>駅<rt>えき</rt></ruby>まで どのくらい <ruby>時間<rt>じかん</rt></ruby>が _______ か。",
    options: ["かけます", "かかります", "あります", "すぎます"],
    correctAnswer: 1,
    explanation: "Từ đây đến ga mất bao nhiêu thời gian? (かかる: Mất/tốn (thời gian, tiền bạc))"
  },
  {
    id: 51,
    question: "<ruby>田中<rt>たなか</rt></ruby>さん、<ruby>今日<rt>きょう</rt></ruby>も _______ ね。まだ <ruby>病気<rt>びょうき</rt></ruby>かな。",
    options: ["<ruby>来<rt>こ</rt></ruby>ない", "きない", "くない", "いかない"],
    correctAnswer: 0,
    explanation: "Anh Tanaka hôm nay cũng không đến nhỉ. Chắc vẫn còn ốm chăng? (来ない - こない: Thể phủ định của くる)"
  },
  {
    id: 52,
    question: "<ruby>電車<rt>でんしゃ</rt></ruby>で <u>新聞</u> を <ruby>読<rt>よ</rt></ruby>みます。",
    options: ["しんぶん", "しんむん", "しんもん", "しんぼん"],
    correctAnswer: 0,
    explanation: "Tôi đọc báo trong tàu điện. (新聞 - しんぶん: Tờ báo)"
  },
  {
    id: 53,
    question: "_______ が ないから, <ruby>洗<rt>あら</rt></ruby>えないよ。",
    options: ["せんざい", "せんたく", "クリーニング", "そうじ"],
    correctAnswer: 0,
    explanation: "Không có nước rửa bát/bột giặt nên không thể rửa/giặt được đâu. (せんざい: Chất tẩy rửa/Xà phòng)"
  },
  {
    id: 54,
    question: "<ruby>田中<rt>たなか</rt></ruby>さん、<ruby>今度<rt>こんど</rt></ruby> いっしょに <ruby>映画<rt>えいが</rt></ruby>に _______ か。",
    options: ["<ruby>行<rt>い</rt></ruby>くでしょう", "<ruby>行<rt>い</rt></ruby>きません", "<ruby>行<rt>い</rt></ruby>きませんか", "<ruby>行<rt>い</rt></ruby>くません"],
    correctAnswer: 2,
    explanation: "Anh Tanaka này, lần tới cùng tôi đi xem phim không? (～ませんか: Lời mời mọc, rủ rê)"
  },
  {
    id: 55,
    question: "<ruby>五時<rt>ごじ</rt></ruby>に <ruby>学校<rt>がっこう</rt></ruby>から <u>かえりました</u>。",
    options: ["借りました", "入りました", "通りました", "帰りました"],
    correctAnswer: 3,
    explanation: "5 giờ, tôi đi học về. (帰る - かえる: Về nhà/Điểm đến của mình)"
  },
  {
    id: 56,
    question: "あ, この <ruby>車<rt>くるま</rt></ruby>、ガソリンが ほとんど _______ いないよ。",
    options: ["かって", "はいって", "いれて", "なくなって"],
    correctAnswer: 1,
    explanation: "A, xe ô tô này hầu như không còn xăng. (はいっている: Đang chứa/Trong trạng thái có)"
  },
  {
    id: 57,
    question: "A「まどを _______ 。」 B「はい、おねがいします。」",
    options: ["<ruby>開<rt>あ</rt></ruby>けましょうか", "<ruby>開<rt>あ</rt></ruby>けても いいですか", "<ruby>開<rt>あ</rt></ruby>けなさい", "<ruby>開<rt>あ</rt></ruby>けて くれませんか"],
    correctAnswer: 0,
    explanation: "A: 'Tôi có thể mở cửa sổ ra được không?' B: 'Vâng, nhờ anh mở ra!' (～ましょうか: Đề nghị làm giúp việc gì đó)"
  },
  {
    id: 58,
    question: "あの <ruby>子<rt>こ</rt></ruby>は <ruby>私<rt>わたし</rt></ruby>の <u>妹</u> です。",
    options: ["いもと", "いもうと", "おとと", "おとうと"],
    correctAnswer: 1,
    explanation: "Đứa bé này là em gái tôi. (妹 - いもうと: Em gái)"
  },
  {
    id: 59,
    question: "<ruby>明日<rt>あした</rt></ruby>は テストが あるから、<ruby>学校<rt>がっこう</rt></ruby>へ <ruby>行<rt>い</rt></ruby>くのが _______ です。",
    options: ["いや", "ひどい", "むり", "きらい"],
    correctAnswer: 0,
    explanation: "Ngày mai có bài kiểm tra nên tôi không muốn đến trường. (いや: Khó chịu/Không thích/Ghét)"
  },
  {
    id: 60,
    question: "のどが かわいたね。<ruby>何<rt>なに</rt></ruby>か _______ よ。",
    options: ["<ruby>飲<rt>の</rt></ruby>んだ", "<ruby>飲<rt>の</rt></ruby>もう", "<ruby>飲<rt>の</rt></ruby>みなさい", "<ruby>飲<rt>の</rt></ruby>んでない"],
    correctAnswer: 1,
    explanation: "Khát nhỉ! Uống cái gì đi thôi. (～おう: Thể ý chí/Mời mọc thân mật)"
  }
];

const quizData5: Question[] = [
  {
    id: 61,
    question: "<u>英語</u> の <ruby>歌<rt>うた</rt></ruby>を <ruby>歌<rt>うた</rt></ruby>いましょう。",
    options: ["えご", "えが", "えいご", "えいが"],
    correctAnswer: 2,
    explanation: "Hãy hát một bài tiếng Anh nào! (英語 - えいご: Tiếng Anh)"
  },
  {
    id: 62,
    question: "この ベッドは _______ 、<ruby>一<rt>ひと</rt></ruby><ruby>人<rt>り</rt></ruby>で <ruby>動<rt>うご</rt></ruby>かせない。",
    options: ["あつくて", "おもくて", "おおくて", "かたくて"],
    correctAnswer: 1,
    explanation: "Cái giường này nặng, một người không thể xê dịch được. (重い - おもい: Nặng)"
  },
  {
    id: 63,
    question: "<ruby>一年<rt>いちねん</rt></ruby><ruby>前<rt>まえ</rt></ruby>は、ひらがなも _______ が、<ruby>今<rt>いま</rt></ruby>は <ruby>漢字<rt>かんじ</rt></ruby>も だいぶ <ruby>分<rt>わ</rt></ruby>かります。",
    options: ["<ruby>読<rt>よ</rt></ruby>めませんでした", "<ruby>読<rt>よ</rt></ruby>みませんでした", "<ruby>読<rt>よ</rt></ruby>んで いませんでした", "<ruby>読<rt>よ</rt></ruby>まなかったです"],
    correctAnswer: 0,
    explanation: "Một năm trước, đến cả chữ Hiragana tôi cũng không đọc được nhưng bây giờ thì chữ Hán cũng biết được khá nhiều. (読める: Có thể đọc)"
  },
  {
    id: 64,
    question: "<ruby>大<rt>おお</rt></ruby>きいから <ruby>半分<rt>はんぶん</rt></ruby>に <u>きって</u> ください。",
    options: ["闇って", "来って", "切って", "着って"],
    correctAnswer: 2,
    explanation: "To nên hãy cắt đôi ra! (切る - きる: Cắt)"
  },
  {
    id: 65,
    question: "A「<ruby>新<rt>あたら</rt></ruby>しい <ruby>仕事<rt>しごと</rt></ruby>は どうですか。」 B「うーん、あんまり _______ …。」",
    options: ["いそがないんです", "いそがしいんです", "ゆっくりなんです", "おもしろくないんです"],
    correctAnswer: 3,
    explanation: "A: 'Công việc mới thế nào?' B: 'Ừ, chẳng thú vị lắm.' (おもしろくない: Không thú vị)"
  },
  {
    id: 66,
    question: "もしもし、もしもし、よく <ruby>聞<rt>き</rt></ruby>こえない んですが…。",
    options: ["<ruby>聞<rt>き</rt></ruby>こえない", "<ruby>聞<rt>き</rt></ruby>いてない", "<ruby>聞<rt>き</rt></ruby>けない", "<ruby>聞<rt>き</rt></ruby>かない"],
    correctAnswer: 0,
    explanation: "A lô... A lô... Không nghe rõ... (聞こえる: Nghe thấy (tự nhiên))"
  },
  {
    id: 67,
    question: "あの <ruby>女<rt>おんな</rt></ruby>の <ruby>人<rt>ひと</rt></ruby>は <u>有名</u> な <ruby>歌手<rt>かしゅ</rt></ruby>です。",
    options: ["ようめい", "ゆうめい", "ゆうみん", "ようみん"],
    correctAnswer: 1,
    explanation: "Người phụ nữ ấy là ca sỹ nổi tiếng. (有名 - ゆうめい: Nổi tiếng)"
  },
  {
    id: 68,
    question: "<ruby>荷物<rt>にもつ</rt></ruby>を たくさん <ruby>持<rt>も</rt></ruby>って かさを _______ のは たいへんだ。",
    options: ["あける", "さす", "つける", "はく"],
    correctAnswer: 1,
    explanation: "Vừa mang nhiều đồ vừa cầm ô khá vất vả. (かさをさす: Che ô)"
  },
  {
    id: 69,
    question: "A「<ruby>田中<rt>たなか</rt></ruby>さんも <ruby>中村<rt>なかむら</rt></ruby>さんも <ruby>来<rt>き</rt></ruby>て いましたよ。」 B「<ruby>私<rt>わたし</rt></ruby>も みんなに _______ です。」",
    options: ["<ruby>会<rt>あ</rt></ruby>えなかった", "<ruby>会<rt>あ</rt></ruby>いたかった", "<ruby>会<rt>あ</rt></ruby>いたいでした", "<ruby>会<rt>あ</rt></ruby>いたくなった"],
    correctAnswer: 1,
    explanation: "A: 'Cả anh Tanaka và anh Nakamura đều đến đấy!' B: 'Tôi cũng muốn gặp mọi người.' (～たい: Muốn)"
  },
  {
    id: 70,
    question: "<ruby>兄<rt>あに</rt></ruby>は <u>きょねん</u>、<ruby>大学<rt>だいがく</rt></ruby>に <ruby>入<rt>はい</rt></ruby>りました。",
    options: ["前年", "今年", "来年", "去年"],
    correctAnswer: 3,
    explanation: "Năm ngoái, anh trai tôi vào đại học. (去年 - きょねん: Năm ngoái)"
  },
  {
    id: 71,
    question: "<ruby>熱<rt>ねつ</rt></ruby>が _______ ましたか。",
    options: ["さがり", "さげ", "おり", "おち"],
    correctAnswer: 0,
    explanation: "Đã hạ sốt chưa? (下がる - さがる: Giảm/Hạ xuống)"
  },
  {
    id: 72,
    question: "<ruby>明日<rt>あした</rt></ruby>の <ruby>夕方<rt>ゆうがた</rt></ruby>ごろから、<ruby>雨<rt>あめ</rt></ruby>が <ruby>強<rt>つよ</rt></ruby>く _______ でしょう。",
    options: ["ふる", "ふり", "ふった", "ふって いる"],
    correctAnswer: 0,
    explanation: "Có lẽ từ chiều mai trời sẽ mưa to. (降る - ふる: Rơi (mưa))"
  },
  {
    id: 73,
    question: "あの <ruby>林<rt>はやし</rt></ruby> の <ruby>中<rt>なか</rt></ruby>を <u>歩いて</u> <ruby>行<rt>い</rt></ruby>きませんか。",
    options: ["あぬいて", "あるいて", "あのいて", "あろいて"],
    correctAnswer: 1,
    explanation: "Đi bộ vào trong rừng kia không? (林 - はやし: Rừng thưa/Lùm cây)"
  },
  {
    id: 74,
    question: "<ruby>私<rt>わたし</rt></ruby>は ３<ruby>人<rt>にん</rt></ruby> _______ の まん中です。",
    options: ["こども", "ふうふ", "きょうだい", "かぞく"],
    correctAnswer: 2,
    explanation: "Tôi là con thứ hai trong gia đình có ba anh em. (きょうだい: Anh chị em)"
  },
  {
    id: 75,
    question: "<ruby>私<rt>わたし</rt></ruby>は <ruby>歌<rt>うた</rt></ruby>が _______ 、カラオケに <ruby>行<rt>い</rt></ruby>きたくない。",
    options: ["へたから", "へたなから", "へただから", "へたでから"],
    correctAnswer: 2,
    explanation: "Tôi hát dở nên không muốn đi karaoke. (下手 - へた (Tính từ na) + だから: Vì ... nên)"
  }
];

const quizData6: Question[] = [
  {
    id: 76,
    question: "ここに <u>名前</u> と <ruby>電話番号<rt>でんわばんごう</rt></ruby>を <ruby>書<rt>か</rt></ruby>いて ください。",
    options: ["なまえ", "なめえ", "なめい", "なまい"],
    correctAnswer: 0,
    explanation: "Hãy viết tên và số điện thoại liên lạc vào đây! (名前 - なまえ: Tên)"
  },
  {
    id: 77,
    question: "この ビルは _______ ですね。<ruby>何階<rt>なんがい</rt></ruby>まで あるのでしょうか。",
    options: ["たかい", "ほそい", "ふとい", "ながい"],
    correctAnswer: 0,
    explanation: "Tòa nhà này cao nhỉ! Nó cao nhiêu tầng vậy? (高い - たかい: Cao)"
  },
  {
    id: 78,
    question: "かぜを _______ 、<ruby>学校<rt>がっこう</rt></ruby>を <ruby>休<rt>やす</rt></ruby>みました。",
    options: ["<ruby>引<rt>ひ</rt></ruby>きて", "<ruby>引<rt>ひ</rt></ruby>くから", "<ruby>引<rt>ひ</rt></ruby>いて", "<ruby>引<rt>ひ</rt></ruby>きたから"],
    correctAnswer: 2,
    explanation: "Tôi bị cảm nên nghỉ học. (かぜをひく: Bị cảm)"
  },
  {
    id: 79,
    question: "ちょっと <u>ちず</u> を <ruby>見<rt>み</rt></ruby>せて ください。",
    options: ["池国", "池図", "地国", "地図"],
    correctAnswer: 3,
    explanation: "Cho tôi xem bản đồ một chút! (地図 - ちず: Bản đồ)"
  },
  {
    id: 80,
    question: "<ruby>会社<rt>かいしゃ</rt></ruby>まで <ruby>遠<rt>とお</rt></ruby>いので、<ruby>毎日<rt>まいにち</rt></ruby> <ruby>電車<rt>でんしゃ</rt></ruby>で _______ のは たいへんです。",
    options: ["つとめる", "はたらく", "のる", "かよう"],
    correctAnswer: 3,
    explanation: "Đến công ty xa nên hàng ngày tôi đi đi về về bằng tàu điện khá vất vả. (通う - かよう: Đi học/đi làm thường xuyên)"
  },
  {
    id: 81,
    question: "<ruby>朝<rt>あさ</rt></ruby> _______ すぐに シャワーを あびます。",
    options: ["<ruby>起<rt>お</rt></ruby>きるから", "<ruby>起<rt>お</rt></ruby>きた", "<ruby>起<rt>お</rt></ruby>きて", "<ruby>起<rt>お</rt></ruby>きたから"],
    correctAnswer: 2,
    explanation: "Buổi sáng thức dậy, tôi tắm vòi hoa sen luôn. (起きて - おきて: Thức dậy (thể te nối câu))"
  },
  {
    id: 82,
    question: "<ruby>来週<rt>らいしゅう</rt></ruby>、<u>国</u> へ <ruby>帰<rt>かえ</rt></ruby>ります。",
    options: ["こに", "にく", "くに", "こく"],
    correctAnswer: 2,
    explanation: "Tuần sau, tôi về nước. (国 - くに: Đất nước/Tổ quốc)"
  },
  {
    id: 83,
    question: "_______ <ruby>家<rt>うち</rt></ruby>ですが、<ruby>一度<rt>いちど</rt></ruby> あそびに <ruby>来<rt>き</rt></ruby>て ください。",
    options: ["ほそい", "せまい", "すくない", "ちょっと"],
    correctAnswer: 1,
    explanation: "Nhà tôi hơi chật nhưng hãy đến chơi một lần cho biết! (狭い - せまい: Chật hẹp)"
  },
  {
    id: 84,
    question: "<ruby>宿題<rt>しゅくだい</rt></ruby>を _______ <ruby>学校<rt>がっこう</rt></ruby>へ <ruby>来<rt>き</rt></ruby>ました。",
    options: ["しないでから", "しないで", "しないが", "しないて"],
    correctAnswer: 1,
    explanation: "Tôi đã không làm bài tập mà đến trường. (しないで: Làm cái gì đó mà không...)"
  },
  {
    id: 85,
    question: "<ruby>図書館<rt>としょかん</rt></ruby>で <ruby>本<rt>ほん</rt></ruby>を <u>かります</u>。",
    options: ["借ります", "貸ります", "質ります", "便ります"],
    correctAnswer: 0,
    explanation: "Tôi mượn sách ở thư viện. (借りる - かりる: Mượn)"
  },
  {
    id: 86,
    question: "この たなは とても _______ <ruby>使<rt>つか</rt></ruby>いやすいです。",
    options: ["だいじょうぶで", "たいへんで", "じょうぶで", "よわくて"],
    correctAnswer: 2,
    explanation: "Cái giá này vừa rất chắc chắn vừa dễ sử dụng. (丈夫 - じょうぶ: Bền/Vững chắc)"
  },
  {
    id: 87,
    question: "レストランで _______ <ruby>話<rt>はな</rt></ruby>しましょう。",
    options: ["<ruby>食<rt>た</rt></ruby>べなくて", "<ruby>食<rt>た</rt></ruby>べないで", "<ruby>食<rt>た</rt></ruby>べるから", "<ruby>食<rt>た</rt></ruby>べながら"],
    correctAnswer: 3,
    explanation: "Vừa ăn uống vừa nói chuyện ở nhà hàng nào! (ながら: Vừa làm cái này vừa làm cái kia)"
  },
  {
    id: 88,
    question: "<ruby>弟<rt>おとうと</rt></ruby> は レストランで <u>働いて</u> います。",
    options: ["はらいた", "はたらいて", "はだらいて", "はらだいて"],
    correctAnswer: 1,
    explanation: "Em trai tôi đang làm ở nhà hàng. (働く - はたらく: Làm việc)"
  },
  {
    id: 89,
    question: "ここまで <ruby>遠<rt>とお</rt></ruby>かったでしょう。_______ いらっしゃいました。",
    options: ["こんなに", "いつも", "とても", "よく"],
    correctAnswer: 3,
    explanation: "Đến đây xa phải không? Anh đến được đây quý hóa lắm! (よく: Thường dùng với いらっしゃいました để chào đón khách đi đường xa)"
  },
  {
    id: 90,
    question: "<ruby>病気<rt>びょうき</rt></ruby>は なおりました。もう _______ <ruby>食<rt>た</rt></ruby>べられます。",
    options: ["なんでも", "なにも", "ぜんぜん", "あんまり"],
    correctAnswer: 0,
    explanation: "Khỏi bệnh rồi. Giờ thì cái gì cũng có thể ăn. (何でも - なんで も: Bất cứ thứ gì)"
  }
];

const quizData7: Question[] = [
  {
    id: 91,
    question: "デパートの <u>屋上</u> に <ruby>上<rt>あ</rt></ruby>がる。",
    options: ["やじょう", "おくじょう"],
    correctAnswer: 1,
    explanation: "Đi lên sân thượng của trung tâm thương mại. (屋上 - おくじょう: Sân thượng)"
  },
  {
    id: 92,
    question: "ラジオを <u>ききます</u>。",
    options: ["聞きます", "開きます"],
    correctAnswer: 0,
    explanation: "Nghe đài. (聞く - きく: Nghe)"
  },
  {
    id: 93,
    question: "ちょっと _______ です。エアコンの <ruby>温度<rt>おんど</rt></ruby>を <ruby>上<rt>あ</rt></ruby>げて ください。",
    options: ["あたたかい", "さむい"],
    correctAnswer: 1,
    explanation: "Hơi lạnh một chút. Hãy tăng nhiệt độ điều hòa lên. (寒い - さむい: Lạnh)"
  },
  {
    id: 94,
    question: "A「それ、<ruby>買<rt>か</rt></ruby>ったの？」 B「ううん、<ruby>図書館<rt>としょかん</rt></ruby>で _______ 。",
    options: ["かりたの", "かしたの"],
    correctAnswer: 0,
    explanation: "A: 'Cái đó bạn mua à?' B: 'Không, tớ mượn ở thư viện.' (借りる - かりる: Mượn)"
  },
  {
    id: 95,
    question: "<ruby>今日<rt>きょう</rt></ruby>は、あまり _______ です。",
    options: ["<ruby>暑<rt>あつ</rt></ruby>くなかった", "<ruby>暑<rt>あつ</rt></ruby>いじゃなかった"],
    correctAnswer: 0,
    explanation: "Hôm nay trời không nóng lắm. (暑くない - あつくない: Không nóng)"
  },
  {
    id: 96,
    question: "インターネット _______ <ruby>調<rt>しら</rt></ruby>べる。",
    options: ["が", "で"],
    correctAnswer: 1,
    explanation: "Tra cứu bằng internet. (で: Phương tiện/công cụ tra cứu)"
  },
  {
    id: 97,
    question: "<u>大人</u> は <ruby>千円<rt>せんえん</rt></ruby>、子どもは <ruby>五百円<rt>ごひゃくえん</rt></ruby>です。",
    options: ["おとな", "おたな"],
    correctAnswer: 0,
    explanation: "Người lớn là 1000 yên, trẻ em là 500 yên. (大人 - おとな: Người lớn)"
  },
  {
    id: 98,
    question: "<u>ちず</u> を かきましょうか。",
    options: ["地理", "地図"],
    correctAnswer: 1,
    explanation: "Tôi vẽ bản đồ cho bạn nhé? (地図 - ちず: Bản đồ)"
  },
  {
    id: 99,
    question: "しょうゆが _______ なったら、<ruby>買<rt>か</rt></ruby>って きて。",
    options: ["すくなく", "ちょっと"],
    correctAnswer: 0,
    explanation: "Khi nào xì dầu ít đi (sắp hết) thì mua về nhé. (少なくなる: Trở nên ít đi)"
  },
  {
    id: 100,
    question: "<ruby>家<rt>うち</rt></ruby>に <ruby>帰<rt>かえ</rt></ruby>ったら、すぐに パソコンを _______ 。",
    options: ["おします", "つけます"],
    correctAnswer: 1,
    explanation: "Sau khi về nhà, tôi bật máy tính ngay. (つける: Bật (thiết bị điện))"
  },
  {
    id: 101,
    question: "<ruby>今日<rt>きょう</rt></ruby>の <ruby>授業<rt>じゅぎょう</rt></ruby>は _______ でしたか。",
    options: ["どう", "どうやって"],
    correctAnswer: 0,
    explanation: "Tiết học hôm nay thế nào? (どう: Như thế nào)"
  },
  {
    id: 102,
    question: "<ruby>弟<rt>おとうと</rt></ruby>は、<ruby>今<rt>いま</rt></ruby>ごろ ゲームを _______ 。",
    options: ["やります", "やって いるでしょう"],
    correctAnswer: 1,
    explanation: "Giờ này có lẽ em trai tôi đang chơi game. (～ているでしょう: Có lẽ đang làm gì đó)"
  },
  {
    id: 103,
    question: "この <u>時計</u> は スイスのです。",
    options: ["とかい", "とけい"],
    correctAnswer: 1,
    explanation: "Cái đồng hồ này là của Thụy Sĩ. (時計 - とけい: Đồng hồ)"
  },
  {
    id: 104,
    question: "<u>おさきに</u> しつれいします。",
    options: ["お先に", "お前に"],
    correctAnswer: 0,
    explanation: "Tôi xin phép về trước. (お先に - おさきに: [Làm gì đó] trước)"
  },
  {
    id: 105,
    question: "<ruby>花<rt>はな</rt></ruby>を もらったけれど、_______ <ruby>花<rt>か</rt></ruby>びんが ない。",
    options: ["いれる", "はいれる"],
    correctAnswer: 0,
    explanation: "Tôi được tặng hoa nhưng không có bình để cắm vào. (入れる - いれる: Cho vào/Cắm vào)"
  },
  {
    id: 106,
    question: "この へんは <ruby>人<rt>ひと</rt></ruby>が <ruby>少<rt>すく</rt></ruby>なくて とても _______ です。",
    options: ["にぎやか", "しずか"],
    correctAnswer: 1,
    explanation: "Khu vực này ít người nên rất yên tĩnh. (静か - しずか: Yên tĩnh)"
  },
  {
    id: 107,
    question: "よく _______ 。もう<ruby>一度<rt>いちど</rt></ruby> お<ruby>願<rt>ねが</rt></ruby>いします。",
    options: ["<ruby>聞<rt>き</rt></ruby>こえませんでした", "<ruby>聞<rt>き</rt></ruby>きませんでした"],
    correctAnswer: 0,
    explanation: "(Tôi) đã không nghe rõ. Làm ơn nói lại một lần nữa. (聞こえる: Nghe thấy (tự nhiên))"
  },
  {
    id: 108,
    question: "この カレー、あまり _______ ね。",
    options: ["からいです", "からくありません"],
    correctAnswer: 1,
    explanation: "Món cà ri này không cay lắm nhỉ. (あまり + Phủ định: Không... lắm)"
  },
  {
    id: 109,
    question: "すみません、<u>上着</u> を ぬいても いいですか。",
    options: ["うわぎ", "うえき"],
    correctAnswer: 0,
    explanation: "Xin lỗi, tôi cởi áo khoác ngoài ra có được không? (上着 - うわぎ: Áo khoác ngoài)"
  },
  {
    id: 110,
    question: "みんなで <u>わけましょう</u>。",
    options: ["分けましょう", "半けましょう"],
    correctAnswer: 0,
    explanation: "Mọi người hãy cùng chia ra nào. (分ける - わける: Chia ra)"
  },
  {
    id: 111,
    question: "この <ruby>問題<rt>もんだい</rt></ruby>が わかる <ruby>人<rt>ひと</rt></ruby>は、<ruby>手<rt>て</rt></ruby>を _______ ください。",
    options: ["あげて", "あがって"],
    correctAnswer: 0,
    explanation: "Người nào hiểu câu hỏi này thì hãy giơ tay lên. (あげる: Giơ lên/Nâng lên)"
  },
  {
    id: 112,
    question: "<ruby>明日<rt>あした</rt></ruby>は <ruby>旅行<rt>りょこう</rt></ruby>に <ruby>行<rt>い</rt></ruby>くので、<ruby>早<rt>はや</rt></ruby>く <ruby>家<rt>うち</rt></ruby>を _______ 。",
    options: ["でます", "いそぎます"],
    correctAnswer: 0,
    explanation: "Vì ngày mai đi du lịch nên (tôi) sẽ rời nhà sớm. (出る - でる: Rời khỏi/Đi ra)"
  },
  {
    id: 113,
    question: "この <ruby>問題<rt>もんだい</rt></ruby>は _______ できません。",
    options: ["むずかしくて", "むずかしかったから"],
    correctAnswer: 0,
    explanation: "Câu hỏi này khó nên (tôi) không làm được. (Thể te chỉ nguyên nhân)"
  },
  {
    id: 114,
    question: "<ruby>私<rt>わたし</rt></ruby>の <ruby>誕生日<rt>たんじょうび</rt></ruby>に <ruby>父<rt>ちち</rt></ruby>が <ruby>時計<rt>とけい</rt></ruby>を _______ 。",
    options: ["あげました", "くれました"],
    correctAnswer: 1,
    explanation: "Vào ngày sinh nhật của tôi, bố đã tặng tôi một chiếc đồng hồ. (くれた: Tặng cho tôi/người nhà tôi)"
  },
  {
    id: 115,
    question: "<u>午前中</u> は ひまです。",
    options: ["ごぜんちゅう", "ごぜんじゅう"],
    correctAnswer: 0,
    explanation: "Suốt buổi sáng tôi rảnh. (午前中 - ごぜんちゅう: Trong buổi sáng)"
  },
  {
    id: 116,
    question: "友だちが _______ して います。",
    options: ["<ruby>入院<rt>にゅういん</rt></ruby>", "<ruby>入学<rt>にゅうがく</rt></ruby>"],
    correctAnswer: 0,
    explanation: "Bạn tôi đang nằm viện. (入院 - にゅういん: Nhập viện)"
  },
  {
    id: 117,
    question: "むすこは <ruby>大阪<rt>おおさか</rt></ruby>の <ruby>会社<rt>かいしゃ</rt></ruby>に _______ います。",
    options: ["はたらいて", "つとめて"],
    correctAnswer: 1,
    explanation: "Con trai tôi đang làm việc cho một công ty ở Osaka. (勤める - つとめる: Làm việc cho tổ chức nào đó - dùng trợ từ ni)"
  },
  {
    id: 118,
    question: "こんなに _______ <ruby>本<rt>ほん</rt></ruby>を <ruby>持<rt>も</rt></ruby>って <ruby>行<rt>い</rt></ruby>くのは たいへんです。",
    options: ["あつい", "ふとい"],
    correctAnswer: 0,
    explanation: "Mang theo cuốn sách dày thế này thật là vất vả. (厚い - あつい: Dày)"
  },
  {
    id: 119,
    question: "<ruby>朝<rt>あさ</rt></ruby>から _______ <ruby>食<rt>た</rt></ruby>べて いないから、おなかが すきました。",
    options: ["なにか", "なにも"],
    correctAnswer: 1,
    explanation: "Từ sáng tới giờ chưa ăn gì nên tôi thấy đói. (なにも + Phủ định: Không cái gì cả)"
  },
  {
    id: 120,
    question: "<ruby>明日<rt>あした</rt></ruby> <ruby>試験<rt>しけん</rt></ruby>だから、<ruby>今日<rt>きょう</rt></ruby>は _______ <ruby>勉強<rt>べんきょう</rt></ruby>します。",
    options: ["<ruby>寝<rt>ね</rt></ruby>ないで", "<ruby>寝<rt>ね</rt></ruby>ながら"],
    correctAnswer: 0,
    explanation: "Vì ngày mai thi nên hôm nay tôi sẽ học mà không ngủ. (～ないで: Mà không làm gì đó)"
  },
  {
    id: 121,
    question: "<ruby>私<rt>わたし</rt></ruby>は <ruby>四人<rt>よにん</rt></ruby> <u>兄弟</u> の <ruby>一番上<rt>いちばんうえ</rt></ruby>です。",
    options: ["きょうだい", "けいだい"],
    correctAnswer: 0,
    explanation: "Tôi là con cả trong bốn anh chị em. (兄弟 - きょうだい: Anh chị em)"
  },
  {
    id: 122,
    question: "これは _______ <ruby>本<rt>ほん</rt></ruby>です。",
    options: ["<ruby>大切<rt>たいせつ</rt></ruby>な", "<ruby>大事<rt>だいじ</rt></ruby>な"],
    correctAnswer: 0,
    explanation: "Đây là cuốn sách quan trọng. (大切 - たいせつ: Quan trọng/Quý giá)"
  },
  {
    id: 123,
    question: "<ruby>今年<rt>ことし</rt></ruby>の <ruby>12月<rt>じゅうにがつ</rt></ruby>に _______ に なります。",
    options: ["はつか", "はたち"],
    correctAnswer: 1,
    explanation: "Tháng 12 năm nay tôi sẽ tròn 20 tuổi. (はたち: 20 tuổi)"
  },
  {
    id: 124,
    question: "この たなは <ruby>安<rt>やす</rt></ruby>かったけれど、とても _______ です。",
    options: ["じょうぶ", "だいじょうぶ"],
    correctAnswer: 0,
    explanation: "Cái giá này tuy rẻ nhưng rất chắc chắn. (丈夫 - じょうぶ: Bền/Chắc)"
  },
  {
    id: 125,
    question: "<ruby>漢字<rt>かんじ</rt></ruby>は ぜんぜん _______ ことが できません。",
    options: ["<ruby>読<rt>よ</rt></ruby>む", "<ruby>読<rt>よ</rt></ruby>める"],
    correctAnswer: 0,
    explanation: "Tôi hoàn toàn không thể đọc được chữ Hán. (V-ru koto ga dekiru: Có thể làm gì)"
  }
];

const quizData8: Question[] = [
  {
    id: 126,
    question: "A「あと <u>何分</u>？」 B「<ruby>二分<rt>にふん</rt></ruby>です。」",
    options: ["なんぶん", "なんふん", "なんぷん", "なにふん"],
    correctAnswer: 2,
    explanation: "A: 'Còn mấy phút nữa?' B: 'Hai phút.' (何分 - なんぷん: Mấy phút)"
  },
  {
    id: 127,
    question: "A「<ruby>田中<rt>たなか</rt></ruby>さん、お<ruby>昼<rt>ひる</rt></ruby>ごはん、<ruby>食<rt>た</rt></ruby>べに <ruby>行<rt>い</rt></ruby>かない？」 B「<ruby>今日<rt>きょう</rt></ruby>は _______ を <ruby>持<rt>も</rt></ruby>って <ruby>来<rt>き</rt></ruby>たの。」",
    options: ["おべんとう", "ばんごはん", "ランチ", "おみやげ"],
    correctAnswer: 0,
    explanation: "A: 'Tanaka ơi, đi ăn cơm trưa không?' B: 'Hôm nay mình mang cơm hộp đi rồi.' (お弁当 - おべんとう: Cơm hộp)"
  },
  {
    id: 128,
    question: "<ruby>私<rt>わたし</rt></ruby>は <ruby>日本語<rt>にほんご</rt></ruby>が <ruby>少<rt>すこ</rt></ruby>し _______ <ruby>話<rt>はな</rt></ruby>せません。",
    options: ["しか", "ぐらい", "ばかり", "だけ"],
    correctAnswer: 0,
    explanation: "Tôi chỉ nói được một ít tiếng Nhật. (しか + Phủ định: Chỉ)"
  },
  {
    id: 129,
    question: "それは <u>じどう</u> ドアです。",
    options: ["自動", "自働", "手動", "手働"],
    correctAnswer: 0,
    explanation: "Đó là cửa đóng mở tự động. (自動 - じどう: Tự động)"
  },
  {
    id: 130,
    question: "<ruby>公園<rt>こうえん</rt></ruby>の ベンチに _______ が <ruby>一人<rt>ひとり</rt></ruby> すわっています。",
    options: ["としをとるひと", "ふるいひと", "おとしより", "ふるいおじいさん"],
    correctAnswer: 2,
    explanation: "Có một người già đang ngồi ở ghế công viên. (お年寄り - おとしより: Người già)"
  },
  {
    id: 131,
    question: "また、<ruby>遊<rt>あそ</rt></ruby>び _______ <ruby>来<rt>き</rt></ruby>て ください。",
    options: ["は", "に", "を", "か"],
    correctAnswer: 1,
    explanation: "Lại đến chơi nữa nhé! (V-masu + に + 来る/行く: Mục đích)"
  },
  {
    id: 132,
    question: "<u>毎月</u>、<ruby>銀行<rt>ぎんこう</rt></ruby>へ <ruby>行<rt>い</rt></ruby>きます。",
    options: ["まいつき", "まいがつ", "めいげつ", "めいつき"],
    correctAnswer: 0,
    explanation: "Hàng tháng tôi đến ngân hàng. (毎月 - まいつき: Mỗi tháng)"
  },
  {
    id: 133,
    question: "ぼくの しゅみは <ruby>山<rt>やま</rt></ruby>に _______ ことです。",
    options: ["あるく", "のぼる", "おりる", "わたる"],
    correctAnswer: 1,
    explanation: "Sở thích của tôi là leo núi. (登る - のぼる: Leo (núi))"
  },
  {
    id: 134,
    question: "A「どうした a_______ ？」 B「おなかが <ruby>痛<rt>いた</rt></ruby>い b_______ です。」",
    options: ["a. の b. なん", "a. の b. ん", "a. か b. ん", "a. か b. の"],
    correctAnswer: 1,
    explanation: "A: \"Có chuyện gì đấy?\" B: \"Tôi đau bụng.\" (～のです/～んです: Giải thích lý do/tình hình)"
  },
  {
    id: 135,
    question: "<ruby>百万円<rt>ひゃくまんえん</rt></ruby>あったら、<ruby>何<rt>なに</rt></ruby>に <u>つかいます</u> か。",
    options: ["使います", "作ります", "用います", "利います"],
    correctAnswer: 0,
    explanation: "Giả sử có một triệu yên thì bạn sẽ dùng nó vào việc gì? (使う - つかう: Sử dụng)"
  },
  {
    id: 136,
    question: "_______ を <ruby>教<rt>おし</rt></ruby>えて ください。メールします。",
    options: ["<ruby>名前<rt>なまえ</rt></ruby>", "アドレス", "<ruby>電話番号<rt>でんわばんごう</rt></ruby>", "<ruby>住所<rt>じゅうしょ</rt></ruby>"],
    correctAnswer: 1,
    explanation: "Cho tôi địa chỉ của bạn! Tôi sẽ gửi mail cho. (アドレス: Địa chỉ (email))"
  },
  {
    id: 137,
    question: "<ruby>弟<rt>おとうと</rt></ruby>は テレビ _______ <ruby>見<rt>み</rt></ruby>て いて, ぜんぜん <ruby>勉強<rt>べんきょう</rt></ruby>しません。",
    options: ["ぐらい", "も", "ばかり", "しか"],
    correctAnswer: 2,
    explanation: "Em trai tôi toàn xem ti vi, chẳng học hành gì cả. (ばかり: Toàn là/Suốt ngày)"
  },
  {
    id: 138,
    question: "<u>お姉さん</u> は お<ruby>元気<rt>げんき</rt></ruby>ですか。",
    options: ["おねいさん", "おにいさん", "おねえさん", "おあねさん"],
    correctAnswer: 2,
    explanation: "Chị khoẻ không ạ? (お姉さん - おねえさん: Chị gái người khác)"
  },
  {
    id: 139,
    question: "<ruby>鳥<rt>とり</rt></ruby>が たくさん <ruby>空<rt>そら</rt></ruby>を _______ います。",
    options: ["さんぽして", "はしって", "あそんで", "とんで"],
    correctAnswer: 3,
    explanation: "Chim bay đầy trời. (飛ぶ - とぶ: Bay)"
  },
  {
    id: 140,
    question: "これは、<ruby>日本人<rt>にほんじん</rt></ruby> _______ <ruby>読<rt>よ</rt></ruby>めない <ruby>漢字<rt>かんじ</rt></ruby>です。",
    options: ["だけ", "ばかり", "でも", "ぐらい"],
    correctAnswer: 2,
    explanation: "Đây là chữ Hán đến cả người Nhật cũng không đọc được. (でも: Ngay cả/Đến cả)"
  }
];

const quizData9: Question[] = [
  {
    id: 141,
    question: "A「この ワインは いくらですか。」 B「<u>千六百円</u>です。」",
    options: ["せんろくひゃくえん", "せんろっぴゃくえん", "せんろくびゃくえん", "せんろびゃくえん"],
    correctAnswer: 1,
    explanation: "A: 'Rượu vang này bao nhiêu tiền?' B: '1.600 yên.' (千六百 - せんろっぴゃく: 1600)"
  },
  {
    id: 142,
    question: "まちがえたら, けしゴムで きれいに _______ ください。",
    options: ["きえて", "けして", "きって", "けって"],
    correctAnswer: 1,
    explanation: "Nếu sai thì hãy xoá sạch bằng tẩy. (消す - けす: Xóa)"
  },
  {
    id: 143,
    question: "A「あなたの カップは どっちですか。」 B「_______ です。」",
    options: [
      "<ruby>大<rt>おお</rt></ruby>きい の ほう",
      "もっと <ruby>大<rt>おお</rt></ruby>きい",
      "<ruby>大<rt>おお</rt></ruby>きい ほう",
      "ずっと <ruby>大<rt>おお</rt></ruby>きい"
    ],
    correctAnswer: 2,
    explanation: "A: 'Cốc của bạn là cái đằng nào?' B: 'Cái đằng to.' (～ほう: Phía/Đằng... dùng trong so sánh)"
  },
  {
    id: 144,
    question: "<ruby>姉<rt>あね</rt></ruby>は <ruby>八時<rt>はちじ</rt></ruby>に <ruby>家<rt>うち</rt></ruby>を <u>でます</u>。",
    options: ["発ます", "去ます", "出ます", "着ます"],
    correctAnswer: 2,
    explanation: "Chị gái tôi đi ra khỏi nhà lúc 8 giờ. (出ます - でます: Đi ra/Rời khỏi)"
  },
  {
    id: 145,
    question: "<ruby>外<rt>そと</rt></ruby>は <ruby>暑<rt>あつ</rt></ruby>いですよ。ぼうしを _______ ほうが いいですよ。",
    options: ["きた", "かぶった", "つけた", "かけます"],
    correctAnswer: 1,
    explanation: "Bên ngoài nóng đấy nhé! Nên đội mũ vào. (かぶる: Đội (mũ))"
  },
  {
    id: 146,
    question: "きのうより _______ <ruby>寒<rt>さむ</rt></ruby>いですね。",
    options: [
      "<ruby>今日<rt>きょう</rt></ruby>ほど",
      "<ruby>今日<rt>きょう</rt></ruby>の ほうが",
      "<ruby>今日<rt>きょう</rt></ruby>と おなじくらい",
      "<ruby>今日<rt>きょう</rt></ruby>と ちがって"
    ],
    correctAnswer: 1,
    explanation: "Ngày hôm nay lạnh hơn hôm qua. (～ほうが: ... hơn (trong so sánh))"
  },
  {
    id: 147,
    question: "あの <ruby>木<rt>き</rt></ruby>の <ruby>下<rt>した</rt></ruby>で、<u>少し</u> <ruby>休<rt>やす</rt></ruby>みましょう。",
    options: ["すこし", "すくし", "しこし", "そこし"],
    correctAnswer: 0,
    explanation: "Chúng ta nghỉ một chút dưới tán cây kia nào! (少し - すこし: Một chút)"
  },
  {
    id: 148,
    question: "A「まどを <ruby>開<rt>あ</rt></ruby>けましょうか。」 B「はい、_______ 。」",
    options: ["おねがいします", "どうぞ", "わかりました", "もちろん"],
    correctAnswer: 0,
    explanation: "A: 'Mở cửa sổ giúp tôi nhé?' B: 'Vâng, nhờ anh.' (おねがいします: Nhờ vả/Làm ơn)"
  },
  {
    id: 149,
    question: "コーヒーと <ruby>紅茶<rt>こうちゃ</rt></ruby>と、_______ ですか。",
    options: ["なんの ほう", "どれが いい", "どっちの ほう", "どちらが いい"],
    correctAnswer: 3,
    explanation: "Cà phê và trà, anh thích cái nào hơn? (どちら: Cái nào (trong 2 cái))"
  },
  {
    id: 150,
    question: "あの <ruby>男<rt>おとこ</rt></ruby>の <ruby>人<rt>ひと</rt></ruby>は <u>あし</u> が <ruby>長<rt>なが</rt></ruby>いです。",
    options: ["兄", "足", "歩", "首"],
    correctAnswer: 1,
    explanation: "Người đàn ông ấy chân dài. (足 - あし: Chân)"
  },
  {
    id: 151,
    question: "この スーパーは、_______ まで <ruby>開<rt>あ</rt></ruby>いて いるので <ruby>便利<rt>べんり</rt></ruby>です。",
    options: ["やすく", "とおく", "おそく", "ひろく"],
    correctAnswer: 2,
    explanation: "Siêu thị này tiện vì nó đóng cửa muộn. (遅く - おそく: Muộn)"
  },
  {
    id: 152,
    question: "<ruby>富士山<rt>ふじさん</rt></ruby>は エベレスト _______ 。",
    options: ["より <ruby>高<rt>たか</rt></ruby>い", "ほど <ruby>高<rt>たか</rt></ruby>くない", "の ほうが <ruby>高<rt>たか</rt></ruby>い", "の ようより <ruby>高<rt>たか</rt></ruby>くない"],
    correctAnswer: 1,
    explanation: "Núi Phú Sỹ không cao bằng núi Everest. (～ほど～ない: Không bằng...)"
  },
  {
    id: 153,
    question: "<u>海</u> や <ruby>川<rt>かわ</rt></ruby>で <ruby>魚<rt>さかな</rt></ruby>を とります。",
    options: ["うめ", "かわ", "うみ", "やま"],
    correctAnswer: 2,
    explanation: "Tôi đánh bắt cá ở biển và ở sông. (海 - うみ: Biển)"
  },
  {
    id: 154,
    question: "<ruby>先週<rt>せんしゅう</rt></ruby>は、<ruby>一週間<rt>いちしゅうかん</rt></ruby>の うち _______ も <ruby>休<rt>やす</rt></ruby>んで しまった。",
    options: ["よっか", "ようか", "ここのか", "ついたち"],
    correctAnswer: 0,
    explanation: "Tuần trước, tôi đã nghỉ mất 4 ngày trong một tuần. (四日 - よっか: 4 ngày/Ngày mùng 4)"
  },
  {
    id: 155,
    question: "<ruby>宿題<rt>しゅくだい</rt></ruby>は _______ <ruby>終<rt>お</rt></ruby>わりましたか。",
    options: ["まだ", "もう", "あとで", "もうすぐ"],
    correctAnswer: 1,
    explanation: "Bài tập làm xong rồi chứ? (もう: Đã/Rồi)"
  }
];

const quizData10: Question[] = [
  {
    id: 156,
    question: "<ruby>夏休<rt>なつやす</rt></ruby>みには いつも <ruby>家族<rt>かぞく</rt></ruby>で <u>旅行</u> します。",
    options: ["りょうこ", "りょうこう", "りょこ", "りょこう"],
    correctAnswer: 3,
    explanation: "Nghỉ hè bao giờ cũng đi du lịch cả gia đình. (旅行 - りょこう: Du lịch)"
  },
  {
    id: 157,
    question: "<ruby>夜中<rt>よなか</rt></ruby>に <ruby>何度<rt>なんど</rt></ruby>も <ruby>目<rt>め</rt></ruby>が _______ 。",
    options: ["あけました", "さめました", "とまりました", "おきました"],
    correctAnswer: 1,
    explanation: "Nửa đêm tỉnh dậy nhiều lần. (目が覚める - めがさめる: Tỉnh giấc/Thức giấc)"
  },
  {
    id: 158,
    question: "A「これ、あなたが したの？」 B「いや、_______ しないよ。」",
    options: ["これを", "そう", "そんなに", "そんなこと"],
    correctAnswer: 3,
    explanation: "A: Anh đã làm chuyện này à? B: Không, tôi không bao giờ làm chuyện đó! (そんなこと: Việc như thế (chỉ sự việc vừa được nhắc đến))"
  },
  {
    id: 159,
    question: "うさぎは <u>め</u> が 赤い。",
    options: ["目", "耳", "首", "足"],
    correctAnswer: 0,
    explanation: "Thỏ mắt đỏ. (目 - め: Mắt)"
  },
  {
    id: 160,
    question: "ご _______ は お元気ですか。",
    options: ["いもうと", "かあさま", "おくさん", "りょうしん"],
    correctAnswer: 3,
    explanation: "Bố mẹ anh có khỏe không? (ご両親 - ごりょうしん: Bố mẹ (của người khác))"
  },
  {
    id: 161,
    question: "A「今日の 試験、ぜんぜん できませんでした。」 B「_______ むずかしかったんですか。」",
    options: ["どんな ように", "そんなに", "こんなに", "あんなに"],
    correctAnswer: 1,
    explanation: "A: Bài thi hôm nay hoàn toàn không làm được tí nào. B: Khó đến thế kia à? (そんなに: Đến thế/Đến mức đó)"
  },
  {
    id: 162,
    question: "走ったら、８時の バスに <u>間に合う</u> かもしれない。",
    options: ["めにあう", "みにあう", "まにあう", "もにあう"],
    correctAnswer: 2,
    explanation: "Nếu chạy thì có lẽ kịp chuyến xe buýt 8 giờ. (間に合う - まにあう: Kịp)"
  },
  {
    id: 163,
    question: "最近、タバコを _______ 人が 減りましたね。",
    options: ["くう", "すう", "ふく", "はく"],
    correctAnswer: 1,
    explanation: "Gần đây, người hút thuốc lá đã giảm đi nhỉ! (吸う - すう: Hút)"
  },
  {
    id: 164,
    question: "_______ 、ぜんぶ 食べました。",
    options: ["のこしないで", "のこならないで", "のこさないで", "のこって ないで"],
    correctAnswer: 2,
    explanation: "Tôi đã ăn hết sạch, không để thừa. (残す - のこす: Để lại/Để thừa)"
  },
  {
    id: 165,
    question: "今、何と <u>いいました</u> か。",
    options: ["話しました", "白いました", "言いました", "語りました"],
    correctAnswer: 2,
    explanation: "Vừa nói gì đấy? (言う - いう: Nói)"
  },
  {
    id: 166,
    question: "_______ が 悪いんです。早く 帰っても いいですか。",
    options: ["からだ", "げんき", "くうき", "きぶん"],
    correctAnswer: 3,
    explanation: "Tôi cảm thấy khó chịu trong người. Tôi có thể về sớm được không? (気分 - きぶん: Tâm trạng/Cảm giác (trong người))"
  },
  {
    id: 167,
    question: "この ゲームを したいけれど、_______ が 分からない。",
    options: ["やりこと", "やりかた", "あそぶこと", "あそぶかた"],
    correctAnswer: 1,
    explanation: "Tôi thích chơi trò game này nhưng không biết cách chơi. (V-masu + かた: Cách làm gì đó)"
  },
  {
    id: 168,
    question: "この りんごは パーティーの とき、_______ 食べました。",
    options: ["切って", "切らないで", "切ってから", "切らなくて"],
    correctAnswer: 1,
    explanation: "Quả táo này lúc ở bữa tiệc tôi đã không cắt mà ăn luôn. (～ないで: Làm gì đó mà không...)"
  },
  {
    id: 169,
    question: "駅まで _______ 歩いたので、疲れました。",
    options: ["やっと", "ずっと", "きっと", "もっと"],
    correctAnswer: 1,
    explanation: "Vì tôi đã đi bộ suốt đến tận ga nên mệt. (ずっと: Suốt/Mãi)"
  },
  {
    id: 170,
    question: "田中さん、テレビばかり 見ていないで、少しは _______ 。",
    options: ["勉強しなさい", "勉強するな", "勉強しなさいか", "勉強しろ"],
    correctAnswer: 0,
    explanation: "Chị Tanaka, đừng toàn xem tivi như thế, hãy học một chút đi! (～なさい: Hãy... (mệnh lệnh nhẹ nhàng))"
  }
];

const quizData11: Question[] = [
  {
    id: 171,
    question: "あそこの <u>店員</u> さんは 親切です。",
    options: ["てんにん", "てんいん", "でんいん", "でんにん"],
    correctAnswer: 1,
    explanation: "Người nhân viên bán hàng ở đó thân thiện. (店員 - てんいん: Nhân viên cửa hàng)"
  },
  {
    id: 172,
    question: "くつを ぬいで、スリッパに _______ ください。",
    options: ["ぬぎかえて", "いれあけて", "きがえて", "はきかえて"],
    correctAnswer: 3,
    explanation: "Hãy cởi giày ra, thay dép đi trong nhà! (はきかえる: Thay (giày, dép, quần...))"
  },
  {
    id: 173,
    question: "田中さん、このごろ とても _______ ね。",
    options: ["きれいに なりました", "きれいに しました", "きれいな 人です", "きれいだったです"],
    correctAnswer: 0,
    explanation: "Chị Tanaka dạo này trở nên rất xinh nhỉ! (～に なる: Trở nên, trở thành)"
  },
  {
    id: 174,
    question: "だれかが 門の 所に <u>たって</u> いる。",
    options: ["立って", "建って"],
    correctAnswer: 0,
    explanation: "Có ai đó đang đứng ở chỗ cổng. (立つ - たつ: Đứng)"
  },
  {
    id: 175,
    question: "時間が なかったので、_______ 行きました。",
    options: ["急いで", "速く", "早く", "あわてて"],
    correctAnswer: 0,
    explanation: "Vì không có thời gian nên tôi đã đi vội vã. (急ぐ - いそぐ: Khẩn trương/Vội vã)"
  },
  {
    id: 176,
    question: "窓を _______ 、外を 見ました。",
    options: ["あけて", "あいて", "あきました", "あけました"],
    correctAnswer: 1,
    explanation: "Cửa sổ mở, tôi đã nhìn ra ngoài. (開く - あく: Mở (tự động từ))"
  },
  {
    id: 177,
    question: "あの 男の 人は <u>あし</u> が 長いです。",
    options: ["足", "手", "口", "目"],
    correctAnswer: 0,
    explanation: "Người đàn ông đó chân dài. (足 - あし: Chân)"
  },
  {
    id: 178,
    question: "<ruby>家<rt>いえ</rt></ruby>から 学校まで どのくらい かかりますか。",
    options: ["一時間ぐらい", "一時間ごろ", "一時間まえ", "一時間まで"],
    correctAnswer: 0,
    explanation: "Từ nhà đến trường mất khoảng bao lâu? (ぐらい: Khoảng (khoảng thời gian))"
  },
  {
    id: 179,
    question: "いい 天気だから、_______ 行きませんか。",
    options: ["どこか", "どこも", "どこかへ", "どこへか"],
    correctAnswer: 0,
    explanation: "Trời đẹp nên đi đâu đó không? (どこか: Đâu đó)"
  },
  {
    id: 180,
    question: "電車で <u>新聞</u> を 読みます。",
    options: ["しんぶん", "しんもん", "しんぼん", "しんむん"],
    correctAnswer: 0,
    explanation: "Tôi đọc báo trên tàu điện. (新聞 - しんぶん: Tờ báo)"
  },
  {
    id: 181,
    question: "毎日、寝る 前に 歯を _______ 。",
    options: ["あらいます", "みがきます", "ふきます", "きれいにします"],
    correctAnswer: 1,
    explanation: "Hàng ngày, trước khi đi ngủ tôi đều đánh răng. (磨く - みがく: Đánh/Chải (răng))"
  },
  {
    id: 182,
    question: "この ネクタイは 妻が _______ 。",
    options: ["作って あげました", "作って くださいました", "作って くれました", "作って やりました"],
    correctAnswer: 2,
    explanation: "Cái cà vạt này là vợ tôi làm cho. (～てくれた: Ai đó làm gì cho mình/người thân mình)"
  },
  {
    id: 183,
    question: "社長は <u>京都</u> へ 行きました。",
    options: ["きょうと", "きょうど", "きゅうと", "きゅうど"],
    correctAnswer: 0,
    explanation: "Tổng giám đốc đã đi Kyoto. (京都 - きょうと: Kyoto)"
  },
  {
    id: 184,
    question: "この プールは、まん中が いちばん _______ から、気を つけて ください。",
    options: ["とおい", "あさい", "ふかい", "あんぜん"],
    correctAnswer: 2,
    explanation: "Bể bơi này chỗ giữa bể là sâu nhất nên hãy cẩn thận! (深い - ふかい: Sâu)"
  },
  {
    id: 185,
    question: "きのう、田中さんの お父さんに 食事に 連れて いって _______。",
    options: ["あげました", "くださいました", "さしあげました", "いただきました"],
    correctAnswer: 3,
    explanation: "Hôm qua, tôi được bố anh Tanaka dẫn đi ăn. (～ていただく: Được ai đó (người trên) làm gì cho mình)"
  }
];

const quizData12: Question[] = [
  {
    id: 186,
    question: "この へんは <ruby>古<rt>ふる</rt></ruby>い <u>建物</u> が <ruby>多<rt>おお</rt></ruby>い。",
    options: ["たでもの", "だてもの", "たてもの", "けんぶつ"],
    correctAnswer: 2,
    explanation: "Ở khu này có nhiều ngôi nhà cũ. (建物 - たてもの: Tòa nhà/Công trình kiến trúc)"
  },
  {
    id: 187,
    question: "さあ、ピアノに <ruby>合<rt>あ</rt></ruby>わせて <ruby>大<rt>おお</rt></ruby>きな <ruby>声<rt>こえ</rt></ruby>で _______ 。",
    options: ["つくりましょう", "だしましょう", "おどりましょう", "うたいましょう"],
    correctAnswer: 3,
    explanation: "Nào, chúng ta cùng hát to theo đàn piano nào! (歌う - うたう: Hát)"
  },
  {
    id: 188,
    question: "<ruby>私<rt>わたし</rt></ruby>は、<ruby>来週<rt>らいしゅう</rt></ruby> カナダへ _______ と <ruby>思<rt>おも</rt></ruby>っています。",
    options: ["<ruby>帰<rt>かえ</rt></ruby>ろう", "<ruby>帰<rt>かえ</rt></ruby>りましょう", "<ruby>帰<rt>かえ</rt></ruby>る", "<ruby>帰<rt>かえ</rt></ruby>ります"],
    correctAnswer: 0,
    explanation: "Tôi định về Canada vào tuần sau. (Thể ý chí + と思っています: Định làm gì đó)"
  },
  {
    id: 189,
    question: "いっしょに <u>ひる</u>ご<ruby>飯<rt>はん</rt></ruby> を <ruby>食<rt>た</rt></ruby>べませんか。",
    options: ["晩", "夕", "昼", "夜"],
    correctAnswer: 2,
    explanation: "Cùng đi ăn trưa không bạn? (昼ご飯 - ひるごはん: Cơm trưa)"
  },
  {
    id: 190,
    question: "A「この トマト、どこで <ruby>買<rt>か</rt></ruby>ったの？」 B「<ruby>駅前<rt>えきまえ</rt></ruby>の _______ さん。」",
    options: ["さかや", "やおや", "さかなや", "やさいや"],
    correctAnswer: 1,
    explanation: "A: \"Cà chua này mua ở đâu đấy?\" B: \"Cửa hàng rau trước ga.\" (八百屋 - やおや: Cửa hàng rau quả)"
  },
  {
    id: 191,
    question: "<ruby>田中<rt>たなか</rt></ruby>さんは、<ruby>仕事<rt>しごと</rt></ruby>が <ruby>忙<rt>いそが</rt></ruby>しいので パーティーには <ruby>行<rt>い</rt></ruby>けない _______ 。",
    options: ["って <ruby>言<rt>い</rt></ruby>ってたよ", "ってと <ruby>言<rt>い</rt></ruby>ってたよ", "のを <ruby>言<rt>い</rt></ruby>ってたよ", "との <ruby>言<rt>い</rt></ruby>ってたよ"],
    correctAnswer: 0,
    explanation: "Anh Tanaka nói là bận việc nên không đi dự tiệc được đấy. (～って言っていた: Nói là... (văn nói))"
  },
  {
    id: 192,
    question: "<ruby>学生<rt>がくせい</rt></ruby>の ころ、<ruby>東京<rt>とうきょう</rt></ruby>に <u>住んで</u> いました。",
    options: ["つんで", "すんで", "そんで", "しんで"],
    correctAnswer: 1,
    explanation: "Thời sinh viên, tôi sống ở Tokyo. (住む - すむ: Sống/Cư trú)"
  },
  {
    id: 193,
    question: "<ruby>庭<rt>にわ</rt></ruby>に <ruby>木<rt>き</rt></ruby>を もう <ruby>一本<rt>いっぽん</rt></ruby> _______ 。",
    options: ["うえました", "きりました", "とりました", "かざりました"],
    correctAnswer: 0,
    explanation: "Tôi đã trồng thêm một cây nữa ở sân vườn. (植える - うえる: Trồng (cây))"
  },
  {
    id: 194,
    question: "ときどき _______ が <ruby>食<rt>た</rt></ruby>べたくなります。",
    options: ["<ruby>母<rt>はは</rt></ruby>は <ruby>作<rt>つく</rt></ruby>った <ruby>料理<rt>りょうり</rt></ruby>", "<ruby>母<rt>はは</rt></ruby>に <ruby>作<rt>つく</rt></ruby>ったの <ruby>料理<rt>りょうり</rt></ruby>", "<ruby>母<rt>はは</rt></ruby>の <ruby>作<rt>つく</rt></ruby>った <ruby>料理<rt>りょうり</rt></ruby>", "<ruby>母<rt>はは</rt></ruby>が <ruby>作<rt>つく</rt></ruby>ったの <ruby>料理<rt>りょうり</rt></ruby>"],
    correctAnswer: 2,
    explanation: "Thỉnh thoảng tôi không khỏi thích ăn những món mẹ nấu. (Danh từ + の + V-past + Danh từ: Mệnh đề quan hệ định ngữ, 'ga' có thể thay bằng 'no')"
  },
  {
    id: 195,
    question: "<u>ふゆ</u> <ruby>休<rt>やす</rt></ruby>み に <ruby>山<rt>やま</rt></ruby>へ <ruby>行<rt>い</rt></ruby>きます。",
    options: ["秋", "春", "夏", "冬"],
    correctAnswer: 3,
    explanation: "Kỳ nghỉ đông, tôi đi lên núi. (冬 - ふゆ: Mùa đông)"
  },
  {
    id: 196,
    question: "<ruby>家<rt>いえ</rt></ruby>から <ruby>駅<rt>えき</rt></ruby>まで <ruby>約<rt>やく</rt></ruby> 300 _______ です。",
    options: ["メートル", "センチ", "グラム", "キロ"],
    correctAnswer: 0,
    explanation: "Từ nhà đến ga khoảng 300m. (メートル: Mét)"
  },
  {
    id: 197,
    question: "<ruby>私<rt>わたし</rt></ruby>は _______ とき パジャマを <ruby>着<rt>き</rt></ruby>ます。",
    options: ["ねた", "ねている", "ねる", "ねられた"],
    correctAnswer: 2,
    explanation: "Tôi mặc đồ pijama khi ngủ. (V-ru + とき: Trước khi làm việc gì đó/Trong lúc chuẩn bị làm)"
  },
  {
    id: 198,
    question: "あの <ruby>道<rt>みち</rt></ruby>は <ruby>今<rt>いま</rt></ruby>、<ruby>水道<rt>すいどう</rt></ruby>の <u>工事</u> を しています。",
    options: ["こおじ", "こうじ", "くうじ", "こんじ"],
    correctAnswer: 1,
    explanation: "Con đường ấy bây giờ đang thi công đường ống nước. (工事 - こうじ: Công trường/Thi công)"
  },
  {
    id: 199,
    question: "A「じゃ、また <ruby>明日<rt>あした</rt></ruby>。」 B「_______ 。」",
    options: ["ただいま", "おかげさまで", "あとで", "おやすみなさい"],
    correctAnswer: 3,
    explanation: "A: \"Thế hẹn gặp lại ngày mai nhé!\" B: \"Chúc ngủ ngon!\" (おやすみなさい: Chúc ngủ ngon)"
  },
  {
    id: 200,
    question: "<ruby>朝<rt>あさ</rt></ruby>、<ruby>学校<rt>がっこう</rt></ruby>に _______ 、お<ruby>弁当<rt>べんとう</rt></ruby>を <ruby>買<rt>か</rt></ruby>って きました。",
    options: ["<ruby>来<rt>く</rt></ruby>た <ruby>前<rt>まえ</rt></ruby>に", "<ruby>来<rt>く</rt></ruby>る <ruby>前<rt>まえ</rt></ruby>に", "<ruby>来<rt>く</rt></ruby>る <ruby>後<rt>あと</rt></ruby>で", "<ruby>来<rt>く</rt></ruby>た <ruby>後<rt>あと</rt></ruby>で"],
    correctAnswer: 1,
    explanation: "Buổi sáng, trước khi đến trường, tôi mua cơm hộp. (V-ru + 前に: Trước khi làm gì đó)"
  }
];

export default function App() {
  const [activeSet, setActiveSet] = useState<Question[] | null>(null);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const question = activeSet ? activeSet[current] : null;
  const progress = activeSet ? ((current + 1) / activeSet.length) * 100 : 0;

  const handleSelect = (index: number) => {
    if (selected !== null || !question) return;
    setSelected(index);
    if (index === question.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (activeSet && current + 1 < activeSet.length) {
      setCurrent(prev => prev + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
    setActiveSet(null);
  };

  if (!activeSet) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 relative overflow-hidden bg-white">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://lh3.googleusercontent.com/d/1BSk6INItXbUbXDOzffQKTRuBeFCZaVc-" 
            className="w-full h-full object-cover opacity-30"
            alt="Background"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-white/40" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-4xl text-center flex flex-col items-center"
        >
          <div className="mb-6 sm:mb-8 landscape:mb-3 inline-flex overflow-hidden rounded-full shadow-lg border-4 border-white">
            <img 
              src="https://lh3.googleusercontent.com/d/1o69qwMbhdbWdNKE_I93uZyZvYNxqlGLr" 
              alt="Logo" 
              className="w-24 h-24 sm:w-32 sm:h-32 landscape:w-16 landscape:h-16 object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <h1 className="text-3xl sm:text-5xl landscape:text-3xl font-extrabold text-[#0d260d] mb-3 landscape:mb-1 tracking-tight">Japanese N4-N5 Quiz</h1>
          <p className="text-[#3c5a3c] text-base sm:text-lg landscape:text-sm mb-8 sm:mb-12 landscape:mb-4 font-medium px-4">Chọn bộ câu hỏi để bắt đầu luyện tập</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 landscape:grid-cols-4 gap-3 sm:gap-4 landscape:gap-2 w-full max-h-[60vh] landscape:max-h-[50vh] overflow-y-auto px-2 py-1 custom-scrollbar">
            {[
              { data: quizData1, title: "Ngày 1", range: "Câu 01 - 15" },
              { data: quizData2, title: "Ngày 2", range: "Câu 16 - 30" },
              { data: quizData3, title: "Ngày 3", range: "Câu 31 - 45" },
              { data: quizData4, title: "Ngày 4", range: "Câu 46 - 60" },
              { data: quizData5, title: "Ngày 5", range: "Câu 61 - 75" },
              { data: quizData6, title: "Ngày 6", range: "Câu 76 - 90" },
              { data: quizData7, title: "Ngày 7", range: "Câu 91 - 125" },
              { data: quizData8, title: "Ngày 8", range: "Câu 126 - 140" },
              { data: quizData9, title: "Ngày 9", range: "Câu 141 - 155" },
              { data: quizData10, title: "Ngày 10", range: "Câu 156 - 170" },
              { data: quizData11, title: "Ngày 11", range: "Câu 171 - 185" },
              { data: quizData12, title: "Ngày 12", range: "Câu 186 - 200" },
            ].map((set, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSet(set.data)}
                className="w-full p-4 sm:p-5 landscape:p-3 bg-white/80 backdrop-blur-sm hover:bg-green-50 border border-[#e2eee2] hover:border-green-200 rounded-2xl sm:rounded-[2rem] landscape:rounded-xl text-left transition-all group flex items-center justify-between shadow-sm hover:shadow-md active:scale-[0.98]"
              >
                <div>
                  <h3 className="text-lg sm:text-xl landscape:text-base font-bold text-[#0d260d] group-hover:text-green-700">{set.title}</h3>
                  <p className="text-xs sm:text-sm landscape:text-[10px] text-[#5a7a5a]">{set.range}</p>
                </div>
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-green-200 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-white">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://lh3.googleusercontent.com/d/1BSk6INItXbUbXDOzffQKTRuBeFCZaVc-" 
            className="w-full h-full object-cover opacity-30"
            alt="Background"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-white/40" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white w-full max-w-md p-10 landscape:p-6 rounded-[3rem] landscape:rounded-2xl shadow-xl border border-green-50 text-center overflow-y-auto max-h-[96vh]"
        >
          <div className="mb-8 landscape:mb-4 inline-flex overflow-hidden rounded-full shadow-md border-2 border-white">
            <img 
              src="https://lh3.googleusercontent.com/d/1o69qwMbhdbWdNKE_I93uZyZvYNxqlGLr" 
              alt="Logo" 
              className="w-24 h-24 landscape:w-16 landscape:h-16 object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="text-3xl landscape:text-2xl font-bold text-[#0d260d] mb-2 landscape:mb-1">Kết quả</h1>
          <p className="text-[#3c5a3c] mb-10 landscape:mb-4">Bạn đã hoàn thành bài trắc nghiệm!</p>
          
          <div className="landscape:flex landscape:items-center landscape:justify-center landscape:gap-8 landscape:mb-4">
            <div className="text-6xl landscape:text-4xl font-black text-green-600 mb-4 landscape:mb-0 drop-shadow-sm">
              {Math.round((score / activeSet.length) * 100)}%
            </div>
            <p className="text-xl landscape:text-lg font-semibold text-[#1a3a1a] mb-10 landscape:mb-0">
              {score} / {activeSet.length} câu đúng
            </p>
          </div>

          <button
            onClick={resetQuiz}
            className="w-full py-5 landscape:py-3 bg-green-600 hover:bg-green-700 text-white rounded-[2rem] landscape:rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-100 active:scale-95"
          >
            <RotateCcw className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
            Quay lại trang chủ
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 font-sans relative overflow-hidden bg-white"
      onClick={() => selected !== null && handleNext()}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://lh3.googleusercontent.com/d/1BSk6INItXbUbXDOzffQKTRuBeFCZaVc-" 
          className="w-full h-full object-cover opacity-30"
          alt="Background"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-white/40" />
      </div>

      <div 
        className={`bg-white w-full max-w-2xl landscape:max-w-4xl flex flex-col rounded-3xl sm:rounded-[3rem] landscape:rounded-2xl shadow-2xl shadow-green-100/50 border border-green-50 relative z-10 max-h-[98vh] landscape:max-h-[96vh] overflow-hidden transition-all ${selected !== null ? 'cursor-pointer hover:bg-green-50/10' : ''}`}
      >
        {/* Header: Question + Progress + Translation */}
        <div className="px-5 sm:px-10 landscape:px-8 pt-8 sm:pt-10 landscape:pt-4 pb-1 shrink-0">
          <div className="w-full bg-green-50 h-1.5 sm:h-2 rounded-full overflow-hidden border border-green-100/50 shadow-inner mb-4 sm:mb-6 landscape:mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full"
            />
          </div>

          {question && (
            <div className="mb-4 landscape:mb-1">
              <h2 
                className={`${
                  question.question.replace(/<[^>]*>?/gm, '').length > 80 
                    ? "text-base sm:text-lg md:text-xl landscape:text-sm" 
                    : question.question.replace(/<[^>]*>?/gm, '').length > 40
                    ? "text-lg sm:text-xl md:text-2xl landscape:text-base"
                    : "text-xl sm:text-2xl md:text-3xl landscape:text-lg"
                } font-bold text-[#0d260d] leading-[2] landscape:leading-normal tracking-tight mb-2 landscape:mb-0`} 
                dangerouslySetInnerHTML={{ __html: question.question.replace(/_______/g, '___') }} 
              />
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-5 sm:px-10 landscape:px-8 py-4 landscape:py-1 custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 landscape:grid-cols-2 gap-3 sm:gap-4 landscape:gap-2 mb-4 landscape:mb-1">
            {question?.options.map((opt, index) => {
              const isCorrect = index === question.correctAnswer;
              const isSelected = index === selected;
              const showFeedback = selected !== null;

              return (
                <button
                  key={`${current}-${index}`}
                  onClick={(e) => {
                    if (!showFeedback) {
                      e.stopPropagation();
                      handleSelect(index);
                    }
                  }}
                  disabled={showFeedback}
                  className={`
                    relative group flex items-center justify-between p-3 sm:p-4 landscape:p-2.5 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 text-left min-h-[3.5rem] sm:min-h-[4.5rem] landscape:min-h-[2.5rem]
                    ${!showFeedback ? "border-gray-50 hover:border-green-300 hover:bg-green-50/50 bg-[#fafdfa] shadow-sm active:scale-[0.98]" : ""}
                    ${showFeedback && isCorrect ? "border-green-500 bg-green-50 text-green-800 font-bold shadow-green-100" : ""}
                    ${showFeedback && isSelected && !isCorrect ? "border-red-500 bg-red-50 text-red-800 shadow-red-100" : ""}
                    ${showFeedback && !isSelected && !isCorrect ? "opacity-30 border-transparent grayscale-[0.5]" : ""}
                  `}
                >
                  <span className="text-base sm:text-lg landscape:text-sm font-semibold leading-tight" dangerouslySetInnerHTML={{ __html: opt }} />
                  {showFeedback && (
                    <div className="flex-shrink-0 ml-1">
                      {isCorrect ? (
                        <CheckCircle2 className="text-green-600" size={24} landscape:size={20} />
                      ) : isSelected ? (
                        <XCircle className="text-red-500" size={24} landscape:size={20} />
                      ) : null}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer: Fixed Translation area with reserved space */}
        <div className="px-5 sm:px-10 landscape:px-8 shrink-0 h-[120px] sm:h-[150px] landscape:h-auto landscape:min-h-[80px]">
          <AnimatePresence mode="wait">
            {selected !== null && (
              <motion.div
                key={`explanation-${current}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="pb-8 sm:pb-10 landscape:pb-6"
              >
                <div className="bg-green-50/60 p-3 sm:p-4 landscape:p-3 rounded-xl border border-green-100">
                  <p className="text-xs sm:text-sm landscape:text-sm text-[#2d4a2d] font-medium leading-relaxed italic">
                    {question.explanation}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

