// Generated from PropositionalLogic.g4 by ANTLR 4.13.1

import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";


export class PropositionalLogicLexer extends antlr.Lexer {
    public static readonly PROPOSITION = 1;
    public static readonly PARAMETER = 2;
    public static readonly AND_ALSO = 3;
    public static readonly OR_ELSE = 4;
    public static readonly AND = 5;
    public static readonly OR = 6;
    public static readonly NOT = 7;
    public static readonly XOR = 8;
    public static readonly LPAREN = 9;
    public static readonly RPAREN = 10;
    public static readonly IDENTIFIER_SEGMENT_START = 11;
    public static readonly IDENTIFIER_SEGMENT = 12;
    public static readonly WS = 13;

    public static readonly channelNames = [
        "DEFAULT_TOKEN_CHANNEL", "HIDDEN"
    ];

    public static readonly literalNames = [
        null, null, null, "'&&'", "'||'", "'&'", "'|'", "'!'", "'^'", "'('", 
        "')'"
    ];

    public static readonly symbolicNames = [
        null, "PROPOSITION", "PARAMETER", "AND_ALSO", "OR_ELSE", "AND", 
        "OR", "NOT", "XOR", "LPAREN", "RPAREN", "IDENTIFIER_SEGMENT_START", 
        "IDENTIFIER_SEGMENT", "WS"
    ];

    public static readonly modeNames = [
        "DEFAULT_MODE",
    ];

    public static readonly ruleNames = [
        "PROPOSITION", "PARAMETER", "ESC", "UNICODE", "HEX", "AND_ALSO", 
        "OR_ELSE", "AND", "OR", "NOT", "XOR", "LPAREN", "RPAREN", "IDENTIFIER_SEGMENT_START", 
        "IDENTIFIER_SEGMENT", "WS",
    ];


    public constructor(input: antlr.CharStream) {
        super(input);
        this.interpreter = new antlr.LexerATNSimulator(this, PropositionalLogicLexer._ATN, PropositionalLogicLexer.decisionsToDFA, new antlr.PredictionContextCache());
    }

    public get grammarFileName(): string { return "PropositionalLogic.g4"; }

    public get literalNames(): (string | null)[] { return PropositionalLogicLexer.literalNames; }
    public get symbolicNames(): (string | null)[] { return PropositionalLogicLexer.symbolicNames; }
    public get ruleNames(): string[] { return PropositionalLogicLexer.ruleNames; }

    public get serializedATN(): number[] { return PropositionalLogicLexer._serializedATN; }

    public get channelNames(): string[] { return PropositionalLogicLexer.channelNames; }

    public get modeNames(): string[] { return PropositionalLogicLexer.modeNames; }

    public static readonly _serializedATN: number[] = [
        4,0,13,96,6,-1,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,
        6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,
        7,13,2,14,7,14,2,15,7,15,1,0,1,0,1,0,5,0,37,8,0,10,0,12,0,40,9,0,
        1,1,1,1,1,1,5,1,45,8,1,10,1,12,1,48,9,1,1,1,1,1,1,2,1,2,1,2,3,2,
        55,8,2,1,3,1,3,1,3,1,3,1,3,1,3,1,4,1,4,1,5,1,5,1,5,1,6,1,6,1,6,1,
        7,1,7,1,8,1,8,1,9,1,9,1,10,1,10,1,11,1,11,1,12,1,12,1,13,1,13,1,
        14,4,14,86,8,14,11,14,12,14,87,1,15,4,15,91,8,15,11,15,12,15,92,
        1,15,1,15,0,0,16,1,1,3,2,5,0,7,0,9,0,11,3,13,4,15,5,17,6,19,7,21,
        8,23,9,25,10,27,11,29,12,31,13,1,0,6,2,0,92,92,125,125,8,0,47,47,
        92,92,98,98,102,102,110,110,114,114,116,116,125,125,3,0,48,57,65,
        70,97,102,660,0,65,90,95,95,97,122,170,170,181,181,186,186,192,214,
        216,246,248,705,710,721,736,740,748,748,750,750,880,884,886,887,
        890,893,895,895,902,902,904,906,908,908,910,929,931,1013,1015,1153,
        1162,1327,1329,1366,1369,1369,1376,1416,1488,1514,1519,1522,1568,
        1610,1646,1647,1649,1747,1749,1749,1765,1766,1774,1775,1786,1788,
        1791,1791,1808,1808,1810,1839,1869,1957,1969,1969,1994,2026,2036,
        2037,2042,2042,2048,2069,2074,2074,2084,2084,2088,2088,2112,2136,
        2144,2154,2160,2183,2185,2190,2208,2249,2308,2361,2365,2365,2384,
        2384,2392,2401,2417,2432,2437,2444,2447,2448,2451,2472,2474,2480,
        2482,2482,2486,2489,2493,2493,2510,2510,2524,2525,2527,2529,2544,
        2545,2556,2556,2565,2570,2575,2576,2579,2600,2602,2608,2610,2611,
        2613,2614,2616,2617,2649,2652,2654,2654,2674,2676,2693,2701,2703,
        2705,2707,2728,2730,2736,2738,2739,2741,2745,2749,2749,2768,2768,
        2784,2785,2809,2809,2821,2828,2831,2832,2835,2856,2858,2864,2866,
        2867,2869,2873,2877,2877,2908,2909,2911,2913,2929,2929,2947,2947,
        2949,2954,2958,2960,2962,2965,2969,2970,2972,2972,2974,2975,2979,
        2980,2984,2986,2990,3001,3024,3024,3077,3084,3086,3088,3090,3112,
        3114,3129,3133,3133,3160,3162,3165,3165,3168,3169,3200,3200,3205,
        3212,3214,3216,3218,3240,3242,3251,3253,3257,3261,3261,3293,3294,
        3296,3297,3313,3314,3332,3340,3342,3344,3346,3386,3389,3389,3406,
        3406,3412,3414,3423,3425,3450,3455,3461,3478,3482,3505,3507,3515,
        3517,3517,3520,3526,3585,3632,3634,3635,3648,3654,3713,3714,3716,
        3716,3718,3722,3724,3747,3749,3749,3751,3760,3762,3763,3773,3773,
        3776,3780,3782,3782,3804,3807,3840,3840,3904,3911,3913,3948,3976,
        3980,4096,4138,4159,4159,4176,4181,4186,4189,4193,4193,4197,4198,
        4206,4208,4213,4225,4238,4238,4256,4293,4295,4295,4301,4301,4304,
        4346,4348,4680,4682,4685,4688,4694,4696,4696,4698,4701,4704,4744,
        4746,4749,4752,4784,4786,4789,4792,4798,4800,4800,4802,4805,4808,
        4822,4824,4880,4882,4885,4888,4954,4992,5007,5024,5109,5112,5117,
        5121,5740,5743,5759,5761,5786,5792,5866,5873,5880,5888,5905,5919,
        5937,5952,5969,5984,5996,5998,6000,6016,6067,6103,6103,6108,6108,
        6176,6264,6272,6276,6279,6312,6314,6314,6320,6389,6400,6430,6480,
        6509,6512,6516,6528,6571,6576,6601,6656,6678,6688,6740,6823,6823,
        6917,6963,6981,6988,7043,7072,7086,7087,7098,7141,7168,7203,7245,
        7247,7258,7293,7296,7304,7312,7354,7357,7359,7401,7404,7406,7411,
        7413,7414,7418,7418,7424,7615,7680,7957,7960,7965,7968,8005,8008,
        8013,8016,8023,8025,8025,8027,8027,8029,8029,8031,8061,8064,8116,
        8118,8124,8126,8126,8130,8132,8134,8140,8144,8147,8150,8155,8160,
        8172,8178,8180,8182,8188,8305,8305,8319,8319,8336,8348,8450,8450,
        8455,8455,8458,8467,8469,8469,8473,8477,8484,8484,8486,8486,8488,
        8488,8490,8493,8495,8505,8508,8511,8517,8521,8526,8526,8579,8580,
        11264,11492,11499,11502,11506,11507,11520,11557,11559,11559,11565,
        11565,11568,11623,11631,11631,11648,11670,11680,11686,11688,11694,
        11696,11702,11704,11710,11712,11718,11720,11726,11728,11734,11736,
        11742,11823,11823,12293,12294,12337,12341,12347,12348,12353,12438,
        12445,12447,12449,12538,12540,12543,12549,12591,12593,12686,12704,
        12735,12784,12799,13312,19903,19968,42124,42192,42237,42240,42508,
        42512,42527,42538,42539,42560,42606,42623,42653,42656,42725,42775,
        42783,42786,42888,42891,42954,42960,42961,42963,42963,42965,42969,
        42994,43009,43011,43013,43015,43018,43020,43042,43072,43123,43138,
        43187,43250,43255,43259,43259,43261,43262,43274,43301,43312,43334,
        43360,43388,43396,43442,43471,43471,43488,43492,43494,43503,43514,
        43518,43520,43560,43584,43586,43588,43595,43616,43638,43642,43642,
        43646,43695,43697,43697,43701,43702,43705,43709,43712,43712,43714,
        43714,43739,43741,43744,43754,43762,43764,43777,43782,43785,43790,
        43793,43798,43808,43814,43816,43822,43824,43866,43868,43881,43888,
        44002,44032,55203,55216,55238,55243,55291,63744,64109,64112,64217,
        64256,64262,64275,64279,64285,64285,64287,64296,64298,64310,64312,
        64316,64318,64318,64320,64321,64323,64324,64326,64433,64467,64829,
        64848,64911,64914,64967,65008,65019,65136,65140,65142,65276,65313,
        65338,65345,65370,65382,65470,65474,65479,65482,65487,65490,65495,
        65498,65500,65536,65547,65549,65574,65576,65594,65596,65597,65599,
        65613,65616,65629,65664,65786,66176,66204,66208,66256,66304,66335,
        66349,66368,66370,66377,66384,66421,66432,66461,66464,66499,66504,
        66511,66560,66717,66736,66771,66776,66811,66816,66855,66864,66915,
        66928,66938,66940,66954,66956,66962,66964,66965,66967,66977,66979,
        66993,66995,67001,67003,67004,67072,67382,67392,67413,67424,67431,
        67456,67461,67463,67504,67506,67514,67584,67589,67592,67592,67594,
        67637,67639,67640,67644,67644,67647,67669,67680,67702,67712,67742,
        67808,67826,67828,67829,67840,67861,67872,67897,67968,68023,68030,
        68031,68096,68096,68112,68115,68117,68119,68121,68149,68192,68220,
        68224,68252,68288,68295,68297,68324,68352,68405,68416,68437,68448,
        68466,68480,68497,68608,68680,68736,68786,68800,68850,68864,68899,
        69248,69289,69296,69297,69376,69404,69415,69415,69424,69445,69488,
        69505,69552,69572,69600,69622,69635,69687,69745,69746,69749,69749,
        69763,69807,69840,69864,69891,69926,69956,69956,69959,69959,69968,
        70002,70006,70006,70019,70066,70081,70084,70106,70106,70108,70108,
        70144,70161,70163,70187,70207,70208,70272,70278,70280,70280,70282,
        70285,70287,70301,70303,70312,70320,70366,70405,70412,70415,70416,
        70419,70440,70442,70448,70450,70451,70453,70457,70461,70461,70480,
        70480,70493,70497,70656,70708,70727,70730,70751,70753,70784,70831,
        70852,70853,70855,70855,71040,71086,71128,71131,71168,71215,71236,
        71236,71296,71338,71352,71352,71424,71450,71488,71494,71680,71723,
        71840,71903,71935,71942,71945,71945,71948,71955,71957,71958,71960,
        71983,71999,71999,72001,72001,72096,72103,72106,72144,72161,72161,
        72163,72163,72192,72192,72203,72242,72250,72250,72272,72272,72284,
        72329,72349,72349,72368,72440,72704,72712,72714,72750,72768,72768,
        72818,72847,72960,72966,72968,72969,72971,73008,73030,73030,73056,
        73061,73063,73064,73066,73097,73112,73112,73440,73458,73474,73474,
        73476,73488,73490,73523,73648,73648,73728,74649,74880,75075,77712,
        77808,77824,78895,78913,78918,82944,83526,92160,92728,92736,92766,
        92784,92862,92880,92909,92928,92975,92992,92995,93027,93047,93053,
        93071,93760,93823,93952,94026,94032,94032,94099,94111,94176,94177,
        94179,94179,94208,100343,100352,101589,101632,101640,110576,110579,
        110581,110587,110589,110590,110592,110882,110898,110898,110928,110930,
        110933,110933,110948,110951,110960,111355,113664,113770,113776,113788,
        113792,113800,113808,113817,119808,119892,119894,119964,119966,119967,
        119970,119970,119973,119974,119977,119980,119982,119993,119995,119995,
        119997,120003,120005,120069,120071,120074,120077,120084,120086,120092,
        120094,120121,120123,120126,120128,120132,120134,120134,120138,120144,
        120146,120485,120488,120512,120514,120538,120540,120570,120572,120596,
        120598,120628,120630,120654,120656,120686,120688,120712,120714,120744,
        120746,120770,120772,120779,122624,122654,122661,122666,122928,122989,
        123136,123180,123191,123197,123214,123214,123536,123565,123584,123627,
        124112,124139,124896,124902,124904,124907,124909,124910,124912,124926,
        124928,125124,125184,125251,125259,125259,126464,126467,126469,126495,
        126497,126498,126500,126500,126503,126503,126505,126514,126516,126519,
        126521,126521,126523,126523,126530,126530,126535,126535,126537,126537,
        126539,126539,126541,126543,126545,126546,126548,126548,126551,126551,
        126553,126553,126555,126555,126557,126557,126559,126559,126561,126562,
        126564,126564,126567,126570,126572,126578,126580,126583,126585,126588,
        126590,126590,126592,126601,126603,126619,126625,126627,126629,126633,
        126635,126651,131072,173791,173824,177977,177984,178205,178208,183969,
        183984,191456,194560,195101,196608,201546,201552,205743,707,0,45,
        45,48,57,65,90,95,95,97,122,170,170,181,181,186,186,192,214,216,
        246,248,705,710,721,736,740,748,748,750,750,880,884,886,887,890,
        893,895,895,902,902,904,906,908,908,910,929,931,1013,1015,1153,1162,
        1327,1329,1366,1369,1369,1376,1416,1488,1514,1519,1522,1568,1610,
        1632,1641,1646,1647,1649,1747,1749,1749,1765,1766,1774,1788,1791,
        1791,1808,1808,1810,1839,1869,1957,1969,1969,1984,2026,2036,2037,
        2042,2042,2048,2069,2074,2074,2084,2084,2088,2088,2112,2136,2144,
        2154,2160,2183,2185,2190,2208,2249,2308,2361,2365,2365,2384,2384,
        2392,2401,2406,2415,2417,2432,2437,2444,2447,2448,2451,2472,2474,
        2480,2482,2482,2486,2489,2493,2493,2510,2510,2524,2525,2527,2529,
        2534,2545,2556,2556,2565,2570,2575,2576,2579,2600,2602,2608,2610,
        2611,2613,2614,2616,2617,2649,2652,2654,2654,2662,2671,2674,2676,
        2693,2701,2703,2705,2707,2728,2730,2736,2738,2739,2741,2745,2749,
        2749,2768,2768,2784,2785,2790,2799,2809,2809,2821,2828,2831,2832,
        2835,2856,2858,2864,2866,2867,2869,2873,2877,2877,2908,2909,2911,
        2913,2918,2927,2929,2929,2947,2947,2949,2954,2958,2960,2962,2965,
        2969,2970,2972,2972,2974,2975,2979,2980,2984,2986,2990,3001,3024,
        3024,3046,3055,3077,3084,3086,3088,3090,3112,3114,3129,3133,3133,
        3160,3162,3165,3165,3168,3169,3174,3183,3200,3200,3205,3212,3214,
        3216,3218,3240,3242,3251,3253,3257,3261,3261,3293,3294,3296,3297,
        3302,3311,3313,3314,3332,3340,3342,3344,3346,3386,3389,3389,3406,
        3406,3412,3414,3423,3425,3430,3439,3450,3455,3461,3478,3482,3505,
        3507,3515,3517,3517,3520,3526,3558,3567,3585,3632,3634,3635,3648,
        3654,3664,3673,3713,3714,3716,3716,3718,3722,3724,3747,3749,3749,
        3751,3760,3762,3763,3773,3773,3776,3780,3782,3782,3792,3801,3804,
        3807,3840,3840,3872,3881,3904,3911,3913,3948,3976,3980,4096,4138,
        4159,4169,4176,4181,4186,4189,4193,4193,4197,4198,4206,4208,4213,
        4225,4238,4238,4240,4249,4256,4293,4295,4295,4301,4301,4304,4346,
        4348,4680,4682,4685,4688,4694,4696,4696,4698,4701,4704,4744,4746,
        4749,4752,4784,4786,4789,4792,4798,4800,4800,4802,4805,4808,4822,
        4824,4880,4882,4885,4888,4954,4992,5007,5024,5109,5112,5117,5121,
        5740,5743,5759,5761,5786,5792,5866,5873,5880,5888,5905,5919,5937,
        5952,5969,5984,5996,5998,6000,6016,6067,6103,6103,6108,6108,6112,
        6121,6160,6169,6176,6264,6272,6276,6279,6312,6314,6314,6320,6389,
        6400,6430,6470,6509,6512,6516,6528,6571,6576,6601,6608,6617,6656,
        6678,6688,6740,6784,6793,6800,6809,6823,6823,6917,6963,6981,6988,
        6992,7001,7043,7072,7086,7141,7168,7203,7232,7241,7245,7293,7296,
        7304,7312,7354,7357,7359,7401,7404,7406,7411,7413,7414,7418,7418,
        7424,7615,7680,7957,7960,7965,7968,8005,8008,8013,8016,8023,8025,
        8025,8027,8027,8029,8029,8031,8061,8064,8116,8118,8124,8126,8126,
        8130,8132,8134,8140,8144,8147,8150,8155,8160,8172,8178,8180,8182,
        8188,8305,8305,8319,8319,8336,8348,8450,8450,8455,8455,8458,8467,
        8469,8469,8473,8477,8484,8484,8486,8486,8488,8488,8490,8493,8495,
        8505,8508,8511,8517,8521,8526,8526,8579,8580,11264,11492,11499,11502,
        11506,11507,11520,11557,11559,11559,11565,11565,11568,11623,11631,
        11631,11648,11670,11680,11686,11688,11694,11696,11702,11704,11710,
        11712,11718,11720,11726,11728,11734,11736,11742,11823,11823,12293,
        12294,12337,12341,12347,12348,12353,12438,12445,12447,12449,12538,
        12540,12543,12549,12591,12593,12686,12704,12735,12784,12799,13312,
        19903,19968,42124,42192,42237,42240,42508,42512,42539,42560,42606,
        42623,42653,42656,42725,42775,42783,42786,42888,42891,42954,42960,
        42961,42963,42963,42965,42969,42994,43009,43011,43013,43015,43018,
        43020,43042,43072,43123,43138,43187,43216,43225,43250,43255,43259,
        43259,43261,43262,43264,43301,43312,43334,43360,43388,43396,43442,
        43471,43481,43488,43492,43494,43518,43520,43560,43584,43586,43588,
        43595,43600,43609,43616,43638,43642,43642,43646,43695,43697,43697,
        43701,43702,43705,43709,43712,43712,43714,43714,43739,43741,43744,
        43754,43762,43764,43777,43782,43785,43790,43793,43798,43808,43814,
        43816,43822,43824,43866,43868,43881,43888,44002,44016,44025,44032,
        55203,55216,55238,55243,55291,63744,64109,64112,64217,64256,64262,
        64275,64279,64285,64285,64287,64296,64298,64310,64312,64316,64318,
        64318,64320,64321,64323,64324,64326,64433,64467,64829,64848,64911,
        64914,64967,65008,65019,65136,65140,65142,65276,65296,65305,65313,
        65338,65345,65370,65382,65470,65474,65479,65482,65487,65490,65495,
        65498,65500,65536,65547,65549,65574,65576,65594,65596,65597,65599,
        65613,65616,65629,65664,65786,66176,66204,66208,66256,66304,66335,
        66349,66368,66370,66377,66384,66421,66432,66461,66464,66499,66504,
        66511,66560,66717,66720,66729,66736,66771,66776,66811,66816,66855,
        66864,66915,66928,66938,66940,66954,66956,66962,66964,66965,66967,
        66977,66979,66993,66995,67001,67003,67004,67072,67382,67392,67413,
        67424,67431,67456,67461,67463,67504,67506,67514,67584,67589,67592,
        67592,67594,67637,67639,67640,67644,67644,67647,67669,67680,67702,
        67712,67742,67808,67826,67828,67829,67840,67861,67872,67897,67968,
        68023,68030,68031,68096,68096,68112,68115,68117,68119,68121,68149,
        68192,68220,68224,68252,68288,68295,68297,68324,68352,68405,68416,
        68437,68448,68466,68480,68497,68608,68680,68736,68786,68800,68850,
        68864,68899,68912,68921,69248,69289,69296,69297,69376,69404,69415,
        69415,69424,69445,69488,69505,69552,69572,69600,69622,69635,69687,
        69734,69743,69745,69746,69749,69749,69763,69807,69840,69864,69872,
        69881,69891,69926,69942,69951,69956,69956,69959,69959,69968,70002,
        70006,70006,70019,70066,70081,70084,70096,70106,70108,70108,70144,
        70161,70163,70187,70207,70208,70272,70278,70280,70280,70282,70285,
        70287,70301,70303,70312,70320,70366,70384,70393,70405,70412,70415,
        70416,70419,70440,70442,70448,70450,70451,70453,70457,70461,70461,
        70480,70480,70493,70497,70656,70708,70727,70730,70736,70745,70751,
        70753,70784,70831,70852,70853,70855,70855,70864,70873,71040,71086,
        71128,71131,71168,71215,71236,71236,71248,71257,71296,71338,71352,
        71352,71360,71369,71424,71450,71472,71481,71488,71494,71680,71723,
        71840,71913,71935,71942,71945,71945,71948,71955,71957,71958,71960,
        71983,71999,71999,72001,72001,72016,72025,72096,72103,72106,72144,
        72161,72161,72163,72163,72192,72192,72203,72242,72250,72250,72272,
        72272,72284,72329,72349,72349,72368,72440,72704,72712,72714,72750,
        72768,72768,72784,72793,72818,72847,72960,72966,72968,72969,72971,
        73008,73030,73030,73040,73049,73056,73061,73063,73064,73066,73097,
        73112,73112,73120,73129,73440,73458,73474,73474,73476,73488,73490,
        73523,73552,73561,73648,73648,73728,74649,74880,75075,77712,77808,
        77824,78895,78913,78918,82944,83526,92160,92728,92736,92766,92768,
        92777,92784,92862,92864,92873,92880,92909,92928,92975,92992,92995,
        93008,93017,93027,93047,93053,93071,93760,93823,93952,94026,94032,
        94032,94099,94111,94176,94177,94179,94179,94208,100343,100352,101589,
        101632,101640,110576,110579,110581,110587,110589,110590,110592,110882,
        110898,110898,110928,110930,110933,110933,110948,110951,110960,111355,
        113664,113770,113776,113788,113792,113800,113808,113817,119808,119892,
        119894,119964,119966,119967,119970,119970,119973,119974,119977,119980,
        119982,119993,119995,119995,119997,120003,120005,120069,120071,120074,
        120077,120084,120086,120092,120094,120121,120123,120126,120128,120132,
        120134,120134,120138,120144,120146,120485,120488,120512,120514,120538,
        120540,120570,120572,120596,120598,120628,120630,120654,120656,120686,
        120688,120712,120714,120744,120746,120770,120772,120779,120782,120831,
        122624,122654,122661,122666,122928,122989,123136,123180,123191,123197,
        123200,123209,123214,123214,123536,123565,123584,123627,123632,123641,
        124112,124139,124144,124153,124896,124902,124904,124907,124909,124910,
        124912,124926,124928,125124,125184,125251,125259,125259,125264,125273,
        126464,126467,126469,126495,126497,126498,126500,126500,126503,126503,
        126505,126514,126516,126519,126521,126521,126523,126523,126530,126530,
        126535,126535,126537,126537,126539,126539,126541,126543,126545,126546,
        126548,126548,126551,126551,126553,126553,126555,126555,126557,126557,
        126559,126559,126561,126562,126564,126564,126567,126570,126572,126578,
        126580,126583,126585,126588,126590,126590,126592,126601,126603,126619,
        126625,126627,126629,126633,126635,126651,130032,130041,131072,173791,
        173824,177977,177984,178205,178208,183969,183984,191456,194560,195101,
        196608,201546,201552,205743,3,0,9,10,13,13,32,32,99,0,1,1,0,0,0,
        0,3,1,0,0,0,0,11,1,0,0,0,0,13,1,0,0,0,0,15,1,0,0,0,0,17,1,0,0,0,
        0,19,1,0,0,0,0,21,1,0,0,0,0,23,1,0,0,0,0,25,1,0,0,0,0,27,1,0,0,0,
        0,29,1,0,0,0,0,31,1,0,0,0,1,33,1,0,0,0,3,41,1,0,0,0,5,51,1,0,0,0,
        7,56,1,0,0,0,9,62,1,0,0,0,11,64,1,0,0,0,13,67,1,0,0,0,15,70,1,0,
        0,0,17,72,1,0,0,0,19,74,1,0,0,0,21,76,1,0,0,0,23,78,1,0,0,0,25,80,
        1,0,0,0,27,82,1,0,0,0,29,85,1,0,0,0,31,90,1,0,0,0,33,38,3,27,13,
        0,34,37,3,29,14,0,35,37,3,3,1,0,36,34,1,0,0,0,36,35,1,0,0,0,37,40,
        1,0,0,0,38,36,1,0,0,0,38,39,1,0,0,0,39,2,1,0,0,0,40,38,1,0,0,0,41,
        46,5,123,0,0,42,45,3,5,2,0,43,45,8,0,0,0,44,42,1,0,0,0,44,43,1,0,
        0,0,45,48,1,0,0,0,46,44,1,0,0,0,46,47,1,0,0,0,47,49,1,0,0,0,48,46,
        1,0,0,0,49,50,5,125,0,0,50,4,1,0,0,0,51,54,5,92,0,0,52,55,7,1,0,
        0,53,55,3,7,3,0,54,52,1,0,0,0,54,53,1,0,0,0,55,6,1,0,0,0,56,57,5,
        117,0,0,57,58,3,9,4,0,58,59,3,9,4,0,59,60,3,9,4,0,60,61,3,9,4,0,
        61,8,1,0,0,0,62,63,7,2,0,0,63,10,1,0,0,0,64,65,5,38,0,0,65,66,5,
        38,0,0,66,12,1,0,0,0,67,68,5,124,0,0,68,69,5,124,0,0,69,14,1,0,0,
        0,70,71,5,38,0,0,71,16,1,0,0,0,72,73,5,124,0,0,73,18,1,0,0,0,74,
        75,5,33,0,0,75,20,1,0,0,0,76,77,5,94,0,0,77,22,1,0,0,0,78,79,5,40,
        0,0,79,24,1,0,0,0,80,81,5,41,0,0,81,26,1,0,0,0,82,83,7,3,0,0,83,
        28,1,0,0,0,84,86,7,4,0,0,85,84,1,0,0,0,86,87,1,0,0,0,87,85,1,0,0,
        0,87,88,1,0,0,0,88,30,1,0,0,0,89,91,7,5,0,0,90,89,1,0,0,0,91,92,
        1,0,0,0,92,90,1,0,0,0,92,93,1,0,0,0,93,94,1,0,0,0,94,95,6,15,0,0,
        95,32,1,0,0,0,8,0,36,38,44,46,54,87,92,1,6,0,0
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!PropositionalLogicLexer.__ATN) {
            PropositionalLogicLexer.__ATN = new antlr.ATNDeserializer().deserialize(PropositionalLogicLexer._serializedATN);
        }

        return PropositionalLogicLexer.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(PropositionalLogicLexer.literalNames, PropositionalLogicLexer.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return PropositionalLogicLexer.vocabulary;
    }

    private static readonly decisionsToDFA = PropositionalLogicLexer._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}