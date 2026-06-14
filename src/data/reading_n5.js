const READING_N5 = [
  {
    id: 1,
    title: "Self Introduction",
    japanese: "はじめまして。わたしは マリアです。アメリカから きました。だいがくの がくせいです。にほんごを べんきょうしています。どうぞ よろしく おねがいします。",
    romaji: "Hajimemashite. Watashi wa Maria desu. Amerika kara kimashita. Daigaku no gakusei desu. Nihongo o benkyou shite imasu. Douzo yoroshiku onegaishimasu.",
    translation: "Nice to meet you. I am Maria. I came from America. I am a university student. I am studying Japanese. Pleased to meet you.",
    questions: [
      { question: "マリアさんは どこから きましたか。", options: ["イギリス", "アメリカ", "にほん", "ちゅうごく"], answer: "アメリカ" },
      { question: "マリアさんは なにを していますか。", options: ["かいしゃいん です。", "せんせい です。", "だいがくの がくせい です。", "いしゃ です。"], answer: "だいがくの がくせい です。" }
    ]
  },
  {
    id: 2,
    title: "Morning Routine",
    japanese: "わたしは まいにち ７じに おきます。あさごはんは パンと コーヒーです。それから、８じに いえを でます。ちかてつで かいしゃへ いきます。",
    romaji: "Watashi wa mainichi shichi-ji ni okimasu. Asagohan wa pan to koohii desu. Sorekara, hachi-ji ni ie o demasu. Chikatetsu de kaisha e ikimasu.",
    translation: "I wake up at 7 o'clock every day. My breakfast is bread and coffee. Then, I leave the house at 8 o'clock. I go to the company by subway.",
    questions: [
      { question: "この ひとは なにで かいしゃへ いきますか。", options: ["バス", "ちかてつ", "あるいて", "タクシー"], answer: "ちかてつ" },
      { question: "あさごはんに なにを たべますか。", options: ["ごはんと さかな", "ごはんと たまご", "パンと コーヒー", "なにも たべません"], answer: "パンと コーヒー" }
    ]
  },
  {
    id: 3,
    title: "Day Off",
    japanese: "きのうは にちようび でした。わたしは ともだちと えいがを みました。えいがは とても おもしろかったです。そのあと、レストランで ごはんを たべました。",
    romaji: "Kinou wa nichiyoubi deshita. Watashi wa tomodachi to eiga o mimashita. Eiga wa totemo omoshirokatta desu. Sono ato, resutoran de gohan o tabemashita.",
    translation: "Yesterday was Sunday. I watched a movie with my friend. The movie was very interesting. After that, we ate a meal at a restaurant.",
    questions: [
      { question: "きのう どこへ いきましたか。", options: ["としょかん", "がっこう", "えいがかんと レストラン", "ゆうびんきょく"], answer: "えいがかんと レストラン" },
      { question: "えいがは どうでしたか。", options: ["つまらなかったです。", "おもしろかったです。", "ながかったです。", "わかりませんでした。"], answer: "おもしろかったです。" }
    ]
  },
  {
    id: 4,
    title: "Family",
    japanese: "わたしの かぞくは ４にんです。ちちと ははと あにと わたしです。ちちは いしゃです。ははは ぎんこういんです。あには だいがくせいです。",
    romaji: "Watashi no kazoku wa yo-nin desu. Chichi to haha to ani to watashi desu. Chichi wa isha desu. Haha wa ginkouin desu. Ani wa daigakusei desu.",
    translation: "My family has 4 people. My father, mother, older brother, and me. My father is a doctor. My mother is a bank employee. My older brother is a university student.",
    questions: [
      { question: "かぞくは なんにん ですか。", options: ["２にん", "３にん", "４にん", "５にん"], answer: "４にん" },
      { question: "ははは どんな しごとを していますか。", options: ["いしゃ", "ぎんこういん", "がくせい", "かいしゃいん"], answer: "ぎんこういん" }
    ]
  },
  {
    id: 5,
    title: "Library",
    japanese: "わたしは ほんが すきです。としょかんで たくさん ほんを かります。としょかんは しずかで、とても いいです。まいにち ここで べんきょうします。",
    romaji: "Watashi wa hon ga suki desu. Toshokan de takusan hon o karimasu. Toshokan wa shizuka de, totemo ii desu. Mainichi koko de benkyou shimasu.",
    translation: "I like books. I borrow many books at the library. The library is quiet and very nice. I study here every day.",
    questions: [
      { question: "この ひとは どこで べんきょうしますか。", options: ["いえ", "としょかん", "きっさてん", "がっこう"], answer: "としょかん" },
      { question: "としょかんは どんな ところ ですか。", options: ["にぎやか", "しずか", "ひろい", "あたらしい"], answer: "しずか" }
    ]
  },
  {
    id: 6,
    title: "Shopping",
    japanese: "きょうは デパートへ かいものに いきます。あたらしい くつと かばんが ほしいです。おわった あとで、ケーキを かいます。ケーキが だいすきです。",
    romaji: "Kyou wa depaato e kaimono ni ikimasu. Atarashii kutsu to kaban ga hoshii desu. Owatta ato de, keeki o kaimasu. Keeki ga daisuki desu.",
    translation: "Today I will go shopping at the department store. I want new shoes and a bag. After finishing, I will buy a cake. I love cake.",
    questions: [
      { question: "なにが ほしいですか。", options: ["ふく", "くつと かばん", "とけい", "としょかんの ほん"], answer: "くつと かばん" },
      { question: "この ひとは なにが だいすきですか。", options: ["デパート", "かいもの", "ケーキ", "くつ"], answer: "ケーキ" }
    ]
  },
  {
    id: 7,
    title: "Weather",
    japanese: "きょうの てんきは はれです。そらは あおくて、とても きれいです。あしたも たぶん はれるでしょう。でも、あさっては あめが ふります。",
    romaji: "Kyou no tenki wa hare desu. Sora wa aokute, totemo kirei desu. Ashita mo tabun hareru deshou. Demo, asatte wa ame ga furimasu.",
    translation: "Today's weather is sunny. The sky is blue and very beautiful. It will probably be sunny tomorrow too. But, the day after tomorrow it will rain.",
    questions: [
      { question: "きょうの てんきは どうですか。", options: ["あめ", "くもり", "はれ", "ゆき"], answer: "はれ" },
      { question: "いつ あめが ふりますか。", options: ["きょう", "あした", "あさって", "らいしゅう"], answer: "あさって" }
    ]
  },
  {
    id: 8,
    title: "My Town",
    japanese: "わたしの まちは ちいさいですが、とても きれいです。みどりが たくさん あります。ちかくに ゆうめいな やまが あります。しゅうまつに たくさんの ひとが きます。",
    romaji: "Watashi no machi wa chiisai desu ga, totemo kirei desu. Midori ga takusan arimasu. Chikaku ni yuumei na yama ga arimasu. Shuumatsu ni takusan no hito ga kimasu.",
    translation: "My town is small, but very beautiful. There is a lot of green. There is a famous mountain nearby. On weekends, many people come.",
    questions: [
      { question: "まちは どんな まちですか。", options: ["おおきくて きれい", "ちいさくて きれい", "にぎやかで ゆうめい", "あたらしくて おおきい"], answer: "ちいさくて きれい" },
      { question: "ちかくに なにが ありますか。", options: ["うみ", "かわ", "やま", "としょかん"], answer: "やま" }
    ]
  },
  {
    id: 9,
    title: "Japanese Class",
    japanese: "にほんごの クラスは げつようびから きんようびまで あります。じゅぎょうは ９じはんに はじまります。せんせいは やさしいです。クラスは とても たのしいです。",
    romaji: "Nihongo no kurasu wa getsuyoubi kara kinyoubi made arimasu. Jugyou wa ku-ji han ni hajimarimasu. Sensei wa yasashii desu. Kurasu wa totemo tanoshii desu.",
    translation: "The Japanese class is from Monday to Friday. The class starts at 9:30. The teacher is kind. The class is very fun.",
    questions: [
      { question: "クラスは いつ ありますか。", options: ["げつようび から きんようび", "どようび と にちようび", "げつようび と すいようび", "まいにち"], answer: "げつようび から きんようび" },
      { question: "じゅぎょうは なんじに はじまりますか。", options: ["８じ", "９じ", "９じはん", "１０じ"], answer: "９じはん" }
    ]
  },
  {
    id: 10,
    title: "Sickness",
    japanese: "きのうから あたまが いたいです。そして、すこし ねつが あります。きょうは がっこうを やすみました。あとで びょういんへ いきます。",
    romaji: "Kinou kara atama ga itai desu. Soshite, sukoshi netsu ga arimasu. Kyou wa gakkou o yasumimashita. Ato de byouin e ikimasu.",
    translation: "My head has been hurting since yesterday. And, I have a slight fever. I took the day off from school today. Later, I will go to the hospital.",
    questions: [
      { question: "この ひとは きょう がっこうへ いきましたか。", options: ["はい、いきました", "いいえ、いきませんでした", "わかりません", "あした いきます"], answer: "いいえ、いきませんでした" },
      { question: "これから どこへ いきますか。", options: ["がっこう", "としょかん", "びょういん", "レストラン"], answer: "びょういん" }
    ]
  }
];

export default READING_N5;
