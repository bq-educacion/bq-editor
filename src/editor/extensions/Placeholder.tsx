import { PlaceholderExtension } from 'remirror/extensions';
import { extensions, ExtensionType } from "../../types.d";

const Placeholder: ExtensionType = {
  extensionFunction: PlaceholderExtension,
  name: extensions.placeholder,
};

export default Placeholder;
