import React, {Component} from "react";
import BarChart from "./BarChart";
import WordCloud from "./WordCloud";

class Diagrams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wordCloud: false,
            expanded: false
        };
        this.wordsMap = [];
        this.exclusList = ["a", "RT", "acuerdo", "adelante", "ademas", "ademÃ¡s", "adrede", "ahi", "ahÃ­", "ahora", "al", "alli", "allÃ­", "alrededor", "antano", "antaÃ±o", "ante", "antes", "apenas", "aproximadamente", "aquel", "aquÃ©l", "aquella", "aquÃ©lla", "aquellas", "aquÃ©llas", "aquello", "aquellos", "aquÃ©llos", "aqui", "aquÃ­", "arribaabajo", "asi", "asÃ­", "aun", "aÃºn", "aunque", "b", "bajo", "bastante", "bien", "breve", "c", "casi", "cerca", "claro", "como", "cÃ³mo", "con", "conmigo", "contigo", "contra", "cual", "cuÃ¡l", "cuales", "cuÃ¡les", "cuando", "cuÃ¡ndo", "cuanta", "cuÃ¡nta", "cuantas", "cuÃ¡ntas", "cuanto", "cuÃ¡nto", "cuantos", "cuÃ¡ntos", "d", "de", "debajo", "del", "delante", "demasiado", "dentro", "deprisa", "desde", "despacio", "despues", "despuÃ©s", "detras", "detrÃ¡s", "dia", "dÃ­a", "dias", "dÃ­as", "donde", "dÃ³nde", "dos", "durante", "e", "el", "Ã©l", "ella", "ellas", "ellos", "en", "encima", "enfrente", "enseguida", "entre", "es", "esa", "Ã©sa", "esas", "Ã©sas", "ese", "Ã©se", "eso", "esos", "Ã©sos", "esta", "estÃ¡", "Ã©sta", "estado", "estados", "estan", "estÃ¡n", "estar", "estas", "Ã©stas", "este", "Ã©ste", "esto", "estos", "Ã©stos", "ex", "excepto", "f", "final", "fue", "fuera", "fueron", "g", "general", "gran", "h", "ha", "habia", "habÃ­a", "habla", "hablan", "hace", "hacia", "han", "hasta", "hay", "horas", "hoy", "i", "incluso", "informo", "informÃ³", "j", "junto", "k", "l", "la", "lado", "las", "le", "lejos", "lo", "los", "luego", "m", "mal", "mas", "mÃ¡s", "mayor", "me", "medio", "mejor", "menos", "menudo", "mi", "mÃ­", "mia", "mÃ­a", "mias", "mÃ­as", "mientras", "mio", "mÃ­o", "mios", "mÃ­os", "mis", "mismo", "mucho", "muy", "n", "nada", "nadie", "ninguna", "no", "nos", "nosotras", "nosotros", "nuestra", "nuestras", "nuestro", "nuestros", "nueva", "nuevo", "nunca", "o", "os", "otra", "otros", "p", "pais", "paÃ¬s", "para", "parte", "pasado", "peor", "pero", "poco", "por", "porque", "pronto", "proximo", "prÃ³ximo", "puede", "q", "qeu", "que", "quÃ©", "quien", "quiÃ©n", "quienes", "quiÃ©nes", "quiza", "quizÃ¡", "quizas", "quizÃ¡s", "r", "raras", "repente", "s", "salvo", "se", "sÃ©", "segun", "segÃºn", "ser", "sera", "serÃ¡", "si", "sÃ­", "sido", "siempre", "sin", "sobre", "solamente", "solo", "sÃ³lo", "son", "soyos", "su", "supuesto", "sus", "suya", "suyas", "suyo", "t", "tal", "tambien", "tambiÃ©n", "tampoco", "tarde", "te", "temprano", "ti", "tiene", "todavia", "todavÃ­a", "todo", "todos", "tras", "tu", "tÃº", "tus", "tuya", "tuyas", "tuyo", "tuyos", "u", "un", "una", "unas", "uno", "unos", "usted", "ustedes", "v", "veces", "vez", "vosotras", "vosotros", "vuestra", "vuestras", "vuestro", "vuestros", "w", "x", "y", "ya", "yo", "z",
            "january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "-", "--", "''", "we've", "we'll", "we're", "who'll", "who've", "who's", "you'll", "you've", "you're", "i'll", "i've", "i'm", "i'd", "he'll", "he'd", "he's", "she'll", "she'd", "she's", "it'll", "it'd", "it's", "they've", "they're", "they'll", "didn't", "don't", "can't", "won't", "isn't", "wasn't", "couldn't", "should't", "wouldn't", "ve", "ll", "re", "th", "rd", "st", "doing", "allow", "examining", "using", "during", "within", "across", "among", "whether", "especially", "without", "actually", "another", "am", "because", "cannot", "the", "of", "to", "and", "a", "in", "is", "it", "you", "that", "he", "was", "for", "on", "are", "with", "as", "I", "his", "they", "be", "at", "one", "have", "this", "from", "or", "had", "by", "hot", "word", "but", "what", "some", "we", "yet", "can", "out", "other", "were", "all", "there", "when", "up", "use", "your", "how", "said", "an", "each", "she", "which", "do", "their", "time", "if", "will", "shall", "way", "about", "many", "then", "them", "would", "like", "so", "these", "her", "long", "make", "thing", "see", "him", "two", "has", "look", "more", "day", "could", "go", "come", "did", "no", "yes", "most", "my", "over", "know", "than", "call", "first", "who", "may", "down", "side", "been", "now", "find", "any", "new", "part", "take", "get", "place", "made", "where", "after", "back", "little", "only", "came", "show", "every", "good", "me", "our", "under", "upon", "very", "through", "just", "great", "say", "low", "cause", "much", "mean", "before", "move", "right", "too", "same", "tell", "does", "set", "three", "want", "well", "also", "put", "here", "must", "big", "high", "such", "why", "ask", "men", "went", "kind", "need", "try", "again", "near", "should", "still", "between", "never", "last", "let", "though", "might", "saw", "left", "late", "run", "don't", "while", "close", "few", "seem", "next", "got", "always", "those", "both", "often", "thus", "won't", "not", "into", "inside", "its", "makes", "tenth", "trying", "i", "me", "my", "myself", "we", "us", "our", "ours", "ourselves", "you", "your", "yours", "yourself", "yourselves", "he", "him", "his", "himself", "she", "her", "hers", "herself", "it", "its", "itself", "they", "them", "their", "theirs", "themselves", "what", "which", "who", "whom", "this", "that", "these", "those", "am", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "having", "do", "does", "did", "doing", "will", "would", "shall", "should", "can", "could", "may", "might", "must", "ought", "i'm", "you're", "he's", "she's", "it's", "we're", "they're", "i've", "you've", "we've", "they've", "i'd", "you'd", "he'd", "she'd", "we'd", "they'd", "i'll", "you'll", "he'll", "she'll", "we'll", "they'll", "isn't", "aren't", "wasn't", "weren't", "hasn't", "haven't", "hadn't", "doesn't", "don't", "didn't", "won't", "wouldn't", "shan't", "shouldn't", "can't", "cannot", "couldn't", "mustn't", "let's", "that's", "who's", "what's", "here's", "there's", "when's", "where's", "why's", "how's", "daren't", "needn't", "oughtn't", "mightn't", "a", "an", "the", "and", "but", "if", "or", "because", "as", "until", "while", "of", "at", "by", "for", "with", "about", "against", "between", "into", "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", "in", "out", "on", "off", "over", "under", "again", "further", "then", "once", "here", "there", "when", "where", "why", "how", "all", "any", "both", "each", "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than", "too", "very", "one", "every", "least", "less", "many", "now", "ever", "never", "say", "says", "said", "also", "get", "go", "goes", "just", "made", "make", "put", "see", "seen", "whether", "like", "well", "back", "even", "still", "way", "take", "since", "another", "however", "two", "three", "four", "five", "first", "second", "new", "old", "high", "long"];
    }

    componentDidMount() {

        let intervalId = setInterval(() => {
            this.wordsMap = [];
            this.countWord()
        }, 10000);
    }

    renderBarChart() {
        return (<BarChart data={this.props.users}/>)
    }

    countWord() {

        if (this.props.tweets) {
            this.props.tweets.forEach((tweet) => {
                let wordsArray = tweet.body.split(/\s+/);
                wordsArray.forEach((word) => {
                    if (!this.exclusList.includes(word))
                        if (this.wordsMap.hasOwnProperty(word)) {
                            this.wordsMap[word]++;
                        }
                        else {
                            this.wordsMap[word] = 1;
                        }
                });
            });
            this.finalWordArray = Object.keys(this.wordsMap).map((key) => {

                return {
                    text: key,
                    size: this.wordsMap[key]
                };
            });
            this.finalWordArray.sort(function (a, b) {
                return b.size - a.size;
            });
            this.finalWordArray = this.finalWordArray.slice(0, 100);
        }

    }

    componentDidUpdate(prevProps) {

    }

    componentWillUpdate(nextProps) {

    }


    render() {
        return (
            <div className="wall-background" style={{"backgroundColor": this.props.background}}>
                <div className="container-fluid">
                    <div className="row">
                        <div id="activeUsers">
                            <h1 style={{"color": this.props.title}}> Top 5 Active Users </h1>
                            {this.renderBarChart()}
                        </div>
                    </div>
                    <div className="row rowChart">
                        <h1 style={{"color": this.props.title}}> Most used words </h1>

                        <br/>
                        <WordCloud finalWordArray={this.finalWordArray}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Diagrams;