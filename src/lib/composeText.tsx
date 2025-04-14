const composeText = (text: string, composition: string): string => {
  let compose = text;
  switch (composition) {
    case "´":
      switch (text) {
        case "a":
          compose = "á";
          break;
        case "e":
          compose = "é";
          break;
        case "i":
          compose = "í";
          break;
        case "o":
          compose = "ó";
          break;
        case "u":
          compose = "ú";
          break;
        case "A":
          compose = "Á";
          break;
        case "E":
          compose = "É";
          break;
        case "I":
          compose = "Í";
          break;
        case "O":
          compose = "Ó";
          break;
        case "U":
          compose = "Ú";
          break;
        default:
          compose = composition + text;
          break;
      }
      break;
    case "`":
      switch (text) {
        case "a":
          compose = "à";
          break;
        case "e":
          compose = "è";
          break;
        case "i":
          compose = "ì";
          break;
        case "o":
          compose = "ò";
          break;
        case "u":
          compose = "ù";
          break;
        case "A":
          compose = "À";
          break;
        case "E":
          compose = "È";
          break;
        case "I":
          compose = "Ì";
          break;
        case "O":
          compose = "Ò";
          break;
        case "U":
          compose = "Ù";
          break;
        default:
          compose = composition + text;
          break;
      }
      break;
    case "~":
      switch (text) {
        case "a":
          compose = "ã";
          break;
        case "e":
          compose = "ẽ";
          break;
        case "i":
          compose = "ĩ";
          break;
        case "o":
          compose = "õ";
          break;
        case "u":
          compose = "ũ";
          break;
        case "A":
          compose = "Ã";
          break;
        case "E":
          compose = "Ẽ";
          break;
        case "I":
          compose = "Ĩ";
          break;
        case "O":
          compose = "Õ";
          break;
        case "U":
          compose = "Ũ";
          break;
        default:
          compose = composition + text;
          break;
      }
      break;
    case "^":
      switch (text) {
        case "a":
          compose = "â";
          break;
        case "e":
          compose = "ê";
          break;
        case "i":
          compose = "î";
          break;
        case "o":
          compose = "ô";
          break;
        case "u":
          compose = "û";
          break;
        case "A":
          compose = "Â";
          break;
        case "E":
          compose = "Ê";
          break;
        case "I":
          compose = "Î";
          break;
        case "O":
          compose = "Ô";
          break;
        case "U":
          compose = "Û";
          break;
        default:
          compose = composition + text;
          break;
      }
      break;
    case "¨":
      switch (text) {
        case "a":
          compose = "ä";
          break;
        case "e":
          compose = "ë";
          break;
        case "i":
          compose = "ï";
          break;
        case "o":
          compose = "ö";
          break;
        case "u":
          compose = "ü";
          break;
        case "A":
          compose = "Ä";
          break;
        case "E":
          compose = "Ë";
          break;
        case "I":
          compose = "Ï";
          break;
        case "O":
          compose = "Ö";
          break;
        case "U":
          compose = "Ü";
          break;
        default:
          compose = composition + text;
          break;
      }
      break;
    default:
      compose = composition + text;
      break;
  }
  return compose;
};

export default composeText;
