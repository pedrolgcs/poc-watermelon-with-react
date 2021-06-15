import React from 'react';
import { Database, Collection } from '@nozbe/watermelondb';
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs';

// watermelon
import schema from './models/schema';
import Post from './models/Post';

const adapter = new LokiJSAdapter({
  schema,
  useWebWorker: false,
  useIncrementalIndexedDB: true,
  onQuotaExceededError: (error) => {
    // Browser ran out of disk space -- do something about it
    console.log('onQuotaExceededError ->', error);
  },
  onSetUpError: (error) => {
    // Database failed to load -- offer the user to reload the app or log out
    console.log('onSetUpError ->', error);
  },
  dbName: 'myapp',
});

const database = new Database({
  adapter,
  modelClasses: [Post],
  actionsEnabled: true,
});

const postsCollection: Collection<Post> = database.get('posts');

const handleSubmit = async () => {
  try {
    const allPosts = await postsCollection.query().fetch();
    console.log(allPosts);
  } catch (error) {
    console.log('deu ruim', error);
  }
};

function App() {
  return (
    <div className="App">
      <button onClick={handleSubmit}>submeter</button>
    </div>
  );
}

export default App;
