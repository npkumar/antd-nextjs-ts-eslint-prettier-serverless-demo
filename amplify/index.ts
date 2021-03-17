import Amplify, {
  Auth as AuthOriginal,
  withSSRContext as withSSRContextOriginal,
} from 'aws-amplify';
import awsCongnitoConfig from './config';

import dictionary from './dictionary';

// @see https://qiita.com/bonkeenu/items/2e6b235ffb5bfdc1ddb6
Amplify.I18n.putVocabulariesForLanguage('ja', dictionary);

// @see https://dev.to/dabit3/the-complete-guide-to-next-js-authentication-2aco
Amplify.configure({ ...awsCongnitoConfig });

export const Auth = AuthOriginal;
export const withSSRContext = withSSRContextOriginal;
export default Amplify;
