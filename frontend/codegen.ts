import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:3333/graphql', 
  documents: 'src/**/*.graphql',           
  generates: {
    // generate a single file with  hooks
    './src/gql/generated.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo', 
      ],
      config: {
        withHooks: true,       
        withComponent: false,   
        withHOC: false,         
      },
    },
  },
};

export default config;
