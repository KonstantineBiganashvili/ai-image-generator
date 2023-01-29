import React, { useState, useEffect } from 'react';
import { Loader, FormField, CardGrid } from '../components';

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328]">Showcase</h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w[500px]">
          Browse Through Images Created By Users Through DALL-E AI
        </p>
      </div>

      {/* <div className="mt-16">
        <FormField />
      </div> */}

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          searchText && (
            <h2 className="font-medium text-[#666e75] text-xl mb-3">
              Showing Results For{' '}
              <span className="text-[#222328]">{searchText}</span>
            </h2>
          )
        )}
        {searchText ? (
          <CardGrid data={posts} title="No Searched Results Found" />
        ) : (
          <CardGrid data={posts} title="No Posts Found" />
        )}
      </div>
    </section>
  );
};

export default Home;
