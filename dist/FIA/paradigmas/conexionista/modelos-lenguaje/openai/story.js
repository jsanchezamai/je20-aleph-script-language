"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MEMORY_HISTORIC = exports.STORY_PROMPT = exports.HELLO_PROMPT2 = exports.HELLO_PROMPT = exports.MARKS_PROMPT = exports.MOOD_PROMPT_POV = exports.MOOD_PROMPT = exports.MARKDOWN_PROMPT = void 0;
const commands_1 = require("./commands");
exports.MARKDOWN_PROMPT = "Formatea todo con markdown resaltando en negrita las ideas principales, usa cursiva para las citas, etc; devuelve el código sin interpretar, para que lo pueda copiar. \n";
exports.MOOD_PROMPT = "";
exports.MOOD_PROMPT_POV = "Interpreta y responde como lo haría %mood. No te salgas del papel ni aclares que eres una inteligencia artificial. Contesta en primera persona del singular. ";
exports.MARKS_PROMPT = "Sitúa el foco de tu respuesta en responder a: %prompt.";
exports.HELLO_PROMPT = commands_1.PROMPTS.simple + " Preséntate. Di hola, quién eres, dónde vives, qué haces para ganarte la vida. Incluye una lista enumerada con tus hitos más importantes.";
exports.HELLO_PROMPT2 = commands_1.PROMPTS.simple + " Sugiéreme un código para los prompts y di si estás lista.";
exports.STORY_PROMPT = " Vamos a desarrollar una historia. ¿Me ayudas?  " +
    " Será una historia novelada de rigor histórico. Donde predominarán nombres, fechas y datos con autenticidad histórica.  " +
    " Tu misión será redactar los 10 fragmentos para cortar y pegar en la historia final, te iré indicando el fragmento; a cada petición te indicaré el número de fragmento. Los fragmentos deben ceñirse a una arquitectura que será: los 3 primeros serán para el inicio; los 4-5-6 para el nudo; y los 7-8-9 para un desenlace. El fragmento 10 despedirá el relato e invitará a próximas entregas de la serie. " +
    " Todos los fragmentos deberán tener la forma de crónica periodística estructurado en 5 viñetas correspondientes a las 5 uve dobles clásicas (when, why, where, what, who).";
exports.MEMORY_HISTORIC = "" +
    "Lo siguiente es una relación de noticias disponibles. Limita tus respuestas al contexto relacionado con estas noticias.  " +
    "- En 1888 Tesla diseñó el primer sistema práctico para generar y transmitir corriente alterna para sistemas de energía eléctrica." +
    "- 13 de enero: se inicia la publicación de la revista National Geographic en inglés." +
    "- 4 de febrero: en Minas de Riotinto (España) " +
    "- 8 de abril: en Barcelona (España) se abre la Exposición Universal." +
    "- 5 de mayo: en la Ciudad del Vaticano, el papa León XIII proclama la encíclica In Plurimis." +
    "- 29 de junio: en el Palacio de Cristal, en la ciudad de Londres (Reino Unido), el coronel George Gouraud" +
    "- 31 de agosto: en el barrio londinense de Whitechapel Mary Ann Nichols asesinada." +
    "- 1 de octubre: a la isla de Nauru llegan los primeros colonos alemanes." +
    "- 14 de octubre: en Londres se filma la primera película del mundo, la cual dura 2,11 segundos, titulada La escena del jardín de Roundhay." +
    "-23 de diciembre: en Francia, el pintor neerlandés Vincent Van Gogh se corta una oreja, en un acto irracional." +
    "- Diciembre: En España se establece la UGT, órgano sindical socialista." +
    "- Diciembre: En Cataluña, España, 2601 personas firman el documento El missatge a la Reina Regent, que reclama la autonomía de la región." +
    "-Diciembre: Irán: El barón Julius de Reuter establece en Irán el Banco Imperial de Persia, bajo una Carta Real de la reina Victoria de Inglaterra y concesión del shah Nasereddín Qayar." +
    "- Nietzsche escribe: El Anticristo. Maldición sobre el cristianismo (1888) (Der Antichrist. Fluch auf das Christentum); El caso Wagner. Un problema para los amantes de la música (1888) (Der Fall Wagner. Ein Musikanten-Problem); Ditirambos de Dioniso (1888-1889) (Dionysos-Dithyramben)";
