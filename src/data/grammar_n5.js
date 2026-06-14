const GRAMMAR_N5 = [
  // Particles
  {
    id: 1,
    group: "Particles",
    title: "は (wa) — Topic Marker",
    example: "わたし は がくせい です。",
    romaji: "Watashi wa gakusei desu.",
    meaning: "I am a student.",
    note: "Marks the topic of the sentence. Pronounced 'wa' but written as 'ha'."
  },
  {
    id: 2,
    group: "Particles",
    title: "が (ga) — Subject Marker",
    example: "いぬ が います。",
    romaji: "Inu ga imasu.",
    meaning: "There is a dog.",
    note: "Marks the grammatical subject, especially for new information or existence."
  },
  {
    id: 3,
    group: "Particles",
    title: "を (o) — Object Marker",
    example: "りんご を たべます。",
    romaji: "Ringo o tabemasu.",
    meaning: "I eat an apple.",
    note: "Marks the direct object of an action."
  },
  {
    id: 4,
    group: "Particles",
    title: "に (ni) — Destination/Time/Location",
    example: "がっこう に いきます。",
    romaji: "Gakkou ni ikimasu.",
    meaning: "I go to school.",
    note: "Marks destination, specific time, or location of existence."
  },
  {
    id: 5,
    group: "Particles",
    title: "で (de) — Context/Means/Location of Action",
    example: "としょかん で ほん を よみます。",
    romaji: "Toshokan de hon o yomimasu.",
    meaning: "I read a book at the library.",
    note: "Marks the location where an action takes place, or the tool/means used."
  },
  {
    id: 6,
    group: "Particles",
    title: "へ (e) — Direction",
    example: "とうきょう へ いきます。",
    romaji: "Toukyou e ikimasu.",
    meaning: "I am heading to Tokyo.",
    note: "Marks direction of movement. Pronounced 'e' but written as 'he'."
  },
  {
    id: 7,
    group: "Particles",
    title: "と (to) — And / With",
    example: "ともだち と えいが を みます。",
    romaji: "Tomodachi to eiga o mimasu.",
    meaning: "I watch a movie with a friend.",
    note: "Used to connect nouns or indicate doing an action together."
  },
  {
    id: 8,
    group: "Particles",
    title: "も (mo) — Also / Too",
    example: "わたし も がくせい です。",
    romaji: "Watashi mo gakusei desu.",
    meaning: "I am also a student.",
    note: "Replaces は, が, or を to add 'also' or 'too'."
  },
  {
    id: 9,
    group: "Particles",
    title: "か (ka) — Question Marker / Or",
    example: "これ は ほん です か。",
    romaji: "Kore wa hon desu ka.",
    meaning: "Is this a book?",
    note: "Added to the end of a sentence to form a question. Between nouns, means 'or'."
  },
  {
    id: 10,
    group: "Particles",
    title: "ね (ne) — Agreement Seeker",
    example: "いい てんき です ね。",
    romaji: "Ii tenki desu ne.",
    meaning: "It's good weather, isn't it?",
    note: "Used to seek agreement or confirmation, like 'isn't it?'"
  },
  {
    id: 11,
    group: "Particles",
    title: "よ (yo) — Emphasis",
    example: "おいしい です よ。",
    romaji: "Oishii desu yo.",
    meaning: "It is delicious, you know.",
    note: "Used to provide new information or emphasize a point."
  },
  {
    id: 12,
    group: "Particles",
    title: "から (kara) — From",
    example: "アメリカ から きました。",
    romaji: "Amerika kara kimashita.",
    meaning: "I came from America.",
    note: "Indicates starting point in space or time."
  },
  {
    id: 13,
    group: "Particles",
    title: "まで (made) — Until / To",
    example: "ごじ まで はたらきます。",
    romaji: "Goji made hatarakimasu.",
    meaning: "I work until 5 o'clock.",
    note: "Indicates the ending point in time or space."
  },
  {
    id: 14,
    group: "Particles",
    title: "や (ya) — Inexhaustive 'And'",
    example: "パン や たまご を かいました。",
    romaji: "Pan ya tamago o kaimashita.",
    meaning: "I bought bread, eggs, and other things.",
    note: "Connects nouns when the list is incomplete (unlike と)."
  },
  {
    id: 15,
    group: "Particles",
    title: "より (yori) — Than (Comparison)",
    example: "くるま は じてんしゃ より はやい です。",
    romaji: "Kuruma wa jitensha yori hayai desu.",
    meaning: "A car is faster than a bicycle.",
    note: "Used to compare two things."
  },
  {
    id: 16,
    group: "Particles",
    title: "だけ (dake) — Only / Just",
    example: "みず だけ のみます。",
    romaji: "Mizu dake nomimasu.",
    meaning: "I drink only water.",
    note: "Attaches to nouns, quantities, or verbs to mean 'only'."
  },
  {
    id: 17,
    group: "Particles",
    title: "くらい / ぐらい (kurai / gurai) — About",
    example: "いちじかん ぐらい かかります。",
    romaji: "Ichijikan gurai kakarimasu.",
    meaning: "It takes about one hour.",
    note: "Used to indicate an approximate amount or length."
  },

  // Verb Forms
  {
    id: 18,
    group: "Verb Forms",
    title: "〜ます (masu) — Formal Present/Future",
    example: "まいにち ほん を よみます。",
    romaji: "Mainichi hon o yomimasu.",
    meaning: "I read books every day.",
    note: "Polite verb ending for habitual actions or future plans."
  },
  {
    id: 19,
    group: "Verb Forms",
    title: "〜ません (masen) — Formal Negative",
    example: "きのう は べんきょうしません でした。",
    romaji: "Kinou wa benkyoushimasen deshita.",
    meaning: "I didn't study yesterday.",
    note: "Polite negative verb ending."
  },
  {
    id: 20,
    group: "Verb Forms",
    title: "〜ました (mashita) — Formal Past",
    example: "あさごはん を たべました。",
    romaji: "Asagohan o tabemashita.",
    meaning: "I ate breakfast.",
    note: "Polite past tense verb ending."
  },
  {
    id: 21,
    group: "Verb Forms",
    title: "〜て (te-form) — Connecting Verbs / Requests",
    example: "おきて、あさごはん を たべます。",
    romaji: "Okite, asagohan o tabemasu.",
    meaning: "I wake up and eat breakfast.",
    note: "Used to string multiple actions together or with other grammar."
  },
  {
    id: 22,
    group: "Verb Forms",
    title: "〜たい (tai) — Want to do",
    example: "にほん に いきたい です。",
    romaji: "Nihon ni ikitai desu.",
    meaning: "I want to go to Japan.",
    note: "Attaches to verb stem. Acts like an i-adjective."
  },
  {
    id: 23,
    group: "Verb Forms",
    title: "〜ましょう (mashou) — Let's",
    example: "いっしょ に いきましょう。",
    romaji: "Issho ni ikimashou.",
    meaning: "Let's go together.",
    note: "Used to suggest an action."
  },
  {
    id: 24,
    group: "Verb Forms",
    title: "〜ましょうか (mashou ka) — Shall we?",
    example: "てつだいましょう か。",
    romaji: "Tetsudaimashou ka.",
    meaning: "Shall I help you?",
    note: "Used to offer help or invite someone to do something."
  },
  {
    id: 25,
    group: "Verb Forms",
    title: "〜ない (nai) — Informal Negative",
    example: "きょう は がっこう に いかない。",
    romaji: "Kyou wa gakkou ni ikanai.",
    meaning: "I am not going to school today.",
    note: "Plain negative form of verbs."
  },
  {
    id: 26,
    group: "Verb Forms",
    title: "Dictionary Form — Informal Present/Future",
    example: "あした かいもの に いく。",
    romaji: "Ashita kaimono ni iku.",
    meaning: "I will go shopping tomorrow.",
    note: "The base form of verbs found in dictionaries."
  },
  {
    id: 27,
    group: "Verb Forms",
    title: "〜た (ta) — Informal Past",
    example: "きのう えいが を みた。",
    romaji: "Kinou eiga o mita.",
    meaning: "I watched a movie yesterday.",
    note: "Plain past form of verbs."
  },

  // Adjective Forms
  {
    id: 28,
    group: "Adjective Forms",
    title: "い-adjective Present",
    example: "この りんご は おいしい です。",
    romaji: "Kono ringo wa oishii desu.",
    meaning: "This apple is delicious.",
    note: "Ends in 'i'. Can modify nouns directly or end a sentence with 'desu'."
  },
  {
    id: 29,
    group: "Adjective Forms",
    title: "い-adjective Negative (〜くない)",
    example: "きょう は さむくない です。",
    romaji: "Kyou wa samukunai desu.",
    meaning: "It is not cold today.",
    note: "Drop the final 'i' and add 'kunai'."
  },
  {
    id: 30,
    group: "Adjective Forms",
    title: "い-adjective Past (〜かった)",
    example: "きのう は あつかった です。",
    romaji: "Kinou wa atsukatta desu.",
    meaning: "It was hot yesterday.",
    note: "Drop the final 'i' and add 'katta'."
  },
  {
    id: 31,
    group: "Adjective Forms",
    title: "い-adjective Past Negative (〜くなかった)",
    example: "テスト は むずかしくなかった です。",
    romaji: "Tesuto wa muzukashikunakatta desu.",
    meaning: "The test was not difficult.",
    note: "Drop the final 'i' and add 'kunakatta'."
  },
  {
    id: 32,
    group: "Adjective Forms",
    title: "な-adjective Present",
    example: "あの ひと は しんせつ です。",
    romaji: "Ano hito wa shinsetsu desu.",
    meaning: "That person is kind.",
    note: "Requires 'na' when modifying nouns, uses 'desu/da' at sentence end."
  },
  {
    id: 33,
    group: "Adjective Forms",
    title: "な-adjective Negative (〜じゃない)",
    example: "この まち は しずか じゃありません。",
    romaji: "Kono machi wa shizuka jaarimasen.",
    meaning: "This town is not quiet.",
    note: "Add 'janai' or 'jaarimasen'."
  },
  {
    id: 34,
    group: "Adjective Forms",
    title: "な-adjective Past (〜でした)",
    example: "きのう は ひま でした。",
    romaji: "Kinou wa hima deshita.",
    meaning: "I was free yesterday.",
    note: "Uses 'deshita' or 'datta' at the end."
  },
  {
    id: 35,
    group: "Adjective Forms",
    title: "な-adjective Past Negative (〜じゃなかった)",
    example: "テスト は かんたん じゃなかった です。",
    romaji: "Tesuto wa kantan janakatta desu.",
    meaning: "The test was not easy.",
    note: "Add 'janakatta desu' or 'jaarimasen deshita'."
  },
  {
    id: 36,
    group: "Adjective Forms",
    title: "Noun/Adjective Connective (〜で / 〜くて)",
    example: "この かばん は やすくて、いい です。",
    romaji: "Kono kaban wa yasukute, ii desu.",
    meaning: "This bag is cheap and good.",
    note: "For i-adj, drop 'i' and add 'kute'. For na-adj and nouns, add 'de'."
  },

  // Sentence Patterns
  {
    id: 37,
    group: "Sentence Patterns",
    title: "あります (arimasu) — Existence (Inanimate)",
    example: "つくえ の うえ に ほん が あります。",
    romaji: "Tsukue no ue ni hon ga arimasu.",
    meaning: "There is a book on the desk.",
    note: "Used for non-living or inanimate objects."
  },
  {
    id: 38,
    group: "Sentence Patterns",
    title: "います (imasu) — Existence (Animate)",
    example: "にわ に いぬ が います。",
    romaji: "Niwa ni inu ga imasu.",
    meaning: "There is a dog in the garden.",
    note: "Used for living things (people, animals)."
  },
  {
    id: 39,
    group: "Sentence Patterns",
    title: "〜てください (te kudasai) — Please do",
    example: "ここに なまえ を かいて ください。",
    romaji: "Koko ni namae o kaite kudasai.",
    meaning: "Please write your name here.",
    note: "Polite request to do something."
  },
  {
    id: 40,
    group: "Sentence Patterns",
    title: "〜ている (te iru) — Ongoing Action / State",
    example: "いま おんがく を きいて います。",
    romaji: "Ima ongaku o kiite imasu.",
    meaning: "I am listening to music now.",
    note: "Indicates an action in progress or a continuous state."
  },
  {
    id: 41,
    group: "Sentence Patterns",
    title: "〜てもいいです (te mo ii desu) — May I / Allowed",
    example: "しゃしん を とっても いい です か。",
    romaji: "Shashin o totte mo ii desu ka.",
    meaning: "May I take a picture?",
    note: "Used to ask or grant permission."
  },
  {
    id: 42,
    group: "Sentence Patterns",
    title: "〜てはいけません (te wa ikemasen) — Must not",
    example: "ここで たばこ を すって は いけません。",
    romaji: "Koko de tabako o sutte wa ikemasen.",
    meaning: "You must not smoke here.",
    note: "Expresses prohibition."
  },
  {
    id: 43,
    group: "Sentence Patterns",
    title: "〜ないでください (nai de kudasai) — Please don't",
    example: "しゃしん を とらないで ください。",
    romaji: "Shashin o toranaide kudasai.",
    meaning: "Please do not take pictures.",
    note: "Polite request NOT to do something."
  },
  {
    id: 44,
    group: "Sentence Patterns",
    title: "〜のがすきです (no ga suki desu) — Like doing",
    example: "ほん を よむ の が すき です。",
    romaji: "Hon o yomu no ga suki desu.",
    meaning: "I like reading books.",
    note: "Nominalizes a verb using 'no' so it can be described."
  },
  {
    id: 45,
    group: "Sentence Patterns",
    title: "〜のがじょうずです (no ga jouzu desu) — Good at",
    example: "え を かく の が じょうず です。",
    romaji: "E o kaku no ga jouzu desu.",
    meaning: "I am good at drawing.",
    note: "Used to say someone is skillful at an action."
  },
  {
    id: 46,
    group: "Sentence Patterns",
    title: "〜がほしい (ga hoshii) — Want (noun)",
    example: "あたらしい くるま が ほしい です。",
    romaji: "Atarashii kuruma ga hoshii desu.",
    meaning: "I want a new car.",
    note: "Used to express desire for an object (not an action)."
  },
  {
    id: 47,
    group: "Sentence Patterns",
    title: "〜に行く (ni iku) — Go to do",
    example: "スーパー へ かいもの に いきます。",
    romaji: "Suupaa e kaimono ni ikimasu.",
    meaning: "I go to the supermarket to shop.",
    note: "Verb stem + ni iku/kuru/kaeru indicates purpose of movement."
  },
  {
    id: 48,
    group: "Sentence Patterns",
    title: "〜ませんか (masen ka) — Won't you?",
    example: "いっしょ に おちゃ を のみません か。",
    romaji: "Issho ni ocha o nomimasen ka.",
    meaning: "Won't you drink tea with me?",
    note: "Polite invitation."
  },
  {
    id: 49,
    group: "Sentence Patterns",
    title: "〜になる (ni naru) / 〜くなる (ku naru) — To become",
    example: "さむく なりました。",
    romaji: "Samuku narimashita.",
    meaning: "It has become cold.",
    note: "Indicates a change in state."
  },
  {
    id: 50,
    group: "Sentence Patterns",
    title: "〜たことがある (ta koto ga aru) — Have done before",
    example: "にほん に いった こと が あります。",
    romaji: "Nihon ni itta koto ga arimasu.",
    meaning: "I have been to Japan before.",
    note: "Indicates past experience."
  },
  {
    id: 51,
    group: "Sentence Patterns",
    title: "〜ことができる (koto ga dekiru) — Can do",
    example: "にほんご を はなす こと が できます。",
    romaji: "Nihongo o hanasu koto ga dekimasu.",
    meaning: "I can speak Japanese.",
    note: "Indicates ability or possibility."
  },
  {
    id: 52,
    group: "Sentence Patterns",
    title: "〜まえに (mae ni) — Before",
    example: "ねる まえ に は を みがきます。",
    romaji: "Neru mae ni ha o migakimasu.",
    meaning: "I brush my teeth before sleeping.",
    note: "Used with dictionary form of verbs or noun+no."
  },
  {
    id: 53,
    group: "Sentence Patterns",
    title: "〜あとで (ato de) — After",
    example: "べんきょうした あと で テレビ を みます。",
    romaji: "Benkyoushita ato de terebi o mimasu.",
    meaning: "After studying, I watch TV.",
    note: "Used with past tense form (ta-form) of verbs or noun+no."
  },
  {
    id: 54,
    group: "Sentence Patterns",
    title: "〜たり〜たり (tari... tari) — Do things like",
    example: "にちようび は ほん を よんだり、えいが を みたり します。",
    romaji: "Nichiyoubi wa hon o yondari, eiga o mitari shimasu.",
    meaning: "On Sundays, I do things like read books and watch movies.",
    note: "Lists non-exhaustive examples of actions."
  },
  {
    id: 55,
    group: "Sentence Patterns",
    title: "〜ほうがいい (hou ga ii) — Had better",
    example: "くすり を のんだ ほう が いい です。",
    romaji: "Kusuri o nonda hou ga ii desu.",
    meaning: "You should take some medicine.",
    note: "Used to give advice or recommendations."
  },
  {
    id: 56,
    group: "Sentence Patterns",
    title: "〜つもり (tsumori) — Plan to / Intend to",
    example: "らいねん にほん へ いく つもり です。",
    romaji: "Rainen nihon e iku tsumori desu.",
    meaning: "I intend to go to Japan next year.",
    note: "Expresses strong personal intention."
  },
  {
    id: 57,
    group: "Sentence Patterns",
    title: "〜よてい (yotei) — Scheduled to",
    example: "あした は かいぎ の よてい です。",
    romaji: "Ashita wa kaigi no yotei desu.",
    meaning: "A meeting is scheduled for tomorrow.",
    note: "Expresses an objective schedule or plan."
  },
  {
    id: 58,
    group: "Sentence Patterns",
    title: "〜から (kara) — Because (Reason)",
    example: "じかん が ありません から、いきません。",
    romaji: "Jikan ga arimasen kara, ikimasen.",
    meaning: "Because I have no time, I will not go.",
    note: "Placed after a clause to give a reason."
  },
  {
    id: 59,
    group: "Sentence Patterns",
    title: "〜でしょう (deshou) — Probably / Right?",
    example: "あした は あめ でしょう。",
    romaji: "Ashita wa ame deshou.",
    meaning: "It will probably rain tomorrow.",
    note: "Expresses conjecture or seeks agreement."
  },
  {
    id: 60,
    group: "Sentence Patterns",
    title: "A は B より 〜 (A wa B yori) — A is more than B",
    example: "とうきょう は きょうと より おおきい です。",
    romaji: "Toukyou wa Kyouto yori ookii desu.",
    meaning: "Tokyo is bigger than Kyoto.",
    note: "Used for direct comparison."
  },
  {
    id: 61,
    group: "Sentence Patterns",
    title: "A と B と どちらが 〜 (A to B to dochira ga) — Which is more?",
    example: "コーヒー と おちゃ と どちら が すき ですか。",
    romaji: "Koohii to ocha to dochira ga suki desuka.",
    meaning: "Which do you prefer, coffee or tea?",
    note: "Used to ask a comparison question."
  },
  {
    id: 62,
    group: "Sentence Patterns",
    title: "〜でいちばん (de ichiban) — The most in ~",
    example: "クラス で いちばん せ が たかい です。",
    romaji: "Kurasu de ichiban se ga takai desu.",
    meaning: "He is the tallest in the class.",
    note: "Indicates the superlative within a category."
  },
  {
    id: 63,
    group: "Sentence Patterns",
    title: "〜すぎ (sugi) — Too much",
    example: "きのう おさけ を のみすぎました。",
    romaji: "Kinou osake o nomisugimashita.",
    meaning: "I drank too much alcohol yesterday.",
    note: "Attaches to verb stems and adjective roots."
  },

  // Question Words
  {
    id: 64,
    group: "Question Words",
    title: "なに / なん (Nani / Nan) — What",
    example: "これ は なん です か。",
    romaji: "Kore wa nan desu ka.",
    meaning: "What is this?",
    note: "Basic question word for things."
  },
  {
    id: 65,
    group: "Question Words",
    title: "どこ (Doko) — Where",
    example: "トイレ は どこ です か。",
    romaji: "Toire wa doko desu ka.",
    meaning: "Where is the toilet?",
    note: "Question word for locations."
  },
  {
    id: 66,
    group: "Question Words",
    title: "いつ (Itsu) — When",
    example: "たんじょうび は いつ です か。",
    romaji: "Tanjoubi wa itsu desu ka.",
    meaning: "When is your birthday?",
    note: "Question word for time/date."
  },
  {
    id: 67,
    group: "Question Words",
    title: "だれ (Dare) — Who",
    example: "あの ひと は だれ です か。",
    romaji: "Ano hito wa dare desu ka.",
    meaning: "Who is that person?",
    note: "Question word for people. Polite form: どなた (Donata)."
  },
  {
    id: 68,
    group: "Question Words",
    title: "どれ (Dore) — Which (of 3 or more)",
    example: "あなた の かさ は どれ です か。",
    romaji: "Anata no kasa wa dore desu ka.",
    meaning: "Which one is your umbrella?",
    note: "Used to choose one from a group."
  },
  {
    id: 69,
    group: "Question Words",
    title: "どの (Dono) — Which (modifier)",
    example: "どの くるま が あなた の です か。",
    romaji: "Dono kuruma ga anata no desu ka.",
    meaning: "Which car is yours?",
    note: "Always precedes a noun."
  },
  {
    id: 70,
    group: "Question Words",
    title: "どう (Dou) — How",
    example: "にほん の せいかつ は どう ですか。",
    romaji: "Nihon no seikatsu wa dou desuka.",
    meaning: "How is life in Japan?",
    note: "Used to ask about state, condition, or opinion."
  },
  {
    id: 71,
    group: "Question Words",
    title: "なぜ / どうして (Naze / Doushite) — Why",
    example: "どうして がっこう を やすみました か。",
    romaji: "Doushite gakkou o yasumimashita ka.",
    meaning: "Why did you take a day off school?",
    note: "Doushite is more common in spoken Japanese."
  },
  {
    id: 72,
    group: "Question Words",
    title: "いくつ (Ikutsu) — How many / How old",
    example: "りんご を いくつ かいました か。",
    romaji: "Ringo o ikutsu kaimashita ka.",
    meaning: "How many apples did you buy?",
    note: "Used for general items or age."
  },
  {
    id: 73,
    group: "Question Words",
    title: "いくら (Ikura) — How much (cost)",
    example: "この ほん は いくら です か。",
    romaji: "Kono hon wa ikura desu ka.",
    meaning: "How much is this book?",
    note: "Used to ask for a price."
  },

  // Connectors
  {
    id: 74,
    group: "Connectors",
    title: "そして (Soshite) — And / And then",
    example: "ごはん を たべました。そして、ねました。",
    romaji: "Gohan o tabemashita. Soshite, nemashita.",
    meaning: "I ate a meal. And then, I slept.",
    note: "Used to connect sentences sequentially."
  },
  {
    id: 75,
    group: "Connectors",
    title: "それから (Sorekara) — After that",
    example: "かいもの を します。それから、かえります。",
    romaji: "Kaimono o shimasu. Sorekara, kaerimasu.",
    meaning: "I will do shopping. After that, I will go home.",
    note: "Indicates the sequence of events."
  },
  {
    id: 76,
    group: "Connectors",
    title: "でも / しかし (Demo / Shikashi) — But / However",
    example: "にほんご は むずかしい です。でも、おもしろい です。",
    romaji: "Nihongo wa muzukashii desu. Demo, omoshiroi desu.",
    meaning: "Japanese is difficult. But, it is interesting.",
    note: "Used to introduce a contrasting sentence."
  },
  {
    id: 77,
    group: "Connectors",
    title: "だから (Dakara) — So / Therefore",
    example: "あめ が ふって います。だから、いきません。",
    romaji: "Ame ga futte imasu. Dakara, ikimasen.",
    meaning: "It is raining. Therefore, I will not go.",
    note: "Indicates a logical conclusion or result."
  },

  // Expressions
  {
    id: 78,
    group: "Expressions",
    title: "すみません (Sumimasen) — Excuse me / I'm sorry",
    example: "すみません、いま なんじ ですか。",
    romaji: "Sumimasen, ima nanji desuka.",
    meaning: "Excuse me, what time is it now?",
    note: "Used to apologize, or to get someone's attention."
  },
  {
    id: 79,
    group: "Expressions",
    title: "お願いします (Onegaishimasu) — Please",
    example: "みず を おねがいします。",
    romaji: "Mizu o onegaishimasu.",
    meaning: "Water, please.",
    note: "Used to make a polite request."
  },
  {
    id: 80,
    group: "Expressions",
    title: "ありがとうございます (Arigatou gozaimasu) — Thank you",
    example: "いつも ありがとうございます。",
    romaji: "Itsumo arigatou gozaimasu.",
    meaning: "Thank you always.",
    note: "Standard polite expression of gratitude."
  }
];

export default GRAMMAR_N5;
